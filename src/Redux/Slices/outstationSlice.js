import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    onewayTripData: localStorage.getItem('onewayTripData') !== "undefined" ? JSON.parse(localStorage.getItem('onewayTripData')) : {},
    roundCityData: [],
    onewayCityData: [],
    tcData: {},
};

// Thunks for different actions
export const getRoundCityData = createAsyncThunk('/outstation/roundCityData', async () => {
    try {
        let res = axiosInstance.get('round/city');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});


export const getRoundTripData = createAsyncThunk('/outstation/roundTripData', async (data) => {
    try {

        let res = axiosInstance.post('round/city/rate/list', data);
        res = await res;

        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const sendRoundTripData = createAsyncThunk('/outstation/roundTripData', async (data) => {
    try {
        let res = axiosInstance.post('oneway/booking/trip/round', data);
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getTCDetails = createAsyncThunk('/tc/byTrip', async (data) => {
    try {

        let res = axiosInstance.post('tc/trip', data);
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getDistance = createAsyncThunk('/outstation/distance', async (data) => {
    try {

        let res = axiosInstance.post('distance', data);
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});


export const getOnewayCityData = createAsyncThunk('/outstation/onewayCityData', async () => {
    try {
        let res = axiosInstance.get('city/rate/allcity');
        res = await res;
        return res?.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getOnewayCabData = createAsyncThunk('/outstation/onewayCabData', async (data) => {
    try {
        let res = axiosInstance.post('city/rate/location/oneway', data);
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const sendOnewayTripData = createAsyncThunk('/outstation/onewayBookingData', async (data) => {
    try {
        let res = axiosInstance.post('oneway/booking/trip/oneway', data);
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

const outstationTripSlice = createSlice({
    name: 'outstationTrip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getOnewayCabData.fulfilled, (state, action) => {
                localStorage.setItem('onewayTripData', JSON.stringify(action.payload.data));
                state.onewayTripData = action.payload.data;
            })
            .addCase(getRoundCityData.fulfilled, (state, action) => {
                localStorage.setItem('roundCityData', JSON.stringify(action.payload.data));
                state.roundCityData = action.payload.data;
            })
            .addCase(getOnewayCityData.fulfilled, (state, action) => {
                localStorage.setItem('onewayCityData', JSON.stringify(action.payload.data));
                state.onewayCityData = action.payload.data;
            })
            .addCase(getTCDetails.fulfilled, (state, action) => {
                localStorage.setItem('tcData', JSON.stringify(action.payload.data));
                state.tcData = action.payload.data;
            })

    }
});

export default outstationTripSlice.reducer;