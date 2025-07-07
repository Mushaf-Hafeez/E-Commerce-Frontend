import { api } from "./auth";

// place order function
export const placeOrder = async (cartlist, address) => {
  try {
    const { data } = await api.post("/order/checkout", {
      cartlist,
      address,
    });
    return data;
  } catch (error) {
    console.log("Error in the place order axios function: ", error.response);
    return error.response.data;
  }
};

// check payment status function
export const checkPaymentStatus = async (sessionId) => {
  try {
    const { data } = await api.get(`/order/check-status/${sessionId}`);
    return data;
  } catch (error) {
    console.log(
      "Error in the check payment status axios function: ",
      error.response
    );
    return error.response.data;
  }
};
