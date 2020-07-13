<?php

require_once 'vendor/autoload.php';

$document = new \PhpOffice\PhpWord\TemplateProcessor('./review.docx');

$uploadDir =  __DIR__;
$outputFile = 'review_full.docx';

$uploadFile = $uploadDir . '\\' . basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile);

$birthdate = $_POST['birth'];
$name = $_POST['name'];
$tel = $_POST['tel'];
$city = $_POST['city'];
$purpose = $_POST['purpose'];
$startYear = $_POST['startYear'];
$lastYear = $_POST['lastYear'];
$university = $_POST['university'];
$file = $_POST['file'];
$about = $_POST['about'];

$document->setValue('name', $name);
$document->setValue('birthdate', $birth);
$document->setValue('tel', $tel);
$document->setValue('city', $city);
$document->setValue('purpose', $purpose);
$document->setValue('startYear', $startYear);
$document->setValue('lastYear', $lastYear);
$document->setValue('university', $university);
$document->setValue('about', $about);
$document->setImageValue('image', array('path' => $uploadFile, 'width' => 120, 'height' => 120, 'ratio' => false));

$document->saveAs($outputFile);


// Имя скачиваемого файла
$downloadFile = $outputFile;

// Контент-тип означающий скачивание
header("Content-Type: application/octet-stream");

// Размер в байтах
header("Accept-Ranges: bytes");

// Размер файла
header("Content-Length: ".filesize($downloadFile));

// Расположение скачиваемого файла
header("Content-Disposition: attachment; filename=".$downloadFile);  

// Прочитать файл
readfile($downloadFile);


unlink($uploadFile);
unlink($outputFile);
