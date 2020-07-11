const fileInput = document.querySelector('.custom-file input');

function declOfNum(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}


fileInput.addEventListener('change', (e) => {
	console.log(e.currentTarget.files)
	let filesLength = e.currentTarget.files.length;

	if (filesLength) {
		e.currentTarget.closest('.custom-file').querySelector('span').textContent = `${filesLength} ${declOfNum(filesLength, ['файл', 'файла', 'файлов'])}`
	}
});