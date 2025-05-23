import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { ReviewHeader } from "@/components/ReviewHeader";
import { ReviewItemHeader } from "@/components/ReviewItemHeader";
import { Subtitle } from "@/components/Subtitle";
import { Title } from "@/components/Title";
import { TotalRating } from "@/components/TotalRating";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const kampusData = {
  kampusId: 1,
  name: "Institut Teknologi Bandung",
  akreditasi: "A",
  rating: {
    total: 4.8,
    fasilitas: 4.5,
    wifi: 4.5,
    lokasi: 4.5,
    organisasi: 4.5,
    worthIt: 4.5,
  },
};

const reviewList = [
  {
    reviewId: 1,
    date: new Date("2025-05-05"),
    content:
      "It's more fun and less nerdy than you think. You'll find people like you. It definitely is hard though, no matter who you are.",
    like: 7,
    dislike: 1,
    hasLiked: true,
    hasDisiked: false,
    categoryRatings: {
      Fasilitas: 4.5,
      Wifi: 4.5,
      Lokasi: 4.5,
      Organisasi: 4.5,
      "Worth It": 4.5,
    },
  },
  {
    reviewId: 1,
    date: new Date("2025-05-05"),
    content:
      "It's more fun and less nerdy than you think. You'll find people like you. It definitely is hard though, no matter who you are.",
    like: 7,
    dislike: 1,
    hasLiked: true,
    hasDisiked: false,
    categoryRatings: {
      Fasilitas: 4.5,
      Wifi: 4.5,
      Lokasi: 4.5,
      Organisasi: 4.5,
      "Worth It": 4.5,
    },
  },
];

export default function CampusScreen() {
  const { name, rating } = kampusData;

  const ratingCategories = [
    {
      label: "Fasilitas",
      icon: <FontAwesome5 name="building" size={16} color="white" />,
      value: rating.fasilitas,
    },
    {
      label: "Wifi",
      icon: <Ionicons name="wifi" size={16} color="white" />,
      value: rating.wifi,
    },
    {
      label: "Lokasi",
      icon: <Ionicons name="location" size={16} color="white" />,
      value: rating.lokasi,
    },
    {
      label: "Organisasi",
      icon: <Ionicons name="people" size={16} color="white" />,
      value: rating.organisasi,
    },
    {
      label: "Worth It",
      icon: <MaterialIcons name="work" size={16} color="white" />,
      value: rating.worthIt,
    },
  ];

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ backgroundColor: Colors.background1, flex: 1 }}
    >
      <HeaderWithBackButton>Perguruan Tinggi</HeaderWithBackButton>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 28, gap: 5 }}>
          <Title>{name}</Title>
          <Subtitle>Bandung, Jawa Barat</Subtitle>
          <Text
            style={{
              color: Colors.primary,
              textDecorationLine: "underline",
              fontWeight: "500",
              marginTop: 4,
            }}
          >
            Liat semua dosen (80)
          </Text>

          <TotalRating>{rating.total}</TotalRating>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {ratingCategories.map((item, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: Colors.background2,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  margin: 5,
                }}
              >
                {item.icon}
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 14,
                    marginLeft: 6,
                    marginRight: 4,
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ color: Colors.text, fontWeight: "bold" }}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <ReviewHeader
            count={reviewList.length}
            onPress={() => console.log("Tulis Ulasan")}
          />

          {reviewList.map((review, index) => (
            <View
              key={index}
              style={{
                backgroundColor: Colors.background2,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <ReviewItemHeader
                like={review.like}
                dislike={review.dislike}
                hasLiked={review.hasLiked}
                hasDisliked={review.hasDisiked}
                date={new Date(review.date)}
              />

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 24,
                    fontWeight: "bold",
                    margin: 8,
                  }}
                >
                  4.5
                  {/* TODO: Buat fungsi untuk menhitung rata rata review */}
                </Text>

                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 14,
                    marginTop: 8,
                    marginLeft: 8,
                  }}
                >
                  {review.content}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 12,
                  justifyContent: "center",
                }}
              >
                {Object.entries(review.categoryRatings).map(
                  ([key, value], idx) => {
                    const icon =
                      key === "Fasilitas" ? (
                        <FontAwesome5 name="building" size={16} color="white" />
                      ) : key === "Wifi" ? (
                        <Ionicons name="wifi" size={16} color="white" />
                      ) : key === "Lokasi" ? (
                        <Ionicons name="location" size={16} color="white" />
                      ) : key === "Organisasi" ? (
                        <Ionicons name="people" size={16} color="white" />
                      ) : key === "Worth It" ? (
                        <MaterialIcons name="work" size={16} color="white" />
                      ) : null;

                    return (
                      <View
                        key={idx}
                        style={{
                          borderRadius: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                        }}
                      >
                        {icon}
                        <Text
                          style={{
                            color: Colors.text,
                            fontSize: 14,
                            marginLeft: 6,
                            marginRight: 4,
                          }}
                        >
                          {key}
                        </Text>
                        <Text
                          style={{ color: Colors.text, fontWeight: "bold" }}
                        >
                          {value}
                        </Text>
                      </View>
                    );
                  }
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
