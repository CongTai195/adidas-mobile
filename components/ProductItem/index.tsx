import React from "react";
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import styles from "./style";
interface ProductItemProps{
    item: {
        id: string;
        title: string;
        image: string;
        price: number
    };
}

const ProductItem = ({item}: ProductItemProps) => {
    return (
        <View style={styles.root}>
            <Image style={styles.image} source={{ uri: item.image }} />

            <View style={styles.rightContainer}>
                <Text style={styles.title} numberOfLines={3}>
                    {item.title}
                </Text>
                <Text style={styles.price}>{item.price} VND</Text>
            </View>
        </View>
    );
};

export default ProductItem;