-- journal_db.sql
CREATE DATABASE IF NOT EXISTS journal_db;
USE journal_db;

CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  abstract TEXT,
  author VARCHAR(100),
  email VARCHAR(100),
  file_path VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
