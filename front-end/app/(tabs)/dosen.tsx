import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { TotalRating } from '@/components/TotalRating';
import { ReviewHeader } from '@/components/ReviewHeader';
import { ReviewDosenList, ReviewDosenItem } from '@/components/ReviewDosenList';

const dosen = {
    dosenId: 1,
    rating: 4.8,
    nama: "Ocean Charlie Gunawan",
    prodi: "Teknik Informatika",
    kampus:"Institut Teknologi Bandung",
};

const reviews: ReviewDosenItem[] = [
    { reviewId: 1, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { reviewId: 2, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { reviewId: 3, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { reviewId: 4, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { reviewId: 5, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
    { reviewId: 6, date: new Date(), content: "Dosen yang luar biasa, menjelaskan semuanya dengan jelas.", matkul: "Statistik", like: 7, dislike: 1, hasLiked: false, hasDisliked: false, rating: 4.2 },
];

export default function DosenScreen() {
    const [reviewList, setReviewList] = useState<ReviewDosenItem[]>(reviews);

  return (
    <SafeAreaView 
        edges={['top', 'left', 'right']} 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Dosen</HeaderWithBackButton>

        <ScrollView>
            <View style={{ paddingHorizontal: 28 }}>
                <View>
                    <Title>Ocean Charlie Gunawan</Title>
                    <Subtitle>Dosen Prodi {dosen.prodi},</Subtitle>
                    <Subtitle style={{
                        color: Colors.primary,
                        textDecorationLine: "underline"
                    }}>{dosen.kampus}</Subtitle>
                </View>

                <TotalRating>{dosen.rating}</TotalRating>
                <ReviewHeader 
                    count={reviews.length} 
                    onPress={() => console.log("Tulis Ulasan")}
                />

                <ReviewDosenList list={reviewList}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    h1: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
});
