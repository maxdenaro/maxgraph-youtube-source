document.addEventListener('DOMContentLoaded', () => {
	const hero = document.querySelector('.hero');
	const header = document.querySelector('.header');
	const scrollItems = document.querySelectorAll('.scroll-item');
	const circle = document.querySelector('.progress');
	const line = document.querySelector('.progress-line__item');

	const scrollAnimation = () => {
		let windowCenter = (window.innerHeight / 2) + window.scrollY;
		console.log(windowCenter)
		scrollItems.forEach(el => {
			let scrollOffset = el.offsetTop + (el.offsetHeight / 2);
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

	const progressAnimation = () => {
		let scrollTop = window.scrollY;
		let windowHeight = window.innerHeight;
		let siteHeight = document.documentElement.scrollHeight;
		let percentageProgress = Math.floor(scrollTop / (siteHeight - windowHeight) * 100);
		line.style.width = `${percentageProgress}%`;

		let radius = circle.getAttribute('r');
		let circleLength = 2 * Math.PI * radius;
		circle.setAttribute('stroke-dasharray', circleLength);
		circle.setAttribute('stroke-dashoffset', circleLength - circleLength * percentageProgress / 100);
	};

	headerFixed();
	scrollAnimation();
	progressAnimation();
	window.addEventListener('scroll', () => {
		headerFixed();
		scrollAnimation();
		progressAnimation();
	});
});