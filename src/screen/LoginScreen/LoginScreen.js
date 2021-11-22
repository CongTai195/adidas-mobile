import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { DataContext } from "../../service/Context";
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



function LoginScreen() {

  const navigation = useNavigation();

  const context = useContext(DataContext);
  const user = context.user;

  const [data, setData] = useState({
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
  const updateSecureEntry = () => {
    setData({
      secureTextEntry: !data.secureTextEntry
    });
  }

  const login = async () => {
    // try {
    //   const obj = { email: data.userName, password: data.password };
    //   const response = await fetch('http://10.0.2.2:8000/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(obj)
    //   });
    //   const result = await response.json();
    //   if (result.status == "OK") {
    //     Alert.alert("Đăng nhập thành công");
    //     context.addUser(result.results.info);
    //     await AsyncStorage.setItem('@storage_Key', result.results.token);
    //   }
    //   if (result.status == "NG") {
    //     Alert.alert("Đăng nhập không thành công");
    //     console.log(result);
    //   }
    // }
    // catch (err) {
    //   console.log(err);
    // }
    const loginData = { email: data.userName , password: data.password }
    axios.post('http://10.0.2.2:8000/api/login', loginData)
      .then(res => {
        if (res.data.status == "OK") {
          context.addUser(res.data.results.info);
          Alert.alert("Đăng nhập thành công");
          AsyncStorage.setItem('@storage_Key', res.data.results.token);
        }
      })
      .catch(err => {
        alert(err);
      });
  }
  if (user.length == 0) {
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
  } else {
    return (
      <ProfileScreen name={user.name} phone={user.phone} email={user.email} address={user.address} />
    );
  }
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