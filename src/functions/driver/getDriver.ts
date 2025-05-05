import axios from "axios";
import { DRIVER_T } from "../../types";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const getDriver = async (id: string) => {
    try {
        const { data }: { data: DRIVER_T } = await axios.get(`${Api_Url}drivers/${id}`);
        return data;
    } catch (error) {
        console.error("Error Lors de la recuperation du chauffeur:", error);
        return false;
    }
}