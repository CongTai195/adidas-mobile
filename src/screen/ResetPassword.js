import React, { useContext, useState } from 'react';
import { Modal, View, Text, Pressable, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { DataContext } from "../service/Context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ENV } from '../const/env';



function ResetPassword() {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [verifyCode, setVerifyCode] = React.useState("");
    const [ids, setids] = React.useState([]);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [data, setData] = useState({
        check_textInputChange: false,
        secureTextEntry: true
    });

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                check_textInputChange: false
            });
        }
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
        });
    }
    const updateSecureEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const verify = async () => {
        const verifyData = { ids: [ids], code: verifyCode }
        axios.post(`${ENV.BASE_URL}verify`, verifyData)
            .then(res => {
                console.log(res.data);
                if (res.data.status == "OK") {
                    Alert.alert("Đổi mật khẩu thành công");
                    navigation.goBack();
                }
                else {
                    Alert.alert("Đổi mật khẩu không thành công");
                }
            })
            .catch(err => {
                Alert.alert("Đổi mật khẩu không thành công");
                console.log(err);
            });
    }

    const resetPassword = async () => {
        const resetData = { email: email, password: password }
        axios.post(`${ENV.BASE_URL}forgetpassword`, resetData)
            .then(res => {
                console.log(res.data);
                if (res.data.status == "OK") {
                    setids(res.data.results.id);
                    console.log(ids);
                    setModalVisible(!modalVisible);
                }
            })
            .catch(err => {
                Alert.alert("Lỗi máy chủ");
                console.log(err);
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <Text style={styles.text_header}> LẤY LẠI MẬT KHẨU </Text>
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
                        onChangeText={(val) => setEmail(val)}
                    />
                    {data.check_textInputChange ?
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        ></Feather>
                        : null}
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
                        onChangeText={(val) => setPassword(val)}
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
                        onChangeText={(val) => setConfirmPassword(val)}
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

                <View style={styles.Button}>
                    <LinearGradient
                        colors={['#000', '#000']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, { color: "#FFF" }]} onPress={resetPassword}>
                            XÁC NHẬN
                        </Text>
                    </LinearGradient>
                </View>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Một mã số đã được gửi đến Email của bạn</Text>
                            <TextInput
                                placeholder='Nhập mã số'
                                keyboardType='numeric'
                                onChangeText={(text) => setVerifyCode(text)}
                                maxLength={6}  //setting limit of input
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={verify}
                            >
                                <Text style={styles.textStyle}>Xác nhận</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.textStyle}>Show Modal</Text>
                        </Pressable> */}
            </View>
        </View>
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
        flexDirection: 'row',
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
        marginTop: 50
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
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ResetPassword;