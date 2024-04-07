const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const app = express();


//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/auth',require('./routers/userRoutes'));
app.use('/api/v1/post',require('./routers/postRoutes'));
//Routes
app.get('',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcomee to FullStack"
    })
})

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Sever is Listening on ${PORT}`.bgGreen.white);
})
