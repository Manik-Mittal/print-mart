import User from "../models/user.model.js";  // this is imported as this model is made using mongoose
// so it will directly communicate with mongodb 
import { vendor } from "../models/vendor.model.js";

export const createUser = async (req,res) => {
    try{
        // const {name, email,password, contactNo, address, creditCard, debitCard, upiId} = req.body;
        const {name, email,password, contactNo, address} = req.body;

        if(!name || !email || !password){
            console.log("provide all the fields");
            return res.status(400).json({success:false, message:"please provide all the required fields."});
        }

        // let user = await User.findOne({name, email: email}); 
        let user = await User.findOne({name, email}); 
        if(user){
            console.log("user already exist");
            return res.status(400).json({success:false,message:"user already exist"});
        }

        user = await new User({name,email,password,contactNo,address}).save();

        res.status(201).json({ success:true,user });
    }
    catch(error){
        console.log("error from catch block");
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

// loggin in user
export const authUser = async (req,res) => {
    try {
        const { email,password } = req.body;
        if( !email || !password ) {
            return res.status(401).json({success: false, message:"please fill the required fields"});
        }
        
        const loggedUser = await User.findOne({email}).select('+password');
        if(loggedUser) {
            if(password === loggedUser.password){
                return res.status(200).json({
                    success:true,
                    message: "User logged in",
                    loggedUser
                })
            } else {
                return res.status(404).json({success:false,message:"Incorrect Password"});
            } x   
        }

        const existingVendor = await vendor.findOne({email}).select('+password');
        if(existingVendor) {
            if(password === existingVendor.password){
                return res.status(200).json({
                    success:true,
                    message: "Vendor logged in successfully",
                    Vendor: {
                        name : existingVendor.vendorName,
                        Id : existingVendor.email,
                        address : existingVendor.address
                    },
                    redirectTo: "api/v1/vendor"
                })
            } else {
                return res.status(404).json({success:false,message:"Incorrect Password"});
            }
        }
        

        return res.status(404).json({success:false,message:"Email not found"});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//forgot password controller
export const forgotPassword = async (req,res) => {
    try {
        const {email,newPassword} = req.body;
        if(!email){
            return res.status(400).json({success:false,message:"email is required"});
        }
        if(!newPassword){
            return res.status(404).json({success:false,message:"New password is required"});
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({success: false,message:"email is wrong"});
        }
        await User.findByIdAndUpdate(user._id,{password:newPassword});
        res.status(200).json({
            success:true,
            message:"Password reset successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong",
            error: error.message
        })
    }
};