const express=require('express');

const app=express();
app.use(express.json());

const getUsers=(req,res)=>{
    res.send("users details");
}

const logger=(req,res,next)=>{
    console.log('App called');
    next();
}
const auth=(req,res,next)=>{
    let token=req.headers.token;
    if(token === '1234'){
        next();
    }else{
        res.send("unauthorised");
    }
}

// app.get('/users',logger,getUsers);
app.get('/users',auth,getUsers);

app.listen(3000);