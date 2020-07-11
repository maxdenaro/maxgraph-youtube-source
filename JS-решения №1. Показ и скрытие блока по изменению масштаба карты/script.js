function init() {
	let arr = [];

	let myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 7
	});

	function markers() {

		myMap.setCenter([55.76, 37.64], 7, {
			checkZoomRange: true
		});

		myMap.geoObjects.removeAll()

		arr = [];
		let i = 0;

		document.querySelectorAll('.btn').forEach((el) => {
			let coords = el.getAttribute('data-coords');

			let id = el.getAttribute('data-id');

			let coordsArr = coords.split(',');

			let result = coordsArr.map(function (x) {
				return Number(x);
			});

			arr.push('placemark' + i);
			i++;

			arr[i] = new ymaps.Placemark(result, {
				'id': id,
				// Зададим содержимое заголовка балуна.
				balloonContentHeader: '<a href = "#">Рога и копыта</a><br>' +
					'<span class="description">Сеть кинотеатров</span>',
				// Зададим содержимое основной части балуна.
				balloonContentBody: '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/>' +
					'<b>Ближайшие сеансы</b> <br/> Сеансов нет.',
				// Зададим содержимое нижней части балуна.
				balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
				// Зададим содержимое всплывающей подсказки.
				hintContent: 'Рога и копыта'
			});

			myMap.geoObjects.add(arr[i]);

			delete arr[0];
		});
	}

	markers();

	myMap.events.add('boundschange', function () {
		let res = ymaps.geoQuery(myMap.geoObjects)

		let visibleObjects = res.searchInside(myMap).addToMap(myMap);

		let visibleArray = visibleObjects._objects;

		let $item = document.querySelectorAll('.btn');

		$item.forEach((el) => {
			el.closest('li').style.display = 'none';
		});

		for (let i = 0; i < visibleArray.length; i++) {
			let id = visibleArray[i].properties._data.id;

			document.querySelectorAll(`.btn[data-id="${id}"]`).forEach((el) => {
				el.closest('li').style.display = 'block';
			});
		}

		if (!visibleArray.length) {

		}
	});
}

ymaps.ready(init);