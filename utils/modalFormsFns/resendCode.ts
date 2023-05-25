import { SetterOrUpdater } from "recoil";
import { setToast } from "../setToast";
import axiosInstance from "../axiosInstance";
import { ILayoutState } from "@types";

export const resend = (email: string, setModal: SetterOrUpdater<ILayoutState>) => {
    setToast('loading', 'Sending password reset link...', setModal);

    setModal(modal => ({
        ...modal,
        forgotPasswordMailSent: false,
    }))

    axiosInstance.post("/forgot-password", {email})
        .then(async (res) => {
        
            if (res.status === 200) {
                setToast('dismiss', '', setModal)
                setModal( modal => ({
                    ...modal,
                    forgotPasswordMailSent: true,
                }));
            }
        })
        .catch((error) => {
            setToast('dismiss', '', setModal);
            setToast('error', 'Unable to send password reset link, please try again', setModal)
        })
}