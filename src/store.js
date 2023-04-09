import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './features/api-slice/ApiSlice';

export const store = configureStore({
      reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            cart: cartReducer,
            modal: modalReducer,
      },
      middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(apiSlice.middleware)
      
})

setupListeners(store.dispatch)
