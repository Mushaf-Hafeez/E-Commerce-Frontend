import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import productsSlice from "../slices/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    products: productsSlice,
  },
});
