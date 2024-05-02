/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import Login from './src/app/authen/stasksAuthen/Login';
import Register from './src/app/authen/stasksAuthen/Register';
import AppNavigation from './src/app/AppNavigation';
import { AppContext, AppContextProvider } from './src/data/Appcontext';
import Flatlist from './test/Flatlist';
import Header from './src/app/common/Detaults/Header';
import Detaltstask from './src/app/main/stasks/Detaltstask';
import Home from './src/app/main/tabs/Home';
import Search from './src/app/main/tabs/Search';
import Updateprofilestask from './src/app/main/stasks/Updateprofilestask';
import FlatlistScrollEnd from './test/FlatlistScrollEnd';
import Modalcart from './src/app/common/Cart/Modalcart';
import Modalblack from './test/Modalblack';
import TestStatusBar from './test/TestStatusBar';
import Detailstasks from './test/Detailstasks';
import Choosepay from './test/Choosepay';
import Paynextstask from './src/app/main/stasks/Paynextstask';
import KeyboardDidShowListener from './test/KeyboardDidShowListener';
import Hangbookstask from './src/app/main/stasks/Hangbookstask';
import TestCollapsibleArray from './test/TestCollapsibleArray';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import Findproduct from './test/Findproduct';
import TestCheckbox from './test/TestCheckbox';
import FlatlistloadingScrollend from './test/FlatlistloadingScrollend';









function App(): React.JSX.Element {
  return (
 

      <Provider store={store}>
      <AppNavigation />
      </Provider>
      // <FlatlistloadingScrollend/>



  );
}



export default App;
