import * as React from 'react';
import { FlatList,Pressable, View, Text, StyleSheet, TextInput, RadioButton, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { DataContext } from '../service/Context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TranScreen() {
  const context = React.useContext(DataContext);

  const [tranItem, setTranItem] = React.useState([]);

  const navigation = useNavigation();

  const user = context.user;

  const cart = context.cart;

  React.useEffect(() => {
    getTran();
  }, [user.id, cart.length]);

  const getTran = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/transaction/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('@storage_Key')
        },
      });
      const result = await response.json();
      setTranItem(result.results);
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <Text style={styles.text_header}> Theo dõi đơn hàng </Text>
        <FlatList
          data={tranItem.reverse()}
          renderItem={({ item }) => (
            <Pressable onPress={() => {
              navigation.navigate('DetailTran', {item: item});
            }}>
              <View style={styles.root}>
                {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
                <View style={styles.rightContainer}>
                  <Text style={styles.title} numberOfLines={3}>
                    Đơn hàng ngày {item.created_at.slice(0,10)} trị giá {item.amount.toLocaleString('vi-VN')} VND
                </Text>
                </View>
              </View>
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 20
  },
  text_header: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16
  },
  action: {
    flexDirection: "row",
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
  title: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 30
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
  },
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5
  },
  rightContainer: {
    padding: 10,
    flex: 3
  },
});

export default TranScreen;