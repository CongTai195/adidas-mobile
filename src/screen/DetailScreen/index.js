import React from "react";
import { Alert, ScrollView, View, Text, Image, useWindowDimensions, FlatList, SafeAreaView } from 'react-native';
import styles from "./style";
import { Picker } from "@react-native-picker/picker";
import QuantitySeclector from "../../components/QuantitySelector";
import Button from "../../components/Button";
import ImageCarousel from "../../components/ImageCarousel";
import { useRoute } from '@react-navigation/native';
import { DataContext } from '../../service/Context';
import axios from "axios";

const DetailScreen = () => {

    const context = React.useContext(DataContext);
    const [selectedOption, setSelectedOption] = React.useState(38);
    const [quantity, setQuantity] = React.useState(1);
    const windowWidth = useWindowDimensions().width;
    const [product, setProduct] = React.useState([]);

    const route = useRoute();
    const id = route.params.id;

    React.useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = () => {
        axios.get(`http://10.0.2.2:8000/api/product/${id}`)
        //axios.get(`https://shop-adidas.herokuapp.com/api/product/${id}`)
            .then(res => {
                setProduct(res.data.results);;
            }).catch(err => {
                console.log("Err: ", err)
            })
    };

    if (product.length !== 0) {
        const detailProductArray = product[0].detail_products;

        const inventory = detailProductArray.filter((e) => {
            return e.size == selectedOption;
        });
        return (
            <ScrollView style={styles.root}>
                <Text style={styles.title}>{product[0].name}</Text>
                <ImageCarousel images={product[0].image_list.split("; ")}/>
                <Text style={styles.price}>Giá tiền: {(product[0].price).toLocaleString("vi-VN")} VND</Text>
                <Text style={{color: 'black'}}>Chọn size giày của bạn</Text>
                <Picker
                    useNativeAndroidPickerStyle={false}
                    selectedValue={selectedOption}
                    onValueChange={(itemValue) =>
                        setSelectedOption(itemValue)}>
                    {detailProductArray.map((element) => (
                        <Picker.Item label={element.size.toString()} value={element.size.toString()}/>
                    ))}
                </Picker>
                {inventory[0].quantity === 0 ? <Text style={{color: 'red', fontSize: 16}}>Size này hiện đã hết hàng </Text>
                : <Text style={{color: 'red', fontSize: 16}}>Size này hiện còn {inventory[0].quantity} sản phẩm </Text>}
                <Text style={styles.textHeaderInfo}>Mô tả</Text>
                <Text style={styles.description}>{product[0].description}</Text>
                <Text style={styles.textHeaderInfo}>Thông số</Text>
                {
                    product[0].specifications.split(';').map(e => (
                        <Text style={styles.description}>- {e}.</Text>
                    ))
                }
                <Text style={styles.textHeaderInfo}>Số lượng</Text>
                <QuantitySeclector quantity={quantity} setQuantity={setQuantity} />
                <Button text={'Thêm vào giỏ hàng'} onPress={() => { (inventory[0].quantity < quantity || quantity == 0) ?
                    Alert.alert("Không thể thêm vào giỏ hàng") : (
                        context.addCart(product[0].id, selectedOption, quantity),
                        Alert.alert("Thêm vào giỏ hàng thành công")
                         )
                     }}/>
            </ScrollView>
        );
    }
    else return null;
    //const detailProductArray = item.detail_products;

    // const inventory = detailProductArray.filter((e) => {
    //     return e.size == selectedOption;
    // });
};

export default DetailScreen;