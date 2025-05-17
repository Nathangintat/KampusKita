import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function VerifikasiScreen() {
  return (
    <SafeAreaView>
        <Text style={styles.h1}>Verifikasi Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    h1: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
});
