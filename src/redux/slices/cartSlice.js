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
    addProductToCart: (state, action) => {
      // const filtered = state.cartlist.filter(
      //   (item) => item._id !== action.payload._id
      // );
      // filtered.push(action.payload);
      // state.cartlist = filtered;

      const index = state.cartlist.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.cartlist[index] = action.payload;
      } else {
        state.cartlist.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {},
  },
});

export const { setCart, addProductToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
