import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import MaleScreen from "./MaleScreen";
import FemaleScreen from "./FemaleScreen";
import { Icon } from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from "./LoginScreen/LoginScreen";
import RegisterScreen from "./RegisterScreen";
import DetailScreen from "./DetailScreen";
import CartScreen from "./CartScreen";


const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const MaleStack = createNativeStackNavigator();
const FemaleStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MaintTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        //activeColor="#f0edf6"
        //inactiveColor="#3e2465"
        //barStyle={{ backgroundColor: '#694fad' }}
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#FFF',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Male"
            component={MaleStackScreen}
            options={{
                tabBarLabel: 'Nam',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="details" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Female"
            component={FemaleStackScreen}
            options={{
                tabBarLabel: 'Nữ',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="details" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MaintTabScreen;

export const StackScreen = ({ navigation }) => (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }} >
        <Stack.Screen name="Home" component={HomeScreen} options={{
            title: 'Trang chủ',
            // headerLeft: () => (
            //   <Icon.Button name='menu' size={25} 
            //   backgroundColor="#009387" options={() => {
            //     navigation.openDrawer()
            //   }}>
            //   </Icon.Button>
            // )
        }} />
        <Stack.Screen name="Male" component={MaleScreen} />
        <Stack.Screen name="Female" component={FemaleScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Detail" component={DetailScreen}/>

    </Stack.Navigator>
);

export const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#009387"
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    }} >
        <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
);

export const MaleStackScreen = ({ navigation }) => (
    <MaleStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#009387"
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    }} >
        <MaleStack.Screen name="Male" component={MaleScreen} />
    </MaleStack.Navigator>
);

export const FemaleStackScreen = ({ navigation }) => (
    <FemaleStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#009387"
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    }} >
        <FemaleStack.Screen name="Female" component={FemaleScreen} />
    </FemaleStack.Navigator>
);
