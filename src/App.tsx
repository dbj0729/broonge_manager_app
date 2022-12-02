import React from 'react';
import {SafeAreaView} from 'react-native';
import MapPage from './pages/MapPage';
import {useDeviceContext} from 'twrnc';
import tw from './lib/tailwind';

const App = () => {
  useDeviceContext(tw);
  return (
    <SafeAreaView>
      <MapPage />
    </SafeAreaView>
  );
};

export default App;
