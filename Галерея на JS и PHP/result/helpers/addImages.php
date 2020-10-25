<?php

$uploadPath = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';

$tmpName = $_FILES['file']['tmp_name'];
$name = $_FILES['file']['name'];

move_uploaded_file($tmpName, $uploadPath . $name);