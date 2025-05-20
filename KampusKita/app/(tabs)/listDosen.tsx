import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';
import { Title } from '@/components/Title';

export default function ListDosenScreen() {
  return (
      <SafeAreaView 
          edges={['top', 'left', 'right']} 
          style={{
              backgroundColor: Colors.background1,
              height: "100%",
          }}
      >
        <HeaderWithBackButton>Daftar Dosen</HeaderWithBackButton>

        <ScrollView>
            <View style={{ paddingHorizontal: 28 }}>
                <Title>Institut Teknologi Bandung</Title>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

