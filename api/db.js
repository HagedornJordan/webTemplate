var mysql = require('mysql2')
require('dotenv').config({ path: '../.env' })
var moment = require('moment');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'mydb'
})

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
connection.connect((err) => {
  if (err) throw err;
});

const executeQuery = (query, params) => {
      return new Promise((resolve, reject) => {
        connection.query(query, params, (err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
    })
}

var initializeDatabase = () => {
  console.log("initalizing");
  connection.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), registerDate DATE, permission INT)", (err, res) => {
    if (err) throw err;
  } )
};

const userExists = async (username) => {
  const res = await executeQuery('SELECT * FROM users WHERE name =?', [username]);
  return res.length > 0;
}

var emailExists = async (email) => {
  const res = await executeQuery('SELECT * FROM users WHERE email =?', [email]); 
    return res.length > 0;
}

const createUser = async (email, username, password) => {
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  const res = await executeQuery("INSERT INTO users(name, email, password, registerDate) VALUES (?, ?, ?, ?)", [username, email, password, mysqlTimestamp]);
  return res;
}

module.exports = {initializeDatabase, userExists, emailExists, createUser}