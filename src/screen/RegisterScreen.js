import * as React from 'react';
import { View, Alert, Modal, Text, Button, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from "@react-native-picker/picker";
import { ENV } from '../const/env';
import axios from 'axios';
import Adress from '../components/Address';


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

    const [modalVisible, setModalVisible] = React.useState(false);
    const [verifyCode, setVerifyCode] = React.useState("");
    const [ids, setids] = React.useState([]);
    const [province, setProvince] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [ward, setWard] = React.useState("");

    const register = async () => {
        try {
            const obj = {
                name: data.userName,
                email: data.userEmail,
                password: data.userPassword,
                gender: selectedOption,
                address: data.userAddress + ", " + ward + ", " + district + ", " + province + ".",
                phone: data.userPhone
            };
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
                setids(result.results.id);
                console.log(ids);
                setModalVisible(!modalVisible);
            } else {
                Alert.alert("????ng k?? kh??ng th??nh c??ng");
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

    const verify = async () => {
        const data = { ids: [ids], code: verifyCode }
        axios.post(`${ENV.BASE_URL}verify`, data)
            .then(res => {
                if (res.data.status == "OK") {
                    Alert.alert("????ng k?? th??nh c??ng");
                    navigation.goBack();
                }
                else {
                    Alert.alert("????ng k?? kh??ng th??nh c??ng");
                }
            })
            .catch(err => {
                Alert.alert("????ng k?? kh??ng th??nh c??ng");
                console.log(err);
            });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.footer}>
                    <Text style={styles.text_header}> ????NG K?? </Text>

                    <View style={[styles.action, { marginTop: 20 }]}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="H??? v?? t??n *"
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

                    <Picker
                        useNativeAndroidPickerStyle={false}
                        selectedValue={selectedOption}
                        onValueChange={(itemValue) =>
                            setSelectedOption(itemValue)}>
                        <Picker.Item label='Gi???i t??nh' value='-1' />
                        <Picker.Item label='Nam' value='1' />
                        <Picker.Item label='N???' value='0' />
                    </Picker>

                    <View style={[styles.action, { marginTop: 20 }]}>
                        <FontAwesome
                            name="phone"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="S??? ??i???n tho???i *"
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
                            placeholder="?????a ch??? *"
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

                    <Adress callBacksetProvince={setProvince} callBacksetDistricts={setDistrict} callBacksetWards={setWard} />

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
                            placeholder="M???t kh???u *"
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
                            placeholder="X??c nh???n m???t kh???u *"
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
                        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 15 }}>B???N ???? C?? T??I KHO???N</Text>

                        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 15, marginLeft: 20 }} onPress={() => { navigation.goBack() }}>
                            ????ng nh???p
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <LinearGradient
                            colors={['#000', '#000']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, { color: "#FFF" }]} onPress={register}>
                                ????NG K??
                            </Text>
                        </LinearGradient>
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
                                    <Text style={styles.modalText}>M???t m?? s??? ???? ???????c g???i ?????n Email c???a b???n</Text>
                                    <TextInput
                                        placeholder='Nh???p m?? s???'
                                        keyboardType='numeric'
                                        onChangeText={(text) => setVerifyCode(text)}
                                        maxLength={6}  //setting limit of input
                                    />
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={verify}
                                    >
                                        <Text style={styles.textStyle}>X??c nh???n</Text>
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

export default RegisterScreen;