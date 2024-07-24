const mongoose = require('mongoose');

//Define the mongodb connection url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

//Set up mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

//Get the default connection
const db = mongoose.connection;

//Define event listener for database connection

db.on('connected', () =>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err) =>{
    console.log("MongoDB connection error:",err);
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

//Export the database connection
module.exports = db;