import { api } from "./auth";

// add to cart function
export const addToCart = async (id) => {
  try {
    const { data } = await api.put(`/addToCart/addProduct/${id}`);
    return data;
  } catch (error) {
    console.log("Error in the add to cart axios function: ", error.response);
    return error.response.data;
  }
};

// add to cart function
export const removeFromCart = async (id) => {
  try {
    const { data } = await api.put(`/addToCart/removeProduct/${id}`);
    return data;
  } catch (error) {
    console.log(
      "Error in the remove from cart axios function: ",
      error.response
    );
    return error.response.data;
  }
};
