import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#d1d1d1',
      borderRadius: 10,
      backgroundColor: '#FFF',
      marginVertical: 5
    },
    rightContainer: {
      padding: 10,
      flex: 3
    },
    image: {
      flex: 2,
      height: 130,
      resizeMode: 'contain',
    },
    title:{
      fontSize: 18,

    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10
    }
});

export default styles;