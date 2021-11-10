import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                component={LoginScreen} 
                name="LoginScreen"
                options={{headerShown: false}} 
                />
            <Stack.Screen 
                component={RegisterScreen} 
                name="Register" 
                options={{headerShown: false}}
                />
        </Stack.Navigator>
    );
};

export default LoginStack;