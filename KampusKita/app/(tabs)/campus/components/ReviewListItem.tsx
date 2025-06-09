import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ReviewItemHeader } from "@/components/ReviewItemHeader";
import { CategoryRating } from "./CategoryRating";
import { KampusReviewType, Categories } from "../type";

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
    item: KampusReviewType;
    url: string;
}

export function ReviewListItem({ item, url }: Props) {
    return (
        <View style={styles.container}>
            <ReviewItemHeader
                like={item.like}
                dislike={item.dislike}
                hasLiked={item.hasLiked}
                hasDisliked={item.hasDisliked}
                date={new Date(item.date)}
                url={`${url}/${item.id}`}
            />

            <View style={styles.ratingTextView}>
                <Text style={styles.ratingScore}>
                { (Object.entries(item.categoryRatings).reduce((sum, [_, score]) => {
                    return sum + score;
                }, 0) / 5).toFixed(1) }</Text>
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
