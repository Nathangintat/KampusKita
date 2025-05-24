import { HeaderWithBackButton } from "@/components/HeaderWithBackButton";
import { ReviewHeader } from "@/components/ReviewHeader";
import { ReviewItemHeader } from "@/components/ReviewItemHeader";
import { Subtitle } from "@/components/Subtitle";
import { Title } from "@/components/Title";
import { TotalRating } from "@/components/TotalRating";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
      icon: <MaterialIcons name="corporate-fare" size={20} color={Colors.text} />,
      value: rating.fasilitas,
    },
    {
      label: "Wifi",
      icon: <MaterialIcons name="wifi" size={20} color={Colors.text} />,
      value: rating.wifi,
    },
    {
      label: "Lokasi",
      icon: <MaterialCommunityIcons name="map-marker-outline" size={20} color={Colors.text} />,
      value: rating.lokasi,
    },
    {
      label: "Organisasi",
      icon: <MaterialCommunityIcons name="account-multiple-outline" size={20} color={Colors.text} />,
      value: rating.organisasi,
    },
    {
      label: "Worth It",
      icon: <MaterialIcons name="work-outline" size={20} color={Colors.text} />,
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 30,
                    fontWeight: "bold",
                    marginRight: 8,
                  }}
                >
                  4.0
                  {/* TODO: Buat fungsi untuk menghitung rata-rata review */}
                </Text>

                <Text
                  style={{
                    color: Colors.text,
                    fontSize: 14,
                    flex: 1,
                    marginLeft: 8
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
                        <MaterialIcons name="corporate-fare" size={20} color={Colors.text} />
                      ) : key === "Wifi" ? (
                        <MaterialIcons name="wifi" size={20} color={Colors.text} />
                      ) : key === "Lokasi" ? (
                        <MaterialCommunityIcons name="map-marker-outline" size={20} color={Colors.text} />
                      ) : key === "Organisasi" ? (
                        <MaterialCommunityIcons name="account-multiple-outline" size={20} color={Colors.text} />
                      ) : key === "Worth It" ? (
                        <MaterialIcons name="work-outline" size={20} color={Colors.text} />
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
