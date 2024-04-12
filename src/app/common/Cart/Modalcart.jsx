import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import {Updatemodalcart} from '../../../redux/Reducer'
import { useDispatch,useSelector } from 'react-redux'
import myStyle from '../../style/Mystyle'


const Modalcart = ({deleteall}) => {
    const dispatch = useDispatch();
    return (
        <View style={[myStyle.flex_1, { backgroundColor: 'rgba(0, 0, 0, 0.15)' }]}>
            <StatusBar translucent backgroundColor="transparent" />

            <View style={myStyle.viewallmodalcart}>
                <Text style={myStyle.textdetelecart}>Xác nhận xoá tất cả đơn hàng?</Text>
                <Text style={myStyle.textwarningcart}>Thao tác này sẽ không thể khôi phục.</Text>
                <Pressable style={myStyle.pressableyes} onPress={() =>{
                    deleteall()
                    dispatch(Updatemodalcart(false))
                }}>
                    <Text style={myStyle.textpressableyes}>Đồng ý</Text>
                </Pressable>
                <Pressable style={myStyle.viewcancelcart} onPress={() =>dispatch(Updatemodalcart(false))}>
                    <Text style={myStyle.textnamesuccess}>Hủy bỏ</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Modalcart

