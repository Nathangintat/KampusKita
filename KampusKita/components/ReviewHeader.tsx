import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
    count: number;
    onPress: () => void;
}

export function ReviewHeader({ count, onPress }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.ulasan}>{count} Ulasan</Text>

            <Pressable 
                android_ripple={{
                    color: "rgba(0,0,0,0.3)",
                    borderless: false,
                }}
                style={styles.button}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>Tulis Ulasan</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    ulasan: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: "Poppins600",
        lineHeight: 15,
    },
    button: { 
        backgroundColor: Colors.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        height: 30,
    },
    buttonText: {
        color: Colors.text,
        fontSize: 14,
        fontFamily: "Poppins600",
        lineHeight: 10,
    },
});
