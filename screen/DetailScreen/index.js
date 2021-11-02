import React from "react";
import {View, Text} from 'react-native';
import styles from "./style";
import products from "../../data/products";
import { Picker } from "@react-native-picker/picker";
import QuantitySeclector from "../../components/QuantitySelector";

const DetailScreen = () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);
    console.log(selectedOption);
    console.log(quantity);
    return(
        <View>
            <Text style={styles.title}>{products[0].title}</Text>
            <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) =>
                    setSelectedOption(itemValue)
                  }
            >
                <Picker.Item label='java' value='java'/>
                <Picker.Item label='javascript' value='javascript'/>
            </Picker>
            <Text style={styles.price}>{products[0].price} VND</Text>
            <Text style={styles.description}>{products[0].description}</Text>
            <View>
                <QuantitySeclector quantity={quantity} setQuantity={setQuantity}/>
            </View>
        </View>
    );
};

export default DetailScreen;