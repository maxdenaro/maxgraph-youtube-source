import vars from '../_vars';

vars.$cardDescrLink.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.currentTarget.getAttribute('href');
    console.log(target);

    vars.$cardDescrLink.forEach(el => el.classList.remove('card-description__link--active'));
    document.querySelectorAll('.card-description__content').forEach(el => el.classList.remove('card-description__content--active'));

    e.currentTarget.classList.add('card-description__link--active');
    document.querySelector(`[data-target="${target}"]`).classList.add('card-description__content--active');
  });
});
