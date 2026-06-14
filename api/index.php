<?php
require_once 'config.php';

$action = $_GET['action'] ?? '';
$module = $_GET['module'] ?? '';

// Whitelist of allowed modules for security
$allowed_modules = ['profiles', 'projects', 'skills', 'experience', 'education', 'certificates', 'activities', 'social_links', 'settings'];

function validateModule($mod, $list) {
    if (!in_array($mod, $list)) {
        http_response_code(400);
        die(json_encode(["error" => "Invalid module access"]));
    }
}

// Simple Auth Check for write operations
function checkAuth($pdo) {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (!$token) {
        http_response_code(401);
        die(json_encode(["error" => "Unauthorized"]));
    }
    $stmt = $pdo->prepare("SELECT value FROM settings WHERE `key` = 'Admin.Pass'");
    $stmt->execute();
    $pass = $stmt->fetchColumn();
    if ($token !== "Bearer " . $pass) {
        http_response_code(401);
        die(json_encode(["error" => "Invalid session"]));
    }
}

switch ($action) {
    case 'login':
        $data = json_decode(file_get_contents('php://input'), true);
        $password = $data['password'] ?? '';
        $stmt = $pdo->prepare("SELECT value FROM settings WHERE `key` = 'Admin.Pass'");
        $stmt->execute();
        $correct = $stmt->fetchColumn();
        if ($password === $correct) {
            echo json_encode(["token" => $password]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Invalid access key"]);
        }
        break;

    case 'get':
        validateModule($module, $allowed_modules);

        $order = "id ASC";
        if ($module === 'activities') $order = "activity_date DESC";
        elseif (in_array($module, ['projects', 'skills', 'experience', 'education', 'certificates', 'social_links'])) {
            $order = "order_index ASC";
        }

        $stmt = $pdo->prepare("SELECT * FROM `$module` ORDER BY $order");
        if ($module === 'profiles') $stmt = $pdo->prepare("SELECT * FROM profiles LIMIT 1");
        elseif ($module === 'settings') $stmt = $pdo->prepare("SELECT * FROM settings");

        $stmt->execute();
        echo json_encode($module === 'profiles' ? $stmt->fetch() : $stmt->fetchAll());
        break;

    case 'save':
        checkAuth($pdo);
        validateModule($module, $allowed_modules);

        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;
        unset($data['id']);

        if ($id) {
            $cols = [];
            foreach ($data as $key => $val) $cols[] = "`$key` = ?";
            $stmt = $pdo->prepare("UPDATE `$module` SET " . implode(', ', $cols) . " WHERE id = ?");
            $stmt->execute(array_merge(array_values($data), [$id]));
        } else {
            $cols = implode('`, `', array_keys($data));
            $placeholders = implode(', ', array_fill(0, count($data), '?'));
            $stmt = $pdo->prepare("INSERT INTO `$module` (`$cols`) VALUES ($placeholders)");
            $stmt->execute(array_values($data));
        }
        echo json_encode(["success" => true]);
        break;

    case 'delete':
        checkAuth($pdo);
        validateModule($module, $allowed_modules);
        $id = $_GET['id'] ?? '';
        $stmt = $pdo->prepare("DELETE FROM `$module` WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
        break;

    default:
        echo json_encode(["status" => "MianOS API Active"]);
}
?>
