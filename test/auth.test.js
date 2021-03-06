import chai from 'chai';
import chaiHttp from 'chai-http';
import { createSuperAdmin } from './test-helpers';
import server from '../index';

let should = chai.should();
chai.use(chaiHttp);

describe('/auth/signin POST', () => {
    before(function () {
        global.user = createSuperAdmin();
    });

    it('should return a token for a valid user', (done) => {
        chai.request(server)
            .post('/auth/signin')
            .set('content-type', 'application/json')
            .send({ email: global.user.email, password: global.user.password })
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
            .send({ email: 'inexisting@user.com', password: global.user.password })
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

    it('should return HTTP 404 when supplied with an incorrect password', (done) => {
        chai.request(server)
            .post('/auth/signin')
            .set('content-type', 'application/json')
            .send({ email: global.user.email, password: 'wrongPassword' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});