import React, { useState } from "react";
import { Alert, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./style";
import QuantitySeclector from "../../components/QuantitySelector";
import Button from '../../components/Button';
import { DataContext } from '../../service/Context';

interface CartProductItemProps {
    cartItem: {
        id: number;
        quantity: number;
        name: string;
        image: string;
        price: number;
        size: number
    }
}


const CartProductItem = ({ cartItem }: CartProductItemProps) => {
    const context = React.useContext(DataContext);

    const { quantity: quantityProp } = cartItem;


    return (
        <View style={styles.root}>
            <View style={styles.row}>
                <Image style={styles.image} source={{ uri: cartItem.image }} />

                <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={3}>
                        {cartItem.name}
                    </Text>
                    <Text style={styles.price}>Size: {cartItem.size}</Text>
                    <Text style={styles.price}>Số lượng: {cartItem.quantity}</Text>
                    <Text style={styles.price}>Thành tiền: {cartItem.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Text>
                </View>
            </View>
            {/* <View style={styles.quantityContainer}>
                <QuantitySeclector quantity={quantity} setQuantity={setQuantity} />
            </View> */}
            <Button text="Xóa khỏi giỏ hàng" onPress={() => {
                return Alert.alert(
                    "",
                    "Bạn muốn xóa sản phẩm này khỏi giỏ hàng chứ?",
                    [
                        // The "Yes" button
                        {
                            text: "Có",
                            onPress: () => {
                                { context.removeProduct(cartItem.id) }
                            },
                        },
                        // The "No" button
                        // Does nothing but dismiss the dialog when tapped
                        {
                            text: "Không",
                        },
                    ]
                );
            }} />
        </View>
    );
};

export default CartProductItem;