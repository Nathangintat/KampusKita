import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const username = "Username";

const topLecturers = [
  {
    dosenId: 1,
    nama: "Ocean Charlie Gunawan",
    kampus: "Institut Teknologi Bandung",
    ranking: 1,
  },
  {
    dosenId: 2,
    nama: "Rina Maulani",
    kampus: "Universitas Indonesia",
    ranking: 2,
  },
  {
    dosenId: 3,
    nama: "Ahmad Santoso",
    kampus: "Universitas Gadjah Mada",
    ranking: 3,
  },
  {
    dosenId: 4,
    nama: "Tania Wijaya",
    kampus: "Universitas Brawijaya",
    ranking: 4,
  },
  {
    dosenId: 5,
    nama: "Budi Hartono",
    kampus: "Universitas Airlangga",
    ranking: 5,
  },
];

const topUniversities = [
  {
    kampusid: 1,
    nama: "Universitas Tarumanagara",
    namaPendek: "Untar",
    ranking: 1,
  },
  {
    kampusid: 2,
    nama: "Universitas Bina Nusantara",
    namaPendek: "Binus",
    ranking: 2,
  },
  {
    kampusid: 3,
    nama: "Universitas Indonesia",
    namaPendek: "UI",
    ranking: 3,
  },
  {
    kampusid: 4,
    nama: "Universitas Gadjah Mada",
    namaPendek: "UGM",
    ranking: 4,
  },
  {
    kampusid: 5,
    nama: "Institut Teknologi Bandung",
    namaPendek: "ITB",
    ranking: 5,
  },
];

// === Komponen ===
export default function HomeScreen() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        backgroundColor: Colors.background1,
        flex: 1,
        paddingHorizontal: 28,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{ color: Colors.text, fontSize: 24, fontWeight: "bold" }}
          >
            {username}
          </Text>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </View>

        {/* Search Title */}
        <Text
          style={{
            color: Colors.text,
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Cari nama Universitas dan Dosen anda
        </Text>

        {/* Search Box */}
        <View
          style={{
            backgroundColor: Colors.background2,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Universitas atau Dosen"
            placeholderTextColor={Colors.lightGrey}
            style={{ flex: 1, color: Colors.text, fontSize: 16 }}
          />
          <Ionicons name="search" size={20} color={Colors.text} />
        </View>

        {/* Dosen Terbaik */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ color: Colors.text, fontSize: 20 }}>
            <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
              Dosen
            </Text>{" "}
            terbaik dibulan ini
          </Text>

          {topLecturers.map((lecturer, index) => (
            <View
              key={lecturer.dosenId}
              style={{
                backgroundColor: Colors.background2,
                borderRadius: 10,
                padding: 16,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: 16,
                }}
              >
                {index + 1}
              </Text>
              <View>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {lecturer.nama}
                </Text>
                <Text style={{ color: Colors.lightGrey, fontSize: 14 }}>
                  {lecturer.kampus}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Universitas Terbaik */}
        <View style={{ marginTop: 30, marginBottom: 30 }}>
          <Text style={{ color: Colors.text, fontSize: 20 }}>
            <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
              Universitas
            </Text>{" "}
            dengan fasilitas terbaik
          </Text>

          {topUniversities.map((uni, index) => (
            <View
              key={uni.kampusid}
              style={{
                backgroundColor: Colors.background2,
                borderRadius: 10,
                padding: 16,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: 16,
                }}
              >
                {index + 1}
              </Text>
              <View>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {uni.nama}
                </Text>
                <Text style={{ color: Colors.lightGrey, fontSize: 14 }}>
                  {uni.namaPendek}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
