import { TextInput, TextStyle } from "react-native";
import { Subtitle } from "./Subtitle";
import { Colors } from "@/constants/Colors";

interface Props {
    title: string;
    placeholder: string;
    style?: TextStyle;
    multiline?: boolean;
}

export function CustomTextInput({ title, placeholder, style, multiline }: Props) {
    return (
        <>
            <Subtitle>{title}</Subtitle>
            <TextInput
            style={{
                backgroundColor: Colors.background2,
                borderColor: Colors.grey,
                borderWidth: 1,
                borderRadius: 8,
                color: Colors.text,
                paddingVertical: 12,
                paddingHorizontal: 16,
                fontSize: 14,
                minHeight: (multiline ? 80 : 0),
                justifyContent: "flex-start",
                ...style,
            }}
            placeholderTextColor={Colors.lightGrey}
            placeholder={placeholder}
            multiline={multiline}
            textAlignVertical="top"
            />
        </>
    );
}
