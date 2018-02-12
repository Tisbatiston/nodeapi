import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/User';

let router = express.Router({
    mergeParams: true
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Invalid parameters');
        return;
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
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
                else {
                    res.status(404).send('User not found');
                }
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

export default router;