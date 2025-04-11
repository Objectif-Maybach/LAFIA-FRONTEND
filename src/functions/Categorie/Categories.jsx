import axiosClient from "../../axiosClient";
// Recuperation de la liste des types types categories
export const GetAllCategories = async () => {
  try {
    const response = await axiosClient.get(`${Api_Url}categories/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types types categories:', error);
    throw error;
  }
};
// Recuperation d'un types categorie par son id
export const GetCategorieById = async (typesCategorieId) => {
  try {
    const response = await axiosClient.get(`${Api_Url}establishments-types/${typesCategorieId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types categorie:', error);
    throw error;
  }
};
// Ajout d'un type categorie
export const AddCategorie = async (typesCategorieData) => {
  try {
    const response = await axiosClient.post(`${Api_Url}categories/`, typesCategorieData, {
     
});
    return response.data;
  } catch (error) {
    console.error('Error adding types categorie:', error);
    throw error;
  }
};

// Modification d'un types categorie
export const updateCategorie = async (typesCategorieId, typesCategorieData) => {
  try {
    const response = await axiosClient.put(`${Api_Url}categories/${typesCategorieId}/`, typesCategorieData);
    return response.data;
  } catch (error) {
    console.error('Error updating types categorie:', error);
    throw error;
  }
};
// Suppression d'un types categorie 
export const DeleteCategorie = async (typesCategorieId) => {
  try {
    const response = await axiosClient.delete(`${Api_Url}categories/${typesCategorieId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting types categorie:', error);
    throw error;
  }
};
