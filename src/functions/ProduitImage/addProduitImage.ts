import axios from "axios";
import { PRODUIT_IMAGE_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const addProduitImages = async (
    params: {
        images: string,
        product: string
    } | any
) => {
    try {
        const { data }: { data: PRODUIT_IMAGE_T } = await axios.post(
            `${Api_Url}product_images/add`,
            params
        );
        return data;
    } catch (error) {
        console.error("Erreur Lors de l'ajout de l'image du produit:", error);
        return false;
    }
}