<?php

if (empty($_POST['name']) or empty($_POST['phone']) or empty($_POST['street'])) exit('Заполните все данные');

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $street = $_POST['street'];
    $home = $_POST['home'];
    $shape = $_POST['shape'];
    $flat = $_POST['flat'];
    $floor = $_POST['floor'];
    $comment = $_POST['comment'];
    $pay = $_POST['radio'];

    $disturb = $_POST['checkbox']; // 1 или null 
    $disturb = isset($disturb) ? 'НЕТ' : 'ДА'; 

    $mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: ' . $name . '</li>
                <li>Телефон: ' . $phone . '</li>
                <li>Улица: ' . $street . '</li>
                <li>Дом: ' . $home . '</li>
                <li>Корпус: ' . $shape . '</li>
                <li>Квартира: ' . $flat . '</li>
                <li>Этаж: ' . $floor . '</li>
                <li>Комментарии к заказу: ' . $comment . '</li>
                <li>Способ оплаты: ' . $pay . '</li>
                <li>Нужно ли перезванивать клиенту: ' . $disturb . '</li>
            </ul>
        </body>
    </html>    
    ';

    $headers = "From: Администратор сайта <admin@burgers.com>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('elarkov@inbox.ru', 'Заказ', $mail_message, $headers);

?>