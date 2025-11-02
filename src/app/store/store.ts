import { configureStore } from '@reduxjs/toolkit'
// import { api } from '../shared/api/api'
import counterReducer from '../../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    // [api.reducerPath]: api.reducer,
    counter: counterReducer,
  },
  // middleware: (getDefault) => getDefault().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
