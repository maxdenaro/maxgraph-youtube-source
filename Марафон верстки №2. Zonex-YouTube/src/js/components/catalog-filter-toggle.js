import vars from '../_vars';

vars.$catalogFiltersTop.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.closest('.catalog-filter').classList.toggle('catalog-filter--open');
  });
});

vars.$hideFilters.addEventListener('click', (e) => {
  vars.$catalogFilters.forEach(el => {
    el.classList.remove('catalog-filter--open');
  });
});
