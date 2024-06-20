import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearAuth } from './authSlice'

const URL_USER_PROFILE = 'http://localhost:3001/api/v1/user/profile'
//en-têtes HTTP
const headers = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+token
})

//Récupération profil utilisateur en utilisant le token d'authentification stocké dans l'état.
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { getState, dispatch, rejectWithValue }) => {
    //Pour accéder à l'état actuel de l'authentification et obtenir le token.
    const { auth } = getState()
    const { token } = auth

    try {
      const config = {
        method: 'post',
        headers: headers(token)
      }

      const response = await fetch(URL_USER_PROFILE, config)

      if(response.ok === false) {
        if(response.status === 401) {
          dispatch(clearAuth())
        }

        throw new Error('Fetch user profile failed')
      }

      const userProfile = await response.json()

      return userProfile.body
    } catch(error) {
      //Pour renvoyer un message d'erreur spécifique en cas d'échec de la requête asynchrone.
      return rejectWithValue(error.message)
    }
  }
)

//Mise à jour du profil utilisateur
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (newUserData, { getState, dispatch, rejectWithValue }) => {
    const { auth } = getState()
    const { token } = auth

    try {
      const config = {
        method: 'put',
        headers: headers(token),
        body: JSON.stringify(newUserData)
      }

      const response = await fetch(URL_USER_PROFILE, config)

      if(response.ok === false) {
        if(response.status === 401) {
          dispatch(clearAuth())
        }

        throw new Error('Update user profile failed')
      }

      const userInformations = await response.json()

      return userInformations.body
    } catch(error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    error: null
  },
  //actions synchrones.
  reducers: {
    //Réinitialise l'état utilisateur.
    clearUser: (state) => {
      state.id = null
      state.email = null
      state.firstName = null
      state.lastName = null
      state.error = null
    },
    clearEdit: (state) => {
      state.isEdit = null
    }
  },
  //Gère les états des actions asynchrones fetchUserProfile et updateUserProfile en focntion des différente
  //étapes des actions.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { id, email, firstName, lastName} = action.payload

        state.id = id
        state.email = email
        state.firstName = firstName
        state.lastName = lastName
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload
      })


      .addCase(updateUserProfile.pending, (state) => {
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const { id, email, firstName, lastName} = action.payload

        state.id = id
        state.email = email
        state.firstName = firstName
        state.lastName = lastName
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})
//Sélecteur pour obtenir l'état du profil utilisateur (user) de l'état global.
export const getUser = (state) => state.user

//Sélecteur pour obtenir les erreurs liées au profil utilisateur (error) de l'état global.
export const getUserError = (state) => state.user.error

//Exportation des actions.
export const { clearUser, clearEdit } = userSlice.actions

//Exportation du reducer.
export default userSlice.reducer