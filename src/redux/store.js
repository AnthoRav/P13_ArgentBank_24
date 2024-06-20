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
//Appelle l'action initializeAuthentication pour vérifier et restaurer l'état d'authentification au 
//démarrage de l'application.
store.dispatch(initializeAuthentication());

export default store