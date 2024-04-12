import { View, Text, StatusBar } from 'react-native'
import React from 'react'

const TestStatusBar = () => {
  return (
    <View style={{flex:1,backgroundColor:'red'}}>
           <StatusBar translucent backgroundColor="transparent" />
    </View>
  )
}

export default TestStatusBar