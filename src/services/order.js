import { api } from "./auth";

// place order function
export const placeOrder = async (cartlist, address) => {
  try {
    const { data } = await api.post("/order/place-order", {
      cartlist,
      address,
    });
    return data;
  } catch (error) {
    console.log("Error in the place order axios function: ", error.response);
    return error.response.data;
  }
};
