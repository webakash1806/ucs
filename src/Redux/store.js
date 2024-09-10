import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice'
import localTripReducer from './Slices/localTripSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        localTrip: localTripReducer

    },
    devTools: true
})

export default store