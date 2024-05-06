import { Image, ImageBackground, KeyboardAvoidingView, KeyboardAvoidingViewBase, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../../style/Mystyle'
import Appstatusbar from '../../common/Login/Appstatusbar'
import Apptextinput from '../../common/Login/Apptextinput'
import Saveuser from '../../common/Login/Saveuser'
import Button from '../../common/Login/Button'
import Dontuser from '../../common/Login/Dontuser'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../../redux/API/UserAPI";


const Login = () => {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [eye, seteye] = useState(false);
    const [save, setsave] = useState(false)

    const dispatch = useDispatch();
    const appState = useSelector(state => state.app)

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.LONG);
                return false;
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const checkmail = emailRegex.test(email);
            if (!checkmail) {
                ToastAndroid.show("Email không hợp lệ", ToastAndroid.LONG);
                return false;
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
            const checkpassword = passwordRegex.test(password);
            if (!checkpassword) {
                ToastAndroid.show("Mật khẩu phải bao gồm chữ số và ký tự đặt biệt", ToastAndroid.LONG);
                return false;
            }
            
            const body = { email, password };
            const result = await dispatch(login(body));
            if(result.payload){
                ToastAndroid.show("Đăng nhập thành công", ToastAndroid.LONG);
            }else{
                ToastAndroid.show("Tài khoản mật khẩu không đúng", ToastAndroid.LONG);
            }

        } catch (error) {
            console.log("Error login-------------------------- :", error)
        }
    }

    const justifyContentcenter = () => {
        return {
            ...styles.justifyContentcenter
        }
    }

    const textnewaccount = () => {
        return {
            ...styles.flexDirectionrow,
            ...styles.justifyContentcenter,
            padding: 10,
            marginBottom: 40
        }
    }

    const getflex_1 = () => {
        return {
            ...styles.flex_1,
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
    const getflexDirectionend = () => {
        return {
            // ...styles.justifyContentend,
        }
    }
    const geteye = () => {
        return {
            ...styles.eye,
        }
    }
    const getflexDirectionrow = () => {
        return {
            ...styles.flexDirectionrow,
            alignItems: 'center',
            paddingVertical: 10
        }
    }
    const getjustifyContentbetween = () => {
        return {
            ...styles.justifyContentbetween,
            marginHorizontal: 20,
        }
    }
    const gettextforgot = () => {
        return {
            ...styles.fonttille2,
            ...styles.forgot

        }
    }
    const gettextsave = () => {
        return {
            ...styles.textsave
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
    const borderWidth1Px = () => {
        return {
            ...styles.borderWidth1Px
        }
    }
    const gettextor = () => {
        return {
            ...styles.fonttille2,
            color: 'black',
            fontWeight: '600'
        }
    }
    const getor = () => {
        return {
            ...styles.flex_1,
            ...styles.alignitems,
        }
    }
    const getline = () => {
        return {
            ...styles.line,
            marginHorizontal: 20
        }
    }
    const getviewfbgg = () => {
        return {
            ...styles.flexDirectionrow,
            ...styles.justifyContentcenter,
            alignItems: 'center',
            marginVertical: 20

        }
    }
    const getimgggfb = () => {
        return {
            marginHorizontal: 10
        }
    }
    const textdontaccount = () => {
        return {
            color: 'black',
            fontSize: 12
        }
    }
    const textaddaccount = () => {
        return {
            color: '#009245',
            fontSize: 12,
            fontWeight: 'bold'
        }
    }
    const getorDirectionrow = () => {
        return {
            ...styles.flexDirectionrow,
            alignItems: 'center',
            marginTop: 20,
        }
    }





    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.flex_1, { backgroundColor: 'white' }]}>
                    <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
                    <Image
                        style={{ width: '100%', height: 330 }}
                        source={require('../../../resources/img/background.png')}
                    />

                    <Text style={getfonttille()}>Chào mừng bạn</Text>
                    <Text style={getfonttille2()}>Đăng nhập tài khoản</Text>
                    <Apptextinput
                        placeholder={'Nhập email hoặc số điện thoại'}
                        mystyle={{
                            border: gettextinput(),
                        }}
                        value={email}
                        onChangeText={setemail}
                    />
                    <View>
                        <Apptextinput
                            placeholder={'Nhập mật khẩu'}
                            mystyle={{
                                border: gettextinput(),
                            }}
                            value={password}
                            onChangeText={setpassword}
                            secureTextEntry={!eye}
                        />

                        <TouchableOpacity style={geteye()} onPress={() => seteye(!eye)}>
                            {
                                !eye ?
                                    <Image source={require('../../../resources/img/noteye.png')} />
                                    :
                                    <Image source={require('../../../resources/img/eye.png')} />
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={[getflexDirectionrow(), getjustifyContentbetween()]}>
                        <View style={getflexDirectionrow()}>
                            <TouchableOpacity onPress={() => setsave(!save)}>
                                {
                                    save ?
                                        <Image source={require('../../../resources/img/save.png')} />
                                        :
                                        <Image source={require('../../../resources/img/dontsave.png')} />
                                }
                            </TouchableOpacity>
                            <Text style={gettextsave()}>Nhớ tài khoản</Text>
                        </View>
                        <Text style={gettextforgot()}>Forgot password ?</Text>
                    </View>


                    <Button
                        mystyle={{

                            textbutton: gettextbutton(),
                            button: button()
                        }}
                        title={'Đăng nhập'}
                        handle={handleLogin}
                    />

                    <View style={getorDirectionrow()}>
                        <View style={getline()}></View>
                        <View style={getor()}><Text style={gettextor()}>Hoặc</Text></View>
                        <View style={getline()}></View>
                    </View>

                    <View style={getviewfbgg()}>
                        <Image style={getimgggfb()} source={require('../../../resources/img/gg.png')} />
                        <Image style={getimgggfb()} source={require('../../../resources/img/fb.png')} />
                    </View>
                    <Dontuser
                        user={'Bạn không có tài khoản'}
                        newuser={'Tạo tài khoản'}

                        mystyle={{
                            row: textnewaccount(),
                            text: textdontaccount(),
                            textaddaccount: textaddaccount(),
                        }}
                    />

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login

