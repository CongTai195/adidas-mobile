import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput, RadioButton, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../components/context';


function RegisterScreen({ navigation }) {

    const [data, setData] = React.useState({
        userName: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                userName: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                userName: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    }

    const updateSecureEntry = () => {
        setData({
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.footer}>
                    <Text style={styles.text_header}> ĐĂNG KÝ </Text>

                    <View style={[styles.action, { marginTop: 20 }]}>
                        <TextInput
                            placeholder="Họ và tên *"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 20 }]}>
                        <TextInput
                            placeholder="Số điện thoại *"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 20 }]}>
                        <TextInput
                            placeholder="Địa chỉ *"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                    </View>

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
                            onChangeText={(val) => textInputChange(val)}
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
                            onChangeText={(val) => handlePasswordChange(val)}
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
                            onChangeText={(val) => handlePasswordChange(val)}
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

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 15 }}>BẠN ĐÃ CÓ TÀI KHOẢN</Text>

                        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 15, marginLeft: 20 }} onPress={() => {navigation.goBack()}}>
                            Đăng nhập
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <LinearGradient
                            colors={['#000', '#000']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, { color: "#FFF" }]} onPress={() => { login() }}>
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