import { View, TextInput, Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default {};

interface Props {
    style?: ViewStyle;
    placeholder?: string;
    onPress: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

export function SearchBox({ style, placeholder, onPress, value, onChangeText }: Props) {
    return (
        <View style={{...styles.searchBox, ...style}}>
            <TextInput
                placeholder={placeholder ? placeholder : "Universitas atau Dosen"}
                placeholderTextColor={Colors.lightGrey}
                style={styles.searchTextBox}
                value={value}
                onChangeText={onChangeText}
            />

            <Pressable style={{ padding: 3 }} android_ripple={{
                color: "rgba(0,0,0,0.3)",
                borderless: true,
                foreground: true,
            }} onPress={onPress}>
                <Ionicons name="search" size={20} color={Colors.text} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        backgroundColor: Colors.background2,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1, 
        borderColor: Colors.grey,
    },
    searchTextBox: { 
        flex: 1, 
        color: Colors.text, 
        fontSize: 16 
    },
});
