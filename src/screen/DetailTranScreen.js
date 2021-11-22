import React from "react";
import { Alert, ScrollView, View, Text, StyleSheet, Image, useWindowDimensions, FlatList, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DataContext } from '../../service/Context'

const DetailTranScreen = () => {

    const route = useRoute();
    const item = route.params.item;

    return (
        <ScrollView style={{ margin: 20 }}>
            <Text style={styles.textHeader}>Thông tin đơn hàng</Text>
            <View style={styles.info}>
                <Text style={styles.textHeaderInfo}>Trạng thái</Text>
                {
                    item.status == 1 ? 
                    <Text style={[styles.textInfo, {color: 'green'}]}>Đặt hàng thành công</Text>
                    :
                    item.status == 2 ?
                    <Text style={[styles.textInfo, {color: 'green'}]}>Đang giao hàng</Text> 
                    :
                    item.status == 3 ?
                    <Text style={[styles.textInfo, {color: 'green'}]}>Giao hàng thành công</Text> 
                    : 
                    <Text style={[styles.textInfo, {color: 'red'}]}>Đơn đã hủy</Text>
                }
            </View>
            <View style={styles.info}>
                <Text style={styles.textHeaderInfo}>Thông tin vận chuyển</Text>
                <Text style={styles.textInfo}>{item.shipping}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.textHeaderInfo}>Thông tin thanh toán</Text>
                <Text style={styles.textInfo}>{item.payment}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.textHeaderInfo}>Địa chỉ nhận hàng</Text>
                <Text style={styles.textInfo}>{item.user_name}</Text>
                <Text style={styles.textInfo}>{item.user_phone}</Text>
                <Text style={styles.textInfo}>{item.user_address}</Text>
            </View>
            {item.orders.map(product => (
                            <View style={styles.root}>
                            <Image style={styles.image} source={{ uri: product.product.image }} />
                
                            <View style={styles.rightContainer}>
                                <Text style={styles.title} numberOfLines={3}>
                                    {product.product.name}
                                </Text>
                                <Text style={styles.price}>Đơn giá: {product.product.price.toLocaleString('vi-VN')} VND</Text>
                                <Text style={{ color: "black", textAlign: 'justify', fontSize: 14 }}>Size: {product.size}</Text>
                                <Text style={{ color: "black", textAlign: 'right', fontSize: 14 }}>Số lượng: {product.quantity}</Text>
                            </View>
                        </View>
                        ))}
            <Text style={{ marginTop: 10, color: "black", textAlign: 'justify', fontSize: 16, fontWeight: 'bold' }}>Thành tiền: {item.amount.toLocaleString("vi-VN")} VND </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    title: {
        fontSize: 18,
        color: "black"
    },
    price: {
        fontSize: 14,
        color: 'black',
    },
    textHeader: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24
    },
    info: {
        backgroundColor: "white",
        marginVertical: 2
    },
    textHeaderInfo: {
        color: 'black',
        fontWeight: '500',
        fontSize: 18,
        marginLeft: 10
    },
    textInfo: {
        color: 'black',
        fontSize: 14,
        marginLeft: 20,
        marginVertical: 3
    },
});


export default DetailTranScreen;