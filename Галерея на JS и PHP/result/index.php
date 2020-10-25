<?php 
	include $_SERVER['DOCUMENT_ROOT'] . '/templates/header.php';
?>
	<main class="main">
		<div class="section content">
			<div class="container content__container">
				<form action="#" method="POST" class="form content__form">
					<label class="file">
						<span class="file__text">Выберите файл в формате jpg или png</span>
						<span class="file__name"></span>
						<input class="file__input" type="file" name="file" accept="image/jpeg,image/png">
					</label>
					<button class="btn" name="upload" disabled>Загрузить</button>
				</form>
				<ul class="gallery">

					<?php 
					
						$dir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
						$filesData = scandir($dir);
						printImages($filesData);
					
					?>
				</ul>
			</div>
		</div>
	</main>
<?php 
	include $_SERVER['DOCUMENT_ROOT'] . '/templates/footer.php';
?>