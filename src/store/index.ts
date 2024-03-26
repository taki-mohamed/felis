// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import home from './apps/home/index'

export const store = configureStore({
  reducer: {
    home
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
