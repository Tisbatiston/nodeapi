const uri = `${process.env.MONGO_DB_URI}/${process.env[`MONGO_DB_NAME_${process.env.NODE_ENV}`.toUpperCase()]}`;
import mongoose from 'mongoose';

mongoose.connect(uri);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('db connected')
});

export default db;
