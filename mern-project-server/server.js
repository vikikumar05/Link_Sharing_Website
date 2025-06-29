require('dotenv').config(); // to load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser'); // to parse cookies from request
const cors = require('cors'); // to handle CORS issues
const linksRoutes = require('./src/routes/linksRouteS'); // import the links routes

console.log('MONGO_URL:', process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI,)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
const app = express();
app.use(express.json()); // middleware to parse JSON bodies or take requests and convert them to js objects
app.use(cookieParser()); // middleware to parse cookies
const corsOptions = {
    origin: process.env.CLIENT_ENDPOINT, // this the way to use .env file ,,,earlier we where just writting the url http://localhost:3000
    credentials: true
};
app.use(cors(corsOptions));
app.use('/auth',authRoutes);
app.use('/links', linksRoutes);
const PORT=5001;
app.listen(PORT,(err)=>{
    if(err){
        console.log("Error in starting server", err);
    }
    console.log("Server is running on port 5001");
}) 