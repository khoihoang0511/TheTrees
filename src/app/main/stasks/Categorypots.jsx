import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../common/Detaults/Header';
import myStyle from '../../style/Mystyle';
import AxiosInstance from '../../../helpers/AxiosInstance';
import { IntlProvider, FormattedNumber } from 'react-intl';

const Categorypots = (props) => {
  const { navigation } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [listpots, setListpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Hàm để lấy dữ liệu sản phẩm từ máy chủ
  const fetchproductspots = async (page) => {
    const idcategory = '6606b733ccf861171c336d82';
    try {
      setRefreshing(true);
      const response = await AxiosInstance().get(`/products/danh-muc?_id=${idcategory}&page=${page}&limit=${8}`);
      // Kiểm tra nếu dữ liệu trả về là mảng rỗng hoặc không có dữ liệu nào
      if (response.data.length === 0) {
        setHasMoreData(false); // Không còn dữ liệu để tải
      } else {
        if (page === 1) {
          // Nếu page là 1, đặt lại danh sách sản phẩm
          setListpots(response.data);
        } else {
          // Nếu page khác 1, thêm dữ liệu mới vào danh sách
          setListpots((prevListpots) => [...prevListpots, ...response.data]);
        }
        setPage(page + 1); // Tăng số trang hiện tại
      }
      setRefreshing(false);
    } catch (error) {
      setHasMoreData(false);
      console.log("Trang cuối");
      setRefreshing(false);
    }
  };

  // Hàm để xử lý làm mới dữ liệu
  const onRefresh = () => {
    // Khi làm mới, đặt lại page về 1 và đặt hasMoreData là true
    setPage(1);
    setHasMoreData(true);
    fetchproductspots(1); // Tải lại dữ liệu từ trang đầu tiên
  };

  // Hàm xử lý khi cuộn đến cuối danh sách
  const handleEndReached = async () => {
    if (hasMoreData) {
      console.log("start loading")
      setLoading(true);
      fetchproductspots(page);
      setLoading(false);
      console.log("end loading")
    }else{
      console.log("không có dữ liệu")
    }
  };

  useEffect(() => {
    // Khi component được mount, gọi hàm fetchproductspots với page 1
    fetchproductspots(1);
  }, []);

  // Hàm render một sản phẩm
  const renderItem = ({ item }) => {
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
    );
  };

  return (
    <View style={[myStyle.flex_1, { backgroundColor: "white" }]}>
      <Header
        style={myStyle.flex_1}
        name={"CHẬU CÂY TRỒNG"}
        img={require('../../../resources/img/iccart.png')}
        back={require('../../../resources/img/left.png')}
      />
      <View style={[myStyle.alignitems, myStyle.flex_3, { paddingTop: 20, paddingBottom: 10 }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listpots}
          renderItem={renderItem}
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
  );
};

export default Categorypots;
