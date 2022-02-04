const express = require('express')
const app = express()
const port = 3000
var db = require('./db')
var mysql = require('mysql2')
const cors = require('cors');
require('dotenv').config({ path: '../.env' })
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
})


app.get('/', (req, res) => {
  console.log(cors);
 // db.initializeDatabase();
  res.send('Hello World!')
})

app.get('/signup', async (req, res) => {
  req.session.set('user', {id: 230});
  await req.session.save();
  res.send({ ok: true });
  var username = req.username;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})