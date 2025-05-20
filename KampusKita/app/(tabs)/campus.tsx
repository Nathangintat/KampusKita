import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';
import { Subtitle } from '@/components/Subtitle';
import { TotalRating } from '@/components/TotalRating';
import { ReviewHeader } from '@/components/ReviewHeader';

export default function CampusScreen() {
  return (
      <SafeAreaView 
          edges={['top', 'left', 'right']} 
          style={{
              backgroundColor: Colors.background1,
              height: "100%",
          }}
      >
        <HeaderWithBackButton>Perguruan Tinggi</HeaderWithBackButton>

        <ScrollView>
            <View style={{ paddingHorizontal: 28 }}>
                <View>
                    <Title>Institut Teknologi Bandung</Title>
                    <Subtitle>ITB</Subtitle>
                    <Subtitle style={{
                        color: Colors.primary,
                        textDecorationLine: "underline"
                    }}>Lihat semua dosen (80)</Subtitle>
                </View>

                <TotalRating>5.0</TotalRating>
                <ReviewHeader 
                count={20} 
                onPress={() => console.log("Tulis Ulasan")}
                />
            </View>
        </ScrollView>


        </SafeAreaView>
  );
}
