import { api } from "./auth";

// get all products function
export const products = async () => {
  try {
    const { data } = await api.get("/product/products");
    return data;
  } catch (error) {
    console.log("Error in the products axios funtion: ", error.response);
    return error.response.data;
  }
};

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

// the my product function
export const updateStock = async (productId) => {
  try {
    const { data } = await api.put(`/product/updateStock/${productId}`);
    return data;
  } catch (error) {
    console.log("Error in the my products axios function: ", error.response);
    return error.response.data;
  }
};

// the get products by category function
export const getProductsByCategory = async (category) => {
  try {
    const { data } = await api.get(`/product/products/${category}`);
    return data;
  } catch (error) {
    console.log(
      "Error in the get products by category axion function: ",
      error.response
    );
    return error.response.data;
  }
};

// get single product details
export const productDetails = async (id) => {
  try {
    const { data } = await api.get(`/product/product-details/${id}`);
    return data;
  } catch (error) {
    console.log(
      "Error in the product details axios function: ",
      error.response
    );
    return error.response.data;
  }
};
