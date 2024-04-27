import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable, Modal, StatusBar, ToastAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import myStyle from '../../style/Mystyle';
import HeaderCart from '../../common/Cart/Headercart';
import { AppContext } from '../../../data/Appcontext';
import Modalcart from '../../common/Cart/Modalcart';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Updatemodalcart } from '../../../redux/Reducer'
import Button from '../../common/Login/Button';
import AxiosInstance from '../../../helpers/AxiosInstance';
import { IntlProvider, FormattedNumber } from 'react-intl';
import { savecart } from '../../../redux/Reducer';



const Cartstask = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const [listcart, setlistcart] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(false)


  // hiển thị danh sách cart 
  const id_User = appState.user._id;

  const fetchcart = async () => {
    try {
      setRefreshing(true)
      const response = await AxiosInstance().post(`/cart/getproductcart?id_User=${id_User}`);
      if (response.status == true) {
        dispatch(savecart(response.data))
        setlistcart(response.data)
      }
      setRefreshing(false)
    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }
  useEffect(() => {
    fetchcart()
  }, [loading])


  const deletecart = async (product_id) => {
    try {
      var body = {
        product_id: [product_id],
      }
      setRefreshing(true)
      const response = await AxiosInstance().post(`/cart/deleteproductcart?id_User=${id_User}`, body);
      if (response.status == true) {
        ToastAndroid.show('Xóa thành công', ToastAndroid.LONG)
        setloading(!loading);
      }
      setRefreshing(false)
    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }

  const updatequantityAPI = async (product_id,status) => {
    try {
      var body = {
        id_User: id_User,
        product_id: product_id,
        status: status
      }
      const response = await AxiosInstance().post(`/cart/updatequantity`, body);
      console.log(response)
    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }


  // Đếm số lượng các item đã được chọn
  // const countSelectedItems = () => {
  //   let count = 0;
  //   for (const key in selectedItems) {
  //     if (selectedItems[key]) {
  //       count++;
  //       console.log(selectedItems)
  //     }
  //   }
  //   return count;
  // };
  // console.log(countSelectedItems())

  const toggleCheckbox = (productId) => {
    setlistcart(listcart.map(item => {
      if (item.product_id === productId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  useEffect(() => {
    dispatch(savecart(listcart))
  }, [listcart])


  const updatequantity = (product_id, status) => {
    const newquantity = listcart.map((item) => {
      if (status == "decrease") {
        if (item.product_id == product_id) {
          if (item.quantity >= 2) {
            return { ...item, quantity: item.quantity - 1 }
          }
        }
        return item
      } else {
        if (item.product_id == product_id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      }
    })
    setlistcart(newquantity);
    dispatch(savecart(newquantity))
    updatequantityAPI(product_id, status)
  }
  let sum = 0;
  listcart.map((item) => {
    if (item.checked == true) {
      sum += parseInt(item.quantity) * parseInt(item.price);
    }
  })

  const nextpay = () => {
    var check = 0;
    listcart.map((item) => {
      if (item.checked == true) {
        check++
      }
    })
    if (check == 0) {
      alert("Vui lòng chọn sản phẩm cần mua");
    } else {
      navigation.navigate('PayStask', { sum })
    }
  }
  //giới hạn ký tự 
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };


  const renderItemcart = ({ item }) => {
    const name = truncateString(item.name, 15);
    return (
      <Pressable onPress={() => navigation.navigate('Detaltstask', _id = item.product_id)}>
        <View style={[myStyle.viewallcart]}>
          <View style={myStyle.viewcheckbox}>
            <CheckBox
              value={item.checked}
              onValueChange={() => {
                toggleCheckbox(item.product_id)
              }}
              tintColors={{ true: 'black', false: 'black' }} // Tùy chỉnh màu sắc tại đây
            />
          </View>
          <View style={myStyle.viewcart}>
            <View style={myStyle.backgroundcart}>
              <Image resizeMode='contain' style={{ width: 77, height: 74 }} source={{ uri: item.images[0] }} />
            </View>
            <View style={{ marginLeft: '5%' }}>
              <View style={myStyle.viewinfornationnotification}>
                <Text style={[myStyle.textnamesuccess, { width: '60%' }]}>{name} |</Text>
                <Text style={myStyle.texttypesuccess}>{item.type}</Text>
              </View>
              <IntlProvider locale="vi">
                <Text style={myStyle.textordersuccess}>
                  <FormattedNumber
                    value={item.price}
                    style="currency"
                    currency="VND"
                    currencyDisplay="symbol"
                    minimumFractionDigits={0}
                  />
                </Text>
              </IntlProvider>
              <View style={myStyle.viewquantitycart}>
                <Pressable onPress={() => updatequantity(item.product_id, "decrease")}>
                  <Image style={{ height: 20, width: 20 }} source={require('../../../resources/img/reduce.png')} />
                </Pressable>
                <Text style={[myStyle.textnamesuccess, { marginHorizontal: "10%" }]}>{item.quantity}</Text>
                <Pressable onPress={() => updatequantity(item.product_id, "increase")}>
                  <Image style={{ height: 20, width: 20 }} source={require('../../../resources/img/increase.png')} />
                </Pressable>
                <View style={myStyle.viewdeletecart}>
                  <Text style={myStyle.textnamesuccess} onPress={() => deletecart(item.product_id)}>Xóa</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const deleteall = () => {
    var listIDproduct = [];
    listcart.map((item) => {
      listIDproduct.push(item.product_id)
    })

    const deletecart = async () => {
      try {
        var body = {
          product_id: listIDproduct,
        }

        const response = await AxiosInstance().post(`/cart/deleteproductcart?id_User=${id_User}`, body);
        if (response.status == true) {
          setloading(!loading);
          ToastAndroid.show("Xóa sản phẩm thành công", ToastAndroid.LONG)
        }

      } catch (error) {
        console.log("lỗi listtree ---------------", error)
      }
    }
    deletecart()
  }

  return (

    <View style={[myStyle.flex_1, { backgroundColor: 'white' }]}>
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <HeaderCart
          name={'Giỏ hàng'}
          img={require('../../../resources/img/deletecart.png')}
          back={require('../../../resources/img/left.png')} />

        {
          listcart.length > 0 ?
            <FlatList
              showsVerticalScrollIndicator={false}
              data={listcart}
              renderItem={renderItemcart}
              keyExtractor={(item) => item.product_id}
              refreshing={refreshing}
              onRefresh={fetchcart}
              style={{ marginBottom: "50%" }}
            />
            :
            <View style={myStyle.alignitems}>
              <Text style={myStyle.textnotnotification}>Hiện chưa có sản phẩm trong giỏ hàng</Text>
            </View>
        }
        <Modal
          visible={appState.modalcart}
          animationType='slide'
          transparent={true}
          onRequestClose={() =>
            dispatch(Updatemodalcart(!appState.modalcart))
          }
        >
          <Modalcart deleteall={deleteall} />
        </Modal>
      </View>
      <View style={[myStyle.viewallpaycart, myStyle.viewallpaycartposition, { backgroundColor: 'white', borderWidth: 1 }]}>
        <View style={myStyle.viewpaycart}>
          <Text style={myStyle.texttypesuccess}>Tạm tính</Text>
          <IntlProvider locale="vi">
            <Text style={myStyle.textnamesuccess}>
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
        <Pressable style={myStyle.pressablecart} onPress={() => nextpay()}>
          <Text style={myStyle.textpaycart}>Tiến hành thanh toán</Text>
          <Image style={{ height: 12, width: 6 }} source={require('../../../resources/img/nextcart.png')} />
        </Pressable>
      </View>
    </View>
  );
};

export default Cartstask;


