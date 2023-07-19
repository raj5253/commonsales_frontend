// create store . after that make api call to backend. and display data to Home.js

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
