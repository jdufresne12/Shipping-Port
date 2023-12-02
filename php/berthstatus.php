<?php
//John Dufresne
//Grab and return Berth details
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just exit with 200 OK if the request method is OPTIONS
    http_response_code(200);
    exit;
}

// Database connection parameters
$hostname = "104.236.195.67";
$username = "root";
$password = "COP4710_group8_shippingport";
$database = "Shipping_Port";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
    try{
        $stmt = $conn->prepare("SELECT * FROM Berths");
        $stmt->execute();
        $result = $stmt->get_result();

        // Initialize an array to hold all rows
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row; // Add each row to the array
        }
        header('Content-Type: application/json');
        // Encode the array of rows as JSON
        echo json_encode($rows);
        
        $stmt->close();
        $conn->close();
    }catch (Exception $e){
        header('Content-Type: application/json');
        http_response_code(404); // Set HTTP status code to 404
        echo json_encode(["error" => "Error finding Berths Details"]);
    }
}
?>