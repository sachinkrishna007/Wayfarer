import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  guideInfo: localStorage.getItem('guideInfo')
    ? JSON.parse(localStorage.getItem('guideInfo'))
    : null,
}

const guideauthSlice = createSlice({
  name: 'guideAuth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.guideInfo = action.payload
      localStorage.setItem('guideInfo', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      state.guideInfo = null
      localStorage.removeItem('guideInfo')
    },
  },
})

export const { setCredentials, logout } = guideauthSlice.actions

export default guideauthSlice.reducer
