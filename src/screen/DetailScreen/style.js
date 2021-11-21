import { StyleSheet } from "react-native"
import { black } from "react-native-paper/lib/typescript/styles/colors";
const styles = StyleSheet.create({
    root: {
      padding: 10,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold'
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 10,
      textAlign: 'right'
    },
    description: {
      color: 'black',
      lineHeight: 20,
      marginLeft: 10,
      fontSize: 15
    },
    textHeaderInfo: {
      color: 'black',
      fontSize: 18,
      marginTop: 10,
      fontWeight: 'bold'
    }
});

export default styles;