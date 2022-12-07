import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coord } from '../pages/MapPage'
import { RootState } from '../store/reducer'

export interface User {
  id: number
  name: string
  coord: Coord
}

const initialState: User = {
  id: -1,
  name: '',
  coord: {
    latitude: 0,
    longitude: 0,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      Object.assign(state, initialState)
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      Object.assign(state, action.payload)
    },
  },
  extraReducers: _ => {}, // async reducers here
})

// export action creators
export const { resetUser, setUser } = userSlice.actions

export default userSlice
