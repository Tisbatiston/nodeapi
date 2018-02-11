import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from './db';

let router = express.Router({
    mergeParams: true
});

router.use(function (req, res, next) {
    console.log(req.method, 'for', req.params.username, 'at', req.path);
    next();
});

router.post('/signin', function (req, res) {
    console.log(req.body);
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        user.comparePassword(req.body.password, function (err, isMatch) {
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

export default router;