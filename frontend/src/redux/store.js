import { configureStore } from '@reduxjs/toolkit'
import { userApiSlice } from './slices/apiSlice'

import authReducer from './slices/userAuthSlice'
import guideReducer from './slices/guideSlice/guideAuthSlice'
import adminReducer from './slices/adminSlice/adminAuthSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    guideAuth: guideReducer,
    adminAuth: adminReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
  devTools: true,
})

export default store
