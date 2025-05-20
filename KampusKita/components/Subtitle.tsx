import { Text, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";

interface Props {
    children: React.ReactNode;
    style?: TextStyle;
}

export function Subtitle({ children, style }: Props) {
    return (
        <Text style={{
            color: Colors.text,
            fontSize: 16,
            lineHeight: 22,
            fontFamily: "Poppins500",
            ...style
        }}>
            {children}
        </Text>

    );
}
