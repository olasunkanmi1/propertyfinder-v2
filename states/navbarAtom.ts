import { atom } from 'recoil'

export const navbarState = atom({
    key: 'dropdownState',
    default: {
        profileDropdown: false,
        isSidebarOpen: false
    },
});