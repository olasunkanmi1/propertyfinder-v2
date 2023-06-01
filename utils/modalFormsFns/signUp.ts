import { setToast } from "../setToast";
import axiosInstance from "../axiosInstance";
import { ISignUpProps } from "@types";

export const signUp = ({ values, setUser, setLoading, setSubmitting, setModal}: ISignUpProps) => {
  setLoading(true);

  axiosInstance.post("/register", values)
    .then(async (res) => {
      setLoading(false);

      if (res.status === 201) {
          setUser(res.data.user)
          setToast('success', 'Account created successfully', setModal)

          setModal(modal => ({
              ...modal,
              signUpModal: false,
              confirmDigitModal: true,
              submitError: null
          }))
      }
    })
    .catch((error) => {
      setLoading(false);
      setSubmitting(false)

      if(error.response.status === 409) {
        setModal(modal => ({
          ...modal, 
          submitError: 'Email already exist'
        }))
      } else {
          setToast('error', 'Unknown error, please try again', setModal)
      }
    });
}