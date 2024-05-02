import { FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Mystyle from '../../style/Mystyle'
import { navigation } from '@react-navigation/native'
import AxiosInstance from '../../../helpers/AxiosInstance'
import { IntlProvider, FormattedNumber } from 'react-intl';






const Home = (props) => {
  const { navigation } = props;
  const [listtrees, setlisttrees] = useState([]);
  const [listpots, setlistpots] = useState([]);
  const [listaccessory, setlistaccessory] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const fetchproductstree = async () => {
    const idcategory = '6606b733ccf861171c336d81';
    try {
      setRefreshing(true)
      const response = await AxiosInstance().get(`/products/danh-muc?_id=${idcategory}&page=${1}&limit=${8}`);
      if (response.status == true) {
        setlisttrees(response.data);

      }
      setRefreshing(false)
    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }

  const fetchproductspots = async () => {
    const idcategory = '6606b733ccf861171c336d82';
    try {
      setRefreshing(true)
      const response = await AxiosInstance().get(`/products/danh-muc?_id=${idcategory}&page=${1}&limit=${8}`);
      if (response.status == true) {
        setlistpots(response.data);

      }
      setRefreshing(false)
    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }

  const fetchproductsaccessory = async () => {
    const idcategory = '6606b733ccf861171c336d83';
    try {
      setRefreshing(true)
      const response = await AxiosInstance().get(`/products/danh-muc?_id=${idcategory}&page=${1}&limit=${8}`);
      if (response.status == true) {
        setlistaccessory(response.data);

      }
      setRefreshing(false)
    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }

  useEffect(() => {
    fetchproductstree();
    fetchproductspots();
    fetchproductsaccessory();
  }, []);

  const renderItemtrees = (item) => {
    const firstImage = item.images[0];
    return (
      <Pressable onPress={() => navigation.navigate('Detaltstask', _id = item._id)}>
        <View style={Mystyle.viewproduct}>
          <Image style={Mystyle.backgroundimgsp} resizeMode='contain' source={{ uri: firstImage }} />
          <Text style={Mystyle.textnameproduct}>{item.name}</Text>
          <Text style={Mystyle.origintext}>{item.type}</Text>
          <IntlProvider locale="vi">
            <Text style={Mystyle.textpriceproduct}>
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
  const renderItemaccessory = (item) => {
    const firstImage = item.images[0];
    return (
      <Pressable onPress={() => navigation.navigate('Detaltstask', _id = item._id)}>
        <View style={Mystyle.viewproduct}>
          <Image style={Mystyle.backgroundimgsp} resizeMode='contain' source={{ uri: firstImage }} />
          <Text style={Mystyle.textnameproduct}>{item.name}</Text>
          <IntlProvider locale="vi">
            <Text style={Mystyle.textpriceproduct}>
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
  const title = () => {
    return {
      ...Mystyle.fonttille,
      fontSize: 24,
      marginLeft: 25,
      color: 'black'
    }
  }
  const viewtitle = () => {
    return {
      ...Mystyle.position_absolute,
      top: 68,
      width: 280,
    }
  }
  const textnewproduct = () => {
    return {
      ...Mystyle.fonttille2,
      ...Mystyle.justifyContentcenter,
      fontSize: 16,
      color: '#007537',
      marginRight: 10,
      fontWeight: "bold"
    }
  }
  const viewnewproduct = () => {
    return {
      ...Mystyle.flexDirectionrow,
      ...Mystyle.alignitems,
      ...Mystyle.position_absolute,
      top: 150,
      left: 20
    }
  }
  const titleflatlist = () => {
    return {
      ...Mystyle.fonttitlelato,
      fontSize: 24,
      marginTop: 20,
      marginLeft: 25,
      color: '#221F1F',
      fontWeight: "bold"
    }
  }



  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >

      <View style={[Mystyle.flex_1, { backgroundColor: 'white' }]}>
        <StatusBar translucent backgroundColor="transparent" />
        <View>
          <View >
            <Image style={Mystyle.withmax} source={require('../../../resources/img/imghome.png')} />
          </View>
          <Pressable style={Mystyle.pressable} onPress={() => navigation.navigate('Cartstask')}>
            <Image source={require('../../../resources/img/iccart.png')} />
          </Pressable>

          <View style={viewtitle()}>
            <Text style={title()}>Planta - toả sáng không gian nhà bạn</Text>
          </View>
          <TouchableOpacity style={viewnewproduct()}>
            <Text style={textnewproduct()}>Xem hàng mới về</Text>
            <Image style={{ height: 24, width: 24 }} source={require('../../../resources/img/next.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text style={[titleflatlist()]}>Cây trồng</Text>
          </View>
          <View style={Mystyle.alignitems}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={listtrees}
              renderItem={({ item }) => renderItemtrees(item)}
              keyExtractor={item => item._id}
              numColumns={2}
            // refreshing={refreshing}
            // onRefresh={fetchproductstree}
            />
            <View style={Mystyle.viewwatchadd}>
              <Text style={Mystyle.textwatchadd}>Xem thêm cây trồng</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={[titleflatlist()]}>Chậu cây trồng</Text>
          </View>
          <View style={Mystyle.alignitems}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={listpots}
              renderItem={({ item }) => renderItemaccessory(item)}
              keyExtractor={item => item._id}
              numColumns={2}
            />
            <TouchableOpacity style={Mystyle.viewwatchadd} onPress={()=>navigation.navigate("Categorypots")}>
              <Text style={Mystyle.textwatchadd}>Xem thêm chậu cây</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text style={[titleflatlist()]}>Phụ kiện cây trồng</Text>
          </View>
          <View style={Mystyle.alignitems}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={listaccessory}
              renderItem={({ item }) => renderItemaccessory(item)}
              keyExtractor={item => item._id}
              numColumns={2}
            />
            <TouchableOpacity style={Mystyle.viewwatchadd} onPress={()=>navigation.navigate("Categorysaccessory")}>
              <Text style={Mystyle.textwatchadd}>Xem thêm phụ kiện</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text style={[titleflatlist()]}>Combo chăm sóc mới</Text>
          </View>
          <View style={Mystyle.takecareofnew}>
            <View style={Mystyle.viewtakecareofnew}>
              <Text style={Mystyle.texttakecareofnew}>Lemon Balm Grow Kit </Text>
              <Text style={Mystyle.origintext}>Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker đánh dấu...</Text>
            </View>
            <Image style={[Mystyle.takecareofimg]} resizeMode='cover' source={require('../../../resources/img/takecareofnew.png')} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})