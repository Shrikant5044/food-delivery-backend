const userModel=require("../models/user.model")


const getMyProfile=async (req,res)=>{

  try{

    const user=await userModel.findById(req.userId).select("-password")
   
    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }


    res.status(200).json({
        message:"Profile Fetched Successfully",
        user
    })



  }catch(err){
               res.status(500).json({message:"Server Error"})
  }


}

module.exports=getMyProfile;