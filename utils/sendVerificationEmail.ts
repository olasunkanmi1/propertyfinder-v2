import { SetterOrUpdater } from 'recoil'
import { setToast } from './setToast'
import { ILayoutState } from '../types'
import axiosInstance from './axiosInstance'

export const sendVerificationEmail = async (email: string, setModal:  SetterOrUpdater<ILayoutState>) => {
    setToast('loading', 'Sending verification link...', setModal)

    const obj = {
      email,
      fromDropdown: true
    }
    
    axiosInstance.post("/verify-email", obj)
    .then(async (res) => {
      if (res.status === 200) {
        setToast('dismiss', '', setModal)
        setModal(modal => ({
            ...modal,
            verifyEmailMailSent: true
        }))
      };
    })
    .catch((error) => {
      setToast('dismiss', '', setModal)
      setToast('error', 'Unable to send verification link, please try again', setModal)
    })
  }