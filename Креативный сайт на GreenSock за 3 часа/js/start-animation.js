const startAnimation = () => {
  console.log('start');

  const currentSlide = document.querySelector('.slide-bg__inner--current');
  const currentShape = document.querySelector('.shapes__item--current');
  const currentText = document.querySelector('.slides-container__slide--active');

  startingTl.to('.header', 0.5, {
    opacity: 1,
    y: 0,
    delay: 0.5
  })
  .to('.main-section__explore', 0.5, {
    opacity: 1,
    y: 0,
  }, '-=0.5')
  .to(currentText.querySelector('.slides-container__title'), 0.6, {
    opacity: 1,
    y: 0,
  }, '-=0.1')
  .to(currentText.querySelector('.designers-info'), 0.6, {
    opacity: 1,
    y: 0,
  }, '-=0.4')
  .from(currentSlide, 0.4, {
    xPercent: 100
  }, '-=0.4')
  .from(currentSlide.querySelector('.slide-bg__link'), 0.4, {
    xPercent: -100
  }, '-=0.4')
  .from(currentShape, 0.6, {
    xPercent: 100
  }, '-=0.2')
  .from(currentShape.querySelector('.shapes__content'), 0.6, {
    xPercent: -100,
    delay: -0.6
  }, '-=0.2')
};
