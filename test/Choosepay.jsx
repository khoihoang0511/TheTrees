import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Choosepay = () => {
  const [subjects, setSubjects] = useState([
    { name: 'Toán', selected: false },
    { name: 'Văn', selected: false },
    { name: 'Lý', selected: false },
    { name: 'Hóa', selected: false },
    { name: 'Sinh', selected: false },
  ]);

  // Hàm xử lý sự kiện khi nhấn vào một môn học
  const handlePress = (index) => {
    const updatedSubjects = subjects.map((subject, i) => {
      // Chỉ đặt môn học được nhấn thành trạng thái đã chọn
      if (i === index) {
        return { ...subject, selected: true };
      } else {
        // Đặt các môn học khác về trạng thái chưa chọn
        return { ...subject, selected: false };
      }
    });
    setSubjects(updatedSubjects);
  };

  return (
    <View style={styles.container}>
      {subjects.map((subject, index) => (
        <Pressable key={index} onPress={() => handlePress(index)}>
          <Text style={[styles.subjectText, { color: subject.selected ? 'red' : 'black' }]}>
            {subject.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Choosepay;
