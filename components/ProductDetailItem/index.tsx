import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import styles from "./style";
interface DetailProductProps {
    detail: {
        id: string;
        product_id: string;
        quantity: number;
        size: number
    }
}

const ProductDetailItem = ({ detail }: DetailProductProps) => {
    
    return (
            <View style={styles.root}>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>
                        {detail.size}
                    </Text>
                    <Text style={styles.price}>{detail.quantity}</Text>
                </View>
            </View>
    );
};

export default ProductDetailItem;