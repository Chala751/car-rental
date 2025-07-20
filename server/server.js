import express from 'express';
import 'dotenv/config';
import cors from 'cors'

//initialize express
const app=express();

//middleware
app.use(cors());
app.use(express.json());

//route
app.get('/',(req,res)=>res.send("Server is running"))

const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))