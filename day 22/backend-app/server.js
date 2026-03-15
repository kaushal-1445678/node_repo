const express=require('express');
const app=express();

app.get('/',function(req,res){
    res.send('Hello from the server\'s browser');

});
app.get('/about',(req,res)=>{
    res.send('This is the about page');
});

app.get('/users',(req,res)=>{
    const users=[ 
        {
            id:1,
            name:'kaushal tyagi'

        },
        {
            id:2,
            name:'jon snow'
        }
    ]
    res.json(users);
});
app.listen(3000,function(){
    console.log('Server is running on port 3000');
});