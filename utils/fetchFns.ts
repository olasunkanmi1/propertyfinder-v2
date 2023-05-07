import axiosInstance from "./axiosInstance";
import { IUserState, Property } from "../types";

export const fetchUser = async (): Promise<IUserState | null> => {
    try {
        const { data } = await axiosInstance.get(("/user")) 
        return data.user
    } catch (error) {
        return null
    }
}

// export const fetchSavedProperties = async (): Promise<Property[] | null> => {
//     try {
//         const { data } = await axiosInstance.get(("/property")) 
//         return data.savedProperties
//     } catch (error) {
//         return null
//     }
// }