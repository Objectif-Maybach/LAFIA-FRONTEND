import axios from "axios";
import { PRODUIT_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const addProduit = async (
    params: {
        product_name: string,
        description: string,
        price: number,
        establishment: string,
        category: string,
    } | any
) => {
    try {
        const { data }: { data: PRODUIT_T } = await axios.post(
            `${Api_Url}products/`,
            params
        );
        return data;
    } catch (error) {
        console.error("Erreur Lors de l'ajout du produit:", error);
        return false;
    }
}