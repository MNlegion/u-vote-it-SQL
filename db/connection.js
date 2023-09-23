const mysql = require('mysql2');
require("dotenv").config();

// Connect to Database

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "election",
    },
    console.log("Connected to the election database")
  );


  module.exports = db;