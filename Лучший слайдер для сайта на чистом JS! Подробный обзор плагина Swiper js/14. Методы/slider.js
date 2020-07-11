// update, destroy, slideTo

const slider = document.querySelector('.swiper-container');

let mySwiper = new Swiper(slider, {
	slidesPerView: 3,
	spaceBetween: 10,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

document.querySelector('.slide-to').addEventListener('click', () => {
	mySwiper.slideTo(2);
});

document.querySelector('.destroy').addEventListener('click', () => {
	mySwiper.destroy();
});

document.querySelector('.hide').addEventListener('click', () => {
	slider.style.display = 'none';
});

document.querySelector('.update').addEventListener('click', () => {
	slider.style.display = 'block';
	setTimeout(() => {
		mySwiper.update();
	}, 300);
});

mySwiper.on('transitionEnd', function () {
	console.log('Текущий индекс:', mySwiper.realIndex);
});