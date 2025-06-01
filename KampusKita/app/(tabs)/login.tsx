import { StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';

export default function LoginScreen() {
  return (
    <SafeAreaView 
        edges={['top', 'left', 'right']} 
        style={{
            backgroundColor: Colors.background1,
            gap: 20,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Image 
            style={{
                width: 250,
                height: 220,
            }}
            source={require("@/assets/images/icon.svg")}
        />

        <Pressable 
            style={{
                backgroundColor: Colors.white,
                borderRadius: 8,
                height: 42,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 35,
            }}
            onPress={() => console.log("Login to Google")}
            android_ripple={{
                color: "rgba(0,0,0,0.3)",
                borderless: false,
                foreground: true,
            }}
        >
            <Image 
                style={{
                    width: 22,
                    height: 22,
                }}
                source={require("@/assets/images/google-icon.svg")}
            />
            <Text style={{
                color: Colors.lightGrey2,
                fontSize: 16,
                lineHeight: 20,
                fontFamily: "Poppins500",
            }}>Continue with Google</Text>
        </Pressable>

    </SafeAreaView>
  );
}
