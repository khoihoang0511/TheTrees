import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import {UpdatemodalOrderSuccess} from '../../../redux/Reducer'
import { useDispatch,useSelector } from 'react-redux'
import myStyle from '../../style/Mystyle'


const ModalOrdersuccess = ({paySuccess }) => {
   
    const dispatch = useDispatch();
    return (
        <View style={[myStyle.flex_1, { backgroundColor: 'rgba(0, 0, 0, 0.15)' }]}>
            <StatusBar translucent backgroundColor="transparent" />

            <View style={myStyle.viewallmodalcart}>
                <Text style={myStyle.textdetelecart}>Xác nhận thanh toán</Text>
                <Pressable style={myStyle.pressableyes} onPress={() =>{
                    dispatch(UpdatemodalOrderSuccess(false))
                    paySuccess()
                }}>
                    <Text style={myStyle.textpressableyes}>Đồng ý</Text>
                </Pressable>
                <Pressable style={myStyle.viewcancelcart} onPress={() =>dispatch(UpdatemodalOrderSuccess(false))}>
                    <Text style={myStyle.textnamesuccess}>Hủy bỏ</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ModalOrdersuccess

