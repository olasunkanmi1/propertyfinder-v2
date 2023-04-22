import { atom } from 'recoil'

export interface IUserState {
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    photoUrl: string;
};

export const userState = atom<IUserState | null>({
    key: 'userAtom',
    default: null,
});