const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require ('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const DB = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1', 
      user : 'postgres',
      password : '1234',
      database : 'smart-brain',
        }
  });



const app = express(); 

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req,res)=> {res.send(database.users);})
app.post('/signin', signin.handleSignin(DB, bcrypt))
app.post('/register',(req, res) =>{ register.handleRegister(req, res, DB, bcrypt) })
app.get('/profile/:id',(req, res) => { profile.handleProfileGet(req, res, DB)})
app.put('/image', (req, res) => {image.handleImage(req, res, DB)})
app.post('/imageurl', (req, res) => {image.handleAPiCall(req, res)})


app.listen(3000, () => {
    console.log('app is running on port 3000')
}) 

/*
/ --> res = this is working 
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 

*/