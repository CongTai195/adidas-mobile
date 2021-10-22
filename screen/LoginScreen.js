import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function LoginScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Đăng nhập để tiếp tục</Text>
        <Button
          title="Đăng nhập"
          onPress={() => {}}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default LoginScreen;