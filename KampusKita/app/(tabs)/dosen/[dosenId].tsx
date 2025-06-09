import { useState, useCallback } from 'react';
import { ScrollView, View, Modal, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useRouter, Link, useLocalSearchParams, useFocusEffect } from "expo-router";
import Toast from 'react-native-toast-message'

import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { TotalRating } from '@/components/TotalRating';
import { ReviewHeader } from '@/components/ReviewHeader';
import { ReviewDosenList } from './components/ReviewDosenList';
import { 
    DosenFetchType, 
    DosenReviewFetchType, 
    DosenReviewType, 
    DosenType,
    ReviewStatus,
    ReviewStatusFetchType
} from './type';

export default function DosenScreen() {
    const local = useLocalSearchParams();
    const router = useRouter();

    const [reviewStatus, setReviewStatus] = useState<ReviewStatus>(ReviewStatus.NotVerified);
    const [dosen, setDosen] = useState<DosenType | null>(null);
    const [reviewList, setReviewList] = useState<DosenReviewType[] | null>(null);

    const fetchDosen = useCallback(async (dosenId: number) => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/dosen/${dosenId}`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: DosenFetchType = await res.json();
            const data: DosenType = {
                id: json.data.id,
                kampusId: json.data.kampus_id,
                kampus: json.data.kampus,
                rating: json.data.rating,
                nama: json.data.nama,
                prodi: json.data.prodi,
            };
            setDosen(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchReviews = useCallback(async (dosenId: number) => {
        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/dosen/token/${dosenId}/reviews`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${jwt}`,
                    "content-type": "application/json",
                }
            });

            if (!res.ok) return;

            const json: DosenReviewFetchType = await res.json();

            if (json.data.rating === null) {
                setReviewList(null);
                return;
            }

            const data: DosenReviewType[] = json.data.rating.map(item => {
                return {
                    id: item.reviewId,
                    date: new Date(item.date),
                    matkul: item.matkul,
                    content: item.content,
                    like: item.like,
                    dislike: item.dislike,
                    hasLiked: item.hasLiked,
                    hasDisliked: item.hasDisliked,
                    rating: item.rating,
                };
            });
            setReviewList(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchReviewStatus = useCallback(async (dosenId: number) => {
        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/dosen/token/${dosenId}/review/status`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${jwt}`,
                    "content-type": "application/json",
                }
            });

            if (!res.ok) return;

            const json: ReviewStatusFetchType = await res.json();

            switch (json.data) {
                case "HasReviewed":
                    setReviewStatus(ReviewStatus.HasReviewed);
                    break;
                case "Allow":
                    setReviewStatus(ReviewStatus.Allow);
                    break;
                case "DifferentKampusProdi":
                    setReviewStatus(ReviewStatus.DifferentKampusProdi);
                    break;
                default:
                    setReviewStatus(ReviewStatus.NotVerified);
            }

        } catch (error) {
            console.error(error);
        }
    }, []);

    function handleReview() {
        if (!dosen || !dosen.id || !dosen.nama) return;

        if (reviewStatus === ReviewStatus.NotVerified) {
            Toast.show({ type: "error", text1: "Akun anda belum tervalidasi" });
            return;
        } 

        if (reviewStatus === ReviewStatus.DifferentKampusProdi) {
            Toast.show({ type: "error", text1: "Anda berada di kampus atau prodi yang berbeda", text1Style: {
                fontSize: 13,
                fontWeight: 500,
            }});

            return;
        } 

        if (reviewStatus === ReviewStatus.HasReviewed) {
            router.navigate(`/(tabs)/editReviewDosen?id=${dosen.id}&name=${dosen.nama}`)
            return;
        }

        router.navigate(`/(tabs)/reviewDosen?id=${dosen.id}&name=${dosen.nama}`)
    }

    useFocusEffect(
        useCallback(() => {
            fetchDosen(local.dosenId);
            fetchReviews(local.dosenId);
            fetchReviewStatus(local.dosenId);
        }, [])
    );

  return (
    <SafeAreaView 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Dosen</HeaderWithBackButton>

        { dosen &&
        <ScrollView>
            <View style={{ paddingHorizontal: 28 }}>
                <View>
                    <Title>{ dosen.nama }</Title>
                    <Subtitle>Dosen Prodi {dosen.prodi}</Subtitle>
                    <Link href={`/(tabs)/campus/${dosen.kampusId}`}>
                        <Subtitle style={{
                            color: Colors.primary,
                            textDecorationLine: "underline"
                        }}>{dosen.kampus}</Subtitle>
                    </Link>
                </View>

                <TotalRating>{dosen.rating.toFixed(1)}</TotalRating>

                    <ReviewHeader 
                        count={reviewList === null ? 0 : reviewList.length} 
                        onPress={handleReview}
                    />

                { reviewList &&
                    <ReviewDosenList 
                        list={reviewList}
                        url={`${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/dosen/token/${dosen.id}/review`}
                    />
                }
            </View>
        </ScrollView>
        }

        <Toast/>
    </SafeAreaView>
  );
}
