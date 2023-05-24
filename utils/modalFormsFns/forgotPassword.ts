import { setToast } from "../setToast";
import axiosInstance from "../axiosInstance";
import { IForgotPasswordProps } from "@types";

export const forgotPassword = ({values, setLoading, setSubmitting, setModal}: IForgotPasswordProps) => {
  setLoading(true);

  axiosInstance.post("/forgot-password", values)
    .then(async (res) => {
      setLoading(false);
      
      if (res.status === 200) {
          setModal( modal => ({
              ...modal,
              forgotPasswordModal: false,
              forgotPasswordMailSent: true,
              forgotPasswordMail: values.email
          }));
      }
    })
    .catch((error) => {
      setToast('error', 'Unknown error, please try again', setModal)
      setLoading(false);
      setSubmitting(false);
    })
}