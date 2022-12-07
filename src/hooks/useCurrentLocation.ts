import { useEffect } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { useAppDispatch, useAppSelector } from '../store'
import { setUser } from '../store/userSlice'

const useCurrentLocation = () => {
  const dispatch = useAppDispatch()
  const currentLocation = useAppSelector(s => s.user.coord)

  useEffect(() => {
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
  }, [dispatch])

  return currentLocation
}

export default useCurrentLocation
