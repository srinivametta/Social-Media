const mongoose=require('mongoose');

// connnect mongoose to mongodb
mongoose.connect('mongodb://localhost/practise_self');

// not get access to that connection
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function () {
    console.log("Connected to MongoDB");
});

module.exports=db;