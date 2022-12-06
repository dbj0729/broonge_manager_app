import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import tw from '../lib/tailwind'
import { iotStatusStyle } from '../lib/iotStatus'
import Telnet from 'react-native-telnet-client'

const IotController = ({
  marker,
  setTargetMarker,
}: {
  marker: any
  setTargetMarker: Dispatch<SetStateAction<any>>
}) => {
  const [unLockLoading, setUnlockLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  const updateBikeStatus = async (order: string) => {
    if (order === 'unlock') setUnlockLoading(true)
    if (order === 'page') setPageLoading(true)

    const connection = new Telnet()

    const params = {
      // host: '192.168.0.57',
      host: 'broonge.co.kr',
      port: 9090,
      negotiationMandatory: false,
      timeout: 10000,
    }

    try {
      await connection.connect(params)
    } catch (error) {
      console.log('timeout?')
      setUnlockLoading(false)
      setPageLoading(false)
      return
    }

    const res = await connection.send(`a001,1241212319,${order}`)
    console.log(res)

    await connection.end()
    if (order === 'unlock') setUnlockLoading(false)
    if (order === 'page') setPageLoading(false)
  }

  if (!marker) return null

  return (
    <View style={tw` absolute bottom-0 bg-white w-full rounded-tl-lg rounded-tr-lg`}>
      <View
        style={tw`px-5 py-2 flex-1 flex flex-row justify-between items-center border-b border-b-gray-300`}>
        <View style={tw``}>
          <Text>{marker.bike_id}(세종)</Text>
        </View>
        <View style={tw`flex-1 flex flex-row items-center justify-end`}>
          <View style={tw`w-4 h-4 rounded-full ${iotStatusStyle[marker.status].style}`} />
          <Text style={tw`ml-1 text-sm`}>{iotStatusStyle[marker.status].status}</Text>
          <View style={tw`w-8 py-1 flex flex-row items-end justify-center `}>
            {marker.signal <= 1 ? (
              <Text style={tw`text-xs`}>N/A</Text>
            ) : (
              <>
                <View style={tw`w-1 h-1 bg-black rounded-[2px] mr-[1px]`} />
                <View
                  style={tw`w-1 h-2 ${
                    marker.signal >= 3 ? 'bg-black' : 'bg-gray-300'
                  } rounded-[2px] mr-[1px]`}
                />
                <View
                  style={tw`w-1 h-3 ${
                    marker.signal >= 4 ? 'bg-black' : 'bg-gray-300'
                  } rounded-[2px] mr-[1px]`}
                />
                <View
                  style={tw`w-1 h-4 ${
                    marker.signal >= 5 ? 'bg-black' : 'bg-gray-300'
                  } rounded-[2px] mr-[1px]`}
                />
              </>
            )}
            {/* <View style={tw`w-1 h-5 bg-black mr-[2px]`} /> */}
          </View>
          <View style={tw`ml-3`}>
            <Text style={tw`${marker.battery <= 20 ? 'text-red-400' : ''} text-xs text-center`}>
              {marker.battery}%
            </Text>
            <View
              style={tw`${
                marker.battery <= 20 ? 'border-red-400' : ''
              } w-8 border p-[1px] rounded-md`}>
              <View
                style={tw`${marker.battery <= 20 ? 'bg-red-400' : 'bg-black'} h-1 w-[${
                  marker.battery
                }%]  rounded-md`}
              />
            </View>
          </View>

          <Pressable
            hitSlop={4}
            onPress={() => {
              setTargetMarker(undefined)
            }}
            style={tw`ml-4`}>
            <Text style={tw`text-base font-bold`}>X</Text>
          </Pressable>
        </View>
      </View>
      <View style={tw`px-5 py-2`}>
        <View style={tw`flex-1 flex-row items-center`}>
          <Pressable
            onPress={() => updateBikeStatus('unlock')}
            style={tw`flex-1 py-3  mx-1 items-center justify-center border rounded-md`}>
            {!unLockLoading && <Text>해제</Text>}
            {unLockLoading && <ActivityIndicator animating={unLockLoading} color="#222" />}
          </Pressable>
          <Pressable
            onPress={() => updateBikeStatus('page')}
            style={tw`flex-1 py-3  mx-1 items-center justify-center border rounded-md`}>
            {!pageLoading && <Text>찾기</Text>}
            {pageLoading && <ActivityIndicator animating={pageLoading} color="#222" />}
          </Pressable>
          <Pressable style={tw`flex-1 py-3  mx-1 items-center justify-center border rounded-md`}>
            <Text>정보</Text>
          </Pressable>
          <Pressable style={tw`flex-1 py-3  mx-1 items-center justify-center border rounded-md`}>
            <Text>신고</Text>
          </Pressable>
        </View>
        <View style={tw`flex flex-1 flex-row mt-3`}>
          <Pressable
            style={tw`flex-1 border-2 py-5 rounded-md mx-1 items-center justify-center border-blue-800`}>
            <Text style={tw`text-center`}>수거</Text>
          </Pressable>
          <Pressable
            style={tw`flex-1 border-2 py-5 rounded-md mx-1 items-center justify-center border-green-600`}>
            <Text style={tw`text-center`}>현장{'\n'}조치</Text>
          </Pressable>
          <Pressable
            style={tw`flex-2 border-2 py-5 rounded-md mx-1 items-center justify-center border-red-500`}>
            <Text style={tw`text-center`}>배터리 교체</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default IotController
