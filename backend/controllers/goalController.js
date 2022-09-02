const asyncHandler=require('express-async-handler')

const Goal=require('../modals/goalModal')
const User=require('../modals/userModel')
//@desc   Get goals
//@route  GET /api/goals
//@access Private
const getGoals=asyncHandler(async(req,res)=>{

    const goals=await Goal.find({ user:req.user.id })
    console.log(goals);
    res.status(200).json(goals)
})


//@desc   Set goals
//@route  POST /api/goals
//@access Private
const setGoals= asyncHandler(async (req,res)=>{
    // console.log(req.body);
    // console.log(req.user.id);
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal=await Goal.create({
        text:req.body.text,
        user:req.user.id,
    })


    res.status(200).json(goal)
}) 

//@desc   Upadate goals
//@route  PUT /api/goals/:id
//@access Private
const updateGoal= asyncHandler(async (req,res)=>{

    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //const user=await User.findById(req.user.id)

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized')
    }

    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedGoal)

})

//@desc   Upadate goals
//@route  DELETE /api/goals/:id
//@access Private
const deleteGoal= asyncHandler(async (req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        
        res.status(400)
        throw new Error('Goal not found')
    }
    
    //const user=await User.findById(req.user.id)

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized')
    }

    // const deleteGoal=await Goal.findByIdAndDelete(req.params.id)
    // res.status(200).json(deleteGoal)
    await goal.remove()
    res.status(200).json({id: req.params.id})

})

module.exports={
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}