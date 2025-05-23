// server.js
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'journal_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL.');
});

app.post('/submit', upload.single('file'), (req, res) => {
  const { title, abstract, author, email } = req.body;
  const filePath = req.file ? req.file.filename : null;

  if (!filePath) return res.status(400).json({ message: 'File upload failed' });

  const sql = `INSERT INTO submissions (title, abstract, author, email, file_path) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [title, abstract, author, email, filePath], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Submission failed' });
    }
    res.json({ message: 'Submission successful' });
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
