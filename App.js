/**
 * App.js - Main File for ClassWiz Mobile App, actively used by classrooms for their class and student management
 * 
 * Created by: Yassine El Yacoubi
 * 
 * Description:
 * This is the entry point of the ClassWiz mobile app, a classroom management
 * solution designed to streamline teaching and learning for Sunday schools,
 * after-school programs, and other educational environments.
 * 
 * Features:
 * - Integrates Redux for state management with persistence to ensure seamless
 *   user experience across app sessions.
 * - Leverages `redux-persist` for maintaining data such as class details, 
 *   assignments, and other application state across restarts.
 * - Includes a `FirstRunNavigator` for onboarding new users with a 
 *   guided setup experience.
 * 
 * Dependencies:
 * - React: Core library for building the app's user interface.
 * - Redux & redux-persist: Manage and persist the app state.
 * - AsyncStorage: Used as the storage backend for persistence.
 * 
 * Additional Information:
 * This code is provided for educational purposes as part of the ClassWiz 
 * open-source repository. To learn more, visit the repository or the creator's blog:
 * - Repository: https://github.com/KhalidPM/YungDevz/tree/master/Dev/ClassWiz
 * - Blog: https://medium.com/@yassine.elyacoub/list/yassine-el-yacoubi-blog-llm-topics-4b03e76b7d2d
 * - Company: https://musaim.ai
 * 
 * License:
 * This project is licensed under the MIT License. See LICENSE for details.
 */

import React, {Component} from 'react';
import FirstRunNavigator from 'screens/FirstRun/FirstRunNavigator'
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import classReducer from 'model/reducers/classReducer'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native';


const persistConfig = {
  key: 'qcstorealpha15',
  storage: AsyncStorage,
  version: 0,
}
const persistedReducer = persistReducer(persistConfig, classReducer)

export const store = createStore(
  persistedReducer,
  //This is to allow react native redux debugger to show redux content
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const persistor = persistStore(store);
export default class App extends Component {

  renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );

  render() {
    return (
      <Provider store= { store} >
      <PersistGate persistor={persistor} loading={this.renderLoading()}>
        <FirstRunNavigator />
      </PersistGate>
      </Provider>
    );
  }
}

