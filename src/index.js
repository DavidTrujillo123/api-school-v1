// Packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

//middlewars
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:3000',
}))

app.use(cookieParser());

app.get('/', (req, res)=> {res.send('Hola mundoooo!')});

//ROUTES
app.use(require('./routes/main.routes'));

app.listen(3001);
console.log('Server running in: http://localhost:3001');