import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { BigButton } from '@/components/BigButton';
import { ChangeUsernameModal } from "@/app/(tabs)/home/components/ChangeUsernameModal";
import { VerifyStatus } from './type';

export default function SettingsScreen() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.NotVerified);

    async function loadUsername() {
        const uname = await SecureStore.getItemAsync('username');
        if (uname && uname !== "") {
            setUsername(uname);
            return;
        }

        setModalVisible(true);
    }

    async function handleDeleteUser() {
        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/user/delete`;
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${jwt}`
                },
            });

            if (!res.ok) return;
            
            const json = await res.json();
            console.log(json);

            await SecureStore.setItemAsync('username', '');
            await SecureStore.setItemAsync('jwtToken', '')
                .then(() => router.navigate("/(tabs)/login"));

        } catch (error) {
            console.error(error);
        }
    }

    const fetchVerifyStatus = useCallback(async () => {
        try { 
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/user/verify/status`;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${jwt}`
                }
            });
            if (!res.ok) return;

            const json = await res.json();
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadUsername();
            fetchVerifyStatus();
        }, [])
    );

    return (
        <SafeAreaView style={{ 
            backgroundColor: Colors.background1, height: "100%",
        }}>
            <HeaderWithBackButton>Settings</HeaderWithBackButton>

            <ScrollView>
                <View style={{ paddingHorizontal: 28, gap: 10 }}>
                    <Title>{ username }</Title>

                    <View>
                        <View style={{ marginBottom: 7 }}>
                            { verifyStatus === VerifyStatus.Verified ? <Subtitle style={{ color: Colors.success }}>Terverifikasi</Subtitle>
                            : verifyStatus === VerifyStatus.Pending ? <Subtitle style={{ color: Colors.pending }}>Pending</Subtitle>
                            : <Subtitle style={{ color: Colors.error }}>Belum Terverifikasi</Subtitle>
                            }
                        </View>
                        { verifyStatus !== VerifyStatus.Verified && (
                            <BigButton 
                                onPress={() => router.navigate(`/(tabs)/verifikasi`)}
                                disabled={verifyStatus === VerifyStatus.Pending}
                            >
                                Verifikasi Sekarang
                            </BigButton>
                        )}
                    </View>

                    <Subtitle style={{ fontSize: 18 }}>Pengaturan Akun</Subtitle>

                    <View style={{ gap: 20 }}>
                        <BigButton onPress={() => setModalVisible(true)}>Ubah Username</BigButton>
                        <BigButton onPress={handleDeleteUser}>Hapus Akun</BigButton>
                    </View>
                </View>
            </ScrollView>

            <ChangeUsernameModal 
                visible={modalVisible} 
                title="Username Baru"
                placeholder="Masukkan username baru"
                handleClose={(newUsername: string | undefined) => {
                    if (newUsername) setUsername(newUsername);
                    setModalVisible(false);
                }} 
            />
        </SafeAreaView>
    );
}
