import { atom } from 'recoil'
import { SignInInitialValues } from '../types';

export interface ILayoutState {
    profileDropdown: boolean,
    isSidebarOpen: boolean,
    isFilterbarOpen: boolean,
    signInModal: boolean,
    signUpModal: boolean,
    forgotPasswordModal: boolean,
    forgotPasswordMail: string,
    forgotPasswordMailSent: boolean,
    verifyEmailMailSent: boolean,
    editProfileModal: boolean,
    changePasswordModal: boolean,
    clearConfirmationModal: boolean,
    imageModal: boolean,

    imageBlob: string,
    selectedFile: File | null,
    imgUrlToBeDeleted: string,
    modalImages: string[],
    initialSlide: number,
    ptyToSaveOnLogin?: SignInInitialValues['ptyToSaveOnLogin']
}

export const layoutState = atom<ILayoutState>({
    key: 'dropdownAndModalState',
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
        editProfileModal: false,
        changePasswordModal: false,
        clearConfirmationModal: false,
        imageModal: false,

        imageBlob: '',
        selectedFile: null,
        imgUrlToBeDeleted: '',
        modalImages: [],
        initialSlide: 0,
        ptyToSaveOnLogin: undefined
    },
});