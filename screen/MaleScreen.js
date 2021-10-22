import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function MaleScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Male Screen</Text>
        <Button
          title="Go to female screen"
          onPress={() => navigation.push("Female")}
        />
        <Button
          title="Go to home screen"
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Go to the first screen"
          onPress={() => navigation.popToTop()}
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

export default MaleScreen;