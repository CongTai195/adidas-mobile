import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, FlatList } from 'react-native';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import { DataContext } from '../../service/Context';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const context = React.useContext(DataContext);

  const navigation = useNavigation();

  const totalPrice = context.cart.reduce((summedPrice, product) => (
    summedPrice + product.price * product.quantity
  ), 0);

  return (
    <View style={styles.page}>
      {context.cart.length == 0 ?
        <View>
          <Text style={{ fontSize: 18, color: 'black' }}>
            Bạn chưa có sản phẩm nào trong giỏ hàng cả.
          </Text>
          <Button text={'Tiếp tục mua sắm'} onPress={() => {
            navigation.navigate("Home");
          }} />
        </View> :
        <View>
          <Text style={{ fontSize: 18, color: 'black' }}>
            Tạm tính ({context.cart.length} đôi giày): {' '}
            <Text style={{ color: 'red' }}>{totalPrice.toLocaleString('vi-VN')} VND</Text>
          </Text>
          <Button text={'Thanh toán'} onPress={() => {
            navigation.navigate("Checkout");
          }} />
        </View>}
      <FlatList
        data={context.cart}
        renderItem={({ item }) => <CartProductItem cartItem={item}
        />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 1
  }
});

export default CartScreen;