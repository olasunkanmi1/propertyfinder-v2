import { setToast } from "./setToast"
import { SetterOrUpdater } from "recoil"
import { ILayoutState, IPropertiesState, IUserState } from "@types"
import {NextRouter} from 'next/router'
import axiosInstance from "./axiosInstance"

export const logOut = (
    setModal: SetterOrUpdater<ILayoutState>, 
    router: NextRouter, 
    setUser: SetterOrUpdater<IUserState | null>, 
    setProperties: SetterOrUpdater<IPropertiesState>
) => {
    setToast('loading', 'Logging out', setModal)

    axiosInstance.delete("/logout")
    .then(async (res) => {
        
        if (res.status === 200) {
            setToast('dismiss', '', setModal)
            setToast('success', 'Logged out successfully', setModal)
            
            if(router.pathname ==='/saved-properties') router.push('/')
            setUser(null);
            setProperties(properties => ({
                ...properties,
                savedProperties: []
            }))
        }
    })
    .catch((error) => {
        setToast('dismiss', '', setModal)
        setToast('error', 'Unknown error, please try again', setModal)
    }) 
}