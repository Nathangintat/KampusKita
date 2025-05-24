import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { Title } from "@/components/Title";
import { Colors } from "@/constants/Colors";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const kampusName = "Institut Teknologi Bandung";

const dosenList = [
  {
    dosenId: 1,
    nama: "Ocean Charlie Gunawan",
    fakultas: "Fakultas Teknologi Informasi",
    rating: 4.5,
  },
  {
    dosenId: 2,
    nama: "Ocean Charlie Gunawan",
    fakultas: "Fakultas Teknologi Informasi",
    rating: 4.5,
  },
  {
    dosenId: 3,
    nama: "Ocean Charlie Gunawan",
    fakultas: "Fakultas Teknologi Informasi",
    rating: 4.5,
  },
  {
    dosenId: 4,
    nama: "Ocean Charlie Gunawan",
    fakultas: "Fakultas Teknologi Informasi",
    rating: 4.5,
  },
];

export default function ListDosenScreen() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        backgroundColor: Colors.background1,
        flex: 1,
      }}
    >
      <HeaderWithBackButton>Daftar Dosen</HeaderWithBackButton>

      <ScrollView>
        <View style={{ paddingHorizontal: 28 }}>
          <Title>{kampusName}</Title>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 4,
              marginBottom: 12,
            }}
          >
            {dosenList.length} Dosen
          </Text>

          {dosenList.map((dosen, index) => (
            <View
              key={index}
              style={{
                backgroundColor: Colors.background2,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 16,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View>
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  {dosen.nama}
                </Text>
                <Text style={{ color: "#A0A0A0", fontSize: 14 }}>
                  {dosen.fakultas}
                </Text>
              </View>
              <Text
                style={{ color: "white", fontSize: 34, fontWeight: 400 }}
              >
                {dosen.rating.toFixed(1)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
