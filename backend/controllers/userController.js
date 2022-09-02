const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User=require('../modals/userModel')
const Admin=require('../modals/adminModel')
//const { use } = require('../routes/goalRoute')


//@desc   Register User
//@route  POST /api/users
//@access Public
const registerUser=asyncHandler(async(req,res)=>{
        const{name,email,password,phone}=req.body;

        if(!name || !email || !password || !phone){
            res.status(400)
            throw new Error('Please add all fields')
        }

       
        //check if user exists
        const userExists=await User.findOne({email})

        if(userExists){
          res.status(400)
              throw new Error('User already Exists')
            
        }

        //Hash password

        const salt =await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            
        })

        if(user){
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                token:generateToken(user._id)
            })
        }else{
           res.status(400)
           throw new Error('Invalid User Data') 
        }

})

//@desc   Authenticate a User
//@route  POST /api/users/login
//@access Private
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    //check for user email
    const user=await User.findOne({email})
   // const admin=await Admin.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role,
            token:generateToken(user._id)
           
        })
    }
  
    else{
       res.status(400)
       throw new Error('Invalid Credentials') 
    
    }
    
})

//@desc   Get  User data
//@route  GET /api/users/me
//@access Private
const getMe=asyncHandler(async (req,res)=>{
   // const {_id,name,email,phone}=await User.findById(req.user.id)

    res.status(200).json(req.user)
    
})

//Generate JWT
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

//find user 
const findUsers=asyncHandler(async(req,res)=>{
    const user=await User.find({}).skip(1)
    console.log(user)
    
        res.json(user)
});

const findOneuser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const userDelete=await User.findById(id)
    res.json(userDelete)
})

const deleteUser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const userDelete=await User.findByIdAndDelete(id)
    res.json({id})
})

const editUser=asyncHandler(async(req,res)=>{
    console.log('+++++++++++');
    const {id}=req.params
    
    const editUser=await User.findByIdAndUpdate(id,req.body)
    res.json(editUser)
})


module.exports={registerUser,loginUser,getMe,findOneuser,findUsers,deleteUser,editUser}