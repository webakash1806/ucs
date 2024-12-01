import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axiosInstance from "../../Helper/axiosInstance"


const initialState = {
    loading: false,
    error: false,
    data: [],
    packageCategory:[]
}


// export const getPackage = createAsyncThunk('/package/get', async () => {
//     try {
//         const response = await axiosInstance.get('/package')
//         return response.data
//     } catch (e) {
//         return e?.response?.data?.message;

//     }
// })

export const getPackage = createAsyncThunk(
    'package/getPackage',
    async (_,{ rejectWithValue }) => {
        try {
            
                        
            const response = await axiosInstance.get(`/package`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getPackageCategory = createAsyncThunk(
    'package/getPackageCategory',
    async (_,{ rejectWithValue }) => {
        try {
            
                        
            const response = await axiosInstance.get(`/package/category`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);


const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getPackage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPackageCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
       .addCase(getPackage.fulfilled, (state, action) => {
                console.log(action);
          
                state.data = action?.payload
                state.loading=false
                state.error=false
        })
        .addCase(getPackageCategory.fulfilled, (state, action) => {
            console.log(action);
      
            state.packageCategory = action?.payload
            state.loading=false
            state.error=false
    })
        .addCase(getPackage.rejected, (state, action) => {
                state.error = action?.payload?.success
        })
        .addCase(getPackageCategory.rejected, (state, action) => {
            state.error = action?.payload?.success
        })

    }
})

export default packageSlice.reducer