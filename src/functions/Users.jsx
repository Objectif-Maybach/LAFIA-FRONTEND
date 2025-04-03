import axios from "axios";

const Api_Url = import.meta.env.VITE_API_URL;
// Recuperation de la liste des Utilisateurs
export const GetAllUsers = async () => {
  try {
    const response = await axios.get(`${Api_Url}users/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
// Recuperation d'un utilisateur par son id
export const GetUserById = async (userId) => {
  try {
    const response = await axios.get(`${Api_Url}users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
// Ajout d'un utilisateur
export const AddUser = async (userData) => {
  try {
    const response = await axios.post(`${Api_Url}users/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
// Modification d'un utilisateur
export const UpdateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${Api_Url}users/${userId}/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
// Suppression d'un utilisateur 
export const DeleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${Api_Url}users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
