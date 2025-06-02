import { useEffect, useRef, useState, useCallback } from "react";
import { ScrollView, Text, FlatList, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import PagerView from "react-native-pager-view";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { SearchBox } from "../home/components/SearchBox";
import { Colors } from "@/constants/Colors";
import { 
    SearchDosenFetchType,
    SearchDosenType,
    SearchKampusFetchType,
    SearchKampusType,
} from "./types";

export default function SearchScreen() {
    const local = useLocalSearchParams();
    const router = useRouter();

    const pagerRef = useRef<PagerView>(null);

    const [dosen, setDosen] = useState<SearchDosenType[]>([]);
    const [kampus, setKampus] = useState<SearchKampusType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [selectedPage, setSelectedPage] = useState<number>(0);

    function handleChangePage(index: number) {
        if (pagerRef.current) {
            pagerRef.current.setPage(index);
        }
    }

    function handleSearch() {
        console.log(`handleSearch(${search})`);

        fetchSearchDosen(search);
        fetchSearchKampus(search);
    }

    const fetchSearchDosen = useCallback(async (keyword: string) => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/dosen/search?q=${keyword}`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: SearchDosenFetchType = await res.json();
            const data: SearchDosenType[] = json.data.map(item => {
                return {
                    id: item.dosenId,
                    nama: item.nama,
                    kampus: item.kampus,
                    prodi: item.prodi,
                    rating: item.rating,
                };
            });
            setDosen(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchSearchKampus = useCallback(async (keyword: string) => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/kampus/search?q=${keyword}`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: SearchKampusFetchType[] = await res.json();
            const data: SearchKampusType[] = json.data.map(item => {
                return {
                    id: item.kampusId,
                    nama: item.nama,
                    namaPendek: item.nama_singkat,
                    rating: item.rating,
                }
            });
            setKampus(data);
        } catch (error) {
            console.error(error);
        }
    }, []);




    useEffect(() => {
        setSearch(local.search);

        fetchSearchDosen(local.search);
        fetchSearchKampus(local.search);
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.background1,
                height: "100%",
            }}
        >
            <HeaderWithBackButton>Pencarian</HeaderWithBackButton>

            {/* Search Input */}
            <SearchBox
                style={{ marginHorizontal: 28 }}
                value={search}
                onChangeText={(text: string) => setSearch(text)}
                onPress={handleSearch}
            />

            <PagerView style={{ flex: 1 }} 
                initialPage={selectedPage}
                ref={pagerRef}
                onPageSelected={(e) => {
                    setSelectedPage(e.nativeEvent.position);
                }}
            >
                {/* Dosen Ditemukan */}
                <ScrollView showsVerticalScrollIndicator={false} key="1" style={{
                    marginHorizontal: 28,
                }}>
                    <Text style={styles.subtitle}>{dosen.length} Dosen Ditemukan</Text>
                    <FlatList
                        scrollEnabled={false}
                        data={dosen}
                        style={{ marginBottom: 20 }}
                        renderItem={({item, index}) => (
                            <View key={index} style={styles.viewContainer}>
                                <Pressable style={styles.container} android_ripple={{
                                    color: "rgba(0,0,0,0.3)",
                                    borderless: false,
                                }} onPress={() => router.navigate(`/(tabs)/dosen/${item.id}`)}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.topText}>{item.nama}</Text>
                                        <Text style={styles.midText}>{item.kampus}</Text>
                                        <Text style={styles.bottomText}>Program Studi {item.prodi}</Text>
                                    </View>
                                    <Text style={styles.rating}>{item.rating}</Text>
                                    <View style={{ height: 40 }}/>
                                </Pressable>
                            </View>
                        )}
                        keyExtractor={(item) => `${item.id}`}
                    />
                </ScrollView>

                <ScrollView showsVerticalScrollIndicator={false} key="2" style={{
                    marginHorizontal: 28,
                }}>
                    {/* Universitas Ditemukan */}
                    <Text style={styles.subtitle}>{kampus.length} Universitas Ditemukan</Text>
                    <FlatList
                        scrollEnabled={false}
                        data={kampus}
                        style={{ marginBottom: 20 }}
                        renderItem={({item, index}) => (
                            <View key={index} style={styles.viewContainer}>
                                <Pressable style={styles.container} android_ripple={{
                                    color: "rgba(0,0,0,0.3)",
                                    borderless: false,
                                }} onPress={() => router.navigate(`/(tabs)/campus/${item.id}`)}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.topText}>{item.nama}</Text>
                                        <Text style={styles.bottomText}>{item.namaPendek}</Text>
                                    </View>
                                    <Text style={styles.rating}>{item.rating}</Text>
                                    <View style={{ height: 40 }}/>
                                </Pressable>
                            </View>
                        )}
                        keyExtractor={(item) => `${item.id}`}
                    />
                </ScrollView>
            </PagerView>


            <View style={{
                flexDirection: "row",
                height: 40,
                gap: 10,
            }}>
                <Pressable style={{ flex: 1 }} onPress={() => handleChangePage(0)}>
                <View style={{ 
                    ...styles.bottomTabItem,
                    backgroundColor: (selectedPage === 0) ? Colors.background2 : Colors.background1,
                }}>
                    <MaterialIcons 
                        name={selectedPage === 0 ? "person" : "person-outline"} 
                        color={selectedPage === 0 ? Colors.primary : Colors.text} 
                        size={24} 
                    />
                    <Text style={{
                        ...styles.bottomTabText,
                        color: (selectedPage === 0) ? Colors.primary : Colors.text,
                        fontWeight: (selectedPage === 0) ? 600 : 400,
                    }}>Dosen</Text>
                </View>
                </Pressable>

                <Pressable style={{ flex: 1 }} onPress={() => handleChangePage(1)}>
                <View style={{ 
                    ...styles.bottomTabItem,
                    backgroundColor: (selectedPage === 1) ? Colors.background2 : Colors.background1,
                }}>
                    <MaterialIcons 
                        name={selectedPage === 1 ? "work" : "work-outline"} 
                        color={selectedPage === 1 ? Colors.primary : Colors.text} 
                        size={24}
                    />
                    <Text style={{
                        ...styles.bottomTabText,
                        color: (selectedPage === 1) ? Colors.primary : Colors.text,
                        fontWeight: (selectedPage === 1) ? 600 : 400,
                    }}>Kampus</Text>
                </View>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 500,
        marginTop: 24,
    },
    viewContainer: {
        borderRadius: 12,
        marginTop: 10,
        overflow: "hidden",
    },
    container: {
        backgroundColor: Colors.background2,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        padding: 16,
    },
    topText: { 
        color: Colors.text, 
        fontWeight: "bold", 
        fontSize: 16 
    },
    midText: { 
        color: Colors.text, 
        fontSize: 14 
    },
    bottomText: { 
        color: Colors.text, 
        fontSize: 14 
    },
    rating: { 
        color: Colors.text, 
        fontSize: 33,
        fontWeight: 500,
    },
    bottomTabItem: { 
        justifyContent: "center", 
        alignItems: "center",
        marginHorizontal: 50,
        borderRadius: 100,
        padding: 10,
        flex: 1, 
    },
    bottomTabText: {
        fontSize: 14,
        textAlign: "center",
    }
});
