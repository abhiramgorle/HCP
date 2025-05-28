<?php
include 'connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
try {
    // SQL query to calculate the average time difference in seconds
    // between 'completed_at' and 'started_at' for each section_id.
    // It only considers entries where 'is_completed' is true (or 1)
    // and 'completed_at' is not NULL.
    $sql = "SELECT 
                section_id, 
                AVG(TIMESTAMPDIFF(SECOND, started_at, completed_at)) as average_time_seconds
            FROM 
                user_progress
            WHERE 
                is_completed = 1 AND completed_at IS NOT NULL
            GROUP BY 
                section_id
            ORDER BY 
                section_id ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ensure average_time_seconds is a number (float) for the chart
    $formattedResults = array_map(function($row) {
        return [
            'section_id' => $row['section_id'], // section_id is likely an INT, JSON will handle it.
            'average_time_seconds' => round((float)$row['average_time_seconds'], 2) // Cast to float and round
        ];
    }, $results);

    http_response_code(200); // OK
    echo json_encode($formattedResults);

} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    error_log("API PDOException in get_section_average_time.php: " . $e->getMessage());
    echo json_encode(["error" => "An error occurred while fetching section statistics: " . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    error_log("API Exception in get_section_average_time.php: " . $e->getMessage());
    echo json_encode(["error" => "An unexpected error occurred: " . $e->getMessage()]);
}


?>





<?php
// --- Database Connection (IMPORTANT) ---
// Ensure $pdo is initialized here, similar to your login.php/register.php
// Example: require __DIR__ . '/../config/database.php'; // Adjust path
//
// If not, uncomment and configure this block:
/*
$host = 'your_db_host';
$db   = 'your_database_name';
$user = 'your_db_username';
$pass = 'your_db_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     http_response_code(500);
     error_log("Database Connection Error: " . $e->getMessage());
     echo json_encode(["error" => "Database connection failed."]);
     exit;
}
*/

if (!isset($pdo)) {
    http_response_code(500);
    error_log("PDO object not available in get_section_average_time.php. Ensure database connection is set up.");
    echo json_encode(["error" => "Server configuration error regarding database connection."]);
    exit;
}

// --- Headers ---
header("Access-Control-Allow-Origin: *"); // Restrict in production
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- API Logic ---
try {
    // SQL query to calculate the average time difference in seconds
    // between 'completed_at' and 'started_at' for each section_id.
    // It only considers entries where 'is_completed' is true (or 1)
    // and 'completed_at' is not NULL.
    $sql = "SELECT 
                section_id, 
                AVG(TIMESTAMPDIFF(SECOND, started_at, completed_at)) as average_time_seconds
            FROM 
                user_progress
            WHERE 
                is_completed = 1 AND completed_at IS NOT NULL
            GROUP BY 
                section_id
            ORDER BY 
                section_id ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ensure average_time_seconds is a number (float) for the chart
    $formattedResults = array_map(function($row) {
        return [
            'section_id' => $row['section_id'], // section_id is likely an INT, JSON will handle it.
            'average_time_seconds' => round((float)$row['average_time_seconds'], 2) // Cast to float and round
        ];
    }, $results);

    http_response_code(200); // OK
    echo json_encode($formattedResults);

} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    error_log("API PDOException in get_section_average_time.php: " . $e->getMessage());
    echo json_encode(["error" => "An error occurred while fetching section statistics: " . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    error_log("API Exception in get_section_average_time.php: " . $e->getMessage());
    echo json_encode(["error" => "An unexpected error occurred: " . $e->getMessage()]);
}
?>
