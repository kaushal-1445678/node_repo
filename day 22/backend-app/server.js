const express=require('express');
const app=express();

app.use(express.json());

app.get('/',function(req,res){
    res.send('Hello from the server\'s browser');

});
app.get('/about',(req,res)=>{
    res.send('This is the about page');
});
//REST APIs (GET, POST, PUT, DELETE)

//GET API:-
const users=[ 
    {
        id:1,
        name:'kaushal tyagi'

    },
    {
        id:2,
        name:'jon snow'
    }
];

app.get('/users',(req,res)=>{
    res.json(users);
});

// POST API:-
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({
    message: "User added",
    users: users
  });
});

// PUT API:-

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedName = req.body.name;

  users = users.map(user => {
    if(user.id === id){
      user.name = updatedName;
    }
    return user;
  });

  res.json(users);
});

// DELETE API:-
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  users = users.filter(user => user.id !== id);
  // users=users.filter(function(user) { return user.id !== id; });

  res.json({
    message:"User deleted",
    users:users
  });
});
app.listen(3000,function(){
    console.log('Server is running on port 3000');
});