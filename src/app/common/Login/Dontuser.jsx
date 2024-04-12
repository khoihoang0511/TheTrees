import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Dontuser = (props) => {
  const navigation = useNavigation()
  const { mystyle, user, newuser } = props;
  return (
    <View style={mystyle.row}>
      <Text style={mystyle.text}>{user}</Text>
      {
        newuser == 'Tạo tài khoản'
          ?
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={mystyle.textaddaccount}>{newuser}</Text>
          </Pressable>
          :
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={mystyle.textaddaccount}>{newuser}</Text>
          </Pressable>
      }
    </View>
  )
}

export default Dontuser