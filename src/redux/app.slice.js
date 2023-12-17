import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  settings: {}
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += action.payload
    },
    decrement: (state, action) => {
      state.value -= action.payload
    },
    setSettings: (state, action) => {
      state.settings = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setSettings } = appSlice.actions

export default appSlice.reducer