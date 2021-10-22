// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screen/DrawerContent';
import MaintTabScreen, {StackScreen, DetailsStackScreen, } from './screen/MainTabScreen';

const Drawer = createDrawerNavigator();


function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {... props}/>} screenOptions={{
        headerShown: false
      }} 
      initialRouteName="Home">
        <Drawer.Screen name="HomeDrawer" component={StackScreen} />
        {/* <Drawer.Screen name="Details" component={DetailsStackScreen} /> */}
      </Drawer.Navigator>
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={MaintTabScreen} />
        <Tab.Screen name="Details" component={DetailsStackScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
