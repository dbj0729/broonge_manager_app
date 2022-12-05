import React from 'react';
import {SafeAreaView} from 'react-native';
import MapPage from './pages/MapPage';
import {useDeviceContext} from 'twrnc';
import tw from './lib/tailwind';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RootPage from './pages/RootPage';
import {AppStackParamList} from './types/navigation';

const Stack = createStackNavigator<AppStackParamList>();

const App = () => {
  useDeviceContext(tw);
  return (
    // <SafeAreaView>
    //   <MapPage />
    // </SafeAreaView>
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
            headerStyle: {backgroundColor: '#FAF5ED'},
            headerTitleAlign: 'center',
          }}>
          <Stack.Group>
            <Stack.Screen
              name="Root"
              component={RootPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Map"
              component={MapPage}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
