const express=require('express')
const router=express.Router()
const {findOneuser,findUsers,deleteUser,editUser}=require('../controllers/userController')
//protect route middleware
const{protect}=require('../middleware/authMiddleware')

router.get('/',protect,findUsers)
router.get('/finduser/:id',findOneuser)
router.delete('/deleteuser/:id',deleteUser)
router.put('/edituser/:id',editUser)

module.exports=router