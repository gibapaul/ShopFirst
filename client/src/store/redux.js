// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import productSlice from './products/productSlice';



export const store = configureStore({
    reducer: {
        app: appReducer, 
        products: productSlice
    },
});
