/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'

function Wrapper() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => Wrapper)
