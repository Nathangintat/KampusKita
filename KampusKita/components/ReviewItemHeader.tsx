import { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors";

interface Props {
    like: number;
    dislike: number;
    hasLiked: boolean;
    hasDisliked: boolean;
    date: Date;
    url: string;
}

export function ReviewItemHeader(props: Props) {
    const [data, setData] = useState(props);

    async function handleLike() {
        setData(prev => {
            return {
                ...prev,
                like: prev.hasLiked ? (prev.like-1) : (prev.like+1),
                dislike: prev.hasDisliked ? (prev.dislike-1) : (prev.dislike),
                hasLiked: !prev.hasLiked,
                hasDisliked: false,
            }
        });
        
        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${props.url}/like`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${jwt}`,
                    "content-type": "application/json",
                }
            });
            if (!res.ok) return;

            const json = await res.json();
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDislike() {
        setData(prev => {
            return {
                ...prev,
                dislike: prev.hasDisliked ? (prev.dislike-1) : (prev.dislike+1),
                like: prev.hasLiked ? (prev.like-1) : (prev.like),
                hasDisliked: !prev.hasDisliked,
                hasLiked: false,
            }
        });
        
        try {
            const jwt = await SecureStore.getItemAsync('jwtToken');
            const url = `${props.url}/dislike`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${jwt}`,
                    "content-type": "application/json",
                }
            });
            if (!res.ok) return;

            const json = await res.json();
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.topRow}>
            <Text style={styles.topRowText}>Berguna?</Text>

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

const styles = StyleSheet.create({
    topRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    topRowText: {
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
});
