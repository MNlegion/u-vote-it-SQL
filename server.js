const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to Database

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "0206192819891988!Baron",
    database: "election",
  },
  console.log("Connected to the election database")
);

// GET SINGLE candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log;
// });

// // DELETE SINGLE candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// CREATE SINGLE candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// Default response for any other NOT FOUND requests
app.use((req, res) => {
  res.status(404).end();
});

// function to start Express server on PORT 3001

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
