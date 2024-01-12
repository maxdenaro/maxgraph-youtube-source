const slider = document.querySelector('.swiper');

const swiper = new Swiper(slider, {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 31,
	watchSlidesProgress: true,
});