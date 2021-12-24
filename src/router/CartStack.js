import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screen/CartScreen';
import CheckoutScreen from '../screen/CheckoutScreen/CheckoutScreen';
import PaymentScreen from '../screen/PaymentScreen';

const Stack = createStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                component={CartScreen} 
                name="Cart"
                options={{headerShown: false}} 
                />
            <Stack.Screen 
                component={CheckoutScreen} 
                name="Checkout" 
                options={{headerShown: false}}
                />
            <Stack.Screen 
                component={PaymentScreen} 
                name="Payment" 
                options={{headerShown: false}}
                />
        </Stack.Navigator>
    );
};

export default CartStack;