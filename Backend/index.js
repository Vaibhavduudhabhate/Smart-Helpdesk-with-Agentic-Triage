import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodemailer from 'nodemailer';
import multer from "multer";
import fs from "fs";
import path from "path";
import authroutes from "./Routes/authRoutes.js"
import kbRoutes from "./Routes/kbRoutes.js"
import ticketRoutes from "./Routes/ticketRoutes.js"


// import crypto, { verify } from 'crypto';
// import bcrypt from 'bcrypt';

// const jwt_secret = 'jsknkjfdkjshdkfjhs'

const app = express();
app.use(cookieParser())
app.use(express.json())
app.set("view engine",'ejs')
app.use(express.urlencoded({extended:false}));
app.use('/uploads', express.static('uploads'));

// const upload = multer({dest:"uploads/"})
// const emailUser = process.env.EMAIL_USER;
// const emailPass = process.env.EMAIL_PASS;
var corsOptions = {
    origin: "*", // Allow any origin for now (you can restrict this to specific origins later)
    methods: "GET,HEAD,POST,PUT,PATCH,DELETE",  // Allowed methods
    allowedHeaders: "Content-Type,Authorization",  // Allowed headers
    optionsSuccessStatus: 200  // Some legacy browsers choke on 204
};
dotenv.config();
app.use(cors(corsOptions));
app.use('/api',authroutes );
app.use("/api/kbarticles",kbRoutes );
app.use("/api/tickets",ticketRoutes );
app.use("/user-dashboard/api/tickets",ticketRoutes );




async function connectMongoDb(url){
    return mongoose.connect(url)
}
connectMongoDb('mongodb://localhost:27017/SmartHelpDesk').then(()=>console.log("mongodb connected"))

export default{
    connectMongoDb,
}

app.listen('3000' ,()=>{
    console.log(`server is running on port 3000 `);
})