import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TranScreen from '../screen/TranScreen';
import DetailTranScreen from '../screen/DetailTranScreen';

const Stack = createStackNavigator();

const TranStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                component={TranScreen} 
                name="Tran"
                options={{headerShown: false}} 
                />
            <Stack.Screen 
                component={DetailTranScreen} 
                name="DetailTran"
                options={{headerShown: false}} 
                />
        </Stack.Navigator>
    );
};

export default TranStack;