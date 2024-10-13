import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis';

export const getCategories = createAsyncThunk('app/categories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategories();
    console.log("API Response:", response); // Thêm dòng này để kiểm tra phản hồi từ API
    if (!response.success) return rejectWithValue(response);
    return response.prodCategories; // Chỉ trả lại trường 'prodCategories' từ phản hồi
});
