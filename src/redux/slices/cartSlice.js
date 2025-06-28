import { createSlice } from "@reduxjs/toolkit";
import { LucideChartGantt } from "lucide-react";
import toast from "react-hot-toast";

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
      const { productId } = action.payload;
      const index = state.cartlist.findIndex(
        (item) => item.productId._id === productId._id
      );
      if (index === -1) {
        state.cartlist.push({
          amount: productId.price,
          quantity: 1,
          productId,
        });
      } else {
        state.cartlist[index].quantity += 1;
        state.cartlist[index].amount += productId.price;
      }
    },
    removeProductFromCart: (state, action) => {
      const { productId } = action.payload;
      const setIndex = action.payload?.setIndex;
      const index = state.cartlist.findIndex(
        (item) => item.productId._id === productId._id
      );
      if (index === -1) {
        toast.error("Cannot remove from the cart");
      } else {
        if (state.cartlist[index].quantity === 1) {
          state.cartlist = state.cartlist.filter(
            (item) => item.productId._id !== state.cartlist[index].productId._id
          );
          setIndex(-1);
        } else {
          state.cartlist[index].amount -= productId.price;
          state.cartlist[index].quantity -= 1;
        }
      }
    },
  },
});

export const { setCart, addProductToCart, removeProductFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
