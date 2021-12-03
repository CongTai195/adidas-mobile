import * as React from 'react';
import { Image, View, Text, StyleSheet, TextInput, RadioButton, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { DataContext } from '../../service/Context';
import Button from '../../components/Button';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENV} from '../../const/env';

function CheckoutScreen() {
    const context = React.useContext(DataContext);

    const navigation = useNavigation();

    const [shippingSelectedOption, setShippingSelectedOption] = React.useState('Giao hàng nhanh');

    const [paymentSelectedOption, setPaymentSelectedOption] = React.useState('Thẻ ATM nội địa');

    const user = context.user;
    const cart = context.cart;
    const totalPrice = cart.reduce((summedPrice, product) => (
        summedPrice + product.price * product.quantity
    ), 0);

    const addTran = async () => {
        try {
            const response = await fetch(`${ENV.BASE_URL}transaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@storage_Key')
                },
                body: JSON.stringify({
                    amount: totalPrice, payment: paymentSelectedOption, shipping: shippingSelectedOption,
                    user_address: user.address, user_email: user.email, user_name: user.name, user_phone: user.phone,
                    products: cart
                })
            });
            const result = await response.json();
            if (result.status == "OK") {
                context.clearCart();
                Alert.alert("Mua hàng thành công");
                navigation.navigate("Tran");
            }
            if (result.status == "NG") {
                Alert.alert("Mua hàng không thành công")
                console.log(result);

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    if (cart.length == 0) {
        return (
            <View>
                <Text style={{ fontSize: 18, color: 'black' }}>
                    Bạn chưa có sản phẩm nào trong giỏ hàng cả.
                </Text>
                <Button text={'Tiếp tục mua sắm'} onPress={() => {
                    navigation.navigate("Home");
                }} />
            </View>
        );
    } else {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.footer}>
                        <Text style={styles.text_header}> Thông tin giao hàng </Text>

                        <View style={[styles.action, { marginTop: 20 }]}>
                            <FontAwesome
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Tên của bạn*"
                                value={user.name}
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
                                placeholder="Số điện thoại giao hàng*"
                                value={user.phone}
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
                                placeholder="Địa chỉ giao hàng"
                                value={user.address}
                                style={styles.textInput}
                                autoCapitalize="none"
                                multiline={true}
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.text_header}> Hình thức vận chuyển </Text>
                        <Picker
                            useNativeAndroidPickerStyle={false}
                            selectedValue={shippingSelectedOption}
                            onValueChange={(itemValue) =>
                                setShippingSelectedOption(itemValue)}>
                            <Picker.Item label="Giao hàng nhanh" value="Giao hàng nhanh" />
                            <Picker.Item label="Giao hàng tiết kiệm" value="Giao hàng tiết kiệm" />
                            <Picker.Item label="JT Express" value="JT Express" />
                        </Picker>

                        {/* <Button text="Đăng xuất" onPress={logout}/> */}
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.text_header}> Hình thức thanh toán </Text>
                        <Picker
                            useNativeAndroidPickerStyle={false}
                            selectedValue={paymentSelectedOption}
                            onValueChange={(itemValue) =>
                                setPaymentSelectedOption(itemValue)}>
                            <Picker.Item label="Thẻ ATM nội địa" value="Thẻ ATM nội địa" />
                            <Picker.Item label="Thanh toán khi nhận hàng" value="Thanh toán khi nhận hàng" />
                            <Picker.Item label="Thanh toán ví Momo" value="Thanh toán ví Momo" />
                        </Picker>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.text_header}> Thông tin đơn hàng </Text>
                        <Text style={{ fontWeight: "bold", marginTop: 10, color: "black", fontSize: 16 }}>{cart.length} sản phẩm:</Text>
                        {cart.map(product => (
                            <View style={{ marginTop: 10, backgroundColor: "#f2f2f2", padding: 10, borderColor: "black" }}>
                                <Image style={styles.image} source={{ uri: product.image }} />
                                <Text style={{ color: "black", fontSize: 16 }}>{product.name}</Text>
                                <View style={styles.rightContainer}>
                                    <Text style={{ color: "black", textAlign: 'justify', fontSize: 14 }}>Đơn giá: {product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
                                    <Text style={{ color: "black", textAlign: 'justify', fontSize: 14 }}>Size: {product.size}</Text>
                                    <Text style={{ color: "black", textAlign: 'right', fontSize: 14 }}>Số lượng: {product.quantity}</Text>
                                </View>
                            </View>
                        ))}
                        <Text style={{ marginTop: 10, color: "black", textAlign: 'justify', fontSize: 16, fontWeight: 'bold' }}>Tổng tiền: {totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} </Text>
                        <Button text="Xác nhận" onPress={() => { addTran() }} />
                    </View>
                </View>
            </ScrollView>
        );
    }
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
        paddingHorizontal: 20
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24
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
        fontSize: 16,
        paddingLeft: 10,
        color: 'black',
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
    root: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginVertical: 5
    },
    rightContainer: {
        padding: 10,
        flex: 3
    },
    image: {
        flex: 2,
        height: 150,
        resizeMode: 'contain',
    },
});

export default CheckoutScreen;