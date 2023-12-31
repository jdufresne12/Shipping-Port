<?php
header('Access-Control-Allow-Origin: *'); // This is very permissive, so be careful in a production environment
//ini_set('display_errors', 1); //used to find errors
//error_reporting(E_ALL);       //used to find errors

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
echo "Connected successfully";

// SQL query
$query = "SELECT * FROM Ships"; //Testing ships

// Execute query
$result = $conn->query($query);

if ($result) {
    echo "<ul>"; //opening html list tag

    // Fetch result, going through each returned entry and displaying it
    while($row = $result->fetch_assoc()) {
        echo "<li>Ship ID: " . $row["ship_id"] .
            " Ship Name: " . $row["ship_name"]. 
            " Captain: " . $row["captain_name"].
            " Action: " . $row["ship_action"]."</li>";
    }
    echo "</ul>"; //closing hmtl list tag
} else {
    echo "Error: " . $query . "<br>" . $conn->error; //if theres an error, skip a line and show error
}

// Close connection
$conn->close();
?>