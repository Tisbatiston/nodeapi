import chai from 'chai';
import chaiHttp from 'chai-http';
import { User } from '../models/User';

chai.use(chaiHttp);

export const unknownUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdHJlYWxAaW52YWxpZC5jb20iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE1MTg0MzY2NzEsImV4cCI6MTUxODUyMzA3MX0.Jc71aB1HqgsSjUN0JRx-EzEt40xoi0xtJEdNcIzBFhQeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vdHJlYWxAaW52YWxpZC5jb20iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE1MTg0MzY2NzEsImV4cCI6MTUxODUyMzA3MX0.Jc71aB1HqgsSjUN0JRx-EzEt40xoi0xtJEdNcIzBFhQ';

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
