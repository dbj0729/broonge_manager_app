import {View, Text, Pressable} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {iotStatusStyle} from '../lib/iotStatus';

const IotController = ({marker}: {marker: any}) => {
  if (!marker) return null;
  return (
    <View
      style={tw` absolute bottom-0 bg-white w-full rounded-tl-lg rounded-tr-lg`}>
      <View
        style={tw`px-5 py-2 flex-1 flex flex-row justify-between items-center border-b border-b-gray-300`}>
        <View style={tw``}>
          <Text>{marker.bike_id}(세종)</Text>
        </View>
        <View style={tw`flex-1 flex flex-row items-center justify-end`}>
          <View
            style={tw`w-4 h-4 rounded-full ${
              iotStatusStyle[marker.status].style
            }`}
          />
          <Text style={tw`ml-1 text-sm`}>배터리</Text>
          <View style={tw`ml-3`}>
            <Text
              style={tw`${
                marker.battery <= 20 ? 'text-red-400' : ''
              } text-xs text-center`}>
              {marker.battery}%
            </Text>
            <View
              style={tw`${
                marker.battery <= 20 ? 'border-red-400' : ''
              } w-8 border p-[1px] rounded-md`}>
              <View
                style={tw`${
                  marker.battery <= 20 ? 'bg-red-400' : 'bg-black'
                } h-1 w-[${marker.battery}%]  rounded-md`}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={tw`px-5 py-2`}>
        <View style={tw`flex-1 flex-row items-center`}>
          <Pressable
            style={tw`flex-1 h-9 mx-1 items-center justify-center border rounded-md`}>
            <Text>해제</Text>
          </Pressable>
          <Pressable
            style={tw`flex-1 h-9 mx-1 items-center justify-center border rounded-md`}>
            <Text>찾기</Text>
          </Pressable>
          <Pressable
            style={tw`flex-1 h-9 mx-1 items-center justify-center border rounded-md`}>
            <Text>정보</Text>
          </Pressable>
          <Pressable
            style={tw`flex-1 h-9 mx-1 items-center justify-center border rounded-md`}>
            <Text>신고</Text>
          </Pressable>
        </View>
        <View style={tw`flex flex-1 flex-row mt-3`}>
          <Pressable
            style={tw`flex-1 border-2 py-5 rounded-md mx-1 items-center justify-center border-blue-700`}>
            <Text style={tw`text-center`}>수거</Text>
          </Pressable>
          <Pressable
            style={tw`flex-1 border-2 py-5 rounded-md mx-1 items-center justify-center border-green-700`}>
            <Text style={tw`text-center`}>현장{'\n'}조치</Text>
          </Pressable>
          <Pressable
            style={tw`flex-2 border-2 py-5 rounded-md mx-1 items-center justify-center border-red-700`}>
            <Text style={tw`text-center`}>배터리 교체</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default IotController;
