import { SetterOrUpdater } from 'recoil'
import { setToast } from './setToast'
import { ILayoutState } from '@types'
import axiosInstance from './axiosInstance'

export const sendVerificationEmail = async (setModal:  SetterOrUpdater<ILayoutState>) => {
    setToast('loading', 'Sending verification code...', setModal);

    axiosInstance.post("/verify-email", { fromDropdown: true })
    .then(async (res) => {
      if (res.status === 200) {
        setToast('dismiss', '', setModal)
        setModal(modal => ({
            ...modal,
            confirmDigitModal: true
        }))
      };
    })
    .catch((error) => {
      setToast('dismiss', '', setModal)
      setToast('error', 'Unable to send verification code, please try again', setModal)
    })
  }