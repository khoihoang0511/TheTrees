import { View, Text, StatusBar, TextInput, Image, Pressable } from 'react-native'
import React from 'react'
import Mystyle from '../../style/Mystyle'
import Header from '../../common/Detaults/Header'


const Searchstask = () => {
  return (
    <View style={[Mystyle.flex_1,{backgroundColor:'white'}]}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <Header 
      name={'Tìm kiếm'}
      back={require('../../../resources/img/left.png')} />
      <Pressable style={Mystyle.viewsearch} onPress={()=>console.log("click")}>
        <TextInput
          placeholder='Tìm kiếm'
          style={Mystyle.inputsearch}
        />
        <Image style={Mystyle.icsearch} source={require('../../../resources/img/search.png')}/>
      </Pressable>
      <View style={Mystyle.viewsearchnear}>
        <Text style={Mystyle.textsearch}>Tìm kiếm gần đây</Text>
      </View>
    </View>
  )
}

export default Searchstask