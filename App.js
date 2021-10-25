// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screen/DrawerContent';
import MaintTabScreen, { StackScreen, DetailsStackScreen, } from './screen/MainTabScreen';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from './components/context';

const Drawer = createDrawerNavigator();


function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);\

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ... prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ... prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ... prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ... prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: (userName, password) => {
      // setUserToken('dasd');
      // setIsLoading(false);
      let userToken;
      userToken = null;
      if (userName == 'user' && password == 'pass') {
        userToken = "kjnkasndio";
      }
      console.log('userToken', userToken);
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: () => {
      // setUserToken(null);
      // setIsLoading(false);
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      // setUserToken('dasd');
      // setIsLoading(false);
    }
  }), []);

  React.useEffect(() => {
    setTimeout(() => {
      let userToken;
      userToken = null;
      //setIsLoading(false);
      console.log('userToken', userToken);
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);
  if (loginState.isLoading ) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <View>
            <Text>Đăng nhập thành công</Text>
            <TouchableOpacity onPress={() => {authContext.signOut()}}>
              <Text>Sign out</Text>
            </TouchableOpacity>
          </View>
        ) :
          (<Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{
            headerShown: false
          }}
            initialRouteName="Home">
            <Drawer.Screen name="HomeDrawer" component={StackScreen} />
            {/* <Drawer.Screen name="Details" component={DetailsStackScreen} /> */}
          </Drawer.Navigator>)}
        {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={MaintTabScreen} />
        <Tab.Screen name="Details" component={DetailsStackScreen} />
      </Tab.Navigator> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
