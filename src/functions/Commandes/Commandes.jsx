import axiosClient from "../../axiosClient";
// Recuperation de la liste des   orders
export const GetAllCommandes = async () => {
  try {
    const response = await axiosClient.get(`orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching   orders:', error);
    throw error;
  }
};
// Recuperation d'un  categorie par son id
export const GetCommandeById = async (CommandeId) => {
  try {
    const response = await axiosClient.get(`establishments-/${CommandeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching  categorie:', error);
    throw error;
  }
};
// Ajout d'un type categorie
export const AddCommande = async (CommandeData) => {
  try {
    const response = await axiosClient.post(`orders`, CommandeData, 
     );
    return response.data;
  } catch (error) {
    console.error('Error adding  categorie:', error);
    throw error;
  }
};

// Modification d'un  categorie
export const updateCommande = async (CommandeId, CommandeData) => {
  try {
    const response = await axiosClient.post(`orders${CommandeId}`, CommandeData);
    return response.data;
  } catch (error) {
    console.error('Error updating  categorie:', error);
    throw error;
  }
};
// Suppression d'un  categorie 
export const DeleteCommande = async (CommandeId) => {
  try {
    const response = await axiosClient.delete(`orders${CommandeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting  categorie:', error);
    throw error;
  }
};
