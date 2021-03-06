const express = require('express')
require('dotenv').config({ path: '../.env' })
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var db = require('./db')
var mysql = require('mysql2')
var session = require('express-session');
var requestLogger = require('./requestLogger')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true, 
}));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }}))
app.use(requestLogger)

const invalidStatus = {status: "INVALID"};
const errorStatus = {status : "ERROR"};
const successStatus = {status: "SUCCESS"};
const failureStatus = {status: "FAILURE"};


app.get('/', (req, res) => {
  //db.initializeDatabase();
  res.send('Hello World!')
})

app.post('/login', async (req, res) => {
  const userByUsername = await db.getUserByUsername(req.body.username);
  const userRecord = userByUsername[0];
  bcrypt.compare(req.body.password, userRecord.password, (err, result) => {
    if (result) {
      const user = {
        id : userRecord.id,
        name : userRecord.name,
       }
       req.session.user = user;
       res.send(successStatus);
    } else {
      res.send(invalidStatus)
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) res.send(errorStatus);
    else res.send(successStatus);
  })
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
            req.session.created = 1;
            res.send(successStatus);
      })
    });
  } else {
    res.send(failureStatus);
  }
})

app.get('/requestLogs', async (req, res) => {
  const allLogs = await db.getLogs();
  console.log(allLogs)
  res.send(allLogs);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})