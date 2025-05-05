import axios from "axios";
import { PRODUIT_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const editDriver = async (
    id: string,
    params: {
        driver_name: string,
        piece: string,
        longitude: string,
        latitude: string,
        contact: string,
    } | any
) => {
    try {
        const { data }: { data: PRODUIT_T } = await axios.put(
            `${Api_Url}drivers/${id}`,
            params
        );
        return data;
    } catch (error) {
        console.error("Erreur Lors de la modification du chauffeur:", error);
        return false;
    }
}