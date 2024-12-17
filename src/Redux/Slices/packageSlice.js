import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axiosInstance from "../../Helper/axiosInstance"


const initialState = {
    loading: false,
    error: false,
    data: [],
    packageCategory:[],
    categoryData:[],
    includeData:[],
    packageTag:[]
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

export const getPackageInclude = createAsyncThunk(
    'package/getPackageInclude',
    async (_,{ rejectWithValue }) => {
        try {
            console.log("get package category");
            
                        
            const response = await axiosInstance.get(`/package/include`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
        
            return rejectWithValue(error.response.data);
        }
    }
);


export const getPackageTag = createAsyncThunk(
    'package/getPackageTag',
    async (_,{ rejectWithValue }) => {
        try {
                   
            const response = await axiosInstance.get(`/package/tag`);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
        
            return rejectWithValue(error.response.data);
        }
    }
);

export const addPackageQuery= createAsyncThunk(
    'package/getPackageQuery',
    async (data,{ rejectWithValue }) => {
        try {
                   
            const response = await axiosInstance.post(`/query`,data);
            console.log(response);
            
            // toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
        
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
        .addCase(getPackageInclude.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPackageTag.pending, (state) => {
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
         .addCase(getPackageInclude.fulfilled, (state, action) => {
            console.log(action);
      
            state.includeData = action?.payload
            state.loading=false
            state.error=false
        })
        .addCase(getPackageTag.fulfilled, (state, action) => {
            
            console.log("tag is",action);
            
            state.packageTag = action?.payload
            state.loading=false
            state.error=false
        })



        .addCase(getPackage.rejected, (state, action) => {
                state.error = action?.payload?.success
        })
        .addCase(getPackageCategory.rejected, (state, action) => {
            state.error = action?.payload?.success
        })
        .addCase(getPackageInclude.rejected, (state, action) => {
            state.error = action?.payload?.success
        })
        .addCase(getPackageTag.rejected, (state, action) => {
            state.error = action?.payload?.success
        })

    }
})

export default packageSlice.reducer