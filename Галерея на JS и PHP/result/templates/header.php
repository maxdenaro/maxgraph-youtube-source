<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Галерея</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<?php 
	
		include $_SERVER['DOCUMENT_ROOT'] . '/helpers/addImages.php';
		include $_SERVER['DOCUMENT_ROOT'] . '/helpers/deleteImages.php';

		include $_SERVER['DOCUMENT_ROOT'] . '/helpers/printImages.php';
	
	?>
	<header class="header">
		<div class="container header__container">
			<a href="/" class="logo">Галерея</a>
		</div>
	</header>