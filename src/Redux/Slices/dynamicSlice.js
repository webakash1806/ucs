import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    termsAndCondition: localStorage.getItem('termsAndCondition') !== "undefined" ? JSON.parse(localStorage.getItem('cityData')) : {},
    privacyPolicy: localStorage.getItem('privacyPolicy') !== "undefined" ? JSON.parse(localStorage.getItem('privacyPolicy')) : {},
};

// Thunks for different actions
export const getTermsAndCondition = createAsyncThunk('/dynamic/termsAndConditions', async () => {
    try {
        let res = axiosInstance.get('dynamic/Terms%20and%20Conditions');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getPrivacyPolicy = createAsyncThunk('/dynamic/privacy-policy', async () => {
    try {
        let res = axiosInstance.get('dynamic/Privacy-Policy');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const sendBookingData = createAsyncThunk('/local/cityData', async (data) => {
    try {
        let res = axiosInstance.post('oneway/booking/trip/local', data);
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


const dynamicSlice = createSlice({
    name: 'dynamic',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTermsAndCondition.fulfilled, (state, action) => {
                localStorage.setItem('termsAndCondition', JSON.stringify(action.payload.data));
                state.termsAndCondition = action.payload.data;
            })
            .addCase(getPrivacyPolicy.fulfilled, (state, action) => {
                localStorage.setItem('privacyPolicy', JSON.stringify(action.payload.data));
                state.privacyPolicy = action.payload.data;
            })

    }
});

export default dynamicSlice.reducer;