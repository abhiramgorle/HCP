<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$section_code = $data['section_code'];
$mark_complete = $data['complete'];

$sql = "SELECT id, part_id FROM course_sections WHERE section_code = ?";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(1, $section_code, PDO::PARAM_STR);
$stmt->execute();
$section = $stmt->fetch(PDO::FETCH_ASSOC);
$section_id = $section['id'];
$part_id = $section['part_id'];

// Mark the current section as completed
$sql_update = "UPDATE user_progress 
               SET is_completed = 1, completed_at = CURRENT_TIMESTAMP 
               WHERE user_email = ? AND section_id = ?";
$stmt_update = $pdo->prepare($sql_update);
$stmt_update->bindValue(1, $email, PDO::PARAM_STR);
$stmt_update->bindValue(2, $section_id, PDO::PARAM_INT);
$stmt_update->execute();

// If no row exists for the current section, insert it as completed
if ($stmt_update->rowCount() === 0) {
    $sql_insert_current = "INSERT INTO user_progress (user_email, section_id, is_completed, completed_at) 
                           VALUES (?, ?, 1, CURRENT_TIMESTAMP)";
    $stmt_insert_current = $pdo->prepare($sql_insert_current);
    $stmt_insert_current->bindValue(1, $email, PDO::PARAM_STR);
    $stmt_insert_current->bindValue(2, $section_id, PDO::PARAM_INT);
    $stmt_insert_current->execute();
}

// Get the next section ID
$sql_next_section = "SELECT id FROM course_sections WHERE part_id = ? AND id > ? ORDER BY id ASC LIMIT 1";
$stmt_next_section = $pdo->prepare($sql_next_section);
$stmt_next_section->bindValue(1, $part_id, PDO::PARAM_INT);
$stmt_next_section->bindValue(2, $section_id, PDO::PARAM_INT);
$stmt_next_section->execute();
$next_section = $stmt_next_section->fetch(PDO::FETCH_ASSOC);

if ($next_section) {
    $next_section_id = $next_section['id'];

    // Insert a new row for the next section as not completed
    $sql_insert_next = "INSERT INTO user_progress (user_email, section_id, is_completed, completed_at) 
                        VALUES (?, ?, 0, NULL)";
    $stmt_insert_next = $pdo->prepare($sql_insert_next);
    $stmt_insert_next->bindValue(1, $email, PDO::PARAM_STR);
    $stmt_insert_next->bindValue(2, $next_section_id, PDO::PARAM_INT);
    $stmt_insert_next->execute();
} else {
    // If there is no next section, mark the part as completed
    $sql_update_part = "UPDATE user_part_status 
                        SET is_completed = 1
                        WHERE user_email = ? AND part_id = ?";
    $stmt_update_part = $pdo->prepare($sql_update_part);
    $stmt_update_part->bindValue(1, $email, PDO::PARAM_STR);
    $stmt_update_part->bindValue(2, $part_id, PDO::PARAM_INT);
    $stmt_update_part->execute();

    // If no row exists for the part, insert it as completed
    if ($stmt_update_part->rowCount() === 0) {
        $sql_insert_part = "INSERT INTO user_part_status (user_email, part_id, is_completed) 
                            VALUES (?, ?, 1)";
        $stmt_insert_part = $pdo->prepare($sql_insert_part);
        $stmt_insert_part->bindValue(1, $email, PDO::PARAM_STR);
        $stmt_insert_part->bindValue(2, $part_id, PDO::PARAM_INT);
        $stmt_insert_part->execute();
    }
}

// Update the last section ID in user_part_status
$sql_upsert_part = "INSERT INTO user_part_status (user_email, part_id, last_section_id) VALUES (?, ?, ?)
                    ON DUPLICATE KEY UPDATE last_section_id = VALUES(last_section_id)";
$stmt_upsert = $pdo->prepare($sql_upsert_part);
$stmt_upsert->bindValue(1, $email, PDO::PARAM_STR);
$stmt_upsert->bindValue(2, $part_id, PDO::PARAM_INT);
$stmt_upsert->bindValue(3, $section_id, PDO::PARAM_INT);
$stmt_upsert->execute();

echo json_encode(["status" => "success"]);
?>
