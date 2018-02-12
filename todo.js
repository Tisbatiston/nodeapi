import express from 'express';
import { Todo } from './models/Todo';
import { getUserFromPayload } from './helpers';

let router = express.Router({
    mergeParams: true
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        res.status(400).send('Invalid parameters');
        return;
    }
    const user = await getUserFromPayload(req.headers);
    if (!user) {
        res.status(401).send('Unauthorized');
        return;
    }
    const todo = new Todo({
        title,
        description,
        user
    });

    try {
        await todo.save();
        res.status(200).json(todo);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

export default router;