import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../components/context';
import RegisterScreen from '../RegisterScreen';
import { login } from '../../service/UserService';


function LoginScreen({ navigation }) {

  const [data, setData] = React.useState({
    userName: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  //const {login} = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        userName: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        userName: val,
        check_textInputChange: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  }

  const loginHandle = (userName, password) => {
    signIn(userName, password);
  }

  const updateSecureEntry = () => {
    setData({
      secureTextEntry: !data.secureTextEntry
    });
  }

  // const login = async() => {
  //   const obj = {email: data.userName, password: data.password};
  //   await fetch('http://10.0.2.2:8000/api/login',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(obj)
  //   }).then(res => res.json()).then(resData => {
  //     console.log('data', JSON.stringify(obj));
  //     console.log('response', resData);
  //   });
  // }

  const login = async () => {
    const obj = { email: data.userName, password: data.password };
    const response = await fetch('http://10.0.2.2:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    const result = await response.json();
    if (result.status == "OK") {
      Alert.alert("Đăng nhập thành công");
      console.log(result);
    }
    if (result.status == "NG") {
      Alert.alert("Đăng nhập không thành công");
      console.log(result);
    }
  }




  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <Text style={styles.text_header}> ĐĂNG NHẬP </Text>
        <Text style={styles.text_footer}>Bạn quên mật khẩu?</Text>
        <View style={[styles.action, { marginTop: 35 }]}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder="Email *"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ?
            <Feather
              name="check-circle"
              color="green"
              size={20}
            ></Feather>
            : null}
        </View>
        <View style={[styles.action, { marginTop: 35 }]}>
          <Feather
            name="lock"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder="Mật khẩu *"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureEntry}>
            {data.secureTextEntry ?
              <Feather
                name="eye-off"
                color="black"
                size={20}
              ></Feather>
              : <Feather
                name="eye"
                color="black"
                size={20}
              ></Feather>}
          </TouchableOpacity>
        </View>

        <View style={styles.Button}>
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: "#FFF" }]} onPress={() => { login() }}>
              ĐĂNG NHẬP
            </Text>
          </LinearGradient>
        </View>

        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 20 }}>HOẶC</Text>

        <View style={styles.Button, { marginTop: 20 }}>
          <LinearGradient
            colors={['#FFF', '#FFF']}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: "#000" }]}>
              FACEBOOK
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.Button, { marginTop: 20 }}>
          <LinearGradient
            colors={['#FFF', '#FFF']}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: "#000" }]}>
              GOOGLE
            </Text>
          </LinearGradient>
        </View>

        <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000", fontSize: 20 }}>TẠO MỘT TÀI KHOẢN MỚI</Text>

        <View style={styles.Button, { marginTop: 20 }}>
          <LinearGradient
            colors={['#000', '#000']}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: "#FFF" }]} onPress={() => { navigation.navigate("Register") }}>
              ĐĂNG KÝ
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default LoginScreen;

// import React, { Component } from 'react'
// import { TouchableOpacity } from 'react-native';
// import { Text, View, Dimensions, Image } from 'react-native'
// import { Provider, TextInput, Title, Button, HelperText, Avatar, Portal, Modal, ProgressBar } from 'react-native-paper'
// import { login } from '../service/UserService';
// import { Keyboard } from 'react-native'

// export default class LoginScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             password: '',
//             email: '',
//             mes: '',
//             visible: false
//         }
//     }
//     signUp = () => {
//         this.props.signup();
//     }
//     login = async () => {
//         this.setState(
//             {
//                 visible: true
//             })
//         Keyboard.dismiss();
//         await login(this.state.email, this.state.password)
//             .then(res => {
//                 if (res != null) {
//                     //this.props.data(res)
//                     console.log(res);
//                 }
//                 else {
//                     this.setState({
//                         mes: 'Username or Password is invalid'
//                     })
//                 }
//             })
//             .catch(err => console.log(err));
//         this.setState(
//             {
//                 visible: false
//             })
//     }
//     render() {
//         return (
//             <Provider>
//                 <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
//                     <View style={{ flex: 30 }}>
//                         <TextInput
//                             placeholder='Username'
//                             mode='outlined'
//                             left={<TextInput.Icon name="account" />}
//                             theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
//                             style={{ padding: 20 }}
//                             value={this.state.email}
//                             onChangeText={email => { this.setState({ email: email }) }}
//                         />
//                         <TextInput
//                             placeholder='Password'
//                             mode='outlined'
//                             secureTextEntry
//                             left={<TextInput.Icon name="lock" />}
//                             theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
//                             style={{ padding: 20 }}
//                             value={this.state.password}
//                             onChangeText={password => { this.setState({ password: password }) }}
//                         />
//                         <TouchableOpacity
//                             style={{
//                                 bottom: 0,
//                                 marginRight: 20,
//                                 justifyContent: 'flex-end',
//                                 alignItems: 'flex-end'
//                             }}>
//                             <Text style={{ color: 'grey' }}>Forgot Password ?</Text>
//                         </TouchableOpacity>
//                         <Text style={{ color: 'red', marginLeft: 40 }}>{this.state.mes}</Text>
//                     </View>
//                     <View style={{ flex: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                         <Button
//                             mode="contained"
//                             onPress={this.login}
//                             color='#134563'
//                             style={{
//                                 width: Dimensions.get('window').width / 3,
//                                 height: Dimensions.get('window').height / 16,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 marginLeft: 20
//                             }}>
//                             Sign In
//                     </Button>
//                     </View>
//                 </View>
//             </Provider>
//         )
//     }
// }