import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Poppins700: require('../assets/fonts/Poppins-Bold.ttf'),
        Poppins600: require('../assets/fonts/Poppins-SemiBold.ttf'),
        Poppins500: require('../assets/fonts/Poppins-Medium.ttf'),
        Poppins400: require('../assets/fonts/Poppins-Regular.ttf'),
    });

    React.useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);


    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            <Stack screenOptions={{
                contentStyle: { backgroundColor: Colors.background3 },
                headerShown: false,
            }}>
                <Stack.Screen name="(tabs)/login"/>
                <Stack.Screen name="(tabs)/home/index"/>
                <Stack.Screen name="(tabs)/campus/[kampusId]"/>
                <Stack.Screen name="(tabs)/search/[search]"/>
                <Stack.Screen name="(tabs)/dosen/[dosenId]"/>
                <Stack.Screen name="(tabs)/settings"/>
                {/*<Stack.Screen name="+not-found" />*/}
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
