const express = require('express');
const bodyPaser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');

const PORT = process.env.PORT || 3000;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageEntry = require('./controllers/imageEntry');

const db = knex({
  client: 'pg',
  connection: {
    host: 'postgresql-shallow-94483',
    user: 'coder',
    password: 'coder123',
    database: 'smart-brain'
  }
});

const app = express();
app.use(cors());
app.use(bodyPaser.json());


app.get('/', (req, res) => {

  res.json("HELLO COME TO SMART BRAIN APP");
})

app.post('/signin', (req, res) => {signin.handleSignIn(req,res,db,bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req,res,db)});
app.put('/image', (req, res) => {imageEntry.handleImageEntry(req,res,db)});
app.post('/imageUrl', (req, res) => {imageEntry.handleApiCall(req, res)});

app.listen(PORT, () => {
      console.log("App is running on port "+ PORT);
})