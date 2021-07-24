const changeHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

changeHeight();


window.addEventListener('resize', () => {
  changeHeight();
});
