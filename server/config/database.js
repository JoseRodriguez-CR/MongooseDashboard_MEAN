const mongoose = require('mongoose');

// Create connection to database
mongoose.connect("mongodb://localhost/dog_db", {useNewUrlParser: true});


//If the connection throws an error
mongoose.connection.on('error', err => {
    console.error(`Mongoose default connection error: ${ err }`);
    process.exit(0);
});
//When the connection is diconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});