import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/reducer'

export interface User {
  id: number
  name: string
}

const initialState: User = {
  id: -1,
  name: '',
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
