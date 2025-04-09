import axios from "axios";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const deleteProduit = async (id: string) => {
    try {
        await axios.delete(`${Api_Url}products/${id}/`);
        return true;
    } catch (error) {
        console.error("Error Lors de la suppresion du produit:", error);
        return false;
    }
}