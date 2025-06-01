import { useEffect, useState } from 'react';
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
import { dosenDummy, dosenReviewDummy, DosenReviewType, DosenType } from './type';

export default function DosenScreen() {
    const local = useLocalSearchParams();
    const router = useRouter();

    const [dosen, setDosen] = useState<DosenType | null>(null);
    const [reviewList, setReviewList] = useState<DosenReviewType[] | null>(null);

    useEffect(() => {
        // local.dosenId

        setDosen(dosenDummy);
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
                    <Title>Ocean Charlie Gunawan</Title>
                    <Subtitle>Dosen Prodi {dosen.prodi},</Subtitle>
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
