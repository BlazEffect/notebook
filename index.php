<?php

$DB = new mysqli("localhost", "root", "", "notepad");

if($DB->connect_error){
    print_r("Подключение невозможно: ".$DB->connect_error);
}

$notes = [];
$result = $DB->query("SELECT * FROM `notes`");

while($row = $result->fetch_assoc()){
    $notes[] = $row;
}

?>

<!doctype html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Блокнот</title>

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link rel="stylesheet" href="css/main.min.css">
        <link rel="stylesheet" href="libs/css/font-awesome.min.css">

    </head>

    <body>
        <main class="main">
            <div class="main__heading heading">
                <div class="container">
                    <h1 class="heading__text">Блокнот</h1>
                </div>
            </div>

            <div class="main__notepad-add-button notepad-add-button">
                <div class="container">
                    <a class="button green-button add">Добавить запись</a>
                </div>
            </div>

            <div class="main__notepad-add-popup notepad-popup--close">

                <div class="form-add">
                    <span class="notepad-add-popup__close-button notepad__close-button"></span>

                    <form class="form" method="post">
                        <label>Введите текст заметки</label>
                        <textarea class="form-text" placeholder="Текст заметки"></textarea>
                        <a class="button green-button add">Добавить запись</a>
                    </form>
                </div>
            </div>

            <div class="main__notepad-edit-popup notepad-popup--close">
                <div class="form-edit">
                    <span class="notepad-edit-popup__close-button notepad__close-button"></span>

                    <form class="form" method="post">
                        <label>Введите текст заметки</label>
                        <textarea class="form-text" placeholder="Текст заметки"></textarea>
                        <a class="button green-button edit">Редактировать запись</a>
                    </form>
                </div>
            </div>

            <div class="main__notepad-notes notepad-notes">
                <div class="container">
                    <?foreach($notes as $note):?>
                        <div class="note" id="<?=$note["id"]?>">
                            <div class="note-text">
                                <p class="text"><?=$note["text"]?></p>
                            </div>

                            <div class="note-button-edit">
                                <a class="button blue-button edit"><i class="fa fa-edit"></i></a>
                            </div>
                            <div class="note-button-remove">
                                <a class="button red-button delete"><i class="fa fa-remove"></i></a>
                            </div>
                        </div>
                    <?endforeach;?>
                </div>
            </div>
        </main>

        <script src="js/script.min.js"></script>
    </body>
</html>