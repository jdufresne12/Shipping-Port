<?php
//John Dufresne
//Companys register their containers that will be in the Shipping port
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

// Create connection
$conn = new mysqli($hostname, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
    //Necessary Field names, which is all
    $neededFieldNames = ["shipName", "captainName"];
    echo json_encode($inData);
    foreach($neededFieldNames as $fieldName){
        //If we dont have all field names, throw an error and specify missing names
        if(!isset($inData[$fieldName]))
        {
            http_response_code(400);
            $data = [];
            $data["error"] = "Body is missing $fieldName";
            echo json_encode($data);
            return;
        }

        //variables to hold data being sent in through request
        $shipName = $inData['shipName'];
        $captainName = $inData['captainName'];
        $shipAction = "arrival";
    }
    try{
        //Prepare SQL statements (prevents SQL Injection)
        $stmt = $conn->prepare("INSERT INTO Ships(ship_name, captain_name, ship_action) VALUES(?,?,?)");

        //Insert Data SQL statements
        $stmt->bind_param("sss", $shipName, $captainName, $shipAction);
        //execute request and close
        $stmt->execute();

        http_response_code(200);
        echo json_encode(["message" => "Container created successfully"]);
        $stmt->close();
    } catch (Exception $e){
        // Error handling
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage(), "sql_error" => $conn->error]);
    }
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}
?>