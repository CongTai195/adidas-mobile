import React from "react";
import { Alert, ScrollView, TextInput, View, TouchableOpacity, Text, StyleSheet, Image, useWindowDimensions, FlatList, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DataContext } from '../../service/Context';
import Button from "../components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../const/env';
import { useNavigation } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';

const CommentScreen = () => {

    const route = useRoute();
    const id = route.params.id;
    const navigation = useNavigation();
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState("");

    const ratingCompleted = (rating) => {
        setRating(rating);
    }

    const sendComment = async () => {
        try {
            const response = await fetch(`${ENV.BASE_URL}comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@storage_Key')
                },
                body: JSON.stringify({
                    product_id: id,
                    star: rating,
                    content: comment.toString()
                })
            });
            const result = await response.json();
            if (result.status == "OK") {
                Alert.alert("Đánh giá thành công");
                navigation.goBack();
            }
            if (result.status == "NG") {
                Alert.alert("Đánh giá không thành công");
                console.log(result)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.root, { margin: 20, }}>
            <Rating
                onFinishRating={ratingCompleted}
                style={{ paddingVertical: 10 }}
            />
            <TextInput
                style={styles.input}
                placeholder="Nhập bình luận của bạn"
                multiline={true}
                numberOfLines={5}
                onChangeText={(text) => setComment(text)}
                value={comment} />
            <TouchableOpacity
                style={styles.button}
                onPress={sendComment}
            >
                <Text style={{color: "white"}}>Gửi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        textAlignVertical: "top",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white"
    },
  button: {
    alignItems: "center",
    backgroundColor: "#EE4D2D",
    padding: 10,
  }
});


export default CommentScreen;