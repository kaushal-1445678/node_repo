
app.get('/users',async(req,res)=>{
    const users=await UserActivation.find();
    try{
        res.json({
        success:true,
        message:"Users fetched successfully",
        data:users
    });
    }catch(error){
        res.json({
            success:false,
            message:"Somethin went wrong",
        })
    }
    
});