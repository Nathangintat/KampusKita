import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { HeaderWithBackButton } from '@/components/HeaderWithBackButton';

export default function SearchScreen() {
  return (
    <SafeAreaView 
        edges={['top', 'left', 'right']} 
        style={{
            backgroundColor: Colors.background1,
            gap: 20,
            height: "100%",
        }}
    >
        <HeaderWithBackButton>Pencarian</HeaderWithBackButton>
    </SafeAreaView>
  );
}

