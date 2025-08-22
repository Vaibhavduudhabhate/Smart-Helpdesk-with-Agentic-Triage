import { comparePassword, hashPassword } from "../Helper/authHelper.js";
import userModel from "../Model/userModel.js";
import JWT from 'jsonwebtoken';




export const registerController = async (req, res) => {
    console.log("entered",req.body)
    try {
        const { name, email, password,role } = req.body;
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "already register please login",
            })

        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, email, password: hashedPassword ,role });
        await user.save();

        res.status(201).send({
            success: true,
            message: "User Register successfull",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email ) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Email or Password'
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        console.log(password,user.password)
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" })

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
};

// export const forgotPasswordContainer = async (req, res) => {
//     // console.log("forgot ps", req.body)
//     try {
//         const { email, answer, newpassword } = req.body;
//         if (!email) {
//             res.status(400).send({message: "Email is required"})
//         }
//         if (!answer) {
//             res.status(400).send({message: "Answer is required"})
//         }
//         if (!newpassword) {
//             res.status(400).send({message: "New Password is required"})
//         }

//         const user = await userModel.findOne({email});
//         // console.log("user",user)
//         const hashed =await hashPassword(newpassword);
//         await userModel.findByIdAndUpdate(user._id,{ password: hashed });
//         res.status(200).send({
//             success:true,
//             message:"password reset successfully"
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "something went wrong",
//             error
//         })
//     }
// }

// export const updateProfileController = async (req,res) => {
//     try {
//         const {name,email,address,phone} = req.body;
//         const user = await userModel.findById(req.user._id)
//         // password
//         if(password && password.length < 6){
//             return res.json({error:"Password is required and have 6 characters long"})
//         }
//         // const hashedPassword = password|| await hashPassword(password) 
//         const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
//             name: name || user.name,
//             email:email || user.email,
//             address:address || user.address,
//             phone:phone || user.phone,
//             // password:hashedPassword || user.password
//         },{new:true})
//         res.status(200).send({
//             success: true,
//             message: "Profile Updated Successfully",
//             updatedUser
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(400).send({
//             success: false,
//             message: "Error while updating profile",
//             error
//         })
//     }
// }

// export const TestController = async (req, res) => {
//     res.send("test Controller")
// }