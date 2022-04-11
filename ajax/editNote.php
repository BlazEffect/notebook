<?php

$DB = new mysqli("localhost", "root", "", "notepad");

if($DB->connect_error){
    print_r("Подключение невозможно: ".$DB->connect_error);
}

$id = htmlspecialchars($_POST["id"]);
$text = htmlspecialchars($_POST["text"]);

$sql = "UPDATE `notes` SET text = '".$text."' WHERE id = ".$id;
if($DB->query($sql)){
    print_r("Данные успешно реадктированы");
}else{
    print_r("Ошибка: " . $DB->error);
}