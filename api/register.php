<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once("connection.php"); // Your database connection

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

// --- Basic Input Validation ---
if (
    !isset($data->email) ||
    !isset($data->name) ||
    !isset($data->relationToPatient) ||
    !isset($data->location) ||
    !isset($data->password) ||
    !isset($data->confirmPassword) ||
    !isset($data->dataCollectionConsent)
) {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// --- Sanitize and Assign Variables ---
$email = filter_var(trim($data->email), FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars(strip_tags(trim($data->name)));
$relationToPatient = htmlspecialchars(strip_tags(trim($data->relationToPatient)));
$location = htmlspecialchars(strip_tags(trim($data->location)));
$password = $data->password; // Hashing will handle special characters
$confirmPassword = $data->confirmPassword;
$dataCollectionConsent = (bool)$data->dataCollectionConsent;

// --- Further Validation ---
if (empty($email) || empty($name) || empty($relationToPatient) || empty($location) || empty($password) || empty($confirmPassword)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please fill in all fields."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit;
}

if (strlen($password) < 8) { // Example: Minimum password length
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Password must be at least 8 characters long."]);
    exit;
}

if ($password !== $confirmPassword) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Passwords do not match."]);
    exit;
}

if (!$dataCollectionConsent) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "You must agree to the data collection terms and conditions."]);
    exit;
}

// --- Check if Email Already Exists ---
try {
    $stmt = $pdo->prepare("SELECT 1 FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409); // Conflict
        echo json_encode(["success" => false, "message" => "This email address is already registered."]);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["success" => false, "message" => "Database error checking email: " . $e->getMessage()]);
    exit;
}

// --- Hash Password ---
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
if ($hashedPassword === false) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Error hashing password."]);
    exit;
}

// --- Insert User into Database ---
try {
    // Adjust column names if they are different in your table
    $sql = "INSERT INTO users (email, name, relation_to_patient, location, password) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    
    if ($stmt->execute([$email, $name, $relationToPatient, $location, $hashedPassword])) {
        // You might want to get the last inserted ID if needed
        // $userId = $pdo->lastInsertId();
        http_response_code(201); // Created
        echo json_encode(["success" => true, "message" => "Registration successful! You can now log in."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Registration failed. Please try again."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    // Log detailed error for server admin, but generic message for user
    error_log("Registration PDOException: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An unexpected error occurred: " . $e->getMessage()]);
}

?>
