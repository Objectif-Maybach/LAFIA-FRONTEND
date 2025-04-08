import axios from "axios";

const Api_Url = import.meta.env.VITE_API_URL;
// Recuperation de la liste des types types etablissements
export const GetAllTypeEtablissements = async () => {
  try {
    const response = await axios.get(`${Api_Url}establishment-types/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types types etablissements:', error);
    throw error;
  }
};
// Recuperation d'un types etablissement par son id
export const GetEtablissementById = async (typesEtablissementId) => {
  try {
    const response = await axios.get(`${Api_Url}establishments-types/${typesEtablissementId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching types etablissement:', error);
    throw error;
  }
};
// Ajout d'un types etablissement
export const AddEtablissement = async (typesEtablissementData) => {
  try {
    const response = await axios.post(`${Api_Url}establishments-types/`, typesEtablissementData);
    return response.data;
  } catch (error) {
    console.error('Error adding types etablissement:', error);
    throw error;
  }
};

// Modification d'un types etablissement
export const UpdateEtablissement = async (typesEtablissementId, typesEtablissementData) => {
  try {
    const response = await axios.put(`${Api_Url}establishments-types/${typesEtablissementId}/`, typesEtablissementData);
    return response.data;
  } catch (error) {
    console.error('Error updating types etablissement:', error);
    throw error;
  }
};
// Suppression d'un types etablissement 
export const DeleteEtablissement = async (typesEtablissementId) => {
  try {
    const response = await axios.delete(`${Api_Url}establishments-types/${typesEtablissementId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting types etablissement:', error);
    throw error;
  }
};
