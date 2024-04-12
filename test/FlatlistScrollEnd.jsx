import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

const FlatlistScrollEnd = () => {
  const [data, setData] = useState(dataproducts); // Dữ liệu của bạn
  const [visibleDataCount, setVisibleDataCount] = useState(5); // Số lượng mục hiển thị ban đầu

  const renderDataItem = ({ item }) => {
    return (
      <View>
        {/* Hiển thị nội dung của mỗi mục ở đây */}
        <Text style={{fontSize:50}}>{item.name}</Text>
      </View>
    );
  };

  const handleLoadMore = () => {
    setVisibleDataCount(visibleDataCount + 5); // Tăng số lượng mục hiển thị lên
    
  };

  const handleEndReached = () => {
    handleLoadMore();
    console.log('end') // Gọi hàm xử lý load thêm khi scroll tới cuối danh sách
  };

  return (
    <View>
      <FlatList
        data={data.slice(0, visibleDataCount)} // Chỉ hiển thị số lượng mục được xác định
        renderItem={renderDataItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleEndReached} // Callback khi scroll tới cuối danh sách
        onEndReachedThreshold={0.1} // Đặt ngưỡng để gọi callback, ví dụ 0.1 sẽ gọi khi scroll đến 90% cuối danh sách
      />
      <TouchableOpacity onPress={handleLoadMore}>
        <Text>Xem thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlatlistScrollEnd;

var dataproducts = [
    {
        "_idproduct": 1,
        "name": "Vale",
        "price": 3,
        "size": "3XL",
        "origin": "Isuzu",
        "status": true,
        "plant_varieties": "Pikangikum",
        "images": "http://dummyimage.com/196x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 2,
        "name": "Boniface",
        "price": 60,
        "size": "XS",
        "origin": "Toyota",
        "status": true,
        "plant_varieties": "Stara Zagora",
        "images": "http://dummyimage.com/140x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 3,
        "name": "Allard",
        "price": 24,
        "size": "XL",
        "origin": "BMW",
        "status": true,
        "plant_varieties": "Yoro",
        "images": "http://dummyimage.com/179x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 4,
        "name": "Shermie",
        "price": 69,
        "size": "XS",
        "origin": "Mercedes-Benz",
        "status": false,
        "plant_varieties": "Atauro",
        "images": "http://dummyimage.com/106x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 5,
        "name": "Hamilton",
        "price": 8,
        "size": "M",
        "origin": "Nissan",
        "status": false,
        "plant_varieties": "Baracoa",
        "images": "http://dummyimage.com/169x100.png/5fa2dd/ffffff"
    }, {
        "_idproduct": 6,
        "name": "Louisette",
        "price": 40,
        "size": "S",
        "origin": "Mazda",
        "status": false,
        "plant_varieties": "Lamen Bay",
        "images": "http://dummyimage.com/131x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 7,
        "name": "Loria",
        "price": 79,
        "size": "XS",
        "origin": "Honda",
        "status": false,
        "plant_varieties": "Winisk",
        "images": "http://dummyimage.com/144x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 8,
        "name": "Blondie",
        "price": 76,
        "size": "XL",
        "origin": "Kia",
        "status": false,
        "plant_varieties": "Tanjung Balai-Karinmunbesar Island",
        "images": "http://dummyimage.com/151x100.png/dddddd/000000"
    }, {
        "_idproduct": 9,
        "name": "Madison",
        "price": 4,
        "size": "S",
        "origin": "Chrysler",
        "status": true,
        "plant_varieties": "Orán",
        "images": "http://dummyimage.com/171x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 10,
        "name": "Curcio",
        "price": 62,
        "size": "XS",
        "origin": "Dodge",
        "status": true,
        "plant_varieties": "Tampa",
        "images": "http://dummyimage.com/119x100.png/5fa2dd/ffffff"
    },
    {
        "_idproduct": 1,
        "name": "Vale",
        "price": 3,
        "size": "3XL",
        "origin": "Isuzu",
        "status": true,
        "plant_varieties": "Pikangikum",
        "images": "http://dummyimage.com/196x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 2,
        "name": "Boniface",
        "price": 60,
        "size": "XS",
        "origin": "Toyota",
        "status": true,
        "plant_varieties": "Stara Zagora",
        "images": "http://dummyimage.com/140x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 3,
        "name": "Allard",
        "price": 24,
        "size": "XL",
        "origin": "BMW",
        "status": true,
        "plant_varieties": "Yoro",
        "images": "http://dummyimage.com/179x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 4,
        "name": "Shermie",
        "price": 69,
        "size": "XS",
        "origin": "Mercedes-Benz",
        "status": false,
        "plant_varieties": "Atauro",
        "images": "http://dummyimage.com/106x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 5,
        "name": "Hamilton",
        "price": 8,
        "size": "M",
        "origin": "Nissan",
        "status": false,
        "plant_varieties": "Baracoa",
        "images": "http://dummyimage.com/169x100.png/5fa2dd/ffffff"
    }, {
        "_idproduct": 6,
        "name": "Louisette",
        "price": 40,
        "size": "S",
        "origin": "Mazda",
        "status": false,
        "plant_varieties": "Lamen Bay",
        "images": "http://dummyimage.com/131x100.png/cc0000/ffffff"
    }, {
        "_idproduct": 7,
        "name": "Loria",
        "price": 79,
        "size": "XS",
        "origin": "Honda",
        "status": false,
        "plant_varieties": "Winisk",
        "images": "http://dummyimage.com/144x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 8,
        "name": "Blondie",
        "price": 76,
        "size": "XL",
        "origin": "Kia",
        "status": false,
        "plant_varieties": "Tanjung Balai-Karinmunbesar Island",
        "images": "http://dummyimage.com/151x100.png/dddddd/000000"
    }, {
        "_idproduct": 9,
        "name": "Madison",
        "price": 4,
        "size": "S",
        "origin": "Chrysler",
        "status": true,
        "plant_varieties": "Orán",
        "images": "http://dummyimage.com/171x100.png/ff4444/ffffff"
    }, {
        "_idproduct": 10,
        "name": "Curcio",
        "price": 62,
        "size": "XS",
        "origin": "Dodge",
        "status": true,
        "plant_varieties": "Tampa",
        "images": "http://dummyimage.com/119x100.png/5fa2dd/ffffff"
    }
]
