import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productsData: null,
  },
  reducers: {
    replaceData(state, action) {
      // console.log(action.payload);
      state.productsData = action.payload; //array of products
    },
  },
});

export default productSlice;
export const productActions = productSlice.actions; //nodestructuring
