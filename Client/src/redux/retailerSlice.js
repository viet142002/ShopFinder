import { createSlice } from '@reduxjs/toolkit';

const retailerSlice = createSlice({
    name: 'retailer',
    initialState: {
        data: {}
    },
    reducers: {
        setRetailer: (state, action) => {
            state.data = action.payload;
        },
        updateRetailer: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setRetailer, updateRetailer } = retailerSlice.actions;

export default retailerSlice.reducer;
