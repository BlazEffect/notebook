<?php

$DB = new mysqli("localhost", "root", "", "notepad");

if($DB->connect_error){
    print_r("Подключение невозможно: ".$DB->connect_error);
}

$id = htmlspecialchars($_POST["id"]);

$sql = "DELETE FROM `notes` WHERE `id`=".$id;
if($DB->query($sql)){
    print_r("Данные успешно удалены");
}else{
    print_r("Ошибка: " . $DB->error);
}