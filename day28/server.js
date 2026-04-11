const express=require('express');
const mongoose=require('mongoose');


const app=express();
app.use(express.json());

mongoose.connect()
.then(()=>console.log('DB Connected'))
.catch(error=>console.log("DB Connection Failed",error));

const UserSchema=new mongoose.schema({
    name:String
});

const User=mongoose.model('User',UserSchema);
//or const Person=mongoose.model('User',UserSchema);

// app.post('/users/add',async(req,res,next)=>{
//     try{
//         const user=new Person(req.body);
//         await user.save();
//         res.status(201).json({
//             success:true,
//             message:"User added",
//             data:user
//         })
//     }catch(err){
//         next(err);
//     }
// });


app.get('/users',async(req,res,next)=>{
    try{
         const users=await User.find();
    res.status(200).json({
        message:"User details fetched Successfully",
        data:users
    });
    }catch(err){
        next(err);
    }
   

});

app.post('/users/add',async(req,res,next)=>{
    try{
        const user=new User(req.body);
        await user.save();
        res.status(201).json({
            success:true,
            message:"User added",
            data:user
        })
    }catch(err){
        next(err);
    }
});

app.use((err,res,res,next)=>{
    res.status(500).json({
        success:false,
        message:err.message

    });
});

app.listen(3000,()=>console.log('Server is listening on 3000'));
