import { FlatList, View, Text, StyleSheet } from "react-native";
import { ReviewItemHeader } from "@/components/ReviewItemHeader";
import { Colors } from "@/constants/Colors";
import { DosenReviewType } from "../type";

export default {};

interface Props {
    list: DosenReviewType[];
    url: string;
}

export function ReviewDosenList({ list, url }: Props) {
    return (
        <FlatList
            scrollEnabled={false}
            data={list}
            renderItem={({item}) => <ReviewItem item={item} url={url}/>}
            keyExtractor={(item) => `${item.id}`}
        />
    );
}

interface ReviewItemProps {
    item: DosenReviewType;
    url: string;
}

function ReviewItem({ item, url }: ReviewItemProps) {
    return (
        <View style={styles.container}>
            {/* Top Row */}
            <ReviewItemHeader
                like={item.like}
                dislike={item.dislike}
                hasLiked={item.hasLiked}
                hasDisliked={item.hasDisliked}
                date={item.date}
                url={`${url}/${item.id}`}
            />

            {/* Review Content */}
            <View style={styles.reviewContent}>
                <View style={styles.ratingItem}>
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>

                <View style={styles.reviewTextContainer}>
                    <Text style={styles.matkulText}>{item.matkul}</Text>
                    <Text style={styles.reviewText}>{item.content}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background2,
        borderRadius: 8,
        marginBottom: 14,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    reviewContent: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
    },
    ratingItem: {
        display: "flex",
        justifyContent: "center",
    },
    ratingText: {
        color: Colors.text,
        width: 70,
        textAlign: "center",
        paddingRight: 12,
        fontFamily: "Poppins600",
        fontSize: 32,
        lineHeight: 32,
        letterSpacing: 0.5,
    },
    reviewTextContainer: {
        flex: 1,
        marginVertical: 2,
    },
    matkulText: {
        color: Colors.text,
        fontFamily: "Poppins700",
        fontSize: 12,
        letterSpacing: 0.5,
    },
    reviewText: {
        color: Colors.text,
        fontFamily: "Poppins500",
        fontSize: 12,
        letterSpacing: 0.5,
    },
});
