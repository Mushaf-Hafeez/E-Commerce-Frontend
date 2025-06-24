import axios from "axios";

// create the instance of axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// the send-otp function
export const sendOTP = async (email) => {
  try {
    const { data } = await api.post("/auth/send-otp", {
      email,
    });
    return data;
  } catch (error) {
    console.log("Error in the send otp axios function: ", error.response);
    return error.response.data;
  }
};

// the signup function
export const signup = async (userInfo) => {
  try {
    const { data } = await api.post("/auth/signup", userInfo);
    return data;
  } catch (error) {
    console.log("Error in the signup axios function: ", error.response);
    return error.response.data;
  }
};

// the login function
export const login = async (userInfo) => {
  try {
    const { data } = await api.post("/auth/login", userInfo);
    return data;
  } catch (error) {
    console.log("Error in the login axios function: ", error.response);
    return error.response.data;
  }
};
