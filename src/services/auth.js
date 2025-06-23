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
    return error;
  }
};

// the signup function
export const signup = async (data) => {
  try {
    console.log(data);
    const { data } = await api.post("/auth/signup", data);
    return data;
  } catch (error) {
    console.log("Error in the send otp axios function: ", error.response);
    return error;
  }
};
