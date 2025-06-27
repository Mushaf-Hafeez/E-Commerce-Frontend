import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartlist: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartlist = action.payload.length > 0 && action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
