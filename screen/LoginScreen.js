import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../components/context';


function LoginScreen({ navigation }) {

  const [data, setData] = React.useState({
    userName: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  const {signIn} = React.useContext(AuthContext);

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
            <Text style={[styles.textSign, { color: "#FFF" }]} onPress={() => { loginHandle(data.userName, data.password)}}>
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
            <Text style={[styles.textSign, { color: "#FFF" }]} onPress={() => { navigation.navigate("Home") }}>
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