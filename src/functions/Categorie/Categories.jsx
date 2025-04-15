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
export const GetCategorieById = async (categorieId) => {
  try {
    const response = await axios.get(`${Api_Url}establishments-types/${categorieId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types categorie:', error);
    throw error;
  }
};
// Ajout d'un type categorie
export const AddCategorie = async (CategorieData) => {
  try {
    const response = await axios.post(`${Api_Url}categories/`, CategorieData, {
     
});
    return response.data;
  } catch (error) {
    console.error('Error adding types categorie:', error);
    throw error;
  }
};

// Modification d'un types categorie
export const updateCategorie = async (categorieId, CategorieData) => {
  try {
    const response = await axios.put(`${Api_Url}categories/${categorieId}/`, CategorieData);
    return response.data;
  } catch (error) {
    console.error('Error updating types categorie:', error);
    throw error;
  }
};
// Suppression d'un types categorie 
export const DeleteCategorie = async (categorieId) => {
  try {
    const response = await axios.delete(`${Api_Url}categories/${categorieId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting types categorie:', error);
    throw error;
  }
};
