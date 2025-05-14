import axiosClient from "../../axiosClient";
// Recuperation de la liste des types statut de commandes
export const GetAllStatutOrders = async () => {
  try {
    const response = await axiosClient.get(`order_statuts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types statut de commandes:', error);
    throw error;
  }
};
// Recuperation d'un statut de commande par son id
export const GetEtablissementById = async (typesEtablissementId) => {
  try {
    const response = await axiosClient.get(`order_statuts/${typesEtablissementId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching statut de commande:', error);
    throw error;
  }
};
// Ajout d'un type etablissement
export const AddStatutOrder = async (typesEtablissementData) => {
  try {
    const response = await axiosClient.post(`order_statuts`, typesEtablissementData, {
     
});
    return response.data;
  } catch (error) {
    console.error('Error adding statut de commande:', error);
    throw error;
  }
};

// Modification d'un statut de commande
export const updateStatutOrder = async (typesEtablissementId, typesEtablissementData) => {
  try {
    const response = await axiosClient.post(`order_statuts/${typesEtablissementId}`, typesEtablissementData);
    return response.data;
  } catch (error) {
    console.error('Error updating statut de commande:', error);
    throw error;
  }
};
// Suppression d'un statut de commande 
export const DeleteStatutOrder = async (typesEtablissementId) => {
  try {
    const response = await axiosClient.delete(`order_statuts/${typesEtablissementId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting statut de commande:', error);
    throw error;
  }
};
