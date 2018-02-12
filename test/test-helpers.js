import chai from 'chai';
import chaiHttp from 'chai-http';
import { User } from '../models/User';

chai.use(chaiHttp);

export const createSuperAdmin = () => {
    const user = new User({
        email: 'valid@user.com',
        role: 'super_admin',
        password: 'password'
    });
    user.save();

    return user;
}

export const signInUser = (server, user) =>
    new Promise((resolve, reject) => {
        chai.request(server)
            .post('/auth/signin')
            .set('content-type', 'application/json')
            .send({ email: user.email, password: user.password })
            .end((err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res.body.token);
            });
    });
