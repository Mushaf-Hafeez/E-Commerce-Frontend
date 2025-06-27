import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {},
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
