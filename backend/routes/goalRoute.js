const express=require('express')
const router=express.Router()

const{getGoals,setGoals,updateGoal,deleteGoal}=require('../controllers/goalController')
//protect route middleware
const {protect}=require('../middleware/authMiddleware')


// router.get('/',getGoals)
// router.post('/',setGoals)
router.route('/').get(protect,getGoals).post(protect,setGoals)

router.put('/:id',protect,updateGoal)

router.delete('/:id',protect,deleteGoal)


module.exports=router
