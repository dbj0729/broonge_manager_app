import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import IotController from '../components/IotController';
import tw from '../lib/tailwind';
import dummyMarker from '../../data/dummyMarker.json';
import {iotStatusStyle} from '../lib/iotStatus';
import {AppStackProps} from '../types/navigation';
import {TextInput} from 'react-native-gesture-handler';

const MapPage = ({navigation}: AppStackProps<'Map'>) => {
  const P0 = {latitude: 33.45061368551521, longitude: 126.56895152804822};
  const [markers, setMarkers] = useState<any[]>([]);
  const [targetMarker, setTargetMarker] = useState(undefined);

  useEffect(() => {
    setMarkers(dummyMarker.data.bike);
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

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
        style={tw`flex-1`}
        showsMyLocationButton={true}
        center={{...P0, zoom: 16}}>
        {markers.map(marker => (
          <Marker
            key={marker.bike_id}
            coordinate={{longitude: marker.gps[0], latitude: marker.gps[1]}}
            width={60}
            height={60}
            // image={require('../assets/reported.png')}
            onClick={() => setTargetMarker(marker)}>
            <View style={tw`relative`}>
              <Image
                style={tw`w-10`}
                // source={require('../assets/stand_by.png')}
                source={iotStatusStyle[marker?.status]?.marker}
              />
              <View
                style={tw`absolute top-2 left-2 w-6 border p-[1px] rounded-md`}>
                <View
                  style={tw`bg-black h-1 w-[${marker.battery}%]  rounded-md`}
                />
              </View>
            </View>
          </Marker>
        ))}
      </NaverMapView>
      <IotController setTargetMarker={setTargetMarker} marker={targetMarker} />
    </View>
  );
};

export default MapPage;
