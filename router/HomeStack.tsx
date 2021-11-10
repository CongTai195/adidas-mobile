import React, {useState} from 'react';
import { Text, SafeAreaView, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import BottomTabNav from './bottomTabNav';
import DetailScreen from '../screen/DetailScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface HeaderComponentProps {
    searchValue: string;
    setSearchValue: () => void;
}

const Stack = createStackNavigator();

const HeaderComponent = ({searchValue, setSearchValue} : HeaderComponentProps) => {
    return (
        <SafeAreaView style={{backgroundColor: '#000' }}>
            <View style={{
                    flexDirection: 'row' ,
                    margin: 10, padding: 5, 
                    backgroundColor: 'white',
                    alignItems: 'center'}}>
                <MaterialCommunityIcons name="magnify" size={25} />
                <TextInput 
                    style={{
                        height: 40,
                        marginLeft: 10
                    }} 
                    placeholder="Tìm kiếm ..."
                    value={searchValue}
                    onChangeText={setSearchValue} />
            </View>
        </SafeAreaView>
    );
};

const HomeStack = () => {
    const [searchValue, setSearchValue] = useState('');
    return (
        <Stack.Navigator screenOptions={{
            header: () => <HeaderComponent searchValue={searchValue} setSearchValue={setSearchValue}/>,
        }}>
            <Stack.Screen
                //component={HomeScreen}
                name="HomeScreen"
                options={{ title: "Trang chủ" }}>
                    {() => <HomeScreen searchValue={searchValue}/>}
            </Stack.Screen>
            <Stack.Screen
                component={DetailScreen}
                name="Detail"
                options={{ title: "Chi tiết sản phẩm" }} />
        </Stack.Navigator>
    );
};

export default HomeStack;