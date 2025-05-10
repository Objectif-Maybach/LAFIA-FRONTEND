import axiosClient from "../../axiosClient";

export const getOneProduitImage = async (id) => {
    try {
      const response = await axiosClient.get(`product_images/product/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching one produit images:', error);
      throw error;
    }
  };