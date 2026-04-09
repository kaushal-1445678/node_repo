const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.post('/signup',async(req,res)=>{
    const {name, password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10);

    const user=new User(
        {
            name,
            password:hashedPassword
        }
    );
    await user.save();
    res.send("sign up sucessfull");
});

app.post('/login', async(req,res)=>{
    const {name, password}=req.body;
    const user= await User.findOne({name});
    if(!user){
        return res.json({message:'user not found'});
    }
    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.json({message:'wrong password'});
    }
    res.json({message:'Login successfull'});
});

app.post('/login',async(req,res)=>{
    const {name,password}=req.body;

    const user=await User.findOne({name});
    if(!user){
        return res.json({message:"user not found"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({message:"Wrong password"});
    }
    const token=jwt.sign(
        {userId:user._id},
        "secretkey",
        {expriesIn:'1h'},

    );
    res.json({token});
})

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.json({message:"No Token"})
    }
    try{
        const decoded=jwt.verify(token,"secretkey")
        req.user=decoded;
        next();

    }catch{
        res.json({message:"InValid Token"});
    }
    
};

app.get('/profile',auth,(req,res)=>{
    res.json({message:"Protected data",user:req,user});
})




