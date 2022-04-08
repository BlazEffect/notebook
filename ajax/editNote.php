<?php

$DB = new mysqli("localhost", "root", "1234", "notepad");

if($DB->connect_error){
    print_r("Подключение невозможно: ".$DB->connect_error);
}

$id = htmlspecialchars($_POST["id"]);
$text = htmlspecialchars($_POST["text"]);

echo "<pre>";
print_r($_POST);
echo "</pre>";

$sql = "UPDATE `notes` SET text = '".$text."' WHERE id = ".$id;
if($DB->query($sql)){
    print_r("Данные успешно добавлены");
}else{
    print_r("Ошибка: " . $DB->error);
}