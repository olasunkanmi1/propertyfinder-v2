import { atom } from 'recoil'

export interface IUserState {
    firstName: string;
    lastName: string;
    userId: string;
};

export const userState = atom<IUserState | null>({
    key: 'userAtom',
    default: {
        firstName: '',
        lastName: '',
        userId: ''
    },
});