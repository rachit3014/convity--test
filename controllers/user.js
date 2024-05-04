const User = require('../models/user');
const jwt=require('jsonwebtoken')
const { validationResult } = require("express-validator");
module.exports.signUp= async function(req,res)
{
    try {
        const error=validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
          }
        let user= await User.findOne({eamil:req.body.email})
        if(user)
        {
            return res.status(401).json({message:'user already exists'});
        }
         user= await User.create(req.body);
         return res.status(200).json({message:"sucesfully created user",user})
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"error creating user",error})
        
    }



    
}
module.exports.signIn= async function(req,res)
{
    try {
        const error=validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
          }
        const user= await User.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(400).json({messsage:"User not found"})
        }
        const token=jwt.sign(user.toJSON(),'Test')
        return res.status(200).json({'message':"signIn scessfully",token})
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({mesaage:"unable to signIn the user",error})
        
    }

}
module.exports.profile= async function(req,res)
{
  try {
    console.log(req.user.id)
    const user= await User.findById(req.user.id);
    if(req.user._id !== user._id)
    {
        return res.status(200).json({message:"sucesfully fetched the user detail",user})
    }
    return res.status(200).json({message:"failed to fecth the user detail"})
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({mesaage:"unable to fetch the user detail",error})
    
  }
}
