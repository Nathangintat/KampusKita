import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { Title } from "@/components/Title";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { SearchDosenType } from "../search/types";
import { kampusNameDummy, dosenListDummy } from "./type";
import { DosenListItem } from "./components/DosenListItem";

export default function ListDosenScreen() {
    const local = useLocalSearchParams();

    const [kampusName, setKampusName] = useState<string | null>(null);
    const [listDosen, setListDosen] = useState<SearchDosenType[] | null>(null);

    useEffect(() => {
        // local.kampusId

        setKampusName(kampusNameDummy);
        setListDosen(dosenListDummy);
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
