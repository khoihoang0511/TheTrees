import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './stasksAuthen/Login'
import Register from './stasksAuthen/Register'
import VetificationAccount from './stasksAuthen/VetificationAccount'
const AuthenStack = createNativeStackNavigator()
const AuthenStackNavigation = () => {
  return (
    <AuthenStack.Navigator
    screenOptions={{
        headerShown: false
      }}>
        <AuthenStack.Screen name='Login' component={Login}/>
        <AuthenStack.Screen name='Register' component={Register}/>
        <AuthenStack.Screen name='VetificationAccount' component={VetificationAccount}/>
    </AuthenStack.Navigator>
  )
}

export default AuthenStackNavigation