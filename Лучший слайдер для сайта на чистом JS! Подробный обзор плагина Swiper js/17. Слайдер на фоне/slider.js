const slider = document.querySelector('.swiper-container');

let mySwiper = new Swiper(slider, {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	// effect: 'fade',
	autoplay: {
		delay: 2000,
	},
})