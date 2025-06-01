import { View, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors } from "@/constants/Colors";
import { Categories } from "../type";

export default {};

interface Props {
    category: Categories;
    rating: number;
}

function getCategoryIcon(category: Categories) {
    switch (category) {
        case Categories.Fasilitas:
            return <MaterialIcons name="corporate-fare" size={22} color={Colors.text} />;
        case Categories.Wifi:
            return <MaterialIcons name="wifi" size={22} color={Colors.text} />
        case Categories.Lokasi:
            return <MaterialCommunityIcons name="map-marker-outline" size={22} color={Colors.text} />
        case Categories.WorthIt:
            return <MaterialCommunityIcons name="account-multiple-outline" size={22} color={Colors.text} />
        case Categories.Organisasi:
            return <MaterialIcons name="work-outline" size={22} color={Colors.text} />
    }
};

export function CategoryRating({ category, rating }: Props) {
    return (
        <View
            style={{
                backgroundColor: Colors.background2,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                width: "45%",
                paddingVertical: 6,
                paddingHorizontal: 10,
                margin: 5,
            }}
        >
            {getCategoryIcon(category)}

            <Text
                style={{
                    color: Colors.text,
                    flex: 1,
                    fontSize: 12,
                    marginLeft: 6,
                    marginRight: 4,
                }}
            >{category}</Text>

            <Text style={{ color: Colors.text, fontWeight: "bold" }}>{rating}</Text>
        </View>
    );
}
