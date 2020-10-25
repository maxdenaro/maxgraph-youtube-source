<?php

/**
 * Функция добавляет элементы на страницу с помощью параметра
 * @param array $files массив файлов
 */
function printImages($files) {
	$files = array_filter($files, function($file){
		return !in_array($file, ['.', '..']);
	});
	if (count($files)) {
		foreach($files as $file) {
			?>

				<li class="gallery__item">
					<img src="/uploads/<?= $file ?>" alt="image" class="gallery__image">
					<button class="gallery__btn btn">
						Удалить
					</button>
				</li>

			<?php
		}
	} else {
		echo '<div class="no-photo">Нет фото</div>';
	}
}