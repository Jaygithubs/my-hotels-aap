const mongoose = require("mongoose");
require('dotenv').config();

const mongodburl=process.env.DB_URL;
const localmogodburl=process.env.LOCAL_DB_URL;
//const mongoURL = localmogodburl // replace with your database name
const mongoURL = mongodburl // replace with your database name

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