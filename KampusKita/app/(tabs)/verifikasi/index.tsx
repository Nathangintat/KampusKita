import { BigButton } from '@/components/BigButton';
import { CustomTextInput } from '@/components/CustomTextInput';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { SmallText } from '@/components/SmallText';
import { Subtitle } from '@/components/Subtitle';
import { Colors } from '@/constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KampusPickerFetchType, PickerItemType, ProdiPickerFetchType } from './type';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function VerifikasiScreen() {
    const router = useRouter();
    const [listKampus, setListKampus] = useState<ProdiPickerFetchType[] | null>(null);
    const [listProdi, setListProdi] = useState<ProdiPickerFetchType[] | null>(null);

    const [nim, setNim] = useState<string>("");
    const [selectedKampus, setSelectedKampus] = useState<number | null>(null);
    const [selectedProdi, setSelectedProdi] = useState<number | null>(null);
    const [ktm, setKtm] = useState<string | null>(null);

    const [isValid, setIsValid] = useState<boolean>(false);

    const fetchKampus = useCallback(async () => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/kampus`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: KampusPickerFetchType[] = await res.json();
            const data: PickerItemType[] = json.data.map(item => {
                return {
                    value: item.id,
                    label: item.nama,
                }
            });

            setListKampus(data);
            if (data.length > 0) setSelectedKampus(data[0].value);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchProdi = useCallback(async (kampusID: number) => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/prodi/${kampusID}`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: ProdiPickerFetchType[] = await res.json();
            const data: PickerItemType[] = json.data.map(item => {
                return {
                    value: item.id,
                    label: item.nama,
                }
            });

            setListProdi(data);
            if (data.length > 0) setSelectedProdi(data[0]);
        } catch (error) {
            console.error(error);
        }
    }, []);

    async function selectImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setKtm(result.assets[0].uri);
        }
    }

    async function handleSubmit() {
        if (!nim || !selectedKampus || !selectedProdi || !ktm) return;

        const formData = new FormData();

        const fileType = ktm.split(".").slice(-1);
        const fileName = `${nim}.${fileType}`;

        formData.append("nim", nim);
        formData.append("kampusId", `${selectedKampus}`);
        formData.append("prodiId", `${selectedProdi}`);
        formData.append("image", {
            uri: ktm,
            name: fileName,
            type: `image/${fileType}`,
        } as any);

        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/user/verify`;
            const res = await fetch(url, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${jwt}`,
                },
                method: "POST",
                body: formData,
            });

            if (!res.ok) return;

            const json = await res.json();
            console.log(json);
            router.back();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchKampus();
    }, []);

    useEffect(() => {
        if (!selectedKampus) return;

        fetchProdi(selectedKampus);
    }, [selectedKampus]);

    useEffect(() => {
        if (nim && selectedKampus && selectedProdi && ktm)
            setIsValid(true);
        else
            setIsValid(false);
    }, [nim, selectedKampus, selectedProdi, ktm]);

  return (
    <SafeAreaView 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Verifikasi</HeaderWithBackButton>

        <View style={{ paddingHorizontal: 28, justifyContent: "space-between" }}>
            <View style={{ marginBottom: 70, gap: 10 }}>
                <View style={{ gap: 5 }}>
                    <CustomTextInput title="NIM" 
                        placeholder="Nomor Induk Mahasiswa" 
                        value={nim}
                        onChangeText={(text: string) => setNim(text)}
                    />
                </View>

                <View style={{ gap: 5}}>
                    <Subtitle>Universitas</Subtitle>
                    <View style={styles.pickerContainer}>
                        <Picker
                        selectedValue={selectedKampus}
                        style={{ height: 55, width: "auto" }}
                        onValueChange={(value) => setSelectedKampus(value)}>
                        { listKampus && (
                            listKampus.map((item, index) => (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                            ))
                        )}
                        </Picker>
                    </View>
                </View>

                <View style={{ gap: 5 }}>
                    <Subtitle>Prodi</Subtitle>
                    <View style={styles.pickerContainer}>
                        <Picker
                        enabled={selectedKampus !== null}
                        selectedValue={selectedProdi}
                        style={{ height: 55, width: "auto" }}
                        onValueChange={(value) => setSelectedProdi(value)}>
                        { listProdi && (
                            listProdi.map((item, index) => (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                            ))
                        )}
                        </Picker>
                    </View>
                </View>

                <View style={{ gap: 5 }}>
                    <Subtitle>Kartu Tanda Mahasiswa</Subtitle>
                    <Pressable 
                        android_ripple={{
                            color: "rgba(0,0,0,0.1)",
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={selectImage}
                    >
                    { ktm ? 
                        ( <Image source={{ uri: ktm }} style={{
                            borderColor: Colors.grey,
                            borderWidth: 1,
                            borderRadius: 8,
                            height: 250,
                        }} /> )
                        : (
                        <View style={{
                            backgroundColor: Colors.background2,
                            borderColor: Colors.grey,
                            borderWidth: 1,
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 20,
                            gap: 10,
                            height: 250,
                        }}>
                            <Feather name="upload" size={40} color={Colors.lightGrey} />
                            <Subtitle style={{ color: Colors.lightGrey }}>Pilih Gambar</Subtitle>
                            <Subtitle style={{ color: Colors.lightGrey, fontSize: 12 }}>JPG/PNG</Subtitle>
                        </View> )
                    }
                    </Pressable>
                </View>
            </View>

            <View style={{ flex: 1 }}/>

            <View style={{ gap: 10 }}>
                <SmallText style={{ textAlign: "center" }}>Validasi akan memakan waktu kurang dari 24 jam</SmallText>
                <BigButton 
                    disabled={!isValid}
                    onPress={handleSubmit}
                >
                    Validasi
                </BigButton>
            </View>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: Colors.background2,
        borderColor: Colors.grey,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 6,
    },
});
