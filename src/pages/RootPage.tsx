import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {AppStackProps} from '../types/navigation';
import tw from '../lib/tailwind';

const RootPage = ({navigation}: AppStackProps<'Root'>) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '부릉이',
      headerLeft: () => undefined,
    });
  }, [navigation]);

  const gotoMap = () => {
    navigation.navigate('Map');
  };
  return (
    <View style={tw`flex-1 `}>
      <View style={tw`flex px-5 items-end justify-center h-40 bg-green-900`}>
        <Text style={tw`text-2xl text-white font-bold`}>오늘 수익</Text>
        <Text style={tw`text-xl text-green-600 font-bold`}>578,500원</Text>
      </View>
      <View style={tw`px-4 mt-8`}>
        <Pressable
          style={tw`border border-gray-400 py-3 items-center rounded-md`}
          onPress={gotoMap}>
          <Text>지도보기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RootPage;
