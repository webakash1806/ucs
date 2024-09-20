import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';

import axiosInstance from "../../Helper/axiosInstance"


const initialState = {
    key: "",
    orderId: "",
    isPaymentsVerified: false,
}


export const getRazorpayId = createAsyncThunk('/razorpay/key', async () => {
    try {
        const response = await axiosInstance.get('/payment/key')
        return response.data
    } catch (e) {
        return toast.error("Failed to load!")
    }
})

export const order = createAsyncThunk('/razorpay/purchase', async (data) => {
    try {

        const response = await axiosInstance.post('/payment/checkout', data)

        return response.data
    } catch (e) {
        return e
    }
})

export const verifyPayment = createAsyncThunk('/razorpay/payment-verify', async (data) => {
    try {
        const response = await axiosInstance.post('/payment/status', {
            razorpay_payment_id: data?.razorpay_payment_id,
            razorpay_signature: data?.razorpay_signature,
            razorpay_order_id: data?.razorpay_order_id
        })
        return response.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})






const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key
            })
            .addCase(order.fulfilled, (state, action) => {
                toast.success(action?.payload?.message)
                state.orderId = action?.payload?.order?.id
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message)
                state.isPaymentsVerified = action?.payload?.success
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                toast.error(action?.payload?.message)
                state.isPaymentsVerified = action?.payload?.success
            })

    }
})

export default razorpaySlice.reducer