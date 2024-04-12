import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Saveuser = (props) => {
    const { mystyle } = props
    return (
        <View style={[mystyle.row,mystyle.around]}>
            <View style={[mystyle.row]}>
                <Image source={require('../../../resources/img/save.png')} />
                <Text style={mystyle.textsave}>Nhớ tài khoản</Text>
            </View>
            <Text style={mystyle.textforgot}>Forgot password ?</Text>
        </View>
    )
}

export default Saveuser

const styles = StyleSheet.create({})