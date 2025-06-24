import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("name")
    ? JSON.parse(localStorage.getItem("name"))
    : null,
  email: localStorage.getItem("email")
    ? JSON.parse(localStorage.getItem("email"))
    : null,
  profilePic: localStorage.getItem("profilePic")
    ? JSON.parse(localStorage.getItem("profilePic"))
    : null,
  role: localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setName, setEmail, setProfilePic, setRole } =
  profileSlice.actions;
export default profileSlice.reducer;
