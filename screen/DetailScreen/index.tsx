import React from "react";
import { Alert, ScrollView, View, Text, Image, useWindowDimensions, FlatList, SafeAreaView } from 'react-native';
import styles from "./style";
import { Picker } from "@react-native-picker/picker";
import QuantitySeclector from "../../components/QuantitySelector";
import Button from "../../components/Button";
import ImageCarousel from "../../components/ImageCarousel";
import ProductDetailItem from '../../components/ProductDetailItem';
import products from "../../data/products";
import { useRoute } from '@react-navigation/native';
import {DataContext} from '../../service/Context'
import { CardStyleInterpolators } from "@react-navigation/stack";

interface DetailProductProps {
    id: string;
    product_id: string;
    quantity: number;
    size: string
}

const DetailScreen = () => {

    const context = React.useContext(DataContext);
    const [selectedOption, setSelectedOption] = React.useState(38);
    const [quantity, setQuantity] = React.useState(1);
    const windowWidth = useWindowDimensions().width;

    const route = useRoute();
    const item = route.params.item;

    const detailProductArray = item.detail_products;

    const inventory = detailProductArray.filter((e) => {
        return e.size == selectedOption;
    });


    return (
        <ScrollView style={styles.root}>
            <Text style={styles.title}>{item.name}</Text>
            {typeof products[item.id-1].images !== undefined ? 
            <ImageCarousel images={products[item.id-1].images}/> :
            <Image style={{
                width: windowWidth - 40,
                margin: 10,
                height: 250,
                resizeMode: 'contain'
            }} source={{ uri: item.image }} /> }
            {/* <ImageCarousel images={products[item.id-1].images}/> */}
            <Text style={{color: 'black'}}>Chọn size</Text>
            <Picker
                useNativeAndroidPickerStyle={false}
                selectedValue={selectedOption}
                onValueChange={(itemValue) =>
                    setSelectedOption(itemValue)}>
                {detailProductArray.map((element) => (
                    <Picker.Item label={element.size.toString()} value={element.size.toString()}/>
                ))}
            </Picker>
            {/* {selectedOption === undefined ? null
            : <Text style={{color: 'red'}}>Size này hiện còn {detailProductArray[Number(selectedOption)-1].quantity} sản phẩm </Text>} */}
            {inventory[0].quantity === 0 ? <Text style={{color: 'red', fontSize: 16}}>Size này hiện đã hết hàng </Text>
            : <Text style={{color: 'red', fontSize: 16}}>Size này hiện còn {inventory[0].quantity} sản phẩm </Text>}
            {/* <Image style={{
                width: windowWidth - 40,
                margin: 10,
                height: 250,
                resizeMode: 'contain'
            }} source={{ uri: item.image }} /> */}
            <Text style={styles.price}>Giá tiền: {(item.price).toLocaleString("vi-VN")} VND</Text>
            {/* <SafeAreaView>
                <FlatList
                    data={detailProducts}
                    renderItem={({ item }) => <ProductDetailItem detail={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView> */}
            <Text style={styles.description}>{item.description}</Text>
            <QuantitySeclector quantity={quantity} setQuantity={setQuantity} />
            <Button text={'Thêm vào giỏ hàng'} onPress={() => { (inventory[0].quantity < quantity || quantity == 0) ?
                Alert.alert("Không thể thêm vào giỏ hàng") : (
                    context.addCart(item.id, selectedOption, quantity),
                    Alert.alert("Thêm vào giỏ hàng thành công")
                     )
                    
                 }}/>
            <Button text={'Mua ngay'} onPress={() => { console.log('buy now') }} />
        </ScrollView>
    );
};

export default DetailScreen;