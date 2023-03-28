import axios from "axios";
import {IUserState} from '../states'

export const fetchUser = async (): Promise<IUserState | null> => {
    try {
        const { data } = await axios.get(("user"), {withCredentials: true}) 
        return data.user
    } catch (error) {
        return null
    }
}