import jwt from 'jsonwebtoken';
import { User } from './models/User';

const tokenFromHeaders = (headers) => {
    let token = null;
    if (headers && headers.authorization) {
        let parts = headers.authorization.split(' ');
        if (parts.length == 2) {
            let scheme = parts[0];
            let credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        }
    }

    return token;
}

export const getUserFromPayload = async (headers) => {
    const token = tokenFromHeaders(headers);
    const payload = jwt.decode(token, { complete: false });

    const user = await User.findOne({ email: payload.email })

    return user;
}
