const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// Connect to Database

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '0206192819891988!Baron',
        database: 'election'
    },
    console.log('Connected to the election database')
);




db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// Default response for any other NOT FOUND requests
app.use((req, res) => {
    res.status(404).end();
});


// function to start Express server on PORT 3001

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})