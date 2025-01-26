import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    termsAndCondition: localStorage.getItem('termsAndCondition') !== "undefined" ? JSON.parse(localStorage.getItem('cityData')) : {},
    privacyPolicy: localStorage.getItem('privacyPolicy') !== "undefined" ? JSON.parse(localStorage.getItem('privacyPolicy')) : {},
    roundCab: localStorage.getItem('roundCab') !== "undefined" ? JSON.parse(localStorage.getItem('roundCab')) : {},
    localCab: localStorage.getItem('localCab') !== "undefined" ? JSON.parse(localStorage.getItem('localCab')) : {},
    airportCab: localStorage.getItem('airportCab') !== "undefined" ? JSON.parse(localStorage.getItem('airportCab')) : {},
    onewayCab: localStorage.getItem('onewayCab') !== "undefined" ? JSON.parse(localStorage.getItem('onewayCab')) : {},
    faq: localStorage.getItem('faq') !== "undefined" ? JSON.parse(localStorage.getItem('faq')) : {},
    about: localStorage.getItem('about') !== "undefined" ? JSON.parse(localStorage.getItem('about')) : {},
    home: [],
    refundPolicy: localStorage.getItem('refundPolicy') !== "undefined" ? JSON.parse(localStorage.getItem('refundPolicy')) : {},
    blog: []
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


export const getAllHome = createAsyncThunk('/dynamic/Home', async () => {
    try {
        let res = axiosInstance.get('dynamic/Home');


        console.log(res);
        
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getPrivacyPolicy = createAsyncThunk('/dynamic/privacy-policy', async () => {
    try {
        let res = axiosInstance.get('dynamic/Privacy Policy');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});


export const getRefundPolicy = createAsyncThunk('/dynamic/refund-policy', async () => {
    try {
        let res = axiosInstance.get('dynamic/Refund and Cancellation');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});



export const getRoundCabData = createAsyncThunk('/dynamic/round-cab', async () => {
    try {
        let res = axiosInstance.get('dynamic/Round%20Trip%20Car%20Rentals');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getLocalCabData = createAsyncThunk('/dynamic/local-cab', async () => {
    try {
        let res = axiosInstance.get('dynamic/Local%20Trip%20Cab%20Services');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getAirportCabData = createAsyncThunk('/dynamic/airport-cab', async () => {
    try {
        let res = axiosInstance.get('dynamic/Airport%20Cab%20Services');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});


export const getOnewayData = createAsyncThunk('/dynamic/oneway-cab', async () => {
    try {
        let res = axiosInstance.get('dynamic/One-Way%20Cab%20Rentals');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getFAQ = createAsyncThunk('/dynamic/faq', async () => {
    try {
        let res = axiosInstance.get('dynamic/Frequently%20Asked%20Questions');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
});

export const getAbout = createAsyncThunk('/dynamic/about', async () => {
    try {
        let res = axiosInstance.get('dynamic/About');
        res = await res;
        return res.data;
    } catch (e) {
        return e?.response?.data?.message;

    }
})

export const getBlogs = createAsyncThunk('/dynamic/blogs', async () => {
    try {
        let res = axiosInstance.get('dynamic/Blogs');
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
            .addCase(getRefundPolicy.fulfilled, (state, action) => {
                localStorage.setItem('refundPolicy', JSON.stringify(action.payload.data));
                state.refundPolicy = action.payload.data;
            })
            .addCase(getRoundCabData.fulfilled, (state, action) => {
                localStorage.setItem('roundCab', JSON.stringify(action.payload.data));
                state.roundCab = action.payload.data;
            })
            .addCase(getLocalCabData.fulfilled, (state, action) => {
                localStorage.setItem('localCab', JSON.stringify(action.payload.data));
                state.localCab = action.payload.data;
            })
            .addCase(getAirportCabData.fulfilled, (state, action) => {
                localStorage.setItem('airportCab', JSON.stringify(action.payload.data));
                state.airportCab = action.payload.data;
            })
            .addCase(getOnewayData.fulfilled, (state, action) => {
                localStorage.setItem('onewayCab', JSON.stringify(action.payload.data));
                state.onewayCab = action.payload.data;
            })
            .addCase(getFAQ.fulfilled, (state, action) => {
                localStorage.setItem('faq', JSON.stringify(action.payload.data));
                state.faq = action.payload.data;
            })
            .addCase(getAbout.fulfilled, (state, action) => {
                localStorage.setItem('about', JSON.stringify(action.payload.data));
                state.about = action.payload.data;
            }) 
            .addCase(getAllHome.fulfilled, (state, action) => {
               console.log(action);
               
                // localStorage.setItem('home', JSON.stringify(action.payload.sections));
                state.home = action?.payload?.sections;
            }) 
            
            .addCase(getBlogs.fulfilled, (state, action) => {
                // localStorage.setItem('blog', JSON.stringify(action.payload.sections));
                state.blog=action?.payload?.sections
                // state.home = action.payload.sections;
            })

    }
});

export default dynamicSlice.reducer;