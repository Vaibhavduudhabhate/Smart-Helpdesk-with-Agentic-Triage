import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import nodemailer from 'nodemailer';
import multer from "multer";
import fs from "fs";
import path from "path";
// import crypto, { verify } from 'crypto';
// import bcrypt from 'bcrypt';

const jwt_secret = 'jsknkjfdkjshdkfjhs'

const app = express();
app.use(cookieParser())
app.use(express.json())
app.set("view engine",'ejs')
app.use(express.urlencoded({extended:false}));
app.use('/uploads', express.static('uploads'));
app.use(cors(
    {
        origin:['http://localhost:5173'],
        credentials:true
    }
));

// const upload = multer({dest:"uploads/"})
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;


async function connectMongoDb(url){
    return mongoose.connect(url)
}
connectMongoDb('mongodb://localhost:27017/SmartHelpDesk').then(()=>console.log("mongodb connected"))

export default{
    connectMongoDb,
}

app.listen('3002' ,()=>{
    console.log(`server is running on port 3002 `);
})