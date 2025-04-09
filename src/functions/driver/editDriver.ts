import axios from "axios";
import { PRODUIT_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const editDriver = async (
    id: string,
    driver_name: string,
    piece: string,
    longitude: string,
    latitude: string,
    contact: string,
) => {
    try {
        const { data }: { data: PRODUIT_T } = await axios.put(
            `${Api_Url}drivers/${id}/`,
            {
                driver_name,
                piece,
                longitude,
                latitude,
                contact,
            }
        );
        return data;
    } catch (error) {
        console.error("Erreur Lors de la modification du chauffeur:", error);
        return false;
    }
}