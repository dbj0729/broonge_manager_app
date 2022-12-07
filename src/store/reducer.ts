import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './userSlice'

// import orderSlice from '../slices/orderSlice'

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
