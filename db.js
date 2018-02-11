const uri = `${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`;
const SALT_WORK_FACTOR = 10;
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.connect(uri);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db connected')
});

let userSchema = mongoose.Schema({
  email: { type: String, required: true, index: { unique: true } },
  role: { type: String, required: true },
  password: { type: String, required: true },
  name: {
    title: String,
    first: String,
    last: String
  }
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using the new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});

exports.User = mongoose.model('User', userSchema);
