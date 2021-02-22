const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://localhost/myCollegeApp';

mongoose.connect(uri).then(
    () =>{
        console.log("Conected to Mongo")
    },
    err => {
        console.log("Error connecting to mongo");
        console.log(err);
    }
);

module.exports = mongoose.connection;