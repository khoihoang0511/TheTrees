import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const Detailstasks = () => {
  const [showSteps, setShowSteps] = useState(false); // Trạng thái để kiểm soát việc hiển thị các bước làm

  // Hàm xử lý sự kiện khi nhấn vào Pressable
  const handlePress = () => {
    setShowSteps(!showSteps); // Đảo ngược giá trị của showSteps khi nhấn vào
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={handlePress}>
        <Text style={{ fontSize: 20 }}>Các bước làm</Text>
      </Pressable>

      {/* Hiển thị danh sách các bước làm nếu showSteps là true */}
      {showSteps && (
        <View style={{ marginTop: 20 }}>
          <Text>Bước 1: Chuẩn bị nguyên liệu</Text>
          <Text>Bước 2: Thực hiện công việc</Text>
          <Text>Bước 3: Hoàn thành và kiểm tra</Text>
        </View>
      )}
    </View>
  );
};

export default Detailstasks;
