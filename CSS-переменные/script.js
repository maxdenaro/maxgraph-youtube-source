const input = document.querySelector('#fontsize');

const changeFontSize = (value) => {
	const root = document.querySelector(':root');
	root.style.setProperty('--font-size', value + 'px');
}

input.addEventListener('change', (e) => {
	changeFontSize(e.currentTarget.value);
});

changeFontSize(input.value);


// var root = document.querySelector(':root');
// var rootStyles = getComputedStyle(root);
// var mainColor = rootStyles.getPropertyValue('--main-color');

// console.log(mainColor);


// root.style.setProperty('--main-color', '#88d8b0');