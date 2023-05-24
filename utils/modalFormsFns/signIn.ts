import { SetterOrUpdater } from "recoil";
import { setToast } from "../setToast";
import axiosInstance from "../axiosInstance";
import { ISignInProps, ILayoutState } from "@types";

export const signIn = ({modal, values, setUser, setProperties, setLoading, setSubmitting, setModal}: ISignInProps) => {
    setLoading(true);
    if(modal.ptyToSaveOnLogin) values.ptyToSaveOnLogin = modal.ptyToSaveOnLogin

    axiosInstance.post("/login", values)
        .then(async (res) => {
        const {alreadySaved} = res.data
        setLoading(false);
        
        if (res.status === 200) {
            setToast('success', 'Logged in successfully', setModal)
            if (alreadySaved !== undefined && !alreadySaved) {
                setToast('success', 'Property saved', setModal)
            }

            setModal( modal => ({
                ...modal,
                signInModal: false,
                ptyToSaveOnLogin: undefined
            }));

            setUser(res.data.user)
            setProperties(properties => ({
                ...properties,
                savedProperties: res.data.savedProperties,
            }))
        }
        })
        .catch((error) => {
            setLoading(false);
            setSubmitting(false)

            if(error.response.status === 401) {
                setModal(modal => ({
                    ...modal, 
                    submitError: 'Invalid email or password'
                }))
            } else {
                setToast('error', 'Unknown error, please try again', setModal)
            }
        })
}

export const openForgotPasswordModal = (setModal: SetterOrUpdater<ILayoutState>) => {
    setModal( modal => ({
        ...modal,
        signInModal: false,
        forgotPasswordModal: true,
        submitError: null
    }));
}