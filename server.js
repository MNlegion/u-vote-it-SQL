const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");
require("dotenv").config();
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
    password: process.env.DB_PASSWORD,
    database: "election",
  },
  console.log("Connected to the election database")
);

// GET SINGLE candidate

app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
             AS party_name 
             FROM candidates 
             LEFT JOIN parties 
             ON candidates.party_id = parties.id 
             WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// // DELETE SINGLE candidate
app.delete("/api/candidate/:id", (req, res) => {
  const sql = "DELETE FROM candidates WHERE id = ?";
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "delete successful",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// CREATE SINGLE candidate
app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// GET ALL candidates

app.get("/api/candidates", (req, res) => {
  const sql = `
  SELECT candidates.*, parties.name
  AS party_name
  FROM candidates
  LEFT JOIN parties
  ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET ALL parties

app.get("/api/parties", (req, res) => {
  const sql = `SELECT * FROM parties`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET SINGLE party
app.get("/api/party/:id", (req, res) => {
  const sql = "SELECT * FROM parties WHERE id = ?";
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "succes",
      data: row,
    });
  });
});

// DELETE SINGLE party
app.delete("/api/party/:id", (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // checks to see if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: "Party Not Found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// PUT SINGLE candidate party

// Update a candidate's party
app.put("/api/candidate/:id", (req, res) => {
  const errors = inputCheck(req.body, "party_id");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE candidates SET party_id = ? 
               WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

// Default response for any other NOT FOUND requests
app.use((req, res) => {
  res.status(404).end();
});

// function to start Express server on PORT 3001

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
