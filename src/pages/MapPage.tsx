import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import NaverMapView from 'react-native-nmap'
import IotController from '../components/IotController'
import tw from '../lib/tailwind'
import { AppStackProps } from '../types/navigation'
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios'
import useCurrentLocation from '../hooks/useCurrentLocation'
import MarkersComponent from '../components/MarkersComponent'
import { Iot } from '../types/iotStatus'
import { useAppSelector } from '../store'
export interface OnCameraChangedEvent {
  latitude: number
  longitude: number
  zoom: number
  contentsRegion: [Coord, Coord, Coord, Coord, Coord]
  coveringRegion: [Coord, Coord, Coord, Coord, Coord]
}

export interface Coord {
  latitude: number
  longitude: number
}

const MapPage = ({ navigation }: AppStackProps<'Map'>) => {
  useCurrentLocation()
  const mapRef = useRef<NaverMapView>(null)
  const [markers, setMarkers] = useState<Iot[]>([])
  const [targetMarker, setTargetMarker] = useState<Iot>()
  const [isLocked, setIsLocked] = useState('')
  const currentLocation = useAppSelector(s => s.user.coord)
  const [coverRegion, setCoverRegion] = useState<Coord[]>([])

  const handleCameraChanged = useCallback(async (e: OnCameraChangedEvent) => {
    try {
      setCoverRegion(e.coveringRegion)
      const res = await axios.post<{ result: Iot[] }>('/iot/map', { region: e.coveringRegion })
      setMarkers(res.data.result)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const goBack = () => navigation.goBack()

  useEffect(() => {
    if (currentLocation && mapRef.current) mapRef.current.setLocationTrackingMode(2)
  }, [currentLocation])

  return (
    <View style={tw`relative w-full h-full`}>
      <View style={tw`flex flex-row p-4 justify-between items-center`}>
        <Pressable onPress={goBack} hitSlop={4} style={tw``}>
          <Image source={require('../assets/home.png')} />
        </Pressable>
        <TextInput
          style={tw`border border-gray-500 h-10 py-0 w-[70%] rounded-md`}
          placeholder="번호입력"
        />
        <Pressable hitSlop={4} style={tw``}>
          <Image source={require('../assets/bike_filter_icon.png')} />
        </Pressable>
      </View>

      <NaverMapView
        ref={mapRef}
        style={tw`flex-1`}
        onCameraChange={handleCameraChanged}
        showsMyLocationButton={false}
        useTextureView={true}
        center={{ ...currentLocation, zoom: 16 }}>
        <MarkersComponent
          markers={markers}
          setTargetMarker={setTargetMarker}
          setIsLocked={setIsLocked}
        />
      </NaverMapView>
      <IotController
        setTargetMarker={setTargetMarker}
        marker={targetMarker}
        isLocked={isLocked}
        setIsLocked={setIsLocked}
        setMarkers={setMarkers}
        coverRegion={coverRegion}
      />
    </View>
  )
}

export default MapPage
