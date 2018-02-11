import './env';
import express from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json())
app.use(expressJwt({ secret: process.env.SECRET}).unless({path: ['/signin']}));

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/signin', function(req, res) {
    const token = jwt.sign(
        { /* payload */ },
        process.env.SECRET,
        { expiresIn: 24 * 60 * 60 }
    );
    res.status(200).send({
            token: token
        })
})

let server = app.listen(PORT, function() {
    console.log(`Server running at http://localhost:${server.address().port}`);
})
