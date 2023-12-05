<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ship-name'])) {
    $shipName = $_POST['ship-name'];
    
    $hostname = "104.236.195.67";
    $username = "root";
    $password = "COP4710_group8_shippingport";
    $database = "Shipping_Port";
    
    $conn = new mysqli($hostname, $username, $password, $database);
    $stmt = $conn->prepare("SELECT COUNT(*) FROM Ships WHERE ship_name = ?");
    $stmt->bind_param("s", $shipName);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();
    
    // Send the response to the client
    header('Content-Type: application/json');
    echo json_encode(array('exists' => $count > 0));
}
?>