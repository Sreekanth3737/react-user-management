const mongoose =require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/React-crud',{
        useNewUrlParser:true
}).then(()=>{
    console.log("db connected");
}).catch((e)=>{
    console.log('db not connected');
});