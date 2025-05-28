
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
 
include_once("connection.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["error" => "Email and Password are required"]);
    exit;
}

$email = $data->email;
$password = $data->password;

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $userDataToSend = [
        'email' => $user['email'],
        'name' => $user['name'],
        'relationToPatient' => $user['relation_to_patient'], 
        'location' => $user['location']
        // Add any other fields 
    ];
    echo json_encode(["success" => True, "user" => $userDataToSend]);
    $updt = $pdo->prepare("UPDATE users SET last_logged_in = NOW() WHERE email = ?");
    $updt->execute([$email]);
} else {
    echo json_encode(["success" => False,"message" => "Invalid credentials"]);
} 
