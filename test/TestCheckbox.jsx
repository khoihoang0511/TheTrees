import React, { useState,useEffect } from 'react';
import { View, Text, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const TestCheckbox = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', checked: false },
    { id: 2, name: 'Product 2', checked: false },
    { id: 3, name: 'Product 3', checked: false },
    // Thêm các sản phẩm khác vào đây
  ]);

  const toggleCheckbox = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, checked: !product.checked };
      }
      return product;
    }));
  };

  useEffect(() => {
    console.log(products);
  }, [products])
  

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            value={item.checked}
            onValueChange={() => toggleCheckbox(item.id)}
          />
          <Text>{item.name}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TestCheckbox;
