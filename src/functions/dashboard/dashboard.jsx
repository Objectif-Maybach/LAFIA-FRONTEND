import axiosClient from "../../axiosClient";

export const GetDashboardData = async () => {
    try {
        const response = await axiosClient.get(`statistiques/dashboard`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}
// Recuperation de la liste des   orders
export const GetFiveOrders = async () => {
    try {
        const response = await axiosClient.get(`statistiques/fiveLastOrders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching   orders:', error);
        throw error;
    }
};
export const Percentage = async () => {
    try {
        const response = await axiosClient.get(`statistiques/percentage`);
        return response.data;
    } catch (error) {
        console.error('Error fetching   orders:', error);
        throw error;
    }
}
