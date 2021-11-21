import React from 'react';
import {Pressable, View, Text} from 'react-native';
import styles from "./style";
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps {
    text: string;
    onPress: () => void;
}

const Button = ({text, onPress} : ButtonProps) => {
    return(
        <View style={styles.button, { marginVertical: 20 }}>
          <LinearGradient
            colors={['#FFF', '#FFF']}
            style={styles.signIn}
          >
            <Text style={[styles.text, { color: "#000" }]} onPress={onPress}>
              {text}
            </Text>
          </LinearGradient>
        </View>
    );
};

export default Button;