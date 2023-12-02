<?php
//John Dufresne
//Grab and return ship details given ship Id
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just exit with 200 OK if the request method is OPTIONS
    http_response_code(200);
    exit;
}

$inData = getRequestInfo();

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
        $shipId = $inData['shipId'];
        $stmt = $conn->prepare("SELECT * FROM Ships WHERE ship_id = ?");
        $stmt->bind_param("i", $shipId);

        $stmt->execute();

        // Get the result of the query
        $result = $stmt->get_result();

        // Fetch the data
        if ($row = $result->fetch_assoc()) {
            // Now $row contains the ship's information as an associative array
            header('Content-Type: application/json'); // Specify the content type as JSON
            echo json_encode($row); // Echo the data as a JSON object
        } else {
            echo "No ship found with ID $shipId";
        }

        $stmt->close();
        $conn->close();
    }catch (Exception $e){
        header('Content-Type: application/json');
        http_response_code(404); // Set HTTP status code to 404
        echo json_encode(["error" => "No ship found with ID $shipId"]);
    }
}
function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}
?>