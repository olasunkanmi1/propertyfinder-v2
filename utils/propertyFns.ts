import axios from "axios";
import { IObj, IHandleSaveAndUnsaveProps } from "../types";
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

export const handleSaveAndUnsave = async ({property, setLoading, isSaved, setProperties, savedProperties, setModal, user}: IHandleSaveAndUnsaveProps) => {    
    const { coverPhoto, price, rooms, title, baths, area, isVerified, rentFrequency, agency, externalID, location } = property

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

    if(!user) {
        setModal(modal => ({...modal, signInModal: true, ptyToSaveOnLogin: obj}));
    } else {
        setLoading(true);
        setProperties(pty => ({...pty, ptyWaitLoading: true}));

        if(isSaved) {
            try {
                const unsaveRes = await unSaveProperty(externalID);
                setLoading(false);
                setProperties(pty => ({...pty, ptyWaitLoading: false}));

                if (unsaveRes && unsaveRes.status === 200) {
                    setProperties(properties => ({
                        ...properties,
                        savedProperties: savedProperties.filter((pty) => pty.externalID !== externalID)
                    }))
                    toast.success('Property unsaved');
                }
            } catch (error) {
                setLoading(false);
                setProperties(pty => ({...pty, ptyWaitLoading: false}));
                toast.error('Unable to unsave property, please try again');
            }
        } else {
            try {
                const saveRes = await saveProperty(obj);
                setLoading(false);
                setProperties(pty => ({...pty, ptyWaitLoading: false}));

                if (saveRes && saveRes.status === 200) {
                    setProperties(properties => ({
                        ...properties,
                        savedProperties: [...savedProperties, saveRes.data.property]
                    }))
                    toast.success('Property saved');
                }
            } catch (error) {
                setLoading(false);
                setProperties(pty => ({...pty, ptyWaitLoading: false}));
                toast.error('Unable to save property, please try again');
            }
        }
    }
}