/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';

function Wrapper() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Wrapper);
