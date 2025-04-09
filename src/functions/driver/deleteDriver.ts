import axios from "axios";

//@ts-ignore
const Api_Url = import.meta.env.VITE_API_URL;

export const deleteDriver = async (id: string) => {
    try {
        await axios.delete(`${Api_Url}drivers/${id}/`);
        return true;
    } catch (error) {
        console.error("Error Lors de la suppresion du chauffeur:", error);
        return false;
    }
}