import chai from 'chai';
import chaiHttp from 'chai-http';
import { User } from '../db';
import server from '../index';

let should = chai.should();

describe('/auth/signin POST', () => {
    before(function () {
        const user = new User({
            email: 'valid@user.com',
            role: 'super_admin',
            password: 'password'
        });
        user.save();
    });

    it('should return a token for a valid user', (done) => {
        chai.request(server)
            .post('/auth/signin')
            .set('content-type', 'application/json')
            .send({ email: 'valid@user.com', password: 'password' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            });
    });
    it('should return HTTP 404 when supplied with an inexisting user', (done) => {
        chai.request(server)
            .post('/auth/signin')
            .set('content-type', 'application/json')
            .send({ email: 'inexisting@user.com', password: 'password' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('should return HTTP 400 for invalid sent data', (done) => {
        chai.request(server)
            .post('/auth/signin')
            .set('content-type', 'application/json')
            .send({ gibberish: 'aye' })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});