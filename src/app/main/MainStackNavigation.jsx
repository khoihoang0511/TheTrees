import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// tabs
import Home from './tabs/Home';
import Search from './tabs/Search';
import Notification from './tabs/Notification';
import Personal from './tabs/Personal';

// stasks
import Cartstask from './stasks/Cartstask';
import Detaltstask from './stasks/Detaltstask';
import PayStask from './stasks/PayStask';
import Profilestask from './stasks/Profilestask';
import Updateprofilestask from './stasks/Updateprofilestask';
import Paynextstask from './stasks/Paynextstask';
import Ordersuccess from './stasks/Ordersuccess';
import Hangbookstask from './stasks/Hangbookstask';
import Detalthangbook from './stasks/Detalthangbook';
import Searchstask from './stasks/Searchstask';
import Transactionhistory from './stasks/Transactionhistory';
import DetailtTransaction from './stasks/DetailtTransaction';
import Categorytree from './stasks/Categorytree';
import Categorysaccessory from './stasks/Categorysaccessory';
import Categorypots from './stasks/Categorypots';


const MainStacks = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();


const screenOptions = () => {
    return {
        headerShown: false
    }
}

const tabBarIcon = ({ route }) => {
    if (route.name === 'Home') {
        return <Image source={require('../../resources/img/ichome.png')} style={{ width: 20, height: 20 }} />
    } else if (route.name === 'Search') {
        return <Image source={require('../../resources/img/icsearch.png')} style={{ width: 20, height: 20 }} />
    } else if (route.name === 'Notification') {
        return <Image source={require('../../resources/img/icnotification.png')} style={{ width: 20, height: 20 }} />
    } else {
        return <Image source={require('../../resources/img/icperson.png')} style={{ width: 20, height: 20 }} />
    }
}

const MainTabsNavigation = () => {
    return (
        <MainTabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabel: () => null,
                tabBarIcon: () => tabBarIcon({ route }),
                tabBarStyle: [{
                    height: 60,
                    backgroundColor: 'white'
                }]
            })}
        >
            <MainTabs.Screen name='Home' component={Home} />
            <MainTabs.Screen name='Search' component={Search} />
            <MainTabs.Screen name='Notification' component={Notification} />
            <MainTabs.Screen name='Personal' component={Personal} />
        </MainTabs.Navigator>
    )
}

const MainStackNavigation = () => {
    return (
        <MainStacks.Navigator screenOptions={screenOptions}>
            <MainStacks.Screen name='MainTabs' component={MainTabsNavigation} />
            <MainStacks.Screen name="Cartstask" component={Cartstask} />
            <MainStacks.Screen name="Updateprofilestask" component={Updateprofilestask} />
            <MainStacks.Screen name="PayStask" component={PayStask} />
            <MainStacks.Screen name="Detaltstask" component={Detaltstask} />
            <MainStacks.Screen name="Profilestask" component={Profilestask} />
            <MainStacks.Screen name="Paynextstask" component={Paynextstask} />
            <MainStacks.Screen name="Ordersuccess" component={Ordersuccess} />
            <MainStacks.Screen name="Hangbookstask" component={Hangbookstask} />
            <MainStacks.Screen name="Detalthangbook" component={Detalthangbook} />
            <MainStacks.Screen name="Searchstask" component={Searchstask} />
            <MainStacks.Screen name="Transactionhistory" component={Transactionhistory} />
            <MainStacks.Screen name="DetailtTransaction" component={DetailtTransaction} />
            <MainStacks.Screen name="Categorytree" component={Categorytree} />
            <MainStacks.Screen name="Categorysaccessory" component={Categorysaccessory} />
            <MainStacks.Screen name="Categorypots" component={Categorypots} />
        </MainStacks.Navigator>
    )
}

export default MainStackNavigation

const styles = StyleSheet.create({})