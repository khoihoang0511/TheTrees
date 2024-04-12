import { View, Text, Image, Pressable } from 'react-native'
import React,{useContext} from 'react'
import Mystyle from '../../style/Mystyle'
import { useNavigation } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import { Updatemodalcart } from '../../../redux/Reducer'


const HeaderCart = (props) => {
    const dispatch = useDispatch();
    const navigation  = useNavigation();
    const { name, img, back } = props;

    return (
        <View style={Mystyle.viewheader}>
            {
                back ? <Pressable style={[Mystyle.flex_1, { alignItems: "flex-start"}]} onPress={()=>navigation.goBack()}><Image style={[, { height: 24, width: 24 }]} source={back} /></Pressable>
                    :
                    <Pressable style={[Mystyle.flex_1, { alignItems: "flex-end" }]}></Pressable>
            }
            <View style={[Mystyle.viewtextheader]}><Text style={Mystyle.textheader}>{name}</Text></View>
            {
                img ? <Pressable style={[Mystyle.flex_1, { alignItems: "flex-end" }]} onPress={()=>dispatch(Updatemodalcart(true))}><Image style={[, { height: 24, width: 24 }]} source={img} /></Pressable>
                    :
                    <Pressable style={[Mystyle.flex_1, { alignItems: "flex-end" }]}></Pressable>
            }
        </View>
    )
}

export default HeaderCart