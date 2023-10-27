const asyncHandler =require('express-async-handler');
const User = require('../models/userModel');
const bcrypt =require('bcrypt')
const generateToken = require('../config/generateToken');
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body
    console.log("🚀 ~ file: userController.js:7 ~ registerUser ~ name:", name)

    if(!name||!email||!password){
        res.status(400);
        throw new Error("Please Enter all the Feilds")
    }
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt)
    const user =await User.create({
        name,email,password:hashPassword,pic
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Failed to create the user')
    }
})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }
  
      const matchPassword = await bcrypt.compare(password, user.password);
  
      if (!matchPassword) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }
  
      const token = generateToken(user._id);
  
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: token,
      });
    } catch (error) {
      console.error("Error in authUser:", error);
      res.status(500).json({
        message: "Server Error",
      });
    }
  });

//  /api/user?search

const allusers =asyncHandler(async(req,res)=>{
     
    console.log("🚀 ~ file: userController.js:79 ~ allusers ~ req.query.search:", req.query.search)
const keyword =req.query.search ?{
    $or:[
{name:{$regex:req.query.search,$options:'i'}},
{email:{$regex:req.query.search ,$options:'i'}}
]
}:{}; 
const users =await User.find(keyword).find({_id:{$ne:req.user._id}})
res.send(users)
})

module.exports={registerUser,authUser,allusers}