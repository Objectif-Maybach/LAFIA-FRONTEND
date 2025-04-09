import axios from "axios";
import { DRIVER_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const addDriver = async (
    driver_name: string,
    piece: string,
    longitude: string,
    latitude: string,
    contact: string,
) => {
    try {
        const { data }: { data: DRIVER_T } = await axios.post(
            `${Api_Url}drivers/`,
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
        console.error("Erreur Lors de l'ajout du chauffeur:", error);
        return false;
    }
}