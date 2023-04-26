import axios from "axios";
import { IObj, MyError, IHandleSaveAndUnsaveProps } from "../types";
import { toast } from "react-toastify";



const saveProperty = async (obj: IObj) => {
    try {
        const res = await axios.post(("/property"), obj, {withCredentials: true}) 
        return res
    } catch (error) {
        throw error
    }
}

const unSaveProperty = async (externalID: String) => {
    try {
        const res = await axios.delete((`/unsave-property/${externalID}`), {withCredentials: true}) 
        return res
    } catch (error) {
        throw error
    }
}

export const handleSaveAndUnsave = async (
    {setLoading, coverPhoto, price, rooms, title, baths, area, isVerified,
    rentFrequency, agency, externalID, isSaved, setProperties, savedProperties, setModal, location}: IHandleSaveAndUnsaveProps
) => {
        setLoading(true);
        const obj = {
            coverPhoto: {
                url: coverPhoto.url
            },
            price, rooms, title, baths, area,
            isVerified, rentFrequency,
            agency: {
                logo: {
                    url: agency.logo.url
                },
                name: agency.name
            },
            externalID,
            location
        }

        if(isSaved) {
            try {
                const unsaveRes = await unSaveProperty(externalID);
                setLoading(false);

                if (unsaveRes && unsaveRes.status === 200) {
                    setProperties(properties => ({
                        ...properties,
                        savedProperties: savedProperties.filter((pty) => pty.externalID !== externalID)
                    }))
                    toast.success('Property unsaved');
                }
            } catch (error) {
                const myError = error as MyError
                setLoading(false);
        
                if(myError.response && myError.response.status === 401) {
                    setModal(modal => ({...modal, signInModal: true}));
                } else {
                    toast.error('Unable to unsave property, please try again');
                }
            }

        } else {
            try {
                const saveRes = await saveProperty(obj);
                setLoading(false);

                if (saveRes && saveRes.status === 200) {
                    setProperties(properties => ({
                        ...properties,
                        savedProperties: [...savedProperties, saveRes.data.property]
                    }))
                    toast.success('Property saved');
                }
            } catch (error) {
                const myError = error as MyError
                setLoading(false);
        
                if(myError.response && myError.response.status === 401) {
                    setModal(modal => ({...modal, signInModal: true}));
                } else {
                    toast.error('Unable to save property, please try again');
                }
            }
        }
}