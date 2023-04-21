import axios from "axios";
import {IUserState} from '../states'
import { Property } from "../types";

export const fetchUser = async (): Promise<IUserState | null> => {
    try {
        const { data } = await axios.get(("/user"), {withCredentials: true}) 
        return data.user
    } catch (error) {
        return null
    }
}

export const fetchSavedProperties = async (): Promise<Property[] | null> => {
    try {
        const { data } = await axios.get(("/property"), {withCredentials: true}) 
        return data.savedProperties
    } catch (error) {
        return null
    }
}