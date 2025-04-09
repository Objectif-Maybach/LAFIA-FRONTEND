import axios from "axios";
import { DRIVER_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const getAllDriver = async () => {
    try {
        const { data }: { data: DRIVER_T[] } = await axios.get(`${Api_Url}drivers/`);
        console.log('====================================');
        console.log("la liste des chauffeurs : ", data);
        console.log('====================================');
        return data;
    } catch (error) {
        console.error("Erreur lors de la recuperation des chauffeurs : ", error);
        return false;
    }
}