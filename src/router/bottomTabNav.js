import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import CartStack from './CartStack';
import TranStack from './TranStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: {fontSize: 14, fontWeight: '500'} ,
            tabBarLabelPosition: 'below-icon',
            headerShown: false,
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "grey"
        }}>
            <Tab.Screen
                component={HomeStack}
                name="Home"
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={25} />
                    ),
                }}
            />
            <Tab.Screen component={CartStack} name="CartStack"
                options={{
                    tabBarLabel: 'Giỏ hàng',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart-outline" color={color} size={25} />
                    ),
                }} />
            <Tab.Screen component={TranStack} name="TranStack"
                options={{
                    tabBarLabel: 'Lịch sử',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" color={color} size={25} />
                    ),
                }} />
            <Tab.Screen component={LoginStack} name="Login"
                options={{
                    tabBarLabel: 'Cá nhân',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={25} />
                    ),
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNav;