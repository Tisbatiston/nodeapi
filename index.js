import './env';
import db from './db';
import express from 'express';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import authRouter from './auth';
import todoRouter from './todo';

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
app.use('/todo', todoRouter);

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${this.address().port}`);
    console.log(`Database at: ${process.env.MONGO_DB_URI}/${process.env[`MONGO_DB_NAME_${process.env.NODE_ENV}`.toUpperCase()]}`);
})

export default app;
