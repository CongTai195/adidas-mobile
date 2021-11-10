// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screen/DrawerContent';
import MaintTabScreen, { StackScreen, DetailsStackScreen, } from './screen/MainTabScreen';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from './components/context';
import Router from './router';

const Drawer = createDrawerNavigator();


function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);\

  return (
    // <AuthContext.Provider
    // //value={authContext}
    // >
    //   <NavigationContainer>
    //     {/* {loginState.userToken !== null ? (
    //       <View>
    //         <Text>Đăng nhập thành công</Text>
    //         <TouchableOpacity onPress={() => {authContext.signOut()}}>
    //           <Text>Sign out</Text>
    //         </TouchableOpacity>
    //       </View>
    //     ) :
    //       ( */}
    //     <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{
    //       headerShown: false
    //     }}
    //       initialRouteName="Home">
    //       <Drawer.Screen name="HomeDrawer" component={StackScreen} />
    //       {/* <Drawer.Screen name="Details" component={DetailsStackScreen} /> */}
    //     </Drawer.Navigator>
    //     {/* )} */}
    //     {/* <Tab.Navigator>
    //     <Tab.Screen name="Home" component={MaintTabScreen} />
    //     <Tab.Screen name="Details" component={DetailsStackScreen} />
    //   </Tab.Navigator> */}
    //   </NavigationContainer>
    // </AuthContext.Provider>
    <SafeAreaView style={{flex: 1}}>
      <Router/>
    </SafeAreaView>
  );
}

export default App;
