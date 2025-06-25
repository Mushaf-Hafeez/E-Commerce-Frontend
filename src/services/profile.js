import { api } from "./auth";

// the update profile link function
export const updateProfile = async (profileData) => {
  try {
    const { data } = await api.put("profile/updateProfile", profileData);
    return data;
  } catch (error) {
    console.log("Error in the update profile axios function: ", error.response);
    return error.response.data;
  }
};
