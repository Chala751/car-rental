import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import connectDB from './configs/db.js';

//initialize express
const app=express();

//connect db
await connectDB()

//middleware
app.use(cors());
app.use(express.json());

//route
app.get('/',(req,res)=>res.send("Server is running"))

const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))