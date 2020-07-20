const openBtn = document.querySelector('.open-btn');
const modal = document.querySelector('.modals');
const closeBtn = document.querySelector('.modal__btn');
const mobileClose = document.querySelector('.mobile-close');


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

openBtn.addEventListener('click', () => {
	openModalDesktop();
	openModalMobile();
});

modal.addEventListener('click', (e) => {
	if (e.target == modal) {
		closeModal();
	}
});

closeBtn.addEventListener('click', () => {
	closeModal();
});

const openModalDesktop = () => {
	modal.classList.add('is-open');
	disableScroll();
}

const closeModal = () => {
	modal.classList.remove('is-open');
	disableScroll();
}

const openModalMobile = () => {
	modal.classList.add('is-open');
	disableScroll();
	setTimeout(() => {
		modal.querySelector('.modal').classList.add('visible');
	}, 300);
}

const closeModalMobile = () => {
	modal.querySelector('.modal').classList.remove('visible');
	setTimeout(() => {
		modal.classList.remove('is-open');
		enableScroll();
	}, 400);
}

mobileClose.addEventListener('swiped-down', function (e) {
	closeModalMobile();
});

mobileClose.addEventListener('click', function (e) {
	closeModalMobile();
});