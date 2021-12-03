import * as React from 'react';
import { View, Text, StyleSheet, TextInput, RadioButton, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { DataContext } from '../../service/Context';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENV} from '../../const/env';


function ProfileScreen({name, phone, email, address }) {
    const context = React.useContext(DataContext);

    const logout = async () => {
        Alert.alert(
            "",
            "Bạn chắc chắn muốn đăng xuất chứ?",
            [
                // The "Yes" button
                {
                    text: "Có",
                    onPress: async () => {
                        try {
                            //console.log(await AsyncStorage.getItem('@storage_Key'));
                            const response = await fetch(`${ENV.BASE_URL}logout`, {
                              method: 'GET',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@storage_Key')
                              },
                            });
                            const result = await response.json();
                            if (result.status == "OK"){
                                context.addUser([]);
                                await AsyncStorage.removeItem('@storage_Key');
                            }
                            else {
                                console.log("Đăng xuất kh thành công")
                            }
                          }
                          catch (err) {
                            console.log(err);
                          }
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Không",
                },
            ]
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.footer}>
                    <Text style={styles.text_header}> Thông tin cá nhân </Text>

                    <View style={[styles.action, { marginTop: 20 }]}>
                    <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            value={name}
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 20 }]}>
                    <FontAwesome
                            name="phone"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            value={phone}
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 20 }]}>
                    <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            value={email}
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 35 }]}>
                    <FontAwesome
                            name="map-marker"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            value={address}
                            style={styles.textInput}
                            autoCapitalize="none"
                            multiline={true}
                        />
                    </View>
                <Button text="Đăng xuất" onPress={logout}/>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default ProfileScreen;