// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../reducers/categoriesReducer';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
    },
});
