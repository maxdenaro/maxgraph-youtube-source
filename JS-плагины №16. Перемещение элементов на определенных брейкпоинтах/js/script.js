const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const menuItems = document.querySelectorAll('.nav__link');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
  nav.classList.toggle('nav--active');
});

menuItems.forEach(el => {
  el.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    nav.classList.remove('nav--active');
  });
});

new TransferElements(
  {
    sourceElement: document.querySelector('.header__phone'),
    breakpoints: {
      1024: {
        targetElement: document.querySelector('.nav'),
        targetPosition: 1
      }
    }
  }
);
