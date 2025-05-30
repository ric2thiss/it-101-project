<?php
require('db.php');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($data === null) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data."]);
        exit;
    }

    $username = trim($data["username"] ?? '');
    $password = trim($data["password"] ?? '');

    if (empty($username) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Username and password are required."]);
        exit;
    }

    $user = getUserByUsername($username);

    if (!$user) {
        echo json_encode(["status" => "error", "message" => "Username is not registered."]);
        exit;
    }

    if (!password_verify($password, $user["Password"])) {
        echo json_encode(["status" => "error", "message" => "The password is wrong."]);
        exit;
    }

    // Login successful
    echo json_encode([
        "status" => "success",
        "message" => "Login successful!",
        "user" => [
            "idnumber" => $user["id_Number"],
            "firstname" => $user["First_Name"],
            "lastname" => $user["Last_Name"],
            "email" => $user["Email"],
            "username" => $user["Username"]
        ]
    ]);
}

function getUserByUsername($username) {
    try {
        $conn = db();
        $stmt = $conn->prepare("SELECT * FROM users WHERE Username = :username LIMIT 1");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}
?>
