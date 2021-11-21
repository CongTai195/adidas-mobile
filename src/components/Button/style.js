import react from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFF",
        marginVertical: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    text: {
        fontSize: 18,
        color: 'black'
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
})

export default styles;