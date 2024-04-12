import { View, Text, Image, Pressable, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import Mystyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import Swiper from 'react-native-swiper';
import AxiosInstance from '../../../helpers/AxiosInstance';
import {useSelector } from 'react-redux';
import { IntlProvider, FormattedNumber } from 'react-intl';

const Detaltstask = (props) => {
  const _id = props.route.params;

  const [product, setproduct] = useState([])
  const appState = useSelector((state) => state.app);
  const id_User = appState.user._id;


  const myReducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        {
          return state + action.value;
        }
      case 'decrement':
        if (state > 1) {
          return state - action.value;
        }
      default:
        return state
    }
  }

  let initialState = 1;
  const [state, dispatch] = useReducer(myReducer, initialState)

  const findproduct = async () => {
    try {
      const response = await AxiosInstance().get(`/products/tim-kiem?_id=${_id}`);
      if (response.status == true) {
        setproduct(response.data);

      }
    } catch (error) {
      console.log("lỗi find product ---------------", error)
    }
  }
  useEffect(() => {
    findproduct()

  }, [])


  const fetchcart = async () => {
    try {
      const body = {
        id_User: id_User,
        name: product.name,
        price: product.price,
        quantity:state,
        images: product.images,
        product_id: _id,
        type: product.type,
      }

      const response = await AxiosInstance().post(`/cart/addcart`, body);
      if (response.status == true) {
        ToastAndroid.show("Thêm sản phẩm thành công", ToastAndroid.LONG)
      }
    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }





  const renderImages = () => {
    if (product.images && product.images.length > 0) {
      return product.images.map((image, index) => (
        <View key={index}>
          <Image resizeMode='contain' style={{ width: '100%', height: "100%" }} source={{ uri: image }} />
        </View>
      ));
    } else {
      // Trường hợp không có ảnh, bạn có thể render một placeholder hoặc hiển thị thông báo không có ảnh
      return (
        <View>
          <Text>Không có ảnh</Text>
        </View>
      );
    }
  }

  const NextButton = () => (
    <View style={{ height: 24, width: 24 }}>
      <Image
        style={{ height: 24, width: 24 }}
        source={require('../../../resources/img/icright.png')}
      />
    </View>
  );

  const PrevButton = () => (
    <View style={{ height: 24, width: 24 }}>
      <Image
        style={{ height: 24, width: 24 }}
        source={require('../../../resources/img/icleft.png')}
      />
    </View>
  );

  return (

    <View style={[Mystyle.flex_1, { backgroundColor: 'white' }]}>
      <Header
        name={product.name}
        img={require('../../../resources/img/iccart.png')}
        back={require('../../../resources/img/left.png')} />
      <View style={{ backgroundColor: "#F6F6F6", height: "30%", marginTop: 20 }}>
        <Swiper
          nextButton={<NextButton />}
          prevButton={<PrevButton />}
          showsButtons={true}
        >
          {renderImages()}
        </Swiper>
      </View>
      <View style={Mystyle.viewdetaltinfornation}>
        <View style={Mystyle.vieworigin}>
          <Pressable style={Mystyle.pressableorigin}>
            <Text style={Mystyle.textorigin}>Cây trồng</Text>
          </Pressable>
          <Pressable style={Mystyle.pressableorigin}>
            <Text style={Mystyle.textorigin}>Ưa bóng</Text>
          </Pressable>
        </View>
        <IntlProvider locale="vi">
              <Text style={Mystyle.textprice}>
                <FormattedNumber
                  value={product.price}
                  style="currency"
                  currency="VND"
                  currencyDisplay="symbol"
                  minimumFractionDigits={0}
                />
              </Text>
            </IntlProvider>

        <View style={Mystyle.viewdetalt}>
          <Text style={Mystyle.textdetalt}>Chi tiết sản phẩm</Text>
        </View>
        <View style={Mystyle.viewinfornation}>
          <Text style={Mystyle.textinfornation}>Kích cở</Text>
          <Text style={Mystyle.textinfornation}>{product.size}</Text>
        </View>
        <View style={Mystyle.viewinfornation}>
          <Text style={Mystyle.textinfornation}>Xuất sứ</Text>
          <Text style={Mystyle.textinfornation}>{product.origin}</Text>
        </View>
        <View style={Mystyle.viewinfornation}>
          <Text style={Mystyle.textinfornation}>Tình trạng</Text>
          <Text style={Mystyle.textstatus}>Còn {product.status} sp</Text>
        </View>
      </View>
      <View style={Mystyle.viewpay}>
        <View style={Mystyle.viewallselect}>
          <View style={Mystyle.viewselect}>
            <Text style={[Mystyle.textinfornation, { color: 'black' }]}>Đã chon {state} sản phẩm</Text>
            <Text style={[Mystyle.textinfornation, { color: 'black' }]}>Tạm tính</Text>
          </View>
          <View style={Mystyle.viewprice}>
            <View style={Mystyle.viewquantity}>
              <Pressable onPress={() => dispatch({ type: 'decrement', value: 1 })}>
                <Image source={require('../../../resources/img/reduce.png')} />
              </Pressable>
              <Text style={[Mystyle.textquantity]}>{state}</Text>
              <Pressable onPress={() => dispatch({ type: 'increment', value: 1 })}>
                <Image source={require('../../../resources/img/increase.png')} />
              </Pressable>
            </View>
            <View>
              <IntlProvider locale="vi">
              <Text style={Mystyle.textpricemoney}>
                <FormattedNumber
                  value={product.price * state}
                  style="currency"
                  currency="VND"
                  currencyDisplay="symbol"
                  minimumFractionDigits={0}
                />
              </Text>
            </IntlProvider>

            </View>
          </View>
        </View>
        <Pressable style={Mystyle.pressableselect} onPress={() => {
          fetchcart()
       
        }}>
          <Text style={Mystyle.textselect} >CHỌN MUA</Text>
        </Pressable>
      </View>
    </View>

  )
}

export default Detaltstask
