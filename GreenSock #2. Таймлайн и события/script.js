let tl = gsap.timeline({ paused: true });
const items = document.querySelectorAll('.accordion__item');

items.forEach(el => {
	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let bottomEl = el.querySelector('.accordion__bottom');

		if (!self.classList.contains('active')) {
			self.classList.add('active');
			console.log(bottomEl)
			tl
				.to(bottomEl, {
					duration: 0.7,
					height: bottomEl.scrollHeight,
				});

			tl.play();
		} else {
			self.classList.remove('active');
			tl.reverse();
		}

		
	});

	
});
















// let btn = document.querySelector('.hero-btn');

// gsap.from('.site', {opacity: 0, duration: 0.5});

// tl.from('.header', {opacity: 0, duration: 0.5})
// 	.from('.hero-title', {opacity: 0, y: 100, duration: 0.7})
// 	.from('.hero-descr', {opacity: 0, y: 50, duration: 0.7}, "-=0.7")
// 	.from('.hero-btn', {opacity: 0, y: 100, duration: 0.7}, "-=0.7");

// btn.onclick = function() {
//   tl.reverse();
// }