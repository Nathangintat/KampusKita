import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy
const lecturers = [
  {
    dosenId: 1,
    nama: "Ocean Charlie Gunawan",
    kampus: "Institut Teknologi Bandung",
    fakultas: "Fakultas Teknologi Informasi",
    rating: 4.5,
  },
  {
    dosenId: 2,
    nama: "Dosen Kedua",
    kampus: "Universitas Indonesia",
    fakultas: "Fakultas Ilmu Komputer",
    rating: 4.2,
  },
  {
    dosenId: 3,
    nama: "Dosen Ketiga",
    kampus: "Universitas Gadjah Mada",
    fakultas: "Fakultas Teknik",
    rating: 4.1,
  },
];

const universities = [
  {
    kampusId: 1,
    nama: "Universitas Tarumanagara",
    namaPendek: "Untar",
    rating: 4.3,
  },
  {
    kampusId: 2,
    nama: "Institut Teknologi Bandung",
    namaPendek: "ITB",
    rating: 4.2,
  },
  {
    kampusId: 3,
    nama: "Universitas Indonesia",
    namaPendek: "UI",
    rating: 4.1,
  },
];

export default function SearchScreen() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        backgroundColor: Colors.background1,
        height: "100%",
      }}
    >
      <HeaderWithBackButton>Pencarian</HeaderWithBackButton>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 28 }}
      >
        {/* Search Input */}
        <View
          style={{
            backgroundColor: Colors.background2,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Universitas atau Dosen"
            placeholderTextColor={Colors.lightGrey}
            style={{ flex: 1, color: Colors.text, fontSize: 16, fontWeight: 400 }}
          />
          <Ionicons name="search" size={20} color={Colors.text} />
        </View>
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
    </SafeAreaView>
  );
}
