import axios from "axios";

interface IObj {
    coverPhoto: {
        url: string;
    };
    price: number;
    rooms: string;
    title: string;
    baths: string;
    area: number;
    isVerified: boolean;
    rentFrequency: string;
    agency: {
        logo: {
            url: string;
        };
        name: string;
    };
    externalID: string;
    location: {
        name: string;
    }[];
} 

export const saveProperty = async (obj: IObj) => {
    try {
        const res = await axios.post(("/property"), obj, {withCredentials: true}) 
        return res
    } catch (error) {
        throw error
    }
}

export const unSaveProperty = async (externalID: String) => {
    try {
        const res = await axios.delete((`/unsave-property/${externalID}`), {withCredentials: true}) 
        return res
    } catch (error) {
        throw error
    }
}