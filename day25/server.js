const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(express.json())
app.use(cors());
mongoose.connect('mongodb+srv://kaushal:1234@cluster0.9qkkqop.mongodb.net/?appName=Cluster0')
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err));

const User=require('./models/User');

app.post('/api/users',async(req,res)=>{
    const user=new User(req.body);
    const savedUser=await user.save();
    res.json(savedUser);
});

app.get('/api/users',async(req,res)=>{
    const users=await User.find();
    res.json(users);
})

app.put('/api/users/:id', async (req,res)=>{
    const updatedUser= await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    );
    res.json(updatedUser);
})
app.delete('/api/users/:id', async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({message:"User deleted"});
});
app.listen(3000,()=>{
    console.log('server is listening on 3000');
});