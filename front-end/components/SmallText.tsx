import { Text } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export function SmallText({ children }: Props) {
    return (
        <Text style={{
            color: Colors.text,
            fontSize: 12,
            fontFamily: "Poppins400",
        }}>{children}</Text>
    );
}
