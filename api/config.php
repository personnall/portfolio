<?php
// MianOS Database Configuration
// WARNING: Do not commit this file to public repositories if you change credentials.

$host = 'sql301.byethost16.com';
$name = 'b16_39853711_MianOS';
$user = 'b16_39853711';
$pass = '096m7ryk';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    die(json_encode(["error" => "Critical System Failure: Unable to connect to database."]));
}
?>
