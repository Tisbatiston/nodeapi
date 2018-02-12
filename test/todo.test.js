import chai from 'chai';
import chaiHttp from 'chai-http';
import {
    createSuperAdmin,
    signInUser
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
                // res.body.should.have.property('token');
                done();
            });
    });
});
