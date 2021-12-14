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
    },
    comment: {
      marginVertical: 0,
      backgroundColor: "#f5f5f5"
    },
    ratingsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10
    },
    star: {
      margin: 2,
    },
    avgRating: {
      color: 'black',
      marginRight: 10
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#000',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default styles;