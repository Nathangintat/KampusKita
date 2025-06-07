import { StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID });

export default function LoginScreen() {
    const router = useRouter();

    async function signIn() {
        try {
            GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (!isSuccessResponse(response))
                return;

            const token = await GoogleSignin.getTokens();
            const idToken = token.idToken; // Google ID Token (the important one)

            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/auth/login`;
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    google_id_token: idToken,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            // Login failed
            if (!res.ok) return;

            // Login succeed
            const json: { 
                access_token: string,
                username: string,
            } = await res.json();

            await SecureStore.setItemAsync('username', json.username);
            await SecureStore.setItemAsync('jwtToken', json.access_token)
                .then(() => router.navigate("/(tabs)/home"));

        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        console.log("Login already in progress.");
                    break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.log("Play services not available.");
                    break;
                    default:
                        console.log("Some other error.");
                        console.log(error);
                }
            } else {
                console.log("Error not related to google sign-in.");
            }
            console.log(error);
        }
    };

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <Image style={{ width: 250, height: 220, }}
                source={require("@/assets/images/icon.svg")}
            />

            <Pressable 
                style={styles.loginBtn}
                onPress={() => console.log("Login to Google")}
                android_ripple={{
                    color: "rgba(0,0,0,0.3)",
                    borderless: false,
                    foreground: true,
                }}
                onPress={() => signIn()}
            >
                <Image style={{ width: 22, height: 22, }}
                    source={require("@/assets/images/google-icon.svg")}
                />
                <Text style={styles.loginTxt}>Continue with Google</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background1,
        gap: 20,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    loginBtn: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        height: 42,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 35,
    },
    loginTxt: {
        color: Colors.lightGrey2,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: "Poppins500",
    },
});
