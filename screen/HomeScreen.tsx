import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import ProductItem from '../components/ProductItem';
import products from '../data/products';
interface ProductProps {
  id: string;
  name: string;
  category_id: string;
  price: number;
  description: string;
  image: string
  detail_products: object[]
}

const HomeScreen = ({ searchValue }: { searchValue: string }) => {
  const url = 'http://10.0.2.2:8000';

  const [products, setProducts] = useState<ProductProps>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch( `${url}/api/product`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const result = await response.json();
        setProducts(result.results);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);


  return (
    <View style={styles.page}>
      <FlatList
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