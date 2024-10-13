import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from './asyncAction';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        isLoading: false,
        errorMessage: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = null;
        });
        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload; // Giữ nguyên
        });
        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });
    }
});

export default productSlice.reducer;
