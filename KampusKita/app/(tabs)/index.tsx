import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  return (
      <SafeAreaView 
          edges={['top', 'left', 'right']} 
          style={{
              backgroundColor: Colors.background1,
              height: "100%",
          }}
      >
          <Text style={{ color: Colors.text }}>Home Screen</Text>
      </SafeAreaView>
  );
}
