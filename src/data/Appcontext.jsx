import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const { children } = props;
    const [listproduct, setlistproduct] = useState(dataproducts)
    const [listnotification, setlistnotification] = useState(datanotification)
    const [listcart, setlistcart] = useState(datancart)
    const [islogin, setislogin] = useState(false);
    const [modal, setmodal] = useState(false)
    return (
        <AppContext.Provider
            value={{
                listproduct, setlistproduct,
                islogin, setislogin,
                listnotification, setlistnotification,
                listcart, setlistcart,
                modal, setmodal,
            }}>
            {children}
        </AppContext.Provider>
    )
}


var  datancart = [
    {
        id:1,
        title:"Lorem ipsum dolor sit amet",
    },
    {
        id:2,
        title:"Lorem ipsum dolor sit amet",
    },
    {
        id:3,
        title:"Lorem ipsum dolor sit amet",
    }
]

var  datanotification = [
    {
        id:1,
        title:"Lorem ipsum dolor sit amet",
    },
    {
        id:2,
        title:"Lorem ipsum dolor sit amet",
    },
    {
        id:3,
        title:"Lorem ipsum dolor sit amet",
    }
]
var dataproducts = [
    {
        "_idproduct": 1,
        "name": "Vale",
        "price": 3,
        "size": "3XL",
        "origin": "Isuzu",
        "status": true,
        "plant_varieties": "Pikangikum",
        "images": "http://dummyimage.com/196x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 2,
        "name": "Boniface",
        "price": 60,
        "size": "XS",
        "origin": "Toyota",
        "status": true,
        "plant_varieties": "Stara Zagora",
        "images": "http://dummyimage.com/140x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 3,
        "name": "Allard",
        "price": 24,
        "size": "XL",
        "origin": "BMW",
        "status": true,
        "plant_varieties": "Yoro",
        "images": "http://dummyimage.com/179x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 4,
        "name": "Shermie",
        "price": 69,
        "size": "XS",
        "origin": "Mercedes-Benz",
        "status": false,
        "plant_varieties": "Atauro",
        "images": "http://dummyimage.com/106x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 5,
        "name": "Hamilton",
        "price": 8,
        "size": "M",
        "origin": "Nissan",
        "status": false,
        "plant_varieties": "Baracoa",
        "images": "http://dummyimage.com/169x100.png/5fa2dd/ffffff"
    }, {
        "_idproduct": 6,
        "name": "Louisette",
        "price": 40,
        "size": "S",
        "origin": "Mazda",
        "status": false,
        "plant_varieties": "Lamen Bay",
        "images": "http://dummyimage.com/131x100.png/cc0000/ffffff"
    }]