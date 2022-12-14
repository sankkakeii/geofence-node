// Require packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const {PORT, BASE_URL, DB_URL} = process.env
const cookieParser = require('cookie-parser')
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:5002', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
// installing packages
const app = express()

// MIDDLEWARE
app.use(cookieParser())

// parse application/json
app.use(bodyParser.json());

// use cors
app.use(cors(corsOptions));

// Routes 
app.use('/api/geochecker', require('./routes/client.route.js'));

// Start server
app.listen( process.env.PORT || 3000, async () => {
    console.log(`the server is running on Port ${BASE_URL}${PORT}`);
});