CREATE DATABASE studentDB;

USE studentDB;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  course VARCHAR(100),
  score INT
);
