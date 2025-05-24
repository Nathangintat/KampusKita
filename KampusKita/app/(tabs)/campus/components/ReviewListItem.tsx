import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ReviewItemHeader } from "@/components/ReviewItemHeader";
import { CategoryRating } from "./CategoryRating";
import { ReviewItem, Categories } from "../type";

export default {};

export function stringToCategory(str: string) {
    switch (str) {
        case "fasilitas": return Categories.Fasilitas;
        case "wifi": return Categories.Wifi;
        case "lokasi": return Categories.Lokasi;
        case "organisasi": return Categories.Organisasi;
        case "worthIt": return Categories.WorthIt;
        default:  return Categories.WorthIt;
    }
}

interface Props {
    item: ReviewItem
}

export function ReviewListItem({ item }: Props) {
    return (
        <View style={styles.container}>
            <ReviewItemHeader
                like={item.like}
                dislike={item.dislike}
                hasLiked={item.hasLiked}
                hasDisliked={item.hasDisliked}
                date={new Date(item.date)}
            />

            <View style={styles.ratingTextView}>
                <Text style={styles.ratingScore}>4.0</Text>
                <Text style={styles.ratingText}>{item.content}</Text>
            </View>

            <View style={styles.ratingList}>
                { Object.entries(item.categoryRatings).map(([subject, score], index) => (
                    <CategoryRating
                    key={index}
                    category={stringToCategory(subject)}
                    rating={score}
                    />
                ))}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background2,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    ratingTextView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
    },
    ratingScore: {
        color: Colors.text,
        fontSize: 30,
        fontWeight: "bold",
        marginRight: 8,
    },
    ratingText: {
        color: Colors.text,
        fontSize: 14,
        flex: 1,
        marginLeft: 8
    },
    ratingList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
        justifyContent: "center",
    },
});
