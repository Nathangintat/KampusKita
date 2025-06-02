import { View, TextInput, Modal, Text, ViewStyle, Pressable, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

interface Props {
    style?: ViewStyle;
    visible: boolean;
    handleClose: (newUsername: string) => void;
}

function onlyLettersAndNumbers(str: string) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

export function AddUsernameModal({ style, visible, handleClose }: Props) {
    const [newUsername, setNewUsername] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);

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

    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={styles.modalView}>
            <View style={styles.modalBox}>

                <Text style={{
                    color: Colors.text, 
                    fontSize: 24, 
                    fontWeight: "bold" 
                }}>Username Baru</Text>

                <View style={{...styles.textContainer, ...style}}>
                    <TextInput
                        placeholder="Masukkan username baru"
                        placeholderTextColor={Colors.lightGrey}
                        style={styles.textInput}
                        value={newUsername}
                        onChangeText={setNewUsername}
                        onSubmitEditing={handleSubmit}
                    />
                </View>

                <View style={{
                    alignSelf: "flex-end",
                    backgroundColor: isValid ? Colors.success : Colors.error,
                    borderRadius: 5,
                    marginRight: 5,
                    overflow: "hidden",
                }}>
                    <Pressable android_ripple={{
                        color: "rgba(0,0,0,0.5)",
                        borderless: false,
                        foreground: true,
                    }} onPress={handleSubmit}>
                        <MaterialIcons name="check" size={24} color={isValid ? Colors.grey : Colors.text} />
                    </Pressable>
                </View>
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
