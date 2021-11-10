import React from "react";
import { ScrollView, View, Text, Image, useWindowDimensions, FlatList, SafeAreaView } from 'react-native';
import styles from "./style";
import { Picker } from "@react-native-picker/picker";
import QuantitySeclector from "../../components/QuantitySelector";
import Button from "../../components/Button";
import ImageCarousel from "../../components/ImageCarousel";
import ProductDetailItem from '../../components/ProductDetailItem';
import products from "../../data/products";
import { useRoute } from '@react-navigation/native';
interface DetailProductProps {
    id: string;
    product_id: string;
    quantity: number;
    size: string
}

const DetailScreen = () => {
    const [sizeOption, setSizeOption] = React.useState(1);
    const [selectedOption, setSelectedOption] = React.useState(38);
    const [detailProducts, setDetailProducts] = React.useState<DetailProductProps>([]);
    const [quantity, setQuantity] = React.useState(1);
    const windowWidth = useWindowDimensions().width;

    const route = useRoute();
    const item = route.params.item;
    const url = 'http://10.0.2.2:8000';

    const detailProductArray = item.detail_products;

    // React.useEffect(() => {
    //     const inventory = detailProductArray.filter((e) => {
    //         return e.size == selectedOption;
    //     }).map((l) => {
    //         return l;
    //     });
    //     console.log(inventory[0].quantity);
    // });

    const inventory = detailProductArray.filter((e) => {
        return e.size == selectedOption;
    });

    console.log(inventory[0].quantity);


    return (
        <ScrollView style={styles.root}>
            <Text style={styles.title}>{item.name}</Text>
            <ImageCarousel images={products[item.id-1].images}/>
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
            {inventory[0].quantity === undefined ? null
            : <Text style={{color: 'red'}}>Size này hiện còn {inventory[0].quantity} sản phẩm </Text>}
            {/* <Image style={{
                width: windowWidth - 40,
                margin: 10,
                height: 250,
                resizeMode: 'contain'
            }} source={{ uri: item.image }} /> */}
            <Text style={styles.price}>{item.price} VND</Text>
            {/* <SafeAreaView>
                <FlatList
                    data={detailProducts}
                    renderItem={({ item }) => <ProductDetailItem detail={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView> */}
            <Text style={styles.description}>{item.description}</Text>
            <QuantitySeclector quantity={quantity} setQuantity={setQuantity} />
            <Button text={'Thêm vào giỏ hàng'} onPress={() => { console.log('add to cart') }} />
            <Button text={'Mua ngay'} onPress={() => { console.log('buy now') }} />
        </ScrollView>
    );
};

export default DetailScreen;