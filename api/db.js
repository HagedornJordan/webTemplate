var mysql = require('mysql2')
require('dotenv').config({ path: '../.env' })

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'mydb'
})

var initializeDatabase = () => {
  console.log("initalizing");
  //executeQuery("CREATE DATABASE mydb");
  executeQuery("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), registerDate DATE, permission INT)");
};

var executeQuery = (query) => {
  connection.connect((err) => {
    if (err) throw err;
    connection.query(query), (err, result) => {
      if (err) throw err;
      else connection.close;
    }
  })
}

module.exports = {initializeDatabase}