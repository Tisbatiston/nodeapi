import './env';
import express from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { User } from './db';

const PORT = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressJwt({ secret: process.env.SECRET}).unless({path: ['/signin']}));

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.post('/signin', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            const { email, role } = user;
            const token = jwt.sign(
                {
                    email,
                    role
                },
                process.env.SECRET,
                { expiresIn: 24 * 60 * 60 }
            );
            res.status(200).send({
                token: token
            });
        });
    });
})

let server = app.listen(PORT, function() {
    console.log(`Server running at http://localhost:${server.address().port}`);
    console.log(`Database at: ${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`);
})
