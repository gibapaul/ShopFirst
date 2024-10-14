// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './user/userSlice'; // Đảm bảo import đúng

const commonConfig = {
    key: 'shop/user',
    storage,
};

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token'], // Sửa 'whitelish' thành 'whitelist'
};

export const store = configureStore({
    reducer: {
        app: appSlice,
        products: productSlice,
        user: persistReducer(userConfig, userReducer), // Sử dụng userReducer đã được import
    },
});

export const persistor = persistStore(store);
