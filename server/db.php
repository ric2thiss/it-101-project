<?php
    function db() {
        $host = 'localhost';
        $dbname = 'mydatabase'; 
        $username = 'root';
        $password = ''; 
    
        try {
            $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            exit; 
        }
    }
?>