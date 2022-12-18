import { createPopper, right} from '@popperjs/core';

const el = document.querySelector('.tooltip__btn');
const tooltip = document.querySelector('.tooltip__txt');

createPopper(el, tooltip, {
  placement: 'top-start'
});
