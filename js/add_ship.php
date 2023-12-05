<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ship-name'])) {
    $shipName = $_POST['ship-name'];
    
    $hostname = "104.236.195.67";
    $username = "root";
    $password = "COP4710_group8_shippingport";
    $database = "Shipping_Port";
    // Perform your database query to add the record
    // Replace this with your actual database connection and query
    $stmt = $conn->prepare("INSERT INTO Ships (ship_name) VALUES (?)");
    $stmt->bind_param("s", $shipName);
    $stmt->execute();
    $stmt->close();
    
    // Send the response to the client
    header('Content-Type: application/json');
    echo json_encode(array('success' => true));
}
?>