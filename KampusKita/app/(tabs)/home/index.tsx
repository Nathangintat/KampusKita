import { useEffect, useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { ScrollView, Text, View, Pressable, Modal, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "./components/CustomText";
import { EmphText } from "./components/EmphText";
import { SearchBox } from "./components/SearchBox";
import { ListItem } from "./components/ListItem";
import { ChangeUsernameModal } from "./components/ChangeUsernameModal";
import { 
    TopDosenFetchType,
    TopDosenType, 
    TopKampusFetchType, 
    TopKampusType, 
} from "./types";


export default function HomeScreen() {
    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [topDosen, setTopDosen] = useState<TopDosenType[]>([]);
    const [topKampus, setTopKampus] = useState<TopKampusType[]>([]);
    const [search, setSearch] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    function handlePressDosen(id: number) {
        console.log(`handlePressDosen(${id})`);
        router.navigate(`/(tabs)/dosen/${id}`);
    }

    function handlePressKampus(id: number) {
        console.log(`handlePressKampus(${id})`);
        router.navigate(`/(tabs)/campus/${id}`);
    }

    function handleSearch() {
        if (search.length < 3) return;

        console.log(`handleSearch(${search})`);
        router.navigate(`/(tabs)/search/${search}`);
        setSearch("");
    }

    const fetchTopDosen = useCallback(async () => {
        try { 
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/dosen/top`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: TopDosenFetchType = await res.json();
            const data: TopDosenType[] = json.data.map(item => {
                return {
                    id: item.dosenId,
                    rank: item.ranking,
                    nama: item.nama,
                    kampus: item.kampus,
                }
            });
            setTopDosen(data);
        } catch (error) {
            console.error(error);
        }
    }, []);


    const fetchTopKampus = useCallback(async () => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/kampus/top/fasilitas`;
            const res = await fetch(url);
            if (!res.ok) return;

            const json: TopKampusFetchType = await res.json();
            const data: TopKampusType[] = json.data.map(item => {
                return {
                    id: item.kampus_id,
                    rank: item.ranking,
                    nama: item.nama,
                    namaPendek: item.nama_singkat,
                };
            });
            setTopKampus(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    async function loadUsername() {
        const uname = await SecureStore.getItemAsync('username');
        if (uname && uname !== "") {
            setUsername(uname);
            return;
        }

        setModalVisible(true);
    }


    // adb reverse tcp:3000 tcp:3000
    // Fetch here
    // Store JWT:
    // https://docs.expo.dev/versions/latest/sdk/securestore/
    useFocusEffect(
        useCallback(() => {
            loadUsername();
            fetchTopDosen();
            fetchTopKampus();
        }, [])
    );

    return (
      <SafeAreaView style={{
          backgroundColor: Colors.background1,
          flex: 1,
          paddingHorizontal: 28,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {/* Header */}
              <View style={styles.headerContainer}>
                <Text style={styles.username}>{username}</Text>
                <Pressable android_ripple={{
                    color: "rgba(0,0,0,0.3)",
                    borderless: true,
                }} onPress={() => router.navigate("/settings")}>
                    <Ionicons name="settings-outline" size={24} color={Colors.text} />
                </Pressable>
              </View>

              {/* Search Title */}
              <Text style={styles.searchTitle}>Cari nama Universitas dan Dosen anda</Text>

              {/* Search Box */}
              <SearchBox
                value={search}
                onChangeText={(text: string) => setSearch(text)}
                onPress={handleSearch}
              />

              {/* Dosen Terbaik */}
              <View style={styles.rankingContainer}>
                  <CustomText><EmphText>Dosen </EmphText>terbaik di bulan ini</CustomText>

                  {topDosen.map((item, index) => (
                      <ListItem 
                          key={index} 
                          onPress={() => handlePressDosen(item.id)}
                          rank={index+1} 
                          topText={item.nama} 
                          bottomText={item.kampus}
                      />
                  ))}
              </View>

              {/* Universitas Terbaik */}
              <View style={styles.rankingContainer}>
                <CustomText><EmphText>Universitas </EmphText>dengan fasilitas terbaik</CustomText>

                {topKampus.map((item, index) => (
                    <ListItem
                        key={index} 
                        onPress={() => handlePressKampus(item.id)}
                        rank={index+1} 
                        topText={item.nama} 
                        bottomText={item.namaPendek}
                    />
                ))}
              </View>
            </View>

        </ScrollView>


        <ChangeUsernameModal 
            visible={modalVisible} 
            title="Username Baru"
            placeholder="Masukkan username baru"
            handleClose={(newUsername: string | undefined) => {
                if (newUsername) setUsername(newUsername);

                setModalVisible(false);
            }} 
        />

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    username: { 
        color: Colors.text, 
        fontSize: 24, 
        fontWeight: "bold" 
    },
    searchTitle: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 500,
        marginTop: 20,
    },
    searchBox: {
        backgroundColor: Colors.background2,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1, 
        borderColor: Colors.grey
    },
    searchTextBox: { 
        flex: 1, 
        color: Colors.text, 
        fontSize: 16 
    },
    rankingContainer: { 
        marginTop: 30, 
        backgroundColor: Colors.background2, 
        paddingHorizontal: 15, 
        paddingVertical: 12, 
        borderRadius: 12 
    },
});
