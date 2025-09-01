import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        // trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String
    }
},{timestamps:true})

export default mongoose.model("smartusers",userSchema)