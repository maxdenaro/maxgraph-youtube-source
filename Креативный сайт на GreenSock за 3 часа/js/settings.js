const bgItems = document.querySelectorAll('.slide-bg__link');
const imageSlides = document.querySelectorAll('.slide-bg__inner');
const shapes = document.querySelectorAll('.shapes__content');
const shapeSlides = document.querySelectorAll('.shapes__item');
const helperInput = document.querySelector('#helper-input');
const mainSection = document.querySelector('.main-section');

const mouse = document.querySelector('.mouse');
const slideBg = document.querySelector('.slide-bg');
const links = document.querySelectorAll('a');

const slidesCount = 5;
let slideCounter = 1;
const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);

const startComplete = () => {
  imageSlides.forEach(el => { el.style.opacity = 1 });
  shapeSlides.forEach(el => { el.style.opacity = 1 });
};

const startingTl = gsap.timeline({ defaults: { ease: easing }, onComplete: startComplete });
