import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    airportData: localStorage.getItem('airportData') !== "undefined" ? JSON.parse(localStorage.getItem('airportData')) : {},
    tcData: localStorage.getItem('tcData') !== "undefined" ? JSON.parse(localStorage.getItem('tcData')) : {},
};

// Thunks for different actions
export const getAirportCityData = createAsyncThunk('/airpot/airportData', async () => {
    try {
        let res = axiosInstance.get('airpot');
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const sendBookingData = createAsyncThunk('/airpot/airportData', async (data) => {
    try {
        let res = axiosInstance.post('oneway/booking/trip/airpot', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const getTCDetails = createAsyncThunk('/tc/byTrip', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.post('tc/trip', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});


const airportTripSlice = createSlice({
    name: 'airportTrip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAirportCityData.fulfilled, (state, action) => {
                console.log(action)
                localStorage.setItem('airportData', JSON.stringify(action.payload.data));
                state.airportData = action.payload.data;
            })
            .addCase(getTCDetails.fulfilled, (state, action) => {
                localStorage.setItem('tcData', JSON.stringify(action.payload.data));
                state.tcData = action.payload.data;
            })

    }
});

export default airportTripSlice.reducer;