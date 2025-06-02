import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from 'expo-secure-store';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { RatingBar } from '@/components/RatingBar';
import { CustomTextInput } from '@/components/CustomTextInput';
import { SmallText } from '@/components/SmallText';
import { BigButton } from '@/components/BigButton';

export default function ReviewKampusScreen() {
    const local = useLocalSearchParams();
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const [kampus, setKampus] = useState<{ id: number; nama: string; } | null>(null);

    const [fasilitas, setFasilitas] = useState<number>(0);
    const [wifi, setWifi] = useState<number>(0);
    const [lokasi, setLokasi] = useState<number>(0);
    const [organisasi, setOrganisasi] = useState<number>(0);
    const [worthIt, setWorthIt] = useState<number>(0);
    const [ulasan, setUlasan] = useState<string>('');

    async function handleSubmit() {
        if (kampus === null) return;

        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/kampus/token/review`;
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    kampus_id: kampus.id,
                    fasilitas: fasilitas,
                    wifi: wifi,
                    lokasi: lokasi,
                    organisasi: organisasi,
                    worthIt: worthIt,
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
        setKampus({
            id: local.id,
            nama: local.name,
        });
    }, []);

    useEffect(() => {
        if (fasilitas === 0 || wifi === 0 || lokasi === 0 || worthIt === 0 || ulasan === '') {
            setDisableSubmit(true);
            return;
        } 

        setDisableSubmit(false);
    }, [fasilitas, wifi, lokasi, organisasi, worthIt, ulasan]);

  return (
    <SafeAreaView 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Ulasan Perguruan Tinggi</HeaderWithBackButton>

        <ScrollView>
            <View style={{ paddingHorizontal: 28, gap: 12 }}>
                <Title>Institut Teknologi Bandung</Title>

                <RatingBar rating={fasilitas} setRating={setFasilitas}>
                    <MaterialIcons name="corporate-fare" size={24} color={Colors.text} />
                    <Subtitle>Fasilitas</Subtitle>
                </RatingBar>

                <RatingBar rating={wifi} setRating={setWifi}>
                    <MaterialIcons name="wifi" size={24} color={Colors.text} />
                    <Subtitle>Wifi</Subtitle>
                </RatingBar>

                <RatingBar rating={lokasi} setRating={setLokasi}>
                    <MaterialCommunityIcons name="map-marker-outline" size={24} color={Colors.text} />
                    <Subtitle>Lokasi</Subtitle>
                </RatingBar>

                <RatingBar rating={organisasi} setRating={setOrganisasi}>
                    <MaterialCommunityIcons name="account-multiple-outline" size={24} color={Colors.text} />
                    <Subtitle>Organisasi</Subtitle>
                </RatingBar>

                <RatingBar rating={worthIt} setRating={setWorthIt}>
                    <MaterialIcons name="work-outline" size={24} color={Colors.text} />
                    <Subtitle>Worth It</Subtitle>
                </RatingBar>

                <View style={{ marginBottom: 70 }}>
                    <CustomTextInput 
                        title="Ulasan" 
                        placeholder="Berikan ulasan anda" 
                        value={ulasan}
                        onChangeText={(text) => setUlasan(text)}
                        multiline
                    />
                </View>

                <View style={{ gap: 10, marginBottom: 30 }}>
                    <SmallText>Ulasan bersifat anonim dan tidak dapat diedit setelah dikirim.</SmallText>
                    <BigButton 
                        disabled={disableSubmit} 
                        onPress={handleSubmit}
                    >
                        Kirim Ulasan
                    </BigButton>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
