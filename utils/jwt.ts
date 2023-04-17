import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie'

const createJWT = ({payload} : any) => {
    const token = jwt.sign(payload, 'eThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u'); // key should be in .env
    return token
}

export const attachCookiesToResponse = (user: any) => {
    try {
        const token = createJWT({payload: user});
        const oneDay = 1000 * 60 * 60 * 24;

        Cookies.set('token', token, { 
            // secure: true,
            expires: new Date(Date.now() + oneDay),
            // sameSite: 'None',
        });
    } catch (error) {
        console.log(error)
    }
}