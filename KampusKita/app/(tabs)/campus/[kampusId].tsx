import { useEffect, useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { ReviewHeader } from "@/components/ReviewHeader";
import { Subtitle } from "@/components/Subtitle";
import { Title } from "@/components/Title";
import { TotalRating } from "@/components/TotalRating";
import { Colors } from "@/constants/Colors";
import { CategoryRating } from "./components/CategoryRating";
import { ReviewListItem, stringToCategory } from "./components/ReviewListItem";
import { 
    KampusDataType, 
    KampusFetchType, 
    KampusReviewType, 
    kampusReviewDummy,
} from "./type";


export default function CampusScreen() {
    const local = useLocalSearchParams();
    const router = useRouter();

    const [kampus, setKampus] = useState<KampusDataType | null>(null);
    const [reviews, setReviews] = useState<KampusReviewType[]>([]);

    const fetchKampus = useCallback(async (kampusId: number) => {
        try { 
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/kampus/${kampusId}`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: KampusFetchType = await res.json();
            const data: KampusDataType = {
                id: json.data.kampusId,
                jumlahDosen: json.data.jumlah_dosen,
                nama: json.data.nama,
                akreditasi: json.data.akreditasi,
                rating: json.data.rating,
            };
            setKampus(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    
    useEffect(() => {
        fetchKampus(local.kampusId);
        setReviews(kampusReviewDummy);
    },[]);

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background1, flex: 1 }}>
            <HeaderWithBackButton>Perguruan Tinggi</HeaderWithBackButton>

            { kampus &&
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 28 }}>
                    <Title>{kampus.nama}</Title>
                    <Subtitle>Akreditasi {kampus.akreditasi}</Subtitle>
                    <Link href={`/(tabs)/listDosen?id=${kampus.id}&name=${kampus.nama}`}>
                        <Subtitle style={{ textDecorationLine: "underline", color: Colors.primary }}>
                        { `Lihat semua dosen (${kampus.jumlahDosen})` }
                        </Subtitle>
                    </Link>

                    <TotalRating>
                        { Object.entries(kampus.rating)
                            .reduce((total, [subject, score]) => total + score, 0) / 5
                        }
                    </TotalRating>

                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}>
                        { Object.entries(kampus.rating).map(([subject, score], index) => (
                            <CategoryRating
                                key={index}
                                category={stringToCategory(subject)}
                                rating={score}
                            />
                        ))}
                    </View>

                    <ReviewHeader
                        count={reviews.length}
                        onPress={() => router.navigate(`/(tabs)/reviewKampus/${kampus.id}`)}
                    />

                    {reviews.map((review, index) => (
                        <ReviewListItem key={index} item={review}/>
                    ))}

                </View>
            </ScrollView>
            }
        </SafeAreaView>
    );
}
