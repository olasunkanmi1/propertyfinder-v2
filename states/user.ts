import { atom } from 'recoil'

export interface IUserState {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
};

export const userState = atom<IUserState | null>({
    key: 'userAtom',
    default: null,
});