import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from './User';

let router = express.Router({
    mergeParams: true
});

router.post('/signin', function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Invalid parameters');
        return;
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        else if (!user) {
            res.status(404).send('User not found');
        }
        else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                
                if (isMatch) {
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
                }
    
            });
        }
    });
})

export default router;