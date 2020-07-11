const btnOff = document.querySelector('.scroll-off'),
	btnOn = document.querySelector('.scroll-on'),
	body = document.body;

let disableScroll = function () {
	let pagePosition = window.scrollY;
	document.body.classList.add('disable-scroll');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

let enableScroll = function () {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = 'auto';
	document.body.classList.remove('disable-scroll');
	window.scroll({ top: pagePosition, left: 0 });
	document.body.removeAttribute('data-position');
}

btnOff.addEventListener('click', (e) => {
	disableScroll();
	e.currentTarget.style.pointerEvents = 'none';
	btnOn.style.pointerEvents = 'auto';
});

btnOn.addEventListener('click', (e) => {
	enableScroll();
	e.currentTarget.style.pointerEvents = 'none';
	btnOff.style.pointerEvents = 'auto';
});
