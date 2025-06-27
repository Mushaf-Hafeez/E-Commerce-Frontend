import { api } from "./auth";

// the add product function
export const addProduct = async (product) => {
  try {
    console.log(product);
    const { data } = await api.post("/product/addProduct", product);
    return data;
  } catch (error) {
    console.log("Error in the add product axios function: ", error.response);
    return error.response.data;
  }
};
