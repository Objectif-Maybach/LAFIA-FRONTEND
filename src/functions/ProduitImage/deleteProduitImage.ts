import axios from "axios";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const deleteProduitImage = async (id: string) => {
    try {
        await axios.delete(`${Api_Url}product_images/delete/${id}`);
        return true;
    } catch (error) {
        console.error("Error Lors de la suppresion de l'image du produit:", error);
        return false;
    }
}