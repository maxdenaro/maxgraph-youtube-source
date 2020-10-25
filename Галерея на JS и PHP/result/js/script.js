const form = document.querySelector('.form'),
			gallery = document.querySelector('.gallery'),
			fileInput = form.querySelector('.file__input'),
			formBtn = form.querySelector('.btn');



gallery.addEventListener('click', (e) => {
	if (e.target.classList.contains('gallery__btn')) {
		let self = e.target;
		let image = self.closest('.gallery__item').querySelector('img').getAttribute('src');
		let deletedString = '/uploads/';
		let deletedStringLength = deletedString.length;
		let resultImage = image.substr(deletedStringLength);
		
		fetch(`${location.origin}/helpers/deleteImages.php`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded'
			},
			body: `deleteImage=${resultImage}`
		})
		.then(function(response){
			return response.text()
		})
		.then(function(body){
			self.closest('.gallery__item').remove();

			if (gallery.querySelectorAll('.gallery__item').length == 0) {
				gallery.innerHTML = `<div class="no-photo">Нет фото</div>`;
			}
		});
	}
});


fileInput.addEventListener('change', (e) => {
	let files = e.currentTarget.files;

	if (files) {
		formBtn.removeAttribute('disabled');
		fileInput.closest('.file').querySelector('.file__text').textContent = '';
		fileInput.closest('.file').querySelector('.file__name').textContent = files[0].name;
	}
});


form.addEventListener('submit', (e) => {
	e.preventDefault();

	let file = form.querySelector('.file__input').files[0];

	let type = file.type;
	let size = file.size;

	if (size <= 5000000 && (type == 'image/jpg' || type == 'image/png' || type == 'image/jpeg')) {
		let formData = new FormData(form);
		formData.append('file', file);

		fetch(`${location.origin}/helpers/addImages.php`, {
			method: 'POST',
			body: formData
		})
		.then(function(response){
			return response.text()
		})
		.then(function(body){

			let fileHtml = `
				<li class="gallery__item">
					<img src="/uploads/${file.name}" alt="image" class="gallery__image">
					<button class="gallery__btn btn">
						Удалить
					</button>
				</li>
			`;

			document.querySelector('.no-photo').remove();

			gallery.insertAdjacentHTML('afterbegin', fileHtml);


			formBtn.setAttribute('disabled', true);
			fileInput.closest('.file').querySelector('.file__text').textContent = 'Выберите файл в формате jpg или png';
			fileInput.closest('.file').querySelector('.file__name').textContent = '';
		});
	} else {
		alert('Файл не соответствует размеру или типу');
	}
});
