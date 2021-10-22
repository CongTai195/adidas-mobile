import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Title, Caption, Paragraph, Drawer, Text } from "react-native-paper";

export function DrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.logoSection}>
                        <Image style={styles.logo} source={require('D:/Documents/Project/Welcome/src/image/adidasLogo.jpg')}/>
                    </Drawer.Section>

                    <Drawer.Section>
                        <DrawerItem
                            // icon={(color, size) => (
                            //     <Icon name="exit-to-app"
                            //     color={color}
                            //     size={size}/>
                            //)}
                            label="TRANG CHỦ"
                            onPress={() => {
                                props.navigation.navigate("Home")
                             }}
                        />
                        <DrawerItem
                            // icon={(color, size) => (
                            //     <Icon name="exit-to-app"
                            //     color={color}
                            //     size={size}/>
                            //)}
                            label="NAM"
                            onPress={() => { 
                                props.navigation.navigate("Male")
                             }}
                        />
                        <DrawerItem
                            // icon={(color, size) => (
                            //     <Icon name="exit-to-app"
                            //     color={color}
                            //     size={size}/>
                            //)}
                            label="NỮ"
                            onPress={() => { 
                                props.navigation.navigate("Female")
                             }}
                        />
                    </Drawer.Section>

                    <Drawer.Section>
                        <DrawerItem
                            // icon={(color, size) => (
                            //     <Icon name="exit-to-app"
                            //     color={color}
                            //     size={size}/>
                            //)}
                            label="Thông tin của tôi"
                            onPress={() => {
                                props.navigation.navigate("Login")
                             }}
                        />
                        <DrawerItem
                            // icon={(color, size) => (
                            //     <Icon name="exit-to-app"
                            //     color={color}
                            //     size={size}/>
                            //)}
                            label="Trình Định Vị Cửa Hàng"
                            onPress={() => { 
                               // props.navigation.navigate("Male")
                             }}
                        />
                        <DrawerItem
                            // icon={(color, size) => (
                            //     <Icon name="exit-to-app"
                            //     color={color}
                            //     size={size}/>
                            //)}
                            label="ĐĂNG KÝ BẢN TIN"
                            onPress={() => { 
                                //props.navigation.navigate("Female")
                             }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {/* <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    // icon={(color, size) => (
                    //     <Icon name="exit-to-app"
                    //     color={color}
                    //     size={size}/>
                    //)}
                    label="Sign Out"
                    onPress={() => { }}
                />
            </Drawer.Section> */}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInforSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    logo: {
        height: 80,
        width: 120,
    },
    logoSection:{
        alignItems: "center"
    }
});
{/* <View style={styles.userInforSection}>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Avatar.Image source={{
                                uri: './src/image/maleModel.jpg'
                            }}
                                size={50}>
                            </Avatar.Image>
                            <View style={{ flexDirection: "column", marginLeft: 15 }}>
                                <Title style={styles.title}>Dinh Cong Tai</Title>
                                <Caption style={styles.caption}>Say something</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                    80
                                </Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>
                                    100
                                </Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View>
                    </View> */}