import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../data/Appcontext';

const Button = (props) => {
    // const { islogin, setislogin } = useContext(AppContext);
    const { mystyle, title,handle } = props;
    return (
        <TouchableOpacity onPress={handle}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 11 }} colors={['#007537', 'white']} style={mystyle.button} >
                <Text style={mystyle.textbutton}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>

    )
}

export default Button