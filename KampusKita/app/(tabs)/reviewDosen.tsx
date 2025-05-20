import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { RatingBar } from '@/components/RatingBar';
import { Subtitle } from '@/components/Subtitle';
import { CustomTextInput } from '@/components/CustomTextInput';
import { SmallText } from '@/components/SmallText';
import { BigButton } from '@/components/BigButton';

export default function ReviewDosenScreen() {
    const [rating, setRating] = useState<number>(0);

  return (
    <SafeAreaView 
        edges={['top', 'left', 'right']} 
        style={{
            backgroundColor: Colors.background1,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Ulasan Dosen</HeaderWithBackButton>

        <ScrollView>
            <View style={{ paddingHorizontal: 28, gap: 12 }}>
                <Title>Ocean Charlie Gunawan</Title>

                <RatingBar rating={rating} setRating={setRating}>
                    <MaterialIcons name="star-outline" size={24} color={Colors.text} />
                    <Subtitle>Rating</Subtitle>
                </RatingBar>

                <View style={{ marginBottom: 70, gap: 5 }}>
                    <CustomTextInput title="Mata Kuliah" placeholder="Mata kuliah yang diajarkan" />
                    <CustomTextInput title="Ulasan" placeholder="Berikan ulasan anda" multiline/>
                </View>

                <View style={{ gap: 10, marginBottom: 30 }}>
                    <SmallText>Ulasan bersifat anonim dan tidak dapat diedit setelah dikirim.</SmallText>
                    <BigButton onPress={() => console.log("kirim ulasan")}>Kirim Ulasan</BigButton>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
