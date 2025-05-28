<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
$sql = "SELECT DATE(created_at) as date, COUNT(*) as count 
            FROM users 
            GROUP BY DATE(created_at) 
            ORDER BY date ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

// Fetch all results. Each row will be an associative array, e.g., ['date' => '2023-01-15', 'count' => 5]
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// The React component expects the count to be a number.
// PDO might return string representations of numbers depending on the driver/configuration.
// Explicitly cast 'count' to an integer.
$formattedResultsNewUsers = array_map(function($row) {
    return [
        'date' => $row['date'],
        'count' => (int)$row['count']
    ];
}, $results);

// SQL to get the count of users who completed part 2
$sql_completed_part2 = "SELECT COUNT(DISTINCT user_email) as completed_part2_count
                        FROM user_part_status
                        WHERE part_id = 2 AND is_completed = 1";

$stmt_completed_part2 = $pdo->prepare($sql_completed_part2);
$stmt_completed_part2->execute();
$result_completed_part2 = $stmt_completed_part2->fetch(PDO::FETCH_ASSOC);
$completed_part2_count = (int)$result_completed_part2['completed_part2_count'];

// SQL to get the count of users who started/completed part 1 but didn't finish part 2 yet
$sql_started_part1_not_part2 = "SELECT COUNT(DISTINCT ups1.user_email) AS started_part1_not_part2_count
                                FROM user_part_status ups1
                                WHERE ups1.part_id = 1
                                AND ups1.user_email NOT IN (SELECT user_email FROM user_part_status WHERE part_id = 2 AND is_completed = 1)";

$stmt_started_part1_not_part2 = $pdo->prepare($sql_started_part1_not_part2);
$stmt_started_part1_not_part2->execute();
$result_started_part1_not_part2 = $stmt_started_part1_not_part2->fetch(PDO::FETCH_ASSOC);
$started_part1_not_part2_count = (int)$result_started_part1_not_part2['started_part1_not_part2_count'];

// Combine all results into a single array
$response = [
    'new_users' => $formattedResultsNewUsers,
    'completed_part2_count' => $completed_part2_count,
    'started_part1_not_part2_count' => $started_part1_not_part2_count
];

// Send the JSON response
http_response_code(200); // OK
echo json_encode($response);


?>
