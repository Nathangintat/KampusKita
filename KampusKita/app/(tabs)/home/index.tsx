import { useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView, Text, TextInput, View, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "./components/CustomText";
import { EmphText } from "./components/EmphText";
import { SearchBox } from "./components/SearchBox";
import { ListItem } from "./components/ListItem";
import { 
    TopLecturerItem, 
    TopUniversityItem, 
    topUniversities,
    topLecturers
} from "./types";

export default function HomeScreen() {
    const router = useRouter();

    const [username, setUsername] = useState<string>("Username");
    const [topDosen, setTopDosen] = useState<TopLecturerItem[]>(topLecturers);
    const [topKampus, setTopKampus] = useState<TopUniversityItem[]>(topUniversities);

    const [search, setSearch] = useState<string>("");

    function handlePressDosen(id: number) {
        console.log(`handlePressDosen(${id})`);
        router.navigate("/(tabs)/dosen");
    }

    function handlePressKampus(id: number) {
        console.log(`handlePressKampus(${id})`);
        router.navigate("/(tabs)/campus");
    }

    function handleSearch() {
        if (!search) return;
        console.log(`handleSearch(${search})`);
        router.navigate(`/(tabs)/search/${search}`);
    }

    return (
      <SafeAreaView
        style={{
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

                  {topDosen.map((lecturer, index) => (
                      <ListItem 
                          key={lecturer.dosenId} 
                          onPress={() => handlePressDosen(lecturer.dosenId)}
                          rank={index+1} 
                          topText={lecturer.nama} 
                          bottomText={lecturer.kampus}
                      />
                  ))}
              </View>

              {/* Universitas Terbaik */}
              <View style={styles.rankingContainer}>
                <CustomText><EmphText>Universitas </EmphText>dengan fasilitas terbaik</CustomText>

                {topKampus.map((uni, index) => (
                    <ListItem
                        key={uni.kampusId} 
                        onPress={() => handlePressKampus(uni.kampusId)}
                        rank={index+1} 
                        topText={uni.nama} 
                        bottomText={uni.namaPendek}
                    />
                ))}
              </View>
            </View>
        </ScrollView>
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
