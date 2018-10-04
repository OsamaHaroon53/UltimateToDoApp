mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:osama53@ds157762.mlab.com:57762/todo_data', { useNewUrlParser: true })
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR :'));
db.once('open', () => {
    console.log('CONNECTION OPENED!!');
    return db;
});