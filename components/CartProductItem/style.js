import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
      borderWidth: 1,
      borderColor: '#d1d1d1',
      borderRadius: 10,
      backgroundColor: '#FFF',
      marginVertical: 5,
      padding: 5,
    },
    row: {
      flexDirection: 'row',
    },
    rightContainer: {
      padding: 10,
      flex: 3
    },
    image: {
      flex: 2,
      height: 170,
      resizeMode: 'contain',
    },
    title:{
      fontSize: 18,

    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5
    },
    quantityContainer:{
      marginVertical: 10
    }
});

export default styles;