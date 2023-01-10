import { View, Text, Image } from 'react-native'
import React, { SetStateAction } from 'react'
import { Iot } from '../types/iotStatus'
import { Marker } from 'react-native-nmap'
import { iotStatusStyle } from '../lib/iotStatus'
import tw from '../lib/tailwind'
import axios from 'axios'

interface Props {
  markers: Iot[]
  setTargetMarker: React.Dispatch<SetStateAction<Iot | undefined>>
  setIsLocked: React.Dispatch<SetStateAction<string>>
}

export default function MarkersComponent({ markers, setTargetMarker, setIsLocked }: Props) {
  const handleMarkerClick = async (marker: Iot) => {
    try {
      const res = await axios.get<Iot>(`/iot/lock/${marker.bike_id}`)
      setIsLocked(res.data.is_locked)
      setTargetMarker(marker)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {markers.map(marker => (
        <Marker
          key={marker.bike_id}
          coordinate={{ longitude: Number(marker.lng), latitude: Number(marker.lat) }}
          width={60}
          height={60}
          // image={require('../assets/reported.png')}
          onClick={() => handleMarkerClick(marker)}>
          <View style={tw`relative`}>
            <Image
              style={tw`w-10`}
              // source={require('../assets/stand_by.png')}
              source={iotStatusStyle[marker?.status]?.marker}
            />
            <View style={tw`absolute top-2 left-2 w-6 border p-[1px] rounded-md`}>
              <View style={tw`bg-black h-1 w-[${marker.battery}%]  rounded-md`} />
            </View>
          </View>
        </Marker>
      ))}
    </>
  )
}
