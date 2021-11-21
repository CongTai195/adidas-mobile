import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, useWindowDimensions} from 'react-native';

const ImageCarousel = ({images} : {images : string[]}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const windowWidth = useWindowDimensions().width;

    const onFlatListUpdate = React.useCallback(({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index || 0);
        }
    }, []);

    return(
        <View style={styles.root}>
            <FlatList 
                data={images}
                renderItem={({item}) => (
                    <Image style={[styles.image, {width:windowWidth - 40}]} source={{uri: item}}/>
                )} 
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={windowWidth - 20}
                snapToAlignment={'center'}
                decelerationRate={'fast'}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 50,
                }}
                onViewableItemsChanged={onFlatListUpdate}
            />
            <View style={styles.dots}>
                {images.map((image, index) => (
                    <View 
                        style={[styles.dot, {
                            backgroundColor: index == activeIndex ? "#a8a8a8" : "#ededed"
                        }]}
                        />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root:{

    },
    image:{
        margin: 10,
        height: 350,
        resizeMode: 'contain'
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 25,
        borderColor: "#c9c9c9",
        backgroundColor: '#ededed',
        borderWidth: 1,
        margin: 5,
    },
    dots: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ImageCarousel;