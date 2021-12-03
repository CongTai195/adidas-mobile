import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput, RadioButton, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from "@react-native-picker/picker";
import {ENV} from '../const/env';


function RegisterScreen({ navigation }) {

    const [selectedOption, setSelectedOption] = React.useState(-1);

    const [data, setData] = React.useState({
        userName: '',
        userPhone: '',
        userAddress: '',
        userEmail: '',
        userPassword: '',
        repeatPassword: '',
        secureTextEntry: true
    });

    const register = async ()  => {
        try {
            const obj = { name: data.userName, 
                            email: data.userEmail, 
                                password: data.userPassword,
                                    gender: selectedOption,
                                        address: data.userAddress,
                                            phone: data.userPhone };
            const response = await fetch(`${ENV.BASE_URL}register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(obj)
            });
            const result = await response.json();
            console.log(result);
            if (result.status == "OK") {
                Alert.alert("Đăng ký thành công");
                navigation.goBack();
            } else {
                Alert.alert("Đăng ký không thành công");
            }
          }
          catch (err) {
            console.log(err);
          }
    }

    const updateSecureEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.footer}>
                    <Text style={styles.text_header}> ĐĂNG KÝ </Text>

                    <View style={[styles.action, { marginTop: 20 }]}>
                    <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Họ và tên *"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => {
                                setData({
                                    ...data,
                                    userName: val
                                });
                            }}
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 20 }]}>
                    <FontAwesome
                            name="phone"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Số điện thoại *"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => {
                                setData({
                                    ...data,
                                    userPhone: val
                                });
                            }}
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 20 }]}>
                    <FontAwesome
                            name="map-marker"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Địa chỉ *"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => {
                                setData({
                                    ...data,
                                    userAddress: val
                                });
                            }}
                        />
                    </View>

                    <Picker
                        useNativeAndroidPickerStyle={false}
                        selectedValue={selectedOption}
                        onValueChange={(itemValue) =>
                            setSelectedOption(itemValue)}>
                        <Picker.Item label='Giới tính' value='-1' />
                        <Picker.Item label='Nam' value='1' />
                        <Picker.Item label='Nữ' value='0' />
                    </Picker>

                    <View style={[styles.action, { marginTop: 35 }]}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Email *"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => {
                                setData({
                                    ...data,
                                    userEmail: val
                                });
                            }}
                        />
                    </View>
                    <View style={[styles.action, { marginTop: 35 }]}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Mật khẩu *"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={(val) => {
                                setData({
                                    ...data,
                                    userPassword: val
                                });
                            }}
                        />
                        <TouchableOpacity onPress={updateSecureEntry}>
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="black"
                                    size={20}
                                ></Feather>
                                : <Feather
                                    name="eye"
                                    color="black"
                                    size={20}
                                ></Feather>}
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.action, { marginTop: 35 }]}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Xác nhận mật khẩu *"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={(val) => {
                                setData({
                                    ...data,
                                    repeatPassword: val
                                });
                            }}
                        />
                        <TouchableOpacity onPress={updateSecureEntry}>
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="black"
                                    size={20}
                                ></Feather>
                                : <Feather
                                    name="eye"
                                    color="black"
                                    size={20}
                                ></Feather>}
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 15 }}>BẠN ĐÃ CÓ TÀI KHOẢN</Text>

                        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 15, marginLeft: 20 }} onPress={() => { navigation.goBack() }}>
                            Đăng nhập
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <LinearGradient
                            colors={['#000', '#000']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, { color: "#FFF" }]} onPress={register}>
                                ĐĂNG KÝ
                            </Text>
                        </LinearGradient>
                    </View>
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

export default RegisterScreen;