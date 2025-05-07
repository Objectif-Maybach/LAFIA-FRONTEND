import axiosClient from "../../axiosClient";
// Recuperation de la liste des Utilisateurs
export const GetAllUsers = async () => {
  try {
    const response = await axiosClient.get(`user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
// Reinitialser le mot de passe d'un utilisateur
export const ResetPassword = async (userId, password) => {
  try {
    const response = await axiosClient.patch(`user/${userId}`,  password);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
// Recuperation de la liste des rôles
export const GetRoles = async () => {
  try {
    const response = await axiosClient.get(`role`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};
// Ajout d'un utilisateur
export const AddUser = async (userData) => {
  try {
    const response = await axiosClient.post(`user`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Modification d'un utilisateur
export const UpdateUser = async (userId, userData) => {
  try {
    const response = await axiosClient.post(`user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
// Suppression d'un utilisateur 
export const DeleteUser = async (userId) => {
  try {
    const response = await axiosClient.delete(`user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
