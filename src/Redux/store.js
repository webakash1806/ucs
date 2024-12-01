import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice'
import localTripReducer from './Slices/localTripSlice'
import airportTripReducer from './Slices/airportSlice'
import razorpaySlice from './Slices/razorpaySlice'
import outstationSlice from './Slices/outstationSlice'
import dynamicSlice from './Slices/dynamicSlice'
import packageSlice from './Slices/packageSlice'


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        localTrip: localTripReducer,
        airportTrip: airportTripReducer,
        razorpay: razorpaySlice,
        outstation: outstationSlice,
        dynamic: dynamicSlice,
        packages:packageSlice
    },
    devTools: true
})

export default store