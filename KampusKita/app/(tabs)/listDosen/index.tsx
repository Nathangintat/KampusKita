import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { Title } from "@/components/Title";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect, useState } from "react";
import { DosenListFetchType, DosenListItemType } from "./type";
import { DosenListItem } from "./components/DosenListItem";

export default function ListDosenScreen() {
    const local = useLocalSearchParams();

    const [kampusName, setKampusName] = useState<string | null>(null);
    const [listDosen, setListDosen] = useState<DosenListItemType[]>([]);

    const fetchListDosen = useCallback(async (kampusId: number) => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/kampus/${kampusId}/dosen`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: DosenListFetchType = await res.json();
            const data: DosenListItemType[] = json.data.map(item => {
                return {
                    id: item.dosenId,
                    nama: item.nama,
                    prodi: item.prodi,
                    rating: item.rating,
                };
            });
            setListDosen(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchListDosen(local.id);
        setKampusName(local.name);
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.background1,
                flex: 1,
            }}
        >
            <HeaderWithBackButton>Daftar Dosen</HeaderWithBackButton>

            { listDosen && kampusName &&
            <ScrollView>
                <View style={{ paddingHorizontal: 28 }}>
                <Title>{kampusName}</Title>
                <Text style={{
                    color: Colors.text,
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: 4,
                    marginBottom: 12,
                }}>
                {listDosen.length} Dosen
                </Text>

                {listDosen.map((item, index) => (
                    <DosenListItem key={index} item={item}/>
                ))}
                </View>
            </ScrollView>
            }
        </SafeAreaView>
    );
}
