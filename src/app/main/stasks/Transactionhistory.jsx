import { View, Text, Image, FlatList } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import myStyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { AppContext } from '../../../data/Appcontext'
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../../redux/Reducer'

const Transactionhistory = () => {
  const appState = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [listnotification, setlistnotification] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [notificationproduct, setnotificationproduct] = useState([])

  const getdata = () => {
    try {
      setRefreshing(true)
      const data = appState.user.notification;
      const dataproduct = appState.user.notification[0].products 
      setlistnotification(data) //ngày
      setnotificationproduct(dataproduct); //sản phẩm
      setRefreshing(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getdata()
  }, [appState.user.notification])

   //giới hạn ký tự 
   const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };

  const renderitemproduct = (item) => {
    const name = truncateString(item.item.name, 15);
    return (
      <View style={myStyle.viewnotification}>
        <View style={[myStyle.backgroundimgsp, myStyle.flex_1, { height: 90, width: 130 }]}>
          <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: item.item.images[0] }} />
        </View>
        <View style={[myStyle.flex_3, { marginLeft: '5%' }]}>
          <Text style={myStyle.textordersuccess}>Đặt hàng thành công</Text>
          <View style={myStyle.viewinfornationnotification}>
            <Text style={myStyle.textnamesuccess}>{name} |</Text>
            <Text style={myStyle.texttypesuccess}>{item.item.type}</Text>
          </View>
          <Text style={myStyle.textquantitysuccess}>{item.item.quantity} sản phẩm</Text>
        </View>
      </View>
    )
  }

  const renderItemnotification = (item) => {
    return (
      <View style={myStyle.viewallnotification}>
        <View style={myStyle.viewdaynotification}>
          <Text style={myStyle.daynotification}>Thứ {item.item.date}, {item.item.day}/{item.item.month}/{item.item.year}</Text>
        </View>
        <FlatList
        data={notificationproduct}
        renderItem={(item)=>renderitemproduct(item)}
        keyExtractor={item=>item.product_id}
        />
      </View>

    )
  }
  return (
    <View style={[myStyle.flex_1, { backgroundColor: 'white' }]}>
      <Header
        name={'Lịch sử giao dịch'}
        back={require('../../../resources/img/left.png')} />

      {
        listnotification && listnotification.length > 0 ?
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listnotification}
            renderItem={(item) => renderItemnotification(item)}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={getdata}
          />
          :
          <View style={myStyle.alignitems}>
            <Text style={myStyle.textnotnotification}>Hiện chưa có giao dịch nào cho bạn</Text>
          </View>
      }
    </View>
  )
}

export default Transactionhistory