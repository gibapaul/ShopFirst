// src/app/asyncActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../apis';

export const getCategories = createAsyncThunk('app/categories', async () => {
    const response = await apis.apiGetCategories();
    if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
    }
    return { prodCategory: response.prodCategory }; // Trả về đối tượng với thuộc tính đúng
});
