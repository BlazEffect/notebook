<?php

$DB = new mysqli("localhost", "root", "1234", "notepad");

if($DB->connect_error){
    print_r(json_encode(array("error", $DB->connect_error)));
    return;
}

$id = htmlspecialchars($_POST["id"]);

$sql = "DELETE FROM `notes` WHERE `id`=".$id;
if($DB->query($sql)){
    print_r("Данные успешно удалены");
}else{
    print_r(json_encode(array("error", $DB->error)));
}