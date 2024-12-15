const express=require('express');
const db =  require("./db");
const aap = express();
const bodyParser = require('body-parser');
aap.use(bodyParser.json()); //req.body
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// import the router files
const personRoutes = require('./routes/personRoutes');

// use the routeres
aap.use('/person',personRoutes);

aap.listen(PORT, () => {
    console.log("server is running on port: 3000");
})