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
            selectd_color: "",
            total: 0,
            category_product: [],
            user: [],
        }
    }

    componentDidMount() {
        this.getAllproducts()
    };

    getAllproducts = () => {
        // try {
        //     const response = await fetch(`http://10.0.2.2:8000/api/product`, {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json, text/plain, */*',
        //             'Content-Type': 'application/json'
        //         },
        //     });
        //     const result = await response.json();
        //     this.setState({ products: (result.results) });
        // } catch (error) {
        //     console.log(error);
        // }
        axios.get(`http://10.0.2.2:8000/api/product`)
            .then(res => {
                console.log("Data: ", res.data.results.length)
                this.setState({
                    products: res.data.results
                });
                console.log("data: ", res.data.results)
            }).catch(err => {
                console.log("Err: ", err)
            });
    };

    addCart = (id, size, quantity) => {
        const { products} = this.state;
        const data1 = products.filter(products => {
            return products.id == id
        })
        const obj_yourcart = {}
        for (const [key, value] of Object.entries(data1)) {
            for (const [key1, value1] of Object.entries(value)) {
                if (key1 == "detail_products") {
                    obj_yourcart.size = size
                    obj_yourcart.quantity = quantity
                }
                else {
                    obj_yourcart[key1] = value1
                }
            }
        }
        this.setState(i => ({
            cart: [...i.cart, obj_yourcart]
        }))
    };
    clearCart = () => {
        this.setState({cart: []});
    }
    removeProduct = (id) => {
        const { cart } = this.state;
        cart.forEach((item, index) => {
            if (item.id == id) {
                cart.splice(index, 1)
            }
        })
        this.setState({ cart: cart })
    };
    addUser = (user) => {
        this.setState({ user: user });
    }

    render() {
        const { products, cart, total, user } = this.state;
        const { addCart, removeProduct, addUser, clearCart, getAllproducts } = this;
        return (
            <DataContext.Provider value={{
                products, cart, total, user,
                addCart, removeProduct, addUser, clearCart, getAllproducts
            }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
