import { Text } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export function Title({ children }: Props) {
    return (
        <Text style={{
            color: Colors.text,
            fontSize: 30,
            fontFamily: "Poppins700",
            lineHeight: 40,
        }}>
            {children}
        </Text>
    );
}
