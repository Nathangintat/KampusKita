import React from "react";
import { Pressable, Text } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
    children: React.ReactNode;
    onPress: () => void;
}

export function BigButton({ children, onPress }: Props) {
    return (
        <Pressable 
            style={{
                backgroundColor: Colors.primary,
                borderRadius: 8,
                height: 42,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={onPress}
            android_ripple={{
                color: "rgba(0,0,0,0.3)",
                borderless: false,
            }}
        >
            <Text style={{
                color: Colors.text,
                fontSize: 18,
                letterSpacing: 0.5,
                lineHeight: 20,
                fontFamily: "Poppins600",
            }}>{children}</Text>
        </Pressable>
    );
}
