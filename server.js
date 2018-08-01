const express = require('express');
const bodyPaser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'coder',
    password: 'coder123',
    database: 'smart-brain'
  }
});



const app = express();
app.use(bodyPaser.json());
app.use(cors());
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

  ],
  login: [{
    id: "123",
    hash: "",
    email: "ayabongabooi2@gmail.com"

  }]
}

app.get('/', (req, res) => {
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const {
    email,
    name,
    password
  } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });
  db('users')
    .returning('*')
    .insert({
      name: name,
      email: email,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json("unable to register"))
})

app.get('/profile/:id', (req, res) => {
  const {
    id
  } = req.params;

  db.select('*').from('users').where({
    id
  }).then(user => {
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(400).json('user is not found')
    }
  }).catch(err => res.status(400).json('error getting user'))

})

app.put('/image', (req, res) => {
  const {
    id
  } = req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });







app.listen(3000, () => {
  console.log("App is running on port 3000");
})