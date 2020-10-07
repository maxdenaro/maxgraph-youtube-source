const { default: _vars } = require("../_vars");
import vars from '../_vars';

if (vars.$cardSliderThumbs) {
  vars.$cardSliderThumbs.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-slider__thumb')) {
      let src = e.target.querySelector('img').getAttribute('src');
      vars.$sliderImg.setAttribute('src', src);
    }
  });

}

