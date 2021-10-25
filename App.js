// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screen/DrawerContent';
import MaintTabScreen, {StackScreen, DetailsStackScreen, } from './screen/MainTabScreen';
import { ActivityIndicator, View } from 'react-native';

const Drawer = createDrawerNavigator();


function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }
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
