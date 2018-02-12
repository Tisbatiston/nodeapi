import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let todoSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false }
});

export const Todo = mongoose.model('Todo', todoSchema);
