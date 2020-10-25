<?php

$image = $_POST['deleteImage'];

if (isset($image)) {
	$uploadPath = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
	unlink($uploadPath . $image);
}