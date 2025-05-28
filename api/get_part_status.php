<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$email = $_GET['email'];

$sql = "SELECT up.*  FROM user_part_status up 
        WHERE up.user_email = ?";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(1, $email, PDO::PARAM_STR);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$progress = [];
foreach($result as $row) {
    $progress[] = $row;
}

echo json_encode($progress);
?>
