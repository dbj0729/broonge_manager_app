import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import IotController from '../components/IotController';
import tw from '../lib/tailwind';
import dummyMarker from '../../data/dummyMarker.json';
import {iotStatusStyle} from '../lib/iotStatus';

const MapPage = () => {
  const P0 = {latitude: 33.45061368551521, longitude: 126.56895152804822};
  const [markers, setMarkers] = useState<any[]>([]);
  const [targetMarker, setTargetMarker] = useState(undefined);

  useEffect(() => {
    setMarkers(dummyMarker.data.bike);
  }, []);

  return (
    <View style={tw`relative w-full h-full bg-red-100`}>
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
      <IotController marker={targetMarker} />
    </View>
  );
};

export default MapPage;
