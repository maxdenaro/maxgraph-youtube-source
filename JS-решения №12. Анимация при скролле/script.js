document.addEventListener('DOMContentLoaded', () => {
	const hero = document.querySelector('.hero');
	const header = document.querySelector('.header');
	const scrollItems = document.querySelectorAll('.scroll-item');

	const scrollAnimation = () => {
		let windowCenter = (window.innerHeight / 2) + window.scrollY;
		// console.log(windowCenter)
		scrollItems.forEach(el => {
			let scrollOffset = el.offsetTop + (el.offsetHeight / 2);
			console.log(scrollOffset)
			if (windowCenter >= scrollOffset) {
				el.classList.add('animation-class');
			} else {
				el.classList.remove('animation-class');
			}
		});
	};

	const headerFixed = () => {
		let scrollTop = window.scrollY;
		let heroCenter = hero.offsetHeight / 2;

		if (scrollTop >= heroCenter) {
			header.classList.add('fixed')
			hero.style.marginTop = `${header.offsetHeight}px`;
		} else {
			header.classList.remove('fixed')
			hero.style.marginTop = `0px`;
		}
	};

	headerFixed();
	scrollAnimation();
	window.addEventListener('scroll', () => {
		headerFixed();
		scrollAnimation();
	});
});