import dotenv from 'dotenv'
import express from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
// import userRoutes from "./routes/user-route.js"
import trailRoutes from "./routes/trail-route.js"
import modelRoutes from "./routes/model-route.js"


import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: CORS_ORIGIN }));

async function connectDatabase(){
    try{
        await mongoose.connect("mongodb+srv://carriezha321:kd7zJyTD1xI1SXDR@cluster0.08pmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to database!");
    }catch(err){
        console.log("Connection Failed");
    }
}
app.get('/', (req,res)=>{
    res.send('Express is running!');
})

// app.use('/api/users', userRoutes);
app.use('/api/trails', trailRoutes);
app.use('/api/chat', modelRoutes);

connectDatabase().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server Started on http://localhost:${PORT}/`);
    })
})
