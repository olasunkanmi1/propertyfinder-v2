import { atom } from 'recoil'

export interface INavbarState {
    profileDropdown: boolean,
    isSidebarOpen: boolean,
    isFilterbarOpen: boolean,
    signInModal: boolean,
    signUpModal: boolean,
    forgotPasswordModal: boolean,
    forgotPasswordMail: string,
    forgotPasswordMailSent: boolean,
    verifyEmailMailSent: boolean,
}

export const 
navbarState = atom<INavbarState>({
    key: 'dropdownState',
    default: {
        profileDropdown: false,
        isSidebarOpen: false,
        isFilterbarOpen: false,
        signInModal: false,
        signUpModal: false,
        forgotPasswordModal: false,
        forgotPasswordMail: '',
        forgotPasswordMailSent: false,
        verifyEmailMailSent: false,
    },
});