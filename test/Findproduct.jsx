import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

const Findproduct = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  // Danh sách sản phẩm mẫu
  const products = [
    { id: 1, name: 'Sản phẩm 1' },
    { id: 2, name: 'Sản phẩm 2' },
    { id: 3, name: 'Sản phẩm 3' },
    // Thêm các sản phẩm khác nếu cần
  ];

  // Hàm tìm kiếm sản phẩm
  const searchProduct = (keyword) => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(1)
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

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Nhập tên sản phẩm..."
        onChangeText={(text) => {
          setSearchKeyword(text);
          searchProduct(text);
        }}
        value={searchKeyword}
      />
      
      {searchKeyword !== '' && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSearchKeyword(item.name);
                addToSearchHistory(item.name);
              }}
            >
              <View style={{ padding: 10 }}>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {searchHistory.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Lịch sử tìm kiếm:</Text>
          {searchHistory.slice(0).reverse().map((keyword, index) => (
            <TouchableOpacity key={index} onPress={() => {
              setSearchKeyword(keyword);
              searchProduct(keyword);
            }}>
              <Text>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Findproduct;
