import axiosClient from "../../axiosClient";
// Recuperation de la liste des types types etablissements
export const GetAllTypeEtablissements = async () => {
  try {
    const response = await axiosClient.get(`establishment-types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types types etablissements:', error);
    throw error;
  }
};
// Recuperation d'un types etablissement par son id
export const GetEtablissementById = async (typesEtablissementId) => {
  try {
    const response = await axiosClient.get(`establishments-types/${typesEtablissementId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types etablissement:', error);
    throw error;
  }
};
// Ajout d'un type etablissement
export const AddTypeEtablissement = async (typesEtablissementData) => {
  try {
    const response = await axiosClient.post(`establishment-types`, typesEtablissementData, {
     
});
    return response.data;
  } catch (error) {
    console.error('Error adding types etablissement:', error);
    throw error;
  }
};

// Modification d'un types etablissement
export const updateTypeEtablissement = async (typesEtablissementId, typesEtablissementData) => {
  try {
    const response = await axiosClient.post(`establishment-types/${typesEtablissementId}`, typesEtablissementData);
    return response.data;
  } catch (error) {
    console.error('Error updating types etablissement:', error);
    throw error;
  }
};
// Suppression d'un types etablissement 
export const DeleteTypeEtablissement = async (typesEtablissementId) => {
  try {
    const response = await axiosClient.delete(`establishment-types/${typesEtablissementId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting types etablissement:', error);
    throw error;
  }
};
