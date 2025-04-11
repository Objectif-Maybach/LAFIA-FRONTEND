import axiosClient from "../../axiosClient";

const Api_Url = import.meta.env.VITE_API_URL;
// Recuperation de la liste des etablissements
export const GetAllEtablissements = async () => {
  try {
    const response = await axiosClient.get(`${Api_Url}establishments/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching etablissements:', error);
    throw error;
  }
};
// Recuperation d'un etablissement par son id
export const GetEtablissementById = async (etablissementId) => {
  try {
    const response = await axiosClient.get(`${Api_Url}establishments/${etablissementId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching etablissement:', error);
    throw error;
  }
};
// Ajout d'un etablissement
export const AddEtablissement = async (etablissementData) => {
  try {
    const response = await axiosClient.post(`${Api_Url}establishments/`,  etablissementData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding etablissement:', error);
    throw error;
  }
};

// Modification d'un etablissement
export const UpdateEtablissement = async (etablissementId, etablissementData) => {
  try {
    const response = await axiosClient.put(`${Api_Url}establishments/${etablissementId}/`, etablissementData);
    return response.data;
  } catch (error) {
    console.error('Error updating etablissement:', error);
    throw error;
  }
};
// Suppression d'un etablissement 
export const DeleteEtablissement = async (etablissementId) => {
  try {
    const response = await axiosClient.delete(`${Api_Url}establishments/${etablissementId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting etablissement:', error);
    throw error;
  }
};
