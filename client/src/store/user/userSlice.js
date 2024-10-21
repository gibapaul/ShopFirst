import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;   
            state.token = action.payload.token;           
        },
        logout: (state) => {
            state.isLoggedIn = false;  
            state.token = null; 
            state.current = null; // Reset current user on logout
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload; // Cập nhật thông tin người dùng
        });
        builder.addCase(actions.getCurrent.rejected, (state) => {
            state.isLoading = false;
            state.current = null; // Reset current user on error
        });
    }
});

export const { login, logout } = userSlice.actions; // Xuất các action
export default userSlice.reducer; // Xuất reducer như là mặc định
