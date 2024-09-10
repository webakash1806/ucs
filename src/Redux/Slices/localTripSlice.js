import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    cityData: localStorage.getItem('cityData') !== "undefined" ? JSON.parse(localStorage.getItem('cityData')) : {},
};

// Thunks for different actions
export const getLocalCityData = createAsyncThunk('/local/cityData', async () => {
    try {
        let res = axiosInstance.get('local/getRate');
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});


const localTripSlice = createSlice({
    name: 'localTrip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLocalCityData.fulfilled, (state, action) => {
                localStorage.setItem('cityData', JSON.stringify(action.payload.data));
                state.cityData = action.payload.data;
            })

    }
});

export default localTripSlice.reducer;