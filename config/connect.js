const mysql = require('mysql2');
const {host,user,password,database} = require("./config.json");

const con = mysql.createConnection({
  host,
  user,
  password,
  database
});

module.exports = con;