import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

let userSchema = Schema({
    email: { type: String, required: true, index: { unique: true } },
    role: { type: String, required: true },
    password: { type: String, required: true },
    todos : [ { type: Schema.Types.ObjectId, ref: 'Todo' } ],
    name: {
        title: String,
        first: String,
        last: String
    }
});

userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using the new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});

export const User = mongoose.model('User', userSchema);
