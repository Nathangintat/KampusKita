import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { RatingBar } from '@/components/RatingBar';
import { Subtitle } from '@/components/Subtitle';
import { CustomTextInput } from '@/components/CustomTextInput';
import { SmallText } from '@/components/SmallText';
import { BigButton } from '@/components/BigButton';

export default function ReviewDosenScreen() {
    const local = useLocalSearchParams();
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const [dosen, setDosen] = useState<{ id: number, nama: string } | null>(null);

    const [rating, setRating] = useState<number>(0);
    const [matkul, setMatkul] = useState<string>('');
    const [ulasan, setUlasan] = useState<string>('');

    async function handleSubmit() {
        if (dosen === null) return;

        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/dosen/token/review`;
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    dosen_id: dosen.id,
                    rating: rating,
                    matkul: matkul,
                    content: ulasan,
                }),
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${jwt}`
                },
            });

            
            const json = await res.json();
            console.log(json);

            if (!res.ok) return;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(local);
        setDosen({
            id: local.id,
            nama: local.name,
        });
    }, []);

    useEffect(() => {
        if (rating === 0 || matkul === "" || ulasan === "") {
            setDisableSubmit(true);
            return;
        } 

        setDisableSubmit(false);
    }, [rating, matkul, ulasan]);

  return (
    <SafeAreaView 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Ulasan Dosen</HeaderWithBackButton>

        <ScrollView>
        { dosen && dosen.nama &&
            <View style={{ paddingHorizontal: 28, gap: 12 }}>
                <Title>{ dosen.nama }</Title>

                <RatingBar rating={rating} setRating={setRating}>
                    <MaterialIcons name="star-outline" size={24} color={Colors.text} />
                    <Subtitle>Rating</Subtitle>
                </RatingBar>

                <View style={{ marginBottom: 70, gap: 5 }}>
                    <CustomTextInput 
                        title="Mata Kuliah" 
                        placeholder="Mata kuliah yang diajarkan" 
                        value={matkul}
                        onChangeText={(text: string) => setMatkul(text)}
                    />
                    <CustomTextInput 
                        title="Ulasan" 
                        placeholder="Berikan ulasan anda" 
                        value={ulasan}
                        onChangeText={(text: string) => setUlasan(text)}
                        multiline
                    />
                </View>

                <View style={{ gap: 10, marginBottom: 30 }}>
                    <SmallText>Ulasan bersifat anonim dan tidak dapat diedit setelah dikirim.</SmallText>
                    <BigButton disabled={disableSubmit} onPress={handleSubmit}>Kirim Ulasan</BigButton>
                </View>
            </View>
        }
        </ScrollView>
    </SafeAreaView>
  );
}
