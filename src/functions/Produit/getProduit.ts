import axios from "axios";
import { PRODUIT_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const getProduit = async (id: string) => {
    try {
        const { data }: { data: PRODUIT_T} = await axios.get(`${Api_Url}products/${id}`);
        return data;
    } catch (error) {
        console.error("Error Lors de la recuperation du produit:", error);
        return false;
    }
}