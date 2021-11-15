import React, { Component, createContext } from 'react';
import axios from 'axios';
import products from '../data/products';

export const DataContext = createContext();

export class DataProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cart: [],
            selectd_quantity: 0,
            selectd_size: 0,
            selectd_color: "",
            total: 0,
            category_product: [],
            user: [],
        }
    }

    componentDidMount() {
        this.getAllproducts()
    };

    getAllproducts = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:8000/api/product`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const result = await response.json();
            this.setState({ products: (result.results) });
        } catch (error) {
            console.log(error);
        }
    };

    addCart = (id, size, quantity) => {
        const { products, cart } = this.state;
        const data1 = products.filter(products => {
            return products.id == id
        })
        //const temp = Object.assign(data1)
        const obj_yourcart = {}
        for (const [key, value] of Object.entries(data1)) {
            //var temp_obj = {}
            for (const [key1, value1] of Object.entries(value)) {
                //console.log("key: ", key1, " value: ", value1)
                if (key1 == "detail_products") {
                    obj_yourcart.size = size
                    obj_yourcart.quantity = quantity
                }
                else {
                    obj_yourcart[key1] = value1
                }
            }
        }
        //console.log("obj_yourcart: ", obj_yourcart)
        this.setState(i => ({
            cart: [...i.cart, obj_yourcart]
        }))
    };
    addSize = (size) => {
        this.setState({ selectd_size: size })
    };
    addQuantity = (quantity) => {
        this.setState({ selectd_quantity: quantity })
    }
    removeProduct = (id) => {
        const { cart } = this.state;
        cart.forEach((item, index) => {
            if (item.id == id) {
                cart.splice(index, 1)
            }
        })
        this.setState({ cart: cart })
        this.getTotal()
    };
    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity)
        }, 0)

        this.setState({ total: res })
    }
    addUser = (user) => {
        this.setState({ user: user });

    }

    render() {
        const { products, cart, selectd_quantity, selectd_size, selectd_color, total, category_product, user } = this.state;
        const { addCart, addSize, addQuantity, removeProduct, getTotal, addUser } = this;
        return (
            <DataContext.Provider value={{
                products, cart, selectd_quantity, selectd_size, total, category_product, user,
                addCart, addSize, addQuantity, removeProduct, getTotal, addUser
            }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
