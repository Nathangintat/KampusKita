import { ReactNode } from "react";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";

export function EmphText({ children }: { children: ReactNode }) {
    return (
        <Text style={{ color: Colors.primary, fontWeight: 500 }}>{children}</Text>
    );
}

export default {};
