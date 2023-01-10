import { useEffect } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { useAppDispatch, useAppSelector } from '../store'
import { setUser } from '../store/userSlice'
import { ANDROID } from '../lib/constant'

const useCurrentLocation = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ANDROID) {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          dispatch(setUser({ coord: { latitude, longitude } }))
        },
        error => {
          console.log('get current position error', error)
        },
        {
          enableHighAccuracy: false,
          timeout: 2000,
        },
      )
    }

    const watchId = Geolocation.watchPosition(
      async geo => {
        try {
          const { latitude, longitude } = geo.coords
          dispatch(setUser({ coord: { latitude, longitude } }))
          console.log('유저 위치 업데이트')
        } catch (error) {
          console.log('report location error', error)
        }
      },
      error => {
        console.log('get current position error', JSON.stringify(error, null, 2))
      },
      {
        timeout: 2000, // remove this line
        distanceFilter: 1,
      },
    )

    return () => Geolocation.clearWatch(watchId)
  }, [dispatch])
}

export default useCurrentLocation
