const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const menuLinks = menu.querySelectorAll('.menu__link');

const sections = document.querySelectorAll('.section');

const bottomBlock = document.querySelector('.bottom-block');
const bottomBlockCaption = bottomBlock.querySelector('.bottom-block__caption');
const bottomBlockBurger = bottomBlock.querySelector('.bottom-block__burger');

const body = document.body;

const toggleMenu = () => {
  menu.classList.toggle('menu--active');
  burger.classList.toggle('burger--active');
  body.classList.toggle('stop-scroll');

  if (menu.classList.contains('menu--active')) {
    burger.setAttribute('aria-label', 'Закрыть меню');
    burger.setAttribute('aria-expanded', 'true');
  } else {
    burger.setAttribute('aria-label', 'Открыть меню');
    burger.setAttribute('aria-expanded', 'false');
  }
};

const toggleMenuMobile = () => {
  menu.classList.toggle('menu--active');
  bottomBlock.classList.toggle('bottom-block--active');
  body.classList.toggle('stop-scroll');

  if (menu.classList.contains('menu--active')) {
    burger.setAttribute('aria-label', 'Закрыть мобильное меню');
    burger.setAttribute('aria-expanded', 'true');
  } else {
    burger.setAttribute('aria-label', 'Открыть мобильное меню');
    burger.setAttribute('aria-expanded', 'false');
  }
};

const changeMenuText = () => {
  let scrollDistance = window.scrollY;

  sections.forEach(section => {
    if (scrollDistance >= (section.offsetTop - window.innerHeight)) {
      bottomBlockCaption.textContent = section.querySelector('.section__title').textContent;
    }
  });
};

// определение свайпа
let xDown = null;
let yDown = null;

function getTouches(e) {
  return e.touches || e.originalEvent.touches;
}

function handleTouchStart(e) {
  const firstTouch = getTouches(e)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(e) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs( xDiff ) > Math.abs( yDiff )) {/*most significant*/
    if ( xDiff > 0 ) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff <= -9) {
      toggleMenuMobile();
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};

menu.addEventListener('touchstart', handleTouchStart, false);
menu.addEventListener('touchmove', handleTouchMove, false);

burger.addEventListener('click', () => {
  toggleMenu();
});

bottomBlockBurger.addEventListener('click', () => {
  toggleMenuMobile();
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    bottomBlock.classList.remove('bottom-block--active');
    toggleMenu();
  });
});

changeMenuText();

window.addEventListener('scroll', () => {
  changeMenuText();
});
