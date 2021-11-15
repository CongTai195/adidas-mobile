import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TranScreen from '../screen/TranScreen';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import CartStack from './CartStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "grey"
        }}>
            <Tab.Screen
                component={HomeStack}
                name="Home"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={25} />
                    ),
                }}
            />
            <Tab.Screen component={CartStack} name="CartStack"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart-outline" color={color} size={25} />
                    ),
                }} />
            <Tab.Screen component={TranScreen} name="Tran"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" color={color} size={25} />
                    ),
                }} />
            <Tab.Screen component={LoginStack} name="Login"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={25} />
                    ),
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNav;