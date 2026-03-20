const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")


const SECRET_KEY=process.env.JWT_SECRET;

const signup=async (req,res)=>{

  try{
    const {name,email,password}=req.body

    if(!name||!email||!password){
       return  res.status(401).json({message:"All Fields Required"})
    }

    const existingUser= await userModel.findOne({email})

    if(existingUser){
        return res.status(401).json({message:"User Already Exists"})
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user= await userModel.create({
        name:name,
        email:email,
        password:hashedPassword

    })

    res.status(201).json({message:"User Created SuccessFully"})



    }catch(err){
        res.status(500).json({message:"Server Error"})
    }

}

const login= async (req,res)=>{

    try{

        const {email,password}=req.body;
        
        if(!email||!password){
            return res.status(401).json({message:"All Fields Are Required"})
        }
        
        const user= await userModel.findOne({email});
        
        if(!user){
            return res.status(401).json({message:"User not Found"})
        }
        
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials "})
        }
        
        const token=await jwt.sign({user_id:user._id},SECRET_KEY,{expiresIn:"1h"})
        
        res.status(200).json({message:"Suceessfully sign in",token})
        
    }catch(err){
        res.status(500).json("Server Error")
    }
    }
    
    
    
    
    module.exports={signup,login}