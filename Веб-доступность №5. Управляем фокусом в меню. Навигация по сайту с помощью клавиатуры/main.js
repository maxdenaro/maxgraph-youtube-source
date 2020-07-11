const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const close = document.querySelector('.close');
const body = document.body;

burger.addEventListener('click', showMenu);
close.addEventListener('click', hideMenu);

let keys = {
	ESC: 27,
};

menu.inert = true;

let previousActiveElement;

function showMenu() {
	menu.classList.add('menu-active');
	previousActiveElement = document.activeElement;

	Array.from(body.children).forEach((child) => {
		if (child !== menu) {
			child.inert = true;
		}
	});

	menu.inert = false;

	setTimeout(() => {
		close.focus();
	}, 100);

	document.addEventListener('keydown', (e) => {
		console.log(e.keyCode);

		if (e.keyCode == keys.ESC) {
			hideMenu();
		}
	});
}

function hideMenu() {
	menu.classList.remove('menu-active');

	Array.from(body.children).forEach((child) => {
		if (child !== menu) {
			child.inert = false;
		}
	});

	menu.inert = true;

	setTimeout(() => {
		previousActiveElement.focus();
	}, 100);
}



