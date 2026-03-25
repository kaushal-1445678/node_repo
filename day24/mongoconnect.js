// //Mongoose = tool to connect Node.js with MongoDB


// const mongoose=require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/myApp')
// .then(()=>{
//     console.log('DB connnected');
// }).catch((err)=>{
//     console.log(err);
// });

// //Schema = structure of data

// const userSchema=mongoose.schema({
//     name:String,
//     id:Number
// });

// //create Model(tool to interact with database)
// const User=mongoose.model('User',userSchema);

// //insert data
// const user=new User({
//     name:'kaushal',
//     id:1
// });

// user.save();


// //Get data 

// User.find()
// .then(data => console.log(data));




const express=require('express');
const mongoose=require('mongoose');

const app=express();
mongoose.connect('mongodb://127.0.0.1:27017/myApp')
.then(()=>console.log('DB connected'));

const userSchema= new mongoose.schema({
    name:String,
    id:Number
});

const myTool=mongoose.model('User',userSchema);
//The name of your model (must match your collection name in MongoDB)i.e 'User in this case.

app.get('/add',async(req,res)=>{
    const user=new myTool({
        name:'kaushal',
        id:1
    })
    await user.save();
    res.send('user added');

});

app.get('/users',async(req,res)=>{
    const user= await User.find();
    res.json(user);

});

app.listen(3000);