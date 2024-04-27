import { Dimensions, Image, KeyboardAvoidingView, Pressable, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../../style/Mystyle'
import Apptextinput from '../../common/Login/Apptextinput';
import Button from '../../common/Login/Button';
import Dontuser from '../../common/Login/Dontuser';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../../../redux/API/UserAPI";

const VetificationRegister = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [vetifacation, setvetifacation] = useState();



    const registerapp = async () => {
        try {
            const code = vetifacation;
            const result = await dispatch(register(code))
            if (result.payload) {
                ToastAndroid.show("Đăng ký thành công", ToastAndroid.LONG);
            } else {
                ToastAndroid.show("Mã xác nhận không hợp lệ", ToastAndroid.LONG);
            }

        } catch (error) {
            console.log("Error vetification-------------------------- :", error)
        }
    }

    const getfonttille = () => {
        return {
            ...styles.fonttille,
            fontSize: 30,
            color: 'black',
            alignSelf: "center"

        }
    }
    const getfonttille2 = () => {
        return {
            ...styles.fonttille2,
            ...styles.alignself,
            marginBottom: 10,
            fontSize: 18,
            fontWeight: '600'

        }
    }
    const gettextinput = () => {
        return {
            ...styles.textinput,
            ...styles.fonttille2,
            fontSize: 12,
        }
    }


    const gettextbutton = () => {
        return {
            ...styles.fonttille,
            color: 'white',
            fontSize: 16,
            alignSelf: "center"

        }
    }
    const button = () => {
        return {
            ...styles.button
        }
    }


    return (
        <View style={[styles.flex_1, { backgroundColor: 'white' }]}>

            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
            <Image style={{ width: '100%', height: 230 }} source={require('../../../resources/img/registerimgbackground.png')} />
            <View style={{ marginTop: 70 }}>
                <Text style={getfonttille()}>Xác thực tài khoản</Text>
                <Text style={getfonttille2()}>Vui lòng kiểm tra email</Text>
                <Apptextinput
                    placeholder={'Nhập mã xác thực'}
                    mystyle={{
                        border: gettextinput(),
                    }}
                    value={vetifacation}
                    onChangeText={setvetifacation}
                />

                <View style={{ marginTop: 30 }}>
                    <Button
                        mystyle={{

                            textbutton: gettextbutton(),
                            button: button()
                        }}
                        title={'Xác nhận'}
                        handle={registerapp}
                    />
                </View>
            </View>
        </View>
    )
}

export default VetificationRegister

