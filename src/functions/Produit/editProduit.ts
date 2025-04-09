import axios from "axios";
import { PRODUIT_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const editProduit = async (
    id: string,
    product_name: string,
    description: string,
    price: number,
    establishment: string,
    category: string,
) => {
    try {
        const { data }: { data: PRODUIT_T } = await axios.put(
            `${Api_Url}products/${id}/`,
            {
                product_name,
                description,
                price,
                establishment,
                category,
            }
        );
        return data;
    } catch (error) {
        console.error("Erreur Lors de la modification du produit:", error);
        return false;
    }
}