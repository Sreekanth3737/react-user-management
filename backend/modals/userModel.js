const mongoose = require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add a email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please add a password']
    },
    phone:{
        type:String,
        
    },
    role:{
        type:String,
        enuum:["user","admin"],
        default:"user"
    }
},
{
    timestamps:true
})

userSchema.pre("save", async function (next) {
    console.log("adminnnnnnnnnnn");
   
    if (this.email == 'admin123@gmail.com')
    
    {
        this.role = "admin"
        console.log("adminnnnnnnnnnn+++++++++++++++++++++");
    }
    next();
})

module.exports=mongoose.model('User',userSchema)