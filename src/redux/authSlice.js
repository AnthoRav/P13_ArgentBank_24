// @ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL_AUTH = 'http://localhost:3001/api/v1/user/login'

//Authentifie l'utilisateur avec le nom d'utilisateur et le mot de passe fournis.
export const authenticate = createAsyncThunk(
  'auth/authenticate',
  //rememberMe défini a false par défaut pour un comportement de stockage de session simplifié.
  async ( { userName, password, rememberMe = false }, { rejectWithValue } ) => {
    const url = URL_AUTH

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userName,
        password: password
      })
    }

    try {
      const response = await fetch(url, config)

      if(response.ok === false) {
        throw new Error('Authentication failed')
      }

      const authData = await response.json()
      const token = authData.body.token
  //Stocke le token d'authentification dans localStorage ou sessionStorage en fonction de la valeur de rememberMe.
      if(rememberMe === true) {
        localStorage.setItem('auth', token)
      }
      if(rememberMe === false) {
        sessionStorage.setItem('auth', token)
      }
      
      return token
    } catch(error) {
      return rejectWithValue(error.message)
    }
   }
)
//Initialise l'authentification en récupérant le token du localStorage ou sessionStorage et met à jour 
//l'état avec ce token si trouvé.
export const initializeAuthentication = createAsyncThunk(
  'auth/initializeAuthentication',
  //dispatch en paramètre afin de dispatcher d'autres actions dans la fonction asynchrone
  async (_, { dispatch }) => {
    let token = localStorage.getItem('auth')
    if (token === undefined || token === null) {
      token = sessionStorage.getItem('auth') 
    }
    if(token !== null) {
      const payload = { token, isAuthenticated: true }
      dispatch(refreshAuth(payload))
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    error: null
  },
  //actions synchrones
  reducers: {
    //Réinitialise l'état d'authentification.
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.error = null
      localStorage.removeItem('auth')
      sessionStorage.removeItem('auth')
    },
    //Réinitialise l'erreur d'authentification.
    clearErrorAuth: (state) => {
      state.error = null
    },
    //Met à jour l'état avec un nouveau token.
    refreshAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.token = action.payload.token
    }
  },
  //Gère les états des actions asynchrones en fonction des différentes étapes de l'action.
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => { //action commence
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(authenticate.fulfilled, (state, action) => { //action réussie
        state.token = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(authenticate.rejected, (state, action) => { //action échoue
        state.isAuthenticated = false
        state.error = action.payload
      })
  }
})

//Sélecteur pour obtenir l'état d'authentification (isAuthenticated) de l'état global.
export const authenticated = (state) => state.auth.isAuthenticated

//Sélecteur pour obtenir les erreurs d'authentification (error) de l'état global.
export const authenticationError = (state) => state.auth.error

//Exportation des actions.
export const { clearAuth, clearErrorAuth, refreshAuth } = authSlice.actions

//Exportation du reducer.
export default authSlice.reducer