<?php

$DB = new mysqli("localhost", "root", "1234", "notepad");

if($DB->connect_error){
    print_r(json_encode(array("error", $DB->connect_error)));
    return;
}

$text = htmlspecialchars($_POST["text"]);

$sql = "INSERT INTO `notes` (text) VALUES ('".$text."')";
if($DB->query($sql)){
    print_r($DB->insert_id);
}else{
    print_r(json_encode(array("error", $DB->error)));
}