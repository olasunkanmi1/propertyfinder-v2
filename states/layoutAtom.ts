import { atom } from 'recoil'
import { ILayoutState } from '@types';

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
        ptyToSaveOnLogin: undefined,
        
        toastNotifications: []
    },
});