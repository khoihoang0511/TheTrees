import React, { useState, useEffect } from 'react';
import { View, TextInput, Keyboard, Text, Platform } from 'react-native';

const KeyboardDidShowListener = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
        () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
        Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
        () => setKeyboardVisible(false)
    );

    return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
    };
}, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!isKeyboardVisible && <Text style={{ fontSize: 24, marginBottom: 20 }}>Tiêu đề</Text>}
      <TextInput placeholder="Nhập văn bản ở đây..." style={{ padding: 10, borderWidth: 1, width: '80%' }} />
    </View>
  );
};

export default KeyboardDidShowListener;
