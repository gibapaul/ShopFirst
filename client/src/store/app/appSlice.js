import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [], // Danh mục sản phẩm
        isLoading: false, // Trạng thái loading
        errorMessage: null, // Thông báo lỗi nếu có
        isShowModel: false,
        modelChildren: null 
    },
    reducers: {
        showModel: (state, action) => {
            state.isShowModel = action.payload.isShowModel;
            state.modelChildren = action.payload.modelChildren;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = null;
        });
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("API Response:", action.payload); // Log dữ liệu trả về từ API
            state.categories = action.payload || []; // Đảm bảo lấy đúng danh mục
        });        
        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });
    }
});

export const { showModel } = appSlice.actions;

export default appSlice.reducer;
