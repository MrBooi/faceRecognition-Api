const express = require('express');
const bodyPaser = require('body-parser');


const app = express();
app.use(bodyPaser.json());
const database = {
  users: [{
      id: '123',
      name: 'Ayabonga',
      email: 'ayabongabooi2@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()

    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'yepyes',
      entries: 0,
      joined: new Date()

    }

  ]
}

app.get('/', (req, res) => {
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const{email,name,password} = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
 const {id} = req.params;
 let found =false;
 database.users.forEach(user =>{
 if (user.id===id) {
   found =true;
   res.json(user);
 }
 })
 if(!found){
    res.status(404).json('no such user');
 }
})

app.post('/image',(req,res)=>{
  const {id} = req.body;
  let found =false;
  database.users.forEach(user =>{
  if (user.id===id) {
    found =true;
    user.entries++;
    res.json(user.entries);
  }
  })
  if(!found){
     res.status(404).json('not found');
  }

})


app.listen(3000, () => {
  console.log("App is running on port 300");
})