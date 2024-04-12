import { View, Text, TextInput, Image, Pressable, ScrollView, Keyboard, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import myStyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { useNavigation } from '@react-navigation/native'
import { IntlProvider, FormattedNumber } from 'react-intl';
import ModalOrdersuccess from '../../common/Ordersuccess/ModalOrdersuccess'
import { useDispatch, useSelector } from 'react-redux';
import { UpdatemodalOrderSuccess } from '../../../redux/Reducer'


const Paynextstask = ({route}) => {
  const { listprofile, itemExpress, itemPay,pricepay } = route.params;
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  console.log(appState.modalOrderSuccess)

  const [numberatm, setnumberatm] = useState();
  const [name, setname] = useState()
  const [expiration, setexpiration] = useState();
  const [cvv, setcvv] = useState();

  const [numberatmError, setnumberatmError] = useState(false);
  const [namelError, setnamelError] = useState(false);
  const [expirationError, setexpirationError] = useState(false);
  const [cvvError, setcvvError] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const handleTextChange = (inputText) => {
    // Chuyển đổi văn bản nhập thành chữ hoa
    const upperCaseText = inputText.toUpperCase();
    setname(upperCaseText);
  };

  const handleTextInputChange = (input) => {
     // Loại bỏ tất cả các ký tự không phải là số
    const cleaned = ('' + input).replace(/\D/g, '');
    
    // Thêm dấu cách sau mỗi 4 chữ số
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setnumberatm(formatted);
  };

  const handlePress = () => {
    var check = 0;
    if (!numberatm) {
      setnumberatmError(true);
    } else {
      setnumberatmError(false);
      check++;
    }
    if (!name) {
      setnamelError(true);
    } else {
      setnamelError(false);
      check++;
    }
    if (!expiration) {
      setexpirationError(true);
    } else {
      setexpirationError(false);
      check++;
    }
    if (!cvv) {
      setcvvError(true);
    } else {
      setcvvError(false);
      check++;
    }
    if(check == 4){
      dispatch(UpdatemodalOrderSuccess(true))
    }

  };

  const paySuccess=()=>{
      navigation.navigate("Ordersuccess",{
        listprofile: listprofile,
        itemExpress: itemExpress,
        itemPay: itemPay,
        pricepay:pricepay,
      });
  }

  return (

    <View style={[myStyle.flex_1, { backgroundColor: 'white' }]}>
      <View style={myStyle.flex_1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{marginBottom:'50%',paddingBottom:20}}>
            <Header
              name={'Thanh toán'}
              back={require('../../../resources/img/left.png')} />
            <View style={{ marginHorizontal: '8%' }}>
              <View style={myStyle.titlepay}>
                <Text style={myStyle.texttitlepay}>Nhập thông tin thẻ</Text>
              </View>
              <TextInput
                placeholder="Nhập số thẻ"
                value={numberatm}
                keyboardType='number-pad'
                onChangeText={handleTextInputChange}
                style={myStyle.inputprofile}
              />
              {
                numberatmError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập số thẻ</Text>
              }
              <TextInput
                placeholder="Tên chủ thẻ"
                value={name}
                onChangeText={handleTextChange}
                style={myStyle.inputprofile}
                autoCapitalize='characters'
              />
              {
                namelError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập tên chủ thẻ</Text>
              }
              <TextInput
                placeholder="Ngày hết hạn (MM/YY)"
                value={expiration}
                onChangeText={expiration => setexpiration(expiration)}
                style={myStyle.inputprofile}
                
              />
              {
                expirationError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập ngày hết hạn</Text>
              }
              <View style={myStyle.viewinputnextpay}>
                <TextInput
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={cvv => setcvv(cvv)}
                  style={[myStyle.inputpaynext, { width: '100%' }]}
                  keyboardType='number-pad'
                />

                <Image style={myStyle.icwarningpay} source={require('../../../resources/img/warningpay.png')} />
              </View>
              {
                cvvError && <Text style={myStyle.textinputerrorpay}>Vui lòng nhập số cvv</Text>
              }
              <View>
                <View style={myStyle.viewtitlenextpay}>
                  <Text style={myStyle.texttitlepay}>Thông tin khách hàng</Text>
                  <Pressable onPress={()=>navigation.goBack()}>
                    <Text style={myStyle.textexpected}>Chỉnh sửa</Text>
                  </Pressable>
                </View>
                <Text style={myStyle.textnamenextpay}>{listprofile.name}</Text>
                <Text style={myStyle.textnamenextpay}>{listprofile.email}</Text>
                <Text style={myStyle.textnamenextpay}>{listprofile.address}</Text>
                <Text style={myStyle.textnamenextpay}>{listprofile.phone}</Text>
              </View>
              <View>
                <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                  <Text style={myStyle.texttitlepay}>Phương thức vận chuyển</Text>
                  <Pressable onPress={()=>navigation.goBack()}>
                    <Text style={myStyle.textexpected}>Chỉnh sửa</Text>
                  </Pressable>
                </View>
                <Text style={myStyle.textexpected}>{itemExpress[0].nameexpress}</Text>
                <Text style={[myStyle.textexpected, { marginTop: 5 }]}>({itemExpress[0].timeexpress})</Text>
              </View>
              <View>
                <View style={[myStyle.viewtitlenextpay, { marginBottom: 15 }]}>
                  <Text style={myStyle.texttitlepay}>Phương thức thanh toán</Text>
                  <Pressable onPress={()=>navigation.goBack()}>
                    <Text style={myStyle.textexpected}>Chỉnh sửa</Text>
                  </Pressable>
                </View>
                <Text style={myStyle.textexpected}>{itemPay[0].name}</Text>
              </View>
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
                  value={pricepay[0].sum}
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
                  value={pricepay[0].priceExpress}
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
                  value={parseInt(pricepay[0].sum) + parseInt(pricepay[0].priceExpress)}
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
          <Modal
          visible={appState.modalOrderSuccess}
          animationType='slide'
          transparent={true}
          onRequestClose={() =>
            dispatch(Updatemodalcart(!appState.modalOrderSuccess))
          }
        >
          <ModalOrdersuccess paySuccess={paySuccess} />
        </Modal>
        </View>
        }
      </View>
    </View>

  )
}

export default Paynextstask