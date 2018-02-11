import './env';
import express from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import authRouter from './auth';

const PORT = process.env.PORT || 3000;

let app = express();

/*
    Middlewares
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressJwt({ secret: process.env.SECRET }).unless({ path: ['/auth/signin'] }));

/*
    Routers
*/
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.send('Hello World');
})

let server = app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${server.address().port}`);
    console.log(`Database at: ${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`);
})
