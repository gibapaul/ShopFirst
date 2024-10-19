// src/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.current = action.payload.userData;     
            state.token = action.payload.token;           
        },

    },
});

export const { login } = userSlice.actions; // Xuất các action
export default userSlice.reducer; // Xuất reducer như là mặc định
