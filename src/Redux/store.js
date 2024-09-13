import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice'
import localTripReducer from './Slices/localTripSlice'
import razorpaySlice from './Slices/razorpaySlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        localTrip: localTripReducer,
        razorpay: razorpaySlice

    },
    devTools: true
})

export default store