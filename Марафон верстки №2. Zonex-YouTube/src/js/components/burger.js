import vars from '../_vars';

if (vars.$burger) {
    vars.$burger.addEventListener('click', () => {
    vars.$nav.classList.add('nav--visible');
  });

  vars.$navClose.addEventListener('click', () => {
    vars.$nav.classList.remove('nav--visible');
  });

  vars.$nav.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link')) {
      vars.$nav.classList.remove('nav--visible');
    }
  });
}


