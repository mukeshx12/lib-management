import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import vendorRoutes from './routes/vendorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'

mongoose.connect("mongodb://127.0.0.1:27017",{
   dbName:"backend",
}).then(()=>console.log("Database connected successfully")).catch((e)=>console.log(e));

const app=express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(path.resolve(),"public")));
app.use(cookieParser());

app.use('/vendor', vendorRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

const PORT = 4000;
app.listen(PORT,()=>{
 console.log(`Server is running at http://localhost:${PORT}`);
})