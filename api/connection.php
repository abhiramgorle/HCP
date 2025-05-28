<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
  $host = 'localhost';
  $db   = 'mydatabase';
  $user = 'root';
  $pass = 'root'; // default MAMP password
  $charset = 'utf8mb4';
  
  $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
  $options = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ];
  
  try {
      $pdo = new PDO($dsn, $user, $pass, $options);
  } catch (PDOException $e) {
      http_response_code(500);
      echo json_encode(['error' => 'Database connection failed', 'details' => $e->getMessage()]);
      exit;
  }
  
