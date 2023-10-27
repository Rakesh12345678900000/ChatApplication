const express =require('express')
const { registerUser, authUser,allusers} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const router=express.Router()


 router.route('/').post(registerUser).get(protect,allusers)
 router.post('/login',authUser)









module.exports=router