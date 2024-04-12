import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Apptextinput = (props) => {
  const { mystyle,placeholder,value,onChangeText,secureTextEntry } = props
  // console.log(mystyle.boder)
  
  return (
    <TextInput
      placeholder={placeholder}
      style={mystyle.border}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry} />
  )
}

export default Apptextinput