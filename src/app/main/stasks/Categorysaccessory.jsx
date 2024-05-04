import { FlatList, Image, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../common/Detaults/Header'
import myStyle from '../../style/Mystyle'
import AxiosInstance from '../../../helpers/AxiosInstance'
import { IntlProvider, FormattedNumber } from 'react-intl';

const Categorysaccessory = (props) => {
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [listaccessory, setlistaccessory] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchproductsaccessory = async (page) => {
    const idcategory = '6606b733ccf861171c336d83';
    try {
      setRefreshing(true)
      const response = await AxiosInstance().get(`/products/danh-muc?_id=${idcategory}&page=${page}&limit=${7}`);
      if (response.status == true) {
        if (page == 1) {
          setlistaccessory(response.data);
        } else {
          setlistaccessory((prevaccessory) => [...prevaccessory, ...response.data])
        }
        setpage(page + 1)
      } else if (response.data.length === 0) {
        setHasMoreData(false)
      }
      setRefreshing(false)
    } catch (error) {
      setHasMoreData(false)
      console.log("Trang cuối");
      setRefreshing(false)
    }
  }

  const handleEndReached = () => {
    if(hasMoreData){
      console.log("start data")
      setloading(true)
      fetchproductsaccessory(page)
      setloading(false)
      console.log("end data")
    }else{
      console.log("Không còn dữ liệu")
    }
  }

  const onRefresh =()=>{
    setpage(1)
    setHasMoreData(true)
    fetchproductsaccessory(1)
  }

  useEffect(() => {
    fetchproductsaccessory(1)
  }, [])

  const renderItemaccessory = (item) => {
    const firstImage = item.images[0];
    return (
      <Pressable onPress={() => navigation.navigate('Detaltstask', _id = item._id)}>
        <View style={myStyle.viewproduct}>
          <Image style={myStyle.backgroundimgsp} resizeMode='contain' source={{ uri: firstImage }} />
          <Text style={myStyle.textnameproduct}>{item.name}</Text>
          <IntlProvider locale="vi">
            <Text style={myStyle.textpriceproduct}>
              <FormattedNumber
                value={item.price}
                style="currency"
                currency="VND"
                currencyDisplay="symbol"
                minimumFractionDigits={0}
              />
            </Text>
          </IntlProvider>
        </View>
      </Pressable>
    )
  }
  return (
    <View style={[myStyle.flex_1, { backgroundColor: "white" }]}>
      <Header
        style={myStyle.flex_1}
        name={"PHỤ KIỆN"}
        img={require('../../../resources/img/iccart.png')}
        back={require('../../../resources/img/left.png')} />
      <View style={[myStyle.alignitems, myStyle.flex_3, , { paddingTop: 20, paddingBottom: 10 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listaccessory}
          renderItem={({ item }) => renderItemaccessory(item)}
          keyExtractor={item => item._id}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            loading ? (
              <View style={{ padding: 10 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : null
          )}
        />
      </View>
    </View>
  )
}

export default Categorysaccessory
