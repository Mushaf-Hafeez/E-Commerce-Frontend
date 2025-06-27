import { api } from "./auth";

// the add product function
export const addProduct = async (product) => {
  try {
    const { data } = await api.post("/product/addProduct", product);
    return data;
  } catch (error) {
    console.log("Error in the add product axios function: ", error.response);
    return error.response.data;
  }
};

// the my product function
export const myProducts = async () => {
  try {
    const { data } = await api.get("/product/myProducts");
    return data;
  } catch (error) {
    console.log("Error in the my products axios function: ", error.response);
    return error.response.data;
  }
};
