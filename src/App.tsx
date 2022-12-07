import React, { useLayoutEffect } from 'react'
import MapPage from './pages/MapPage'
import { useDeviceContext } from 'twrnc'
import tw from './lib/tailwind'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RootPage from './pages/RootPage'
import { AppStackParamList } from './types/navigation'
import Orientation from 'react-native-orientation-locker'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.57:4007'

const Stack = createStackNavigator<AppStackParamList>()

const App = () => {
  useDeviceContext(tw)
  useLayoutEffect(() => Orientation.lockToPortrait(), [])

  return (
    // <SafeAreaView>
    //   <MapPage />
    // </SafeAreaView>
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
            headerStyle: { backgroundColor: '#FAF5ED' },
            headerTitleAlign: 'center',
          }}>
          <Stack.Group>
            <Stack.Screen name="Root" component={RootPage} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={MapPage} options={{ headerShown: false }} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App
