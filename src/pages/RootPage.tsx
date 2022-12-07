import { View, Text, Pressable, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { AppStackProps } from '../types/navigation'
import tw from '../lib/tailwind'
import LinearGradient from 'react-native-linear-gradient'
import ConfirmModal from '../components/ConfirmModal'

const RootPage = ({ navigation }: AppStackProps<'Root'>) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '부릉이',
      headerLeft: () => undefined,
    })
  }, [navigation])

  const [serviceStatus, setServiceStatus] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const toggleServerStatus = () => {
    setServiceStatus(p => !p)
    setIsOpenModal(false)
  }

  const toggleModal = () => {
    setIsOpenModal(p => !p)
  }

  const gotoMap = () => {
    navigation.navigate('Map')
  }
  return (
    <View style={tw`flex-1 `}>
      <View style={tw`py-4 items-center`}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.1 }}
        colors={serviceStatus ? ['#00A867', '#103930'] : ['#3F434A', '#94979D']}
        style={tw`h-30 flex flex-row items-center justify-between px-5`}>
        <View>
          <Pressable onPress={toggleModal}>
            <Image
              source={
                serviceStatus
                  ? require('../assets/power_on.png')
                  : require('../assets/power_off.png')
              }
            />
          </Pressable>
          <Text style={tw`text-white text-xs mt-2`}>서비스 {serviceStatus ? '중' : '종료'}</Text>
        </View>
        <View>
          <Text style={tw`text-xl text-right text-white font-bold`}>오늘 수익</Text>
          <Text style={tw`text-2xl text-right text-green-500 font-bold`}>578,500원</Text>
        </View>
      </LinearGradient>
      <View style={tw`px-4 mt-8`}>
        <Pressable
          style={tw`mb-3 border border-gray-400 py-3 items-center rounded-md`}
          onPress={gotoMap}>
          <Text>지도보기</Text>
        </Pressable>
        <Pressable
          style={tw`mb-3 border border-gray-400 py-3 items-center rounded-md`}
          onPress={undefined}>
          <Text>실시간 자료</Text>
        </Pressable>
        <Pressable
          style={tw`mb-3 border border-gray-400 py-3 items-center rounded-md`}
          onPress={undefined}>
          <Text>매니저관리</Text>
        </Pressable>

        <View style={tw`flex flex-row`}>
          <Pressable
            style={tw`flex-1 mx-1 mb-3 border border-yellow-500 py-3 items-center rounded-md`}
            onPress={undefined}>
            <Text>기간별 수익</Text>
          </Pressable>
          <Pressable
            style={tw`flex-1 mx-1 mb-3 border border-yellow-500 py-3 items-center rounded-md`}
            onPress={undefined}>
            <Text>자전거 별 수익</Text>
          </Pressable>
        </View>
      </View>
      <ConfirmModal
        leftText={'취소'}
        rightText={'확인'}
        toggleModal={toggleModal}
        modalOnOff={isOpenModal}
        confirmAction={toggleServerStatus}>
        <View style={tw`items-center`}>
          <Text style={tw`text-base font-bold text-black`}>
            서비스를{' '}
            <Text style={tw`${serviceStatus ? 'text-red-500' : 'text-green-400'}`}>
              {serviceStatus ? '종료' : '시작'}
            </Text>
            하시겠습니까?
          </Text>
        </View>
      </ConfirmModal>
    </View>
  )
}

export default RootPage
