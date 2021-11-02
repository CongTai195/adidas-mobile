import * as React from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import ProductItem from '../components/ProductItem';
import products from '../data/products';



const HomeScreen= ({navigation}) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    page: {
        padding: 10,
    }
});

export default HomeScreen;