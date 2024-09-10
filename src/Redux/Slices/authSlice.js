import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    data: localStorage.getItem('data') !== "undefined" ? JSON.parse(localStorage.getItem('data')) : {},
};

// Thunks for different actions
export const createAccount = createAsyncThunk('/user/register', async (data) => {
    try {
        let res = axiosInstance.post('user/add', data);

        res = await res;
        toast.success(res.data.message)

        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const verifyOTP = createAsyncThunk('/user/verify-otp', async (data) => {
    try {
        let res = axiosInstance.post('user/verify', data);

        res = await res;
        toast.success(res.data.message)

        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const loginAccount = createAsyncThunk('/user/login', async (data) => {
    try {
        let res = axiosInstance.post('/user/login', data);

        res = await res;
        toast.success(res.data.message)
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});

export const resendOTP = createAsyncThunk('/user/verify/resent', async (data) => {
    try {
        let res = axiosInstance.post('/user/verify/resent', data);

        res = await res;
        toast.success(res.data.message)

        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const logout = createAsyncThunk('/user/logout', async () => {
    try {
        let res = axiosInstance.get('/user/logout');

        res = await res;
        toast.success(res.data.message)
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const userProfile = createAsyncThunk('/user/details', async () => {
    try {
        const res = axiosInstance.get(`/user/single/${initialState?.data?._id}`);
        return (await res).data;
    } catch (e) {
        toast.error(e?.message);
        throw e;
    }
});

export const editProfile = createAsyncThunk('user/update-profile', async (data) => {
    try {
        let res = axiosInstance.put(`user/update-profile/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Updating Profile!",
            success: (data) => data?.data.message,
            error: "Failed to update!"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const changePassword = createAsyncThunk('user/update-password', async (data) => {
    try {
        let res = axiosInstance.post('user/change-password', data);
        res = await res;
        toast.success(res?.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const forgotPassword = createAsyncThunk('user/forgot-password', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.post('user/forgot-password', data);
        toast.promise(res, {
            loading: "Sending password reset link to registered mail!",
            success: (data) => data?.data.message,
            error: "Failed to send reset link"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const resetPasswords = createAsyncThunk('user/reset-password', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.post(`user/reset-password/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Resetting Password!",
            success: (data) => data?.data.message,
            error: "Failed to reset password"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAccount.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action?.payload?.validUser));
                if (action?.payload?.success) {
                    localStorage.setItem('isLoggedIn', true);
                    state.isLoggedIn = true;
                }
                state.data = action?.payload?.validUser;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action.payload.user));
                localStorage.setItem('isLoggedIn', true);
                state.isLoggedIn = true;
                state.data = action.payload.user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action.payload.user));
                localStorage.setItem('isLoggedIn', true);
                state.isLoggedIn = true;
                state.data = action.payload.user;
            })
    }
});

export default authSlice.reducer;