import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  signupData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    resetSignupData: (state, action) => {
      state.signupData = {};
    },
  },
});

export const { setIsAuthenticated, setSignupData, resetSignupData } =
  authSlice.actions;
export default authSlice.reducer;
