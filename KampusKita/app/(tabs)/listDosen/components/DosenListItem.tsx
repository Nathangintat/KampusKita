import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { DosenListItemType } from "../type";
import { Colors } from "@/constants/Colors";

export default {};

interface Props {
    item: DosenListItemType;
}

const MAX_NAMA_LENGTH = 30;
const MAX_PRODI_LENGTH = 20;

export function DosenListItem({ item }: Props) {
    const router = useRouter();

    return (
        <View style={{
            backgroundColor: Colors.background2,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 10,
        }}>
            <Pressable style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            android_ripple={{
                color: "rgba(0,0,0,0.1)",
                borderless: true,
                foreground: true,
            }} onPress={() => router.navigate(`/(tabs)/dosen/${item.id}`)}>
                <View>
                    <Text style={{ color: Colors.text, fontSize: 16, fontWeight: "bold" }}>
                    { item.nama.length > MAX_NAMA_LENGTH ? 
                        (item.nama.substring(0, MAX_NAMA_LENGTH-3) + "...")
                            : item.nama
                    }
                    </Text>
                    <Text style={{ color: Colors.text, fontSize: 14 }}>
                    { item.prodi.length > MAX_PRODI_LENGTH ? 
                        ("Program Studi " + item.prodi.substring(0, MAX_PRODI_LENGTH-3) + "...")
                            : "Program Studi " + item.prodi
                    }
                    </Text>
                </View>

                <Text style={{ color: Colors.text, fontSize: 34, fontWeight: 400 }}>
                    {item.rating.toFixed(1)}
                </Text>
            </Pressable>
        </View>

    );
}
