<?php

$DB = new mysqli("localhost", "root", "1234", "notepad");

if($DB->connect_error){
    print_r("Подключение невозможно: ".$DB->connect_error);
}

$text = htmlspecialchars($_POST["text"]);

$sql = "INSERT INTO `notes` (text) VALUES ('".$text."')";
if($DB->query($sql)){
    print_r("Данные успешно добавлены");
}else{
    print_r("Ошибка: " . $DB->error);
}