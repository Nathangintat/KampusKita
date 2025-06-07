import { View, TextInput, Modal, Text, ViewStyle, Pressable, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

interface Props {
    visible: boolean;
    handleClose: (newValue: string | undefined) => void;
    title: string;
    list: { id: number, name: string }[];
}

// const [isValid, setIsValid] = useState<boolean>(false);

/*
async function handleSubmit() {
    try {
        const jwt = await SecureStore.getItemAsync('jwtToken');
        const url = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/user/change_username`;
        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                new_username: newUsername,
            }),
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${jwt}`,
            },
        });

        if (!res.ok) return;

        const json: {
            access_token: string;
            username: string;
        } = await res.json();

        await SecureStore.setItemAsync('username', json.username);
        await SecureStore.setItemAsync('jwtToken', json.access_token)
            .then(() => handleClose(json.username));
    } catch (error) {
        console.error(error)
    }
}

useEffect(() => {
    if (newUsername.length < 4 || !onlyLettersAndNumbers(newUsername)) {
        setIsValid(false);
    } else {
        setIsValid(true);
    }
}, [newUsername]);
*/

export function SelectModal({ visible, handleClose, title, list }: Props) {
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => handleClose(undefined)}>
            <View style={styles.modalView}>
            <View style={styles.modalBox}>

                <Text style={{
                    color: Colors.text, 
                    fontSize: 24, 
                    fontWeight: "bold" 
                }}>{ title }</Text>

                <Picker
                selectedValue={1}
                style={{ height: 50, width: 100 }}
                onValueChange={(value) => console.log(value)}>
                { list && (
                    list.map((item, index) => (
                        <Picker.Item key={index} label={item.name} value={item.id} />
                    ))
                )}
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>


            </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalBox: { 
        maxWidth: "80%",
        backgroundColor: Colors.background3, 
        padding: 20, 
        borderRadius: 10, 
        gap: 10,
        alignItems: "center",
    },
    textContainer: {
        backgroundColor: Colors.background2,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1, 
        borderColor: Colors.grey,
    },
    textInput: { 
        flex: 1, 
        color: Colors.text, 
        fontSize: 16 
    },
});


export default {};
