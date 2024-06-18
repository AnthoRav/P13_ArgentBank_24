import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userReducer from './userSlice'
import { initializeAuthentication } from './authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
})

store.dispatch(initializeAuthentication());

export default store