import { FlatList, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors";
import { useState } from "react";

export interface ReviewDosenItem {
    reviewId: number;
    date: Date;
    content: string;
    matkul: string;
    like: number;
    dislike: number;
    hasLiked: boolean;
    hasDisliked: boolean;
    rating: number;
}

interface Props {
    list: ReviewDosenItem[];
}

export function ReviewDosenList({ list }: Props) {
    return (
        <FlatList
            scrollEnabled={false}
            data={list}
            renderItem={({item}) => <ReviewItem item={item}/>}
            keyExtractor={(item) => `${item.reviewId}`}
        />
    );
}

function monthNumToText(num: number): string {
    switch (num) {
        case 1:     return "Januari";
        case 2:     return "Februari";
        case 3:     return "Maret";
        case 4:     return "April";
        case 5:     return "Mei";
        case 6:     return "Juni";
        case 7:     return "Juli";
        case 8:     return "Agustus";
        case 9:     return "September";
        case 10:    return "Oktober";
        case 11:    return "November";
        case 12:    return "Desember";
        default:    return "???";
    }
}

interface ReviewItemProps {
    item: ReviewDosenItem
}

function ReviewItem({ item }: ReviewItemProps) {
    const [data, setData] = useState<ReviewDosenItem>(item);

    function handleLike() {
        setData(prev => {
            return {
                ...prev,
                like: prev.hasLiked ? (prev.like-1) : (prev.like+1),
                dislike: prev.hasDisliked ? (prev.dislike-1) : (prev.dislike),
                hasLiked: !prev.hasLiked,
                hasDisliked: false,
            }
        });
    }

    function handleDislike() {
        setData(prev => {
            return {
                ...prev,
                dislike: prev.hasDisliked ? (prev.dislike-1) : (prev.dislike+1),
                like: prev.hasLiked ? (prev.like-1) : (prev.like),
                hasDisliked: !prev.hasDisliked,
                hasLiked: false,
            }
        });
    }

    return (
        <View style={styles.container}>
            {/* Top Row */}
            <View style={styles.topRow}>
                <Text style={styles.topRowText1}>Berguna?</Text>

                {/* Like & Dislike */}
                <View style={styles.likeDislike}>
                    <Pressable onPress={handleLike}>
                        <View style={styles.likeDislikeItem}>
                            <MaterialIcons name="thumb-up-off-alt" size={20} color={data.hasLiked ? Colors.success : Colors.text} />
                            <Text style={styles.likeDislikeText}>{data.like}</Text>
                        </View>
                    </Pressable>

                    <Pressable onPress={handleDislike}>
                        <View style={styles.likeDislikeItem}>
                            <MaterialIcons name="thumb-down-off-alt" size={20} color={data.hasDisliked ? Colors.error : Colors.text} />
                            <Text style={styles.likeDislikeText}>{data.dislike}</Text>
                        </View>
                    </Pressable>
                </View>

                {/* Date */}
                <Text style={styles.dateText}>
                    {data.date.getDay()} {monthNumToText(data.date.getMonth())}, {data.date.getFullYear()}
                </Text>
            </View>


            {/* Review Content */}
            <View style={styles.reviewContent}>
                <View style={styles.ratingItem}>
                    <Text style={styles.ratingText}>{data.rating}</Text>
                </View>

                <View style={styles.reviewTextContainer}>
                    <Text style={styles.matkulText}>{data.matkul}</Text>
                    <Text style={styles.reviewText}>{data.content}</Text>
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
    topRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    topRowText1: {
        color: Colors.text,
        fontFamily: "Poppins500",
        fontSize: 12,
        letterSpacing: 0.5,
        width: 70,
    },
    likeDislike: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    likeDislikeItem: {
        display: "flex",
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
    },
    likeDislikeText: {
        fontSize: 12,
        color: Colors.text,
    },
    dateText: {
        color: Colors.text,
        flex: 1,
        textAlign: "right",
        fontFamily: "Poppins500",
        fontSize: 12,
        letterSpacing: 0.5,
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
