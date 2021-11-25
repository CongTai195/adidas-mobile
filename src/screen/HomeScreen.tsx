import * as React from 'react';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import ProductItem from '../components/ProductItem';
import products from '../data/products';
import { DataContext } from '../service/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface ProductProps {
  id: string;
  name: string;
  category_id: string;
  price: number;
  description: string;
  image: string;
  image_list: string;
  detail_products: object[]
}

const HomeScreen = ({ searchValue } : { searchValue: string }) => {
  const context = React.useContext(DataContext);
  const url = 'http://10.0.2.2:8000';

  //const debounceFunction = React.useCallback(debounce(() => fetchProducts, 500), [] );

  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(`http://10.0.2.2:8000/api/product`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       });
  //       const result = await response.json();
  //       setProducts(result.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchProducts();
  // }, [searchValue]);

  useEffect(() => {
    fetchProducts();
    //debounceFunction();
  }, [searchValue]);

  const fetchProducts = () => {
    axios.get(`http://10.0.2.2:8000/api/product/user/search?name=${searchValue}`)
    //axios.get(`https://shop-adidas.herokuapp.com/api/product/user/search?name=${searchValue}`)
          .then(res => {
              setProducts(res.data.results);
          }).catch(err => {
              console.log("Err: ", err)
          })
    };
  //   fetchProducts();

  return (
    <View style={styles.page}>
      <FlatList
        keyExtractor={(item, index) => {
          return item.id;
        }}
        data={products}
        renderItem={({ item }) => <ProductItem item={item} />}
        showsVerticalScrollIndicator={false}
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