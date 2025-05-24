import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default {};

interface Props {
    onPress?: (id: number) => void;
    rank: number;
    topText: string;
    bottomText: string;
}

export function ListItem({ onPress, rank, topText, bottomText }: Props) {
    return (
        <View style={styles.container}>
        <Pressable style={styles.pressable}
            onPress={onPress}
            android_ripple={{
                color: "rgba(0,0,0,0.3)",
                borderless: false,
                foreground: false,
            }}
        >
            <Text style={styles.rankText}>{rank}</Text>
            <View>
                <Text style={styles.topText}>{topText}</Text>
                <Text style={styles.bottomText}>{bottomText}</Text>
            </View>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background3,
        borderRadius: 10,
        marginTop: 10,
        overflow: "hidden",
    },
    pressable: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 10,
    },
    rankText: {
        color: Colors.text,
        fontSize: 30,
        fontWeight: "bold",
        marginRight: 16,
    },
    topText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomText: { 
        color: Colors.lightGrey, 
        fontSize: 14 
    },
});
