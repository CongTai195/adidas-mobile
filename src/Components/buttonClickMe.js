import React from "react";
import {
    TouchableOpacity,
    StyleSheet, Text
} from "react-native";

export const ButtonClickMe = ({onPress}) => {
    const handlePressClickMe = () => {
        onPress();
    }

    return (
        <TouchableOpacity style={styles.buttonClickMe} onPress={handlePressClickMe}>
            <Text>
                Click Me
            </Text>
        </TouchableOpacity>
    );
}

export const ButtonLearnMore = ({onPress}) => {
    const handlePressClickMe = () => {
        onPress();
    }

    return (
        <TouchableOpacity  style={styles.buttonClickMe} onPress={handlePressClickMe}>
            <Text>
                Learn More 
            </Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    buttonClickMe:{
        marginTop: 20,
        borderColor: "#000",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
      }
});