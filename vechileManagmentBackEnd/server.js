require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require("cors"); 
const cookieParser = require('cookie-parser')
// use urlencoded midlware to get data from the body of the page
app.use(express.urlencoded({ extended: false }));
// use json midlware is used to change josn data from api to object
app.use(cookieParser())
app.use(express.json())
// FrontEnd Connection
app.use(
    cors({
      origin: [process.env.FRONT_END_ORIGIN],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
     
    })
  );
//Server Connection
const Server = app.listen( process.env.PORT || 8000 ,console.log('Connected to Serever and MonogoDB database'))
//database connection
mongoose.connect( process.env.MoGO_URL)
.then(()=>{Server})
.catch(err => console.error('Could not connect to MongoDB...', err))

 // Route
app.use('/vehicle',require('./routes/routes'))


 