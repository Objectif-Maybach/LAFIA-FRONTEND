import axios from "axios";
import { PRODUIT_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const getAllProduit = async () => {
    try {
        const { data }: { data: PRODUIT_T[] } = await axios.get(`${Api_Url}products/`);
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return false;
    }
}