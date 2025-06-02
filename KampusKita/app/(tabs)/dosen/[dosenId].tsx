import { useEffect, useState, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link, useLocalSearchParams } from "expo-router";

import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { TotalRating } from '@/components/TotalRating';
import { ReviewHeader } from '@/components/ReviewHeader';
import { ReviewDosenList } from './components/ReviewDosenList';
import { DosenFetchType, dosenReviewDummy, DosenReviewType, DosenType } from './type';

export default function DosenScreen() {
    const local = useLocalSearchParams();
    const router = useRouter();

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

    useEffect(() => {
        fetchDosen(local.dosenId);
        setReviewList(dosenReviewDummy);
    }, []);

  return (
    <SafeAreaView 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Dosen</HeaderWithBackButton>

        { dosen && reviewList &&
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

                <TotalRating>{dosen.rating}</TotalRating>
                <ReviewHeader 
                    count={reviewList.length} 
                    onPress={() => router.navigate(`/(tabs)/reviewDosen/${dosen.id}`)}
                />

                <ReviewDosenList list={reviewList}/>
            </View>
        </ScrollView>
        }
    </SafeAreaView>
  );
}
