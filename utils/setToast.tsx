import { SetterOrUpdater } from "recoil"
import { ILayoutState } from "@types"

export const setToast = (type: string, message: string, setModal: SetterOrUpdater<ILayoutState>) => {
    const newToast = { 
        id: Date.now(),
        toastType: type, 
        toastMessage: message
    }

    return (
        setModal(modal => ({
            ...modal, 
            toastNotifications: type === 'dismiss' ? [] : [...modal.toastNotifications, newToast]
        }))
    )
}