import { View, Text, TextInput, Pressable, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import myStyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import Button from '../../common/Login/Button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider, FormattedNumber } from 'react-intl';


const PayStask = ({ route }) => {
  var { sum } = route.params;
  const navigation = useNavigation();
  const appState = useSelector((state) => state.app);

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [address, setaddress] = useState();
  const [phone, setphone] = useState();
  const [pressablenext, setpressablenext] = useState(0);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [sendExpress, setsendExpress] = useState();
  const [sendPay, setsendPay] = useState()

  const [priceExpress, setpriceExpress] = useState()


  useEffect(() => {
    setname(appState.user.name)
    setemail(appState.user.email)
    setaddress(appState.user.address)
    setphone(appState.user.phone)
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  var listpay = [
    { name: 'THANH TOÁN KHI NHẬN HÀNG', selected: true },
    { name: 'THẺ VISA/MASTERCARD', selected: false },
    { name: 'THẺ ATM', selected: false },

  ]

  var express = [
    {
      id: 1,
      nameexpress: "Giao hàng nhanh - 15.000đ",
      timeexpress: "Dự kiến giao hàng 5-7/9",
      priceExpress: "15000",
      status: true,
    },
    {
      id: 2,
      nameexpress: "Giao hàng COD - 20.000đ",
      timeexpress: "Dự kiến giao hàng 4-8/9",
      priceExpress: "20000",
      status: false,
    }
  ]
  const [pay, setpay] = useState(listpay)
  const [listexpress, setlistexpress] = useState(express)

  const selectedExpress = (index) => {
    const updatedExpress = listexpress.map((item, i) => {
      if (i === index) {
        return { ...item, status: true };
      } else {
        return { ...item, status: false };
      }
    });
    setlistexpress(updatedExpress);
  }
//lọc phương thức giao hàng dược chọn
  useEffect(() => {
    const chooseExpressproduct = listexpress.filter(item => item.status == true);
    setsendExpress(chooseExpressproduct);
    setpriceExpress(chooseExpressproduct[0].priceExpress)
  }, [listexpress])




  // Hàm xử lý sự kiện khi nhấn vào một môn học
  const handlePresspay = (index) => {
    const updatedpay = pay.map((item, i) => {
      // Chỉ đặt môn học được nhấn thành trạng thái đã chọn
      if (i === index) {
        return { ...item, selected: true };
      } else {
        // Đặt các môn học khác về trạng thái chưa chọn
        return { ...item, selected: false };
      }
    });
    setpay(updatedpay);
  };
//lọc phương thức thanh toán dược chọn
  useEffect(() => {
    const selectedPay = pay.filter(item => item.selected == true);
    setsendPay(selectedPay)
  }, [pay])






  const handlePress = () => {
    var check = 0;
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
      check++;
    }
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
      check++;
    }
    if (!phone) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
      check++;
    }
    if (!address) {
      setAddressError(true);
    } else {
      setAddressError(false);
      check++;
    }
    if (check == 4) {
      var listprofile = {
        name: name,
        email: email,
        phone: phone,
        address: address
      }
      var itemExpress = [...sendExpress]
      var itemPay = [...sendPay]
      var pricepay=[
        {
          sum:sum,
          priceExpress:priceExpress
        }
      ]
      navigation.navigate('Paynextstask', {
        listprofile: listprofile,
        itemExpress: itemExpress,
        itemPay: itemPay,
        pricepay:pricepay,
      });
    }

  };




  return (
    <View style={[myStyle.flex_1, { backgroundColor: 'white' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[myStyle.flex_1, { marginBottom: 220 }]}>
          <Header
            name={'Thanh toán'}
            back={require('../../../resources/img/left.png')} />
          <View style={myStyle.viewinputpay}>
            <View style={myStyle.titlepay}>
              <Text style={myStyle.texttitlepay}>Thông tin khách hàng</Text>
            </View>
            <TextInput
              placeholder="Họ và tên"
              value={name}
              onChangeText={name => setname(name)}
              style={myStyle.inputprofile}
            />
            {
              nameError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập họ và tên</Text>
            }
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={email => setemail(email)}
              style={myStyle.inputprofile}
            />
            {
              emailError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập email</Text>
            }
            <TextInput
              placeholder="Địa chỉ"
              value={address}
              onChangeText={address => setaddress(address)}
              style={myStyle.inputprofile}
            />
            {
              addressError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập địa chỉ</Text>
            }
            <TextInput
              placeholder="Số điện thoại"
              value={phone}
              onChangeText={phone => setphone(phone)}
              style={myStyle.inputprofile}
            />
            {
              phoneError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập số điện thoại</Text>
            }
            <View style={myStyle.titlepay}>
              <Text style={myStyle.texttitlepay}>Phương thức vẩn chuyển</Text>
            </View>

            {
              listexpress.map((item, index) => (

                <Pressable style={myStyle.viewtransport} key={index} onPress={() => {
                  selectedExpress(index)
                }}>
                  <View>
                    <Text style={[myStyle.texttransport, { color: item.status ? "#007537" : "#7D7B7B" }]}>{item.nameexpress}</Text>
                    <Text style={myStyle.textexpected}>{item.timeexpress}</Text>
                  </View>
                  {
                    item.status == true ?
                      <Image resizeMode='contain' source={require('../../../resources/img/tickpay.png')} />
                      :
                      <View></View>
                  }
                </Pressable>

              ))
            }

            {/* --------------------------------- */}
            <View style={myStyle.titlepay}>
              <Text style={myStyle.texttitlepay}>Hình thức thanh toán</Text>
            </View>
            {
              pay.map((item, index) => (
                <Pressable style={[myStyle.viewtransport]} key={index} onPress={() => handlePresspay(index)}>
                  <View style={{ paddingTop: 6 }}>
                    <Text style={[myStyle.texttransport, { color: item.selected ? "#007537" : "#7D7B7B" }]}>{item.name} </Text>
                  </View>
                  {
                    item.selected ? <Image resizeMode='contain' source={require('../../../resources/img/tickpay.png')} />
                      :
                      <View></View>
                  }
                </Pressable>
              ))
            }
          </View>
        </View>
      </ScrollView>
      {
        !isKeyboardVisible &&
        <View style={myStyle.viewallpaytotalcost}>
          <View style={myStyle.viewpaytotalcost}>
            <Text style={myStyle.textexpected}>Tạm tính</Text>
            <IntlProvider locale="vi">
              <Text style={myStyle.textpay}>
                <FormattedNumber
                  value={sum}
                  style="currency"
                  currency="VND"
                  currencyDisplay="symbol"
                  minimumFractionDigits={0}
                />
              </Text>
            </IntlProvider>
          </View>
          <View style={myStyle.viewpaytotalcost}>
            <Text style={myStyle.textexpected}>Chi phí vận chuyển</Text>
            <IntlProvider locale="vi">
              <Text style={myStyle.textpay}>
                <FormattedNumber
                  value={priceExpress}
                  style="currency"
                  currency="VND"
                  currencyDisplay="symbol"
                  minimumFractionDigits={0}
                />
              </Text>
            </IntlProvider>
          </View>
          <View style={myStyle.viewpaytotalcost}>
            <Text style={myStyle.textexpected}>Tổng cộng</Text>
            <IntlProvider locale="vi">
              <Text style={myStyle.textpay}>
                <FormattedNumber
                  value={parseInt(sum) + parseInt(priceExpress)}
                  style="currency"
                  currency="VND"
                  currencyDisplay="symbol"
                  minimumFractionDigits={0}
                />
              </Text>
            </IntlProvider>
          </View>
          <Pressable style={[myStyle.pressablecart, { marginTop: 20 }]} onPress={() => handlePress()}>
            <Text style={myStyle.textpaycart}>TIẾP TỤC</Text>
          </Pressable>
        </View>
      }
    </View>
  )
}

export default PayStask
