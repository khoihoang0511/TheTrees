import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainStackNavigation from './main/MainStackNavigation'
import { AppContext } from '../data/Appcontext'
import AuthenStackNavigation from './authen/AuthenStackNavigation'
import Login from './authen/stasksAuthen/Login'
import Register from './authen/stasksAuthen/Register'
import { useSelector } from 'react-redux'
const AppNavigation = () => {

  const appState = useSelector(state => state.app);
  return (
    <NavigationContainer>
               {
        appState.user ? 
        <MainStackNavigation/>
        :
        <AuthenStackNavigation/>
       }
    </NavigationContainer>
  )
}

export default AppNavigation