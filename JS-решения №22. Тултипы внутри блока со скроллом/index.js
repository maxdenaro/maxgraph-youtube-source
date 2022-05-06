const link = document.querySelectorAll('.content__link');

const changePosition = {
  name: 'changePosition',
  enabled: true,
  phase: 'main',
  fn({ state }) {
    console.log(state);
    if (state.placement === 'top') {
      state.elements.popper.querySelector('.tooltip__arrow').classList.remove('tooltip__arrow--reverse');
    }

    if (state.placement === 'bottom') {
      state.elements.popper.querySelector('.tooltip__arrow').classList.add('tooltip__arrow--reverse');
    }
  },
}

link.forEach(el => {
  let tooltip = el.querySelector('.tooltip');

  Popper.createPopper(el, tooltip, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      },
      changePosition
    ]
  });
});