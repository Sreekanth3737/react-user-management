const express=require('express')
const router=express.Router()
const {registerUser,loginUser,getMe,findOneuser,findUsers,deleteUser,editUser}=require('../controllers/userController')
//protect route middleware
const{protect}=require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
// router.get('/admin',protect,findUsers)
// router.get('/finduser/:id',protect,findOneuser)
// router.delete('/dleteuser/:id',protect,deleteUser)
// router.put('/edituser/:id',protect,editUser)
module.exports=router