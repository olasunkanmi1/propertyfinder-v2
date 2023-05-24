import { setToast } from "../setToast";
import axiosInstance from "../axiosInstance";
import { IConfirmDigitProps } from "@types";

export const confirmDigit = ({ values, user, setUser, setLoading, setSubmitting, setModal}: IConfirmDigitProps) => {
    setLoading(true)
          
    axiosInstance.post("/verify-email", { verificationCode: values.code.join('') })
    .then(async (res) => {
        setLoading(false);

        if (res.status === 200 && user) {
            setToast('success', 'Email verified successfully', setModal)
            setUser({ ...user, isVerified: true });
            setModal(modal => ({
                ...modal,
                confirmDigitModal: false,
            }))
        };
    })
    .catch((error) => {
        setLoading(false);
        setSubmitting(false);

        if(error.response.status === 400) {
            setModal(modal => ({
              ...modal, 
              submitError: 'Invalid code'
            }))
          } else {
              setToast('error', 'Unknown error, please try again', setModal)
          }
    })
}