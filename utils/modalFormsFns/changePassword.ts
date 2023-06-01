import { IUpdatePasswordProps } from "@types";
import { setToast } from "../setToast";
import axiosInstance from "../axiosInstance";

export const changePassword = ({values, setLoading, setSubmitting, setModal}: IUpdatePasswordProps) => {
    setLoading(true);

    axiosInstance.patch("/update-password", values)
      .then(async (res) => {
        setLoading(false);
        
        if (res.status === 200) {
            setToast('success', 'Password updated successfully', setModal)
            setModal(modal => ({
                ...modal,
                changePasswordModal: false,
                submitError: null
            }))
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false);

        if(error.response.status === 401) {
          setModal(modal => ({
                ...modal,
                submitError: 'Current password incorrect'
            }))
        } else {
            setToast('error', 'Unable to change password, please try again', setModal)
        }
      })
}