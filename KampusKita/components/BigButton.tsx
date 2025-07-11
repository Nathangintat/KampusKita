import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
    style?: ViewStyle;
    children: React.ReactNode;
    disabled?: boolean;
    onPress: () => void;
}

export function BigButton({ style, children, onPress, disabled }: Props) {
    return (
        <Pressable 
            style={{
                backgroundColor: disabled ? Colors.grey : Colors.primary,
                borderRadius: 8,
                height: 42,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...style,
            }}
            onPress={disabled ? undefined : onPress}
            android_ripple={disabled ? undefined : {
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
