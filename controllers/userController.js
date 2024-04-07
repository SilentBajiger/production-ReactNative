const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/userModel');
const Jwt = require('jsonwebtoken');
var {expressjwt:jwt} = require('express-jwt');

const requireSignIn = jwt({
    secret:process.env.SECRETE_KEY,algorithms:['HS256'],
})


const registerController = async(req,res)=>{
    try {
        // console.log("allore")
        const {name,email,password} = req.body;
        //Validation
        if(!name){
            return res.status(400).send({
                success:false,
                message:"name isRequired",
            })
        }
        if(!email){
            return res.status(400).send({
                success:false,
                message:"Email isRequired",
            })
        }
        if(!password || password.length <3){
            return res.status(400).send({
                success:false,
                message:"password isRequired and 3 char Long",
            });
        }

        // existing user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(500).send({success:false,message:"Email Already Exist"});

        }
        //Hashed Password
        const hashedPassword = await hashPassword(password);

        const user = await User({name,email,password:hashedPassword});
        user.save();
        return res.status(200).send({success:true,message:"Registration Successfull Go For Login",hashedPassword});

    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:"Error in Register API",error});
    }
}


const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please Prvide Email or Password"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send({success:false,message:"Error in Login APi User does Not Exists"});
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            console.log("invalid")
            return res.status(501).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
        // token Creation
        const token = await Jwt.sign({_id:user._id},process.env.SECRETE_KEY,{expiresIn:"1d"})


        //remove Pasword 
        user.password = undefined;
        return res.status(200).send({
            success:true,
            message:"Login Successfully",
            token,
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Login Api",
            error
        });
    }
}

const updateUserController = async(req,res) =>{
    try {
        // console.log("alla")
        const {name,password,email} = req.body;
        const user = await User.findOne({email});
        if(password && password.length <3 ){
            return res.status(400).send({
                success:false,
                message:"password is Required and should be atleast 3 char",
            })
        }  
        const hashedPassword = password ? await hashPassword(password):undefined;
        //updated user
        const updatedUser = await User.findOneAndUpdate({email},{
            name:name || user.name,
            password:hashedPassword || user.password,
        },{new:true});


        return res.status(200).send({
            success:true,
            message:'Profile Updated Please Login',
            updatedUser,
        });



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in User Update Api",
            error
        })
    }
}

module.exports = {registerController,loginController,updateUserController,requireSignIn};