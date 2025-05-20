import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { BigButton } from '@/components/BigButton';

export default function SettingsScreen() {
  return (
    <SafeAreaView 
        edges={['top', 'left', 'right']} 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Settings</HeaderWithBackButton>

        <ScrollView>
            <View style={{ paddingHorizontal: 28, gap: 10 }}>
                <Title>Ocean Charlie Gunawan</Title>

                <View>
                    <View style={{ marginBottom: 5 }}>
                        <Subtitle style={{ color: Colors.error }}>Belum Terverifikasi</Subtitle>
                        <Subtitle style={{ color: Colors.success }}>Terverifikasi</Subtitle>
                    </View>
                    <BigButton onPress={() => console.log("verifikasi sekarang")}>Verifikasi Sekarang</BigButton>
                </View>

                <Subtitle style={{ fontSize: 20 }}>Pengaturan Akun</Subtitle>
                <View style={{ gap: 20 }}>
                    <BigButton onPress={() => console.log("ubah username")}>Ubah Username</BigButton>
                    <BigButton onPress={() => console.log("hapus akun")}>Hapus Akun</BigButton>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
