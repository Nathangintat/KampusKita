import { useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { SearchBox } from "../home/components/SearchBox";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { 
    LecturerItem, 
    UniversityItem,
    lecturers,  
    universities,
} from "./types";

export default function SearchScreen() {
    const local = useLocalSearchParams();
    const [dosen, setDosen] = useState<LecturerItem[]>(lecturers);
    const [kampus, setKampus] = useState<UniversityItem[]>(universities);

    const [search, setSearch] = useState<string>(local.search);

    function handleSearch() {
        console.log(`handleSearch(${search})`);
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.background1,
                height: "100%",
            }}
        >
            <HeaderWithBackButton>Pencarian</HeaderWithBackButton>

            <View style={{
                marginHorizontal: 28,
            }}>
                {/* Search Input */}
                <SearchBox
                    value={search}
                    onChangeText={(text: string) => setSearch(text)}
                    onPress={handleSearch}
                />

                <ScrollView showsVerticalScrollIndicator={false}>

                {/* Dosen Ditemukan */}
                <Text
                style={{
                    color: Colors.text,
                    fontSize: 18,
                    fontWeight: 500,
                    marginTop: 24,
                }}
                >
                {lecturers.length} Dosen Ditemukan
                </Text>
                {lecturers.map((lecturer, index) => (
                    <View
                    key={index}
                    style={{
                        backgroundColor: Colors.background2,
                        borderRadius: 12,
                        padding: 16,
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                    <View style={{ flex: 1 }}>
                    <Text
                    style={{ color: Colors.text, fontWeight: "bold", fontSize: 16 }}
                    >
                    {lecturer.nama}
                    </Text>
                    <Text style={{ color: Colors.text, fontSize: 14 }}>
                    {lecturer.kampus}
                    </Text>
                    <Text style={{ color: Colors.text, fontSize: 14 }}>
                    {lecturer.fakultas}
                    </Text>
                    </View>
                    <Text
                    style={{ color: Colors.text, fontSize: 30 }}
                    >
                    {lecturer.rating}
                    </Text>
                    </View>
                ))}
                {/* Universitas Ditemukan */}
                <Text
                style={{
                    color: Colors.text,
                    fontSize: 18,
                    fontWeight: "600",
                    marginTop: 24,
                }}
                >
                {universities.length} Universitas Ditemukan
                </Text>
                {universities.map((uni, index) => (
                    <View
                    key={index}
                    style={{
                        backgroundColor: Colors.background2,
                        borderRadius: 12,
                        padding: 16,
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                    <View style={{ flex: 1 }}>
                    <Text
                    style={{ color: Colors.text, fontWeight: "bold", fontSize: 16 }}
                    >
                    {uni.nama}
                    </Text>
                    <Text style={{ color: Colors.text, fontSize: 14 }}>
                    {uni.namaPendek}
                    </Text>
                    </View>
                    <Text
                    style={{ color: Colors.text, fontSize: 30 }}
                    >
                    {uni.rating}
                    </Text>
                    </View>
                ))}
                <View style={{ height: 40 }} /> {/* spacing bottom */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});
