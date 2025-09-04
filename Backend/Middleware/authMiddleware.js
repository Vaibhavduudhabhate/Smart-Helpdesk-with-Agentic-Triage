import JWT from 'jsonwebtoken';
import userModel from '../Model/userModel.js';

export const requireSignIn = (req ,res ,next) =>{
    try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ success: false, message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : authHeader;

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).send({ success: false, message: "Invalid token" });
  }
}
// 

export const authMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await userModel.findById(decoded._id).select("-password"); 
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    // console.log(req.user)
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// 11111
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