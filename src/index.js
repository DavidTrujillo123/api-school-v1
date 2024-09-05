// Packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

//middlewars
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  credentials: true, 
  origin: process.env.URL_ORIGIN,
}));

app.use(cookieParser());

app.get('/', (req, res)=> {res.send('Simple School API')});

//ROUTES
app.use(require('./routes/main.routes'));

app.listen(3002);
console.log('Server running in: '+process.env.URL_ORIGIN);