import { View, Text, Pressable } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import tw from '../lib/tailwind'
import { iotStatusStyle } from '../lib/iotStatus'
import Telnet from 'react-native-telnet-client'
import { Iot } from '../types/iotStatus'
import axios from 'axios'

const IotController = ({
  marker,
  setTargetMarker,
}: {
  marker: Iot | undefined
  setTargetMarker: Dispatch<SetStateAction<Iot | undefined>>
}) => {
  const [loading, setLoading] = useState(false)
  const [isPressLockBtn, setIsPressLockBtn] = useState(false)
  const [isLocked, setIsLocked] = useState('')
  const [count, setCount] = useState(10)

  const updateBikeStatus = async (order: string) => {
    setLoading(true)

    if (order === 'unlock') setIsPressLockBtn(true)

    const connection = new Telnet()

    const params = {
      // host: '192.168.0.57',
      host: 'broonge.co.kr',
      port: 9090,
      negotiationMandatory: false,
    }

    try {
      await connection.connect(params)
    } catch (error) {
      console.log('timeout?')
      return
    }

    const res = await connection.send(`a001,1241212319,${order}`)
    console.log(res)

    await connection.end()
  }

  useEffect(() => {
    const checkIsLocked = async () => {
      try {
        const res = await axios.get<Iot>(`/iot/lock/${marker?.bike_id}`)
        setIsLocked(res.data.is_locked)
      } catch (error) {
        console.log(error)
      }
    }

    if (loading) {
      const timer = setTimeout(() => {
        if (count > 0) {
          setCount(pre => pre - 1)
        } else if (count <= 0 && isPressLockBtn) {
          checkIsLocked()
        }

        if (count <= 0) {
          setCount(10)
          setLoading(false)
          setIsPressLockBtn(false)
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [count, isPressLockBtn, loading, marker?.bike_id])

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
            {Number(marker.signal_strength) <= 1 ? (
              <Text style={tw`text-xs`}>N/A</Text>
            ) : (
              <>
                <View style={tw`w-1 h-1 bg-black rounded-[2px] mr-[1px]`} />
                <View
                  style={tw`w-1 h-2 ${
                    Number(marker.signal_strength) >= 3 ? 'bg-black' : 'bg-gray-300'
                  } rounded-[2px] mr-[1px]`}
                />
                <View
                  style={tw`w-1 h-3 ${
                    Number(marker.signal_strength) >= 4 ? 'bg-black' : 'bg-gray-300'
                  } rounded-[2px] mr-[1px]`}
                />
                <View
                  style={tw`w-1 h-4 ${
                    Number(marker.signal_strength) >= 5 ? 'bg-black' : 'bg-gray-300'
                  } rounded-[2px] mr-[1px]`}
                />
              </>
            )}
            {/* <View style={tw`w-1 h-5 bg-black mr-[2px]`} /> */}
          </View>
          <View style={tw`ml-3`}>
            <Text
              style={tw`${Number(marker.battery) <= 20 ? 'text-red-400' : ''} text-xs text-center`}>
              {Number(marker.battery)}%
            </Text>
            <View
              style={tw`${
                Number(marker.battery) <= 20 ? 'border-red-400' : ''
              } w-8 border p-[1px] rounded-md`}>
              <View
                style={tw`${Number(marker.battery) <= 20 ? 'bg-red-400' : 'bg-black'} h-1 w-[${
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
            disabled={loading}
            style={tw`flex-1 py-3  mx-1 items-center justify-center border rounded-md`}>
            {!loading && <Text>{isLocked === 'NO' ? '해제완료' : '해제'}</Text>}
            {/* {unLockLoading && <ActivityIndicator animating={unLockLoading} color="#222" />} */}
            {loading && <Text style={tw``}>{count}</Text>}
          </Pressable>

          <Pressable
            disabled={loading}
            onPress={() => updateBikeStatus('page')}
            style={tw`flex-1 py-3  mx-1 items-center justify-center border rounded-md`}>
            {!loading && <Text>찾기</Text>}
            {loading && <Text style={tw``}>{count}</Text>}
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
