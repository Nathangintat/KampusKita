import { View, Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Dispatch, SetStateAction } from "react";

interface Props {
    children: React.ReactNode;
    rating: number;
    setRating: Dispatch<SetStateAction<number>>;
}

export function RatingBar({ children, rating, setRating }: Props) {
    return (
        <View>
            <View style={{ flexDirection: "row", gap: 3, marginBottom: 3 }}>
                {children}
            </View>

            <View style={styles.barContainer}>
                <View style={{ 
                    ...styles.ratingBar, 
                    backgroundColor: (rating >= 1) ? Colors.primary : Colors.background1, 
                    borderTopLeftRadius: 100, 
                    borderBottomLeftRadius: 100 
                }}>
                    <Pressable android_ripple={styles.barRipple} style={{ flex: 1 }} onPress={() => setRating(1)}/>
                </View>

                <View style={{ 
                    ...styles.ratingBar, 
                    backgroundColor: (rating >= 2) ? Colors.primary : Colors.background1, 
                }}>
                    <Pressable android_ripple={styles.barRipple} style={{ flex: 1 }} onPress={() => setRating(2)}/>
                </View>

                <View style={{ 
                    ...styles.ratingBar, 
                    backgroundColor: (rating >= 3) ? Colors.primary : Colors.background1, 
                }}>
                    <Pressable android_ripple={styles.barRipple} style={{ flex: 1 }} onPress={() => setRating(3)}/>
                </View>

                <View style={{ 
                    ...styles.ratingBar, 
                    backgroundColor: (rating >= 4) ? Colors.primary : Colors.background1, 
                }}>
                    <Pressable android_ripple={styles.barRipple} style={{ flex: 1 }} onPress={() => setRating(4)}/>
                </View>

                <View style={{ 
                    ...styles.ratingBar, 
                    backgroundColor: (rating >= 5) ? Colors.primary : Colors.background1, 
                    borderTopRightRadius: 100, 
                    borderBottomRightRadius: 100 
                }}>
                    <Pressable android_ripple={styles.barRipple} style={{ flex: 1 }} onPress={() => setRating(5)}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    barContainer: {
        display: "flex",
        flexDirection: "row",
        height: 32,
        borderRadius: 100,
    },
    ratingBar: { 
        borderColor: Colors.text, 
        borderWidth: 1, 
        flex: 1, 
        overflow: "hidden"
    },
    barRipple: { color: "rgba(0,0,0,0.4)", borderless: false },
});
