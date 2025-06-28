import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartlist: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartlist = action.payload.length > 0 && action.payload;
    },
    addProductToCart: (state, action) => {},
    removeProductFromCart: (state, action) => {},
  },
});

export const { setCart, addProductToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
