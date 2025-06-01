import { ReactNode } from "react";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";

export function CustomText({ children }: { children: ReactNode }) {
    return (
        <Text style={{ color: Colors.text, fontSize: 18, marginBottom: 5 }}>{children}</Text>
    );
}

export default {};
