-- MySQL bootstrap for the demo API
-- Usage (example):
--   1) Create DB/user (optional)
--   2) Run this file inside the target database

CREATE DATABASE IF NOT EXISTS lingganshouji
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE lingganshouji;

CREATE TABLE IF NOT EXISTS notes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  content TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_notes_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS T_linggan (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_linggan_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

