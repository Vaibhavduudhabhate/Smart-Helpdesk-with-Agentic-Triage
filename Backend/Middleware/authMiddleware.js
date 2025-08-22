import JWT from 'jsonwebtoken';
import userModel from '../Model/userModel.js';

export const requireSignIn = (req ,res ,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        console.log("decoded")
        next();
    } catch (error) {
        console.log(error)        
    }
}

export const isAdmin = async (req,res,next)=>{
    try {
        const user =await userModel.findById(req.user._id)
        console.log("role",user.role)
        if (user.role !== "Admin") {
            return res.status(401).send({
                success:false,
                message:"UnAuthorized Access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in admin middleware"
        })
    }
}

export const isAgent = async (req,res,next)=>{
    try {
        const user =await userModel.findById(req.user._id)
        console.log("role",user.role)
        if (user.role !== "Agent") {
            return res.status(401).send({
                success:false,
                message:"UnAuthorized Access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Agent middleware"
        })
    }
}