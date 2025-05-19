import { useFonts } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import 'react-native-reanimated';
import React, { useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Poppins700: require('../assets/fonts/Poppins-Bold.ttf'),
        Poppins600: require('../assets/fonts/Poppins-SemiBold.ttf'),
        Poppins500: require('../assets/fonts/Poppins-Medium.ttf'),
        Poppins400: require('../assets/fonts/Poppins-Regular.ttf'),
    });

    React.useEffect(() => {
        async function lockOrientationToPortrait() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }

        lockOrientationToPortrait();

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
                contentStyle: { backgroundColor: Colors.background3 }
            }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
