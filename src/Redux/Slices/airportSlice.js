import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    tcData: localStorage.getItem('tcData') !== "undefined" ? JSON.parse(localStorage.getItem('tcData')) : {},
};

// Thunks for different actions
export const getAirportCityData = createAsyncThunk('/airpot/airportData', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.post('airpot/rate/list', data);
        res = await res;
        console.log(res)
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const sendAirportBookingData = createAsyncThunk('/airpot/airportData', async (data) => {
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

        let res = axiosInstance.post('tc/trip', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const getDistance = createAsyncThunk('/airport/distance', async (data) => {
    try {

        let res = axiosInstance.post('distance', data);
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

            .addCase(getTCDetails.fulfilled, (state, action) => {
                localStorage.setItem('tcData', JSON.stringify(action.payload.data));
                state.tcData = action.payload.data;
            })

    }
});

export default airportTripSlice.reducer;