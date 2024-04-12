import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../../style/Mystyle'
import Apptextinput from '../../common/Login/Apptextinput';
import Button from '../../common/Login/Button';
import Dontuser from '../../common/Login/Dontuser';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux'
import { vetificationemail } from "../../../redux/API/UserAPI";

const Register = () => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpass, setconfirmpass] = useState();
  const [eye, seteye] = useState(true);
  const [eyeConfirm, seteyeConfirm] = useState(true);


  const VetificationRegister = () => {
    try {
      const body = { email, password, name };
      dispatch(vetificationemail(body));
      navigation.navigate('VetificationAccount');
    } catch (error) {
      console.log("Error register-------------------------- :", error)
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
  const textyes = () => {
    return {
      ...styles.fonttille2,
      color: 'black',
      fontSize: 12,
    }
  }
  const textteam = () => {
    return {
      ...styles.fonttille2,
      color: '#009245',
      fontSize: 12,
      fontWeight: 'bold',

    }
  }
  const viewyes = () => {
    return {
      ...styles.alignitems,
      marginHorizontal: 30,
      marginVertical: 15,

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
  const getorDirectionrow = () => {
    return {
      ...styles.flexDirectionrow,
      alignItems: 'center',
      marginTop: 20,
    }
  }
  const getline = () => {
    return {
      ...styles.line,
      marginHorizontal: 20
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
  const geteye = () => {
    return {
      ...styles.eye,
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.flex_1, { backgroundColor: 'white' }]}>
          <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
          <Image style={{ width: '100%', height: 230 }} source={require('../../../resources/img/registerimgbackground.png')} />
          <Text style={getfonttille()}>Đăng ký</Text>
          <Text style={getfonttille2()}>Tạo tài khoản</Text>
          <Apptextinput
            placeholder={'Họ tên'}
            mystyle={{
              border: gettextinput(),
            }}
            value={name}
            onChangeText={setname}
          />
          <Apptextinput
            placeholder={'Email'}
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
              secureTextEntry={eye}
            />

            <TouchableOpacity style={geteye()} onPress={() => seteye(!eye)}>
              {
                eye ?
                  <Image source={require('../../../resources/img/noteye.png')} />
                  :
                  <Image source={require('../../../resources/img/eye.png')} />
              }
            </TouchableOpacity>
          </View>
          <View>
            <Apptextinput
              placeholder={'Xác nhận mật khẩu'}
              mystyle={{
                border: gettextinput(),
              }}
              value={confirmpass}
              onChangeText={setconfirmpass}
              secureTextEntry={eyeConfirm}
            />
            <TouchableOpacity style={geteye()} onPress={() => seteyeConfirm(!eyeConfirm)}>
              {
                eyeConfirm ?
                  <Image source={require('../../../resources/img/noteye.png')} />
                  :
                  <Image source={require('../../../resources/img/eye.png')} />
              }
            </TouchableOpacity>
          </View>

          <View style={viewyes()}>
            <Text style={{}}>
              <Text style={textyes()}>Để đăng ký tài khoản, bạn đồng ý </Text>
              <Text style={textteam()}>Terms & Conditions </Text>
              <Text style={textyes()}>và </Text>
              <Text style={textteam()}>Privacy Policy</Text>
            </Text>
          </View>
          <Button
            mystyle={{

              textbutton: gettextbutton(),
              button: button()
            }}
            title={'Đăng ký'}
            handle={VetificationRegister}
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
            user={'Tôi đã có tài khoản ? '}
            newuser={'Đăng nhập'}
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

export default Register

