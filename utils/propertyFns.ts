import axios from "axios";
import { Property } from "../types";

export const saveProperty = async () => {
    try {
        const { data } = await axios.get(("user"), {withCredentials: true}) 
        return data.user
    } catch (error) {
        return null
    }
}

export const unSaveProperty = async () => {
    try {
        const { data } = await axios.get(("property"), {withCredentials: true}) 
        return data.savedProperties
    } catch (error) {
        return null
    }
}