const express = require('express')
require('dotenv').config({ path: '../.env' })
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var db = require('./db')
var mysql = require('mysql2')
var session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true, 
}));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }}))

app.get('/', (req, res) => {
  //db.initializeDatabase();
  // console.log(req.session)
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
  const usernameExists = await db.userExists(req.body.username);
  const emailExists = await db.emailExists(req.body.email);
  if (!usernameExists && !emailExists) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
           const result = await db.createUser(req.body.email, req.body.username, hash);
           const user = {
             id : result.insertId,
             name : req.body.username
            }
            req.session.user = user;
            res.send({ok : true})
      })
    });
  } else {
    res.send({ ok: false });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})