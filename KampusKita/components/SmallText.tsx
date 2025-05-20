import { Text, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";

interface Props {
    children: React.ReactNode;
    style?: TextStyle;
}

export function SmallText({ children, style }: Props) {
    return (
        <Text style={{
            color: Colors.text,
            fontSize: 12,
            fontFamily: "Poppins400",
            ...style
        }}>{children}</Text>
    );
}
