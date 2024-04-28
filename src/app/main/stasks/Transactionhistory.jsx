import { View, Text, Image, FlatList, Pressable } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import myStyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { AppContext } from '../../../data/Appcontext'
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../../redux/Reducer'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AxiosInstance from '../../../helpers/AxiosInstance'


const Transactionhistory = () => {

  const navigation = useNavigation()
  const appState = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [listnotification, setlistnotification] = useState()
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(false)
  const [notificationproduct, setnotificationproduct] = useState([])
  const id_User = appState.user._id;

  const getdata = async () => {
    try {
      setRefreshing(true)
      const response = await AxiosInstance().post(`/notification/getnotification?id_User=${id_User}`);
      if (response.status == true) {
        setlistnotification(response.data)
      }
      setRefreshing(false)
    } catch (error) {
      console.log("lỗi notification---------------------------- ", error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getdata()

    }, [])
  );


  //giới hạn ký tự 
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };

  const renderitemproduct = (item) => {
    const name = truncateString(item.name, 15);
    return (
      <View style={myStyle.viewnotification}>
        <View style={[myStyle.backgroundimgsp, myStyle.flex_1, { height: 90, width: 130 }]}>
          <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: item.images[0] }} />
        </View>
        <View style={[myStyle.flex_3, { marginLeft: '5%' }]}>
          <Text style={myStyle.textordersuccess}>Đặt hàng thành công</Text>
          <View style={myStyle.viewinfornationnotification}>
            <Text style={myStyle.textnamesuccess}>{name} |</Text>
            <Text style={myStyle.texttypesuccess}>{item.type}</Text>
          </View>
          <Text style={myStyle.textquantitysuccess}>{item.quantity} sản phẩm</Text>
        </View>
      </View>
    )
  }

  const renderItemnotification = (item) => {
    return (
      <Pressable onPress={() => navigation.navigate("DetailtTransaction", { item: item })}>
        <View style={myStyle.viewallnotification}>
          <View style={myStyle.viewdaynotification}>
            <Text style={myStyle.daynotification}>Thứ {item.date}, {item.day}/{item.month}/{item.year}</Text>
          </View>
          <FlatList
            data={item.products}
            renderItem={({ item }) => renderitemproduct(item)}
            keyExtractor={item => item.product_id}
          />
        </View>
      </Pressable>

    )
  }
  return (
    <View style={[myStyle.flex_1, { backgroundColor: 'white' }]} >
      <Header
        name={'Lịch sử đơn hàng'}
        back={require('../../../resources/img/left.png')} />

      {
        listnotification && listnotification.length > 0 ?
          <FlatList
            style={{ marginTop: 10 }}
            showsVerticalScrollIndicator={false}
            data={listnotification}
            renderItem={({ item }) => renderItemnotification(item)}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={getdata}
          />
          :
          <View style={myStyle.alignitems}>
            <Text style={myStyle.textnotnotification}>Hiện chưa có thông báo nào cho bạn</Text>
          </View>
      }
    </View>
  )
}

export default Transactionhistory