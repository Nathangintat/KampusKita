import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

interface Props {
    children: React.ReactNode;
}

export function HeaderWithBackButton({ children }: Props) {
    const router = useRouter();
  return (
        <View style={styles.headerContainer}>
            <Pressable 
                android_ripple={{
                    color: "rgba(0,0,0,0.3)",
                    borderless: true,
                }}
                style={{ padding: 3 }}
                onPress={() => router.back()}
            >
                <Ionicons name="chevron-back-sharp" size={24} color={Colors.text} />
            </Pressable>

            <Text style={styles.headerText}>{ children }</Text>
        </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 12,
        height: 50,
    },
    headerText: {
        flex: 1,
        color: Colors.text,
        fontFamily: "Poppins600",
        fontSize: 20,
        textAlign: "center",
        marginRight: 27,
    },
});
