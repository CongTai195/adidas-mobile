import React from "react";
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./style";
interface ProductItemProps{
    item: {
      id: string;
      name: string;
      category_id: string;
      price: number;
      description: string;
      image: string
      detail_products: object[]
    };
}

const ProductItem = ({item}: ProductItemProps) => {
  const navigation = useNavigation();
  
  const onPress = () => {
    navigation.navigate("Detail", {item: item});
  }
    return (
      <Pressable onPress={onPress}>
        <View style={styles.root}>
            <Image style={styles.image} source={{ uri: item.image }} />

            <View style={styles.rightContainer}>
                <Text style={styles.title} numberOfLines={3}>
                    {item.name}
                </Text>
                <Text style={styles.price}>{item.price} VND</Text>
            </View>
        </View>
      </Pressable>
    );
};

export default ProductItem;