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
import { ENV } from '../../const/env';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DetailScreen = () => {

    const context = React.useContext(DataContext);
    const [selectedOption, setSelectedOption] = React.useState(38);
    const [quantity, setQuantity] = React.useState(1);
    const windowWidth = useWindowDimensions().width;
    const [product, setProduct] = React.useState([]);
    const [comments, setComment] = React.useState([]);

    const Separator = () => (
        <View style={styles.separator} />
      );

    const route = useRoute();
    const id = route.params.id;
    let avgRating = 0;

    React.useEffect(() => {
        fetchProduct();
        fetchComment();
    }, [id]);

    const fetchProduct = () => {
        //axios.get(`http://10.0.2.2:8000/api/product/${id}`)
        axios.get(`${ENV.BASE_URL}product/${id}`)
            .then(res => {
                setProduct(res.data.results);;
            }).catch(err => {
                console.log("Err: ", err)
            })
    };

    const fetchComment = () => {
        //axios.get(`http://10.0.2.2:8000/api/product/${id}`)
        axios.get(`${ENV.BASE_URL}comment/${id}`)
            .then(res => {
                setComment(res.data.results);;
            }).catch(err => {
                console.log("Err: ", err)
            })
    };


    if (product.length !== 0) {
        if (comments.length !== 0) {
            comments.map(comment => {
                avgRating += comment.star
            })
            avgRating /= comments.length;
        }
        const detailProductArray = product[0].detail_products.sort();
        const inventory = detailProductArray.filter((e) => {
            return e.size == selectedOption;
        });
        return (
            <ScrollView style={styles.root}>
                <Text style={styles.title}>{product[0].name}</Text>
                <ImageCarousel images={product[0].image_list.split(";")} />
                <Text style={styles.price}>Giá tiền: {(product[0].price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                <Text style={{ color: 'black' }}>Chọn size giày của bạn</Text>
                <Picker
                    useNativeAndroidPickerStyle={false}
                    selectedValue={selectedOption}
                    onValueChange={(itemValue) =>
                        setSelectedOption(itemValue)}>
                    {detailProductArray.map((element) => (
                        <Picker.Item label={element.size.toString()} value={element.size.toString()} />
                    ))}
                </Picker>
                {inventory[0].quantity === 0 ? <Text style={{ color: 'red', fontSize: 16 }}>Size này hiện đã hết hàng </Text>
                    : <Text style={{ color: 'red', fontSize: 16 }}>Size này hiện còn {inventory[0].quantity} sản phẩm </Text>}
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
                <Button text={'Thêm vào giỏ hàng'} onPress={() => {
                    (inventory[0].quantity < quantity || quantity == 0) ?
                    Alert.alert("Không thể thêm vào giỏ hàng") : (
                        context.addCart(product[0].id, selectedOption, quantity),
                        Alert.alert("Thêm vào giỏ hàng thành công")
                    )
                }} />
                <Text style={styles.textHeaderInfo}>Đánh giá</Text>
                <View style={styles.ratingsContainer}>
                <Text style={styles.avgRating}>{Math.round(avgRating * 100) / 100} trên 5</Text>
                                {[0, 0, 0, 0, 0].map((el, i) => (
                                    <FontAwesome
                                        key={`${id}-${i}`}
                                        style={styles.star}
                                        name={i < Math.floor(avgRating) ? 'star' : 'star-o'}
                                        size={18}
                                        color={'#e47911'}
                                    />
                                ))}
                            </View>
                <Text style={styles.avgRating}>({comments.length} đánh giá)</Text>
                {
                    comments.length !== 0 ? comments.map(comment => (
                        <View style={styles.comment}>
                            <Text style={styles.description}>{comment.content}</Text>
                            <View style={styles.ratingsContainer}>
                                {[0, 0, 0, 0, 0].map((el, i) => (
                                    <FontAwesome
                                        key={`${id}-${i}`}
                                        style={styles.star}
                                        name={i < Math.floor(comment.star) ? 'star' : 'star-o'}
                                        size={18}
                                        color={'#e47911'}
                                    />
                                ))}
                            </View>
                            <Separator/>
                        </View>
                    )) : (
                        <Text>
                        </Text>
                    )
                }
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