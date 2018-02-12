import chai from 'chai';
import chaiHttp from 'chai-http';
import {
    createSuperAdmin,
    signInUser,
    unknownUserToken
} from './test-helpers';
import server from '../index';

let should = chai.should();
chai.use(chaiHttp);

describe('/todo POST', () => {
    before(async () => {
        global.user = createSuperAdmin();
        global.authToken = await signInUser(server, global.user);
    });

    it('should create a To-Do', (done) => {
        chai.request(server)
            .post('/todo')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${global.authToken}`)
            .send({title: 'ToDo #1', description: 'simple todo'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('title');
                done();
            });
    });

    it('should return HTTP 400 for invalid parameters', (done) => {
        chai.request(server)
            .post('/todo')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${global.authToken}`)
            .send({description: 'simple todo'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('should return HTTP 401 for invalid user', (done) => {
        chai.request(server)
            .post('/todo')
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${unknownUserToken}`)
            .send({description: 'simple todo'})
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});
