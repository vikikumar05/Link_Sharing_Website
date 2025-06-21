const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const cookieParser = require('cookie-parser'); // to parse cookies from request
const cors = require('cors'); // to handle CORS issues
const app = express();
app.use(express.json()); // middleware to parse JSON bodies or take requests and convert them to js objects
app.use(cookieParser()); // middleware to parse cookies
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions));
app.use('/auth',authRoutes); 
const PORT=5000;
app.listen(PORT,(err)=>{
    if(err){
        console.log("Error in starting server", err);
    }
    console.log("Server is running on port 5000");
}) 