import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { CustomTextInput } from '@/components/CustomTextInput';
import { SmallText } from '@/components/SmallText';
import { BigButton } from '@/components/BigButton';
import { Subtitle } from '@/components/Subtitle';
import Feather from '@expo/vector-icons/Feather';

export default function VerifikasiScreen() {
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
                <View style={{ gap: 5 }}><CustomTextInput title="NIM" placeholder="Nomor Induk Mahasiswa" /></View>
                <View style={{ gap: 5 }}><CustomTextInput title="Universitas" placeholder="Universitas"/></View>
                <View style={{ gap: 5 }}><CustomTextInput title="Prodi" placeholder="Prodi"/></View>

                <View style={{ gap: 5 }}>
                    <Subtitle>Kartu Tanda Mahasiswa</Subtitle>
                    <Pressable 
                        android_ripple={{
                            color: "rgba(0,0,0,0.1)",
                            borderless: false,
                            foreground: true,
                        }}
                        onPress={() => console.log("upload ktm")}
                    >
                        <View style={{
                            backgroundColor: Colors.background2,
                            borderColor: Colors.grey,
                            borderWidth: 1,
                            borderRadius: 8,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 20,
                            gap: 10,
                        }}>
                            <Feather name="upload" size={40} color={Colors.lightGrey} />
                            <Subtitle style={{ color: Colors.lightGrey }}>Pilih Gambar</Subtitle>
                            <Subtitle style={{ color: Colors.lightGrey, fontSize: 12 }}>JPG/PNG</Subtitle>
                        </View>
                    </Pressable>
                </View>
            </View>

            <View style={{ flex: 1 }}/>

            <View style={{ gap: 10 }}>
                <SmallText style={{ textAlign: "center" }}>Validasi akan memakan waktu kurang dari 24 jam</SmallText>
                <BigButton onPress={() => console.log("validasi")}>Validasi</BigButton>
            </View>
        </View>
    </SafeAreaView>
  );
}
