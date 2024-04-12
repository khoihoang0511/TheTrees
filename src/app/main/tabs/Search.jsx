import { View, Text, StatusBar, TextInput, Image, Pressable, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Mystyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'
import { useNavigation } from '@react-navigation/native'
import AxiosInstance from '../../../helpers/AxiosInstance'


const Search = () => {
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [product, setproduct] = useState();

  const getproduct = async () => {
    try {
      var page = 1;
      var limit = 30;
      const response = await AxiosInstance().get(`products?page=${page}&limit=${limit}`);
      if (response.status == true) {
        setproduct(response.data);
      }

    } catch (error) {
      console.log("lỗi listtree ---------------", error)
    }
  }
  useEffect(() => {
    getproduct();
  }, [])



  // Hàm tìm kiếm sản phẩm
  const searchProduct = (keyword) => {
    const results = product.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
  };

  // Hàm để thêm từ khóa tìm kiếm vào lịch sử
  const addToSearchHistory = (keyword) => {
    // Tạo một bản sao của lịch sử tìm kiếm
    let updatedHistory = [...searchHistory];

    // Kiểm tra nếu lịch sử tìm kiếm đã đạt đến số lượng tối đa (ví dụ: 5)
    if (updatedHistory.length >= 5) {
      // Xóa mục đầu tiên của lịch sử
      updatedHistory = updatedHistory.slice(1);
      // Hoặc sử dụng updatedHistory.splice(0, 1) để xóa mục đầu tiên
    }

    // Thêm từ khóa tìm kiếm mới vào cuối danh sách
    updatedHistory.push(keyword);

    // Cập nhật lịch sử tìm kiếm
    setSearchHistory(updatedHistory);
  };

  //giới hạn ký tự 
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };

  const renderItemsearch = (item) => {
    const name = truncateString(item.name, 15);
    return (
      <TouchableOpacity
        onPress={() => {
          setSearchKeyword(item.name);
          addToSearchHistory(item.name);
          navigation.navigate('Detaltstask', _id = item._id)
        }}
      >

        <View style={Mystyle.viewallnotification}>
          <View style={Mystyle.viewnotification}>
            <View style={[Mystyle.backgroundimgsp, Mystyle.flex_1, { height: 90, width: 130 }]}>
              <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: item.images[0] }} />
            </View>
            <View style={[Mystyle.flex_3, { marginLeft: '5%' }]}>
              <View style={Mystyle.viewinfornationnotification}>
                <Text style={Mystyle.textnamesuccess}>{name} | </Text>
                <Text style={Mystyle.textnamesuccess}>{item.type}</Text>
              </View>
              <Text style={[Mystyle.origintext, { marginTop: "3%" }]}>{item.price}</Text>
              <Text style={Mystyle.textnamesuccess}>còn {item.status} sp</Text>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    )
  }


  return (
    <View style={[Mystyle.flex_1, { backgroundColor: 'white' }]}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <Header
        name={'Tìm kiếm'}
        back={require('../../../resources/img/left.png')} />
      <Pressable style={Mystyle.viewsearch} >
        <TextInput
          placeholder='Tìm kiếm'
          style={Mystyle.inputsearch}
          onChangeText={(text) => {
            setSearchKeyword(text);
            searchProduct(text);
          }}
          value={searchKeyword}
        />
        <Image style={Mystyle.icsearch} source={require('../../../resources/img/search.png')} />
      </Pressable>

      {searchKeyword == "" && (
        <View style={Mystyle.viewsearchnear}>
          <Text style={Mystyle.textsearch}>Tìm kiếm gần đây</Text>
          {searchHistory.slice(0).reverse().map((keyword, index) => (
            <TouchableOpacity key={index} onPress={() => {
              setSearchKeyword(keyword);
              searchProduct(keyword);

            }}>
              <View style={Mystyle.viewsearchclock}>
                <View style={[Mystyle.flexDirectionrow, Mystyle.alignitems]}>
                  <Image style={{ marginRight: 10 }} source={require('../../../resources/img/clock.png')} />
                  <Text style={Mystyle.textsearch}>{keyword}</Text>
                </View>
                <Image source={require('../../../resources/img/X.png')} />
              </View>

            </TouchableOpacity>
          ))}
        </View>
      )}



      {searchKeyword !== '' && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderItemsearch(item)}
        />
      )}

    </View>
  )
}

export default Search