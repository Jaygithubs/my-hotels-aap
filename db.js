const mongoose = require("mongoose");

const mongoURL = 'mongodb://localhost:27017/hotels' // replace with your database name

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Mongodb server connected successfully");
})

db.on('error', (err) => {
    console.log("Database shows error",err);
})

db.on('disconnected',() => {
    console.log("Your database server now disconnected");
})

module.exports = db;