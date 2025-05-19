import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export function TotalRating({ children }: Props) {
    return (
        <View style={{
            display: "flex",
            alignItems: "center",
            marginVertical: 20,
        }}>
            <Text style={{
                color: Colors.text,
                fontSize: 88,
                fontFamily: "Poppins600",
                lineHeight: 72,
            }}>
                {children}
            </Text>
            <Text style={{
                color: Colors.text,
                fontSize: 17,
                fontFamily: "Poppins600",
            }}>
            Total Rating
            </Text>
        </View>
    );
}
