import { configureStore } from '@reduxjs/toolkit'

import appSlice from '../redux/app.slice'

export const store = configureStore({
  reducer: { 
    app: appSlice
  },
  devTools: true,
})