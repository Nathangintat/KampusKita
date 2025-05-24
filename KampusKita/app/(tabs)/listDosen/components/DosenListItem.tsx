import { View, Text } from "react-native";
import { SearchDosenType } from "../../search/types";
import { Colors } from "@/constants/Colors";

export default {};

interface Props {
    item: SearchDosenType;
}

export function DosenListItem({ item }: Props) {
    return (
        <View style={{
            backgroundColor: Colors.background2,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
        }}>
            <View>
                <Text style={{ color: Colors.text, fontSize: 16, fontWeight: "bold" }}>
                {item.nama}
                </Text>
                <Text style={{ color: Colors.text, fontSize: 14 }}>
                Program Studi {item.prodi}
                </Text>
            </View>

            <Text style={{ color: Colors.text, fontSize: 34, fontWeight: 400 }}>
                {item.rating.toFixed(1)}
            </Text>
        </View>

    );
}
