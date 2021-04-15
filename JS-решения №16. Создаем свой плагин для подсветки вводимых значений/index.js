const filter = new PageFilter('#search', {
	onInput: (input) => {
		console.log(input)
	}
});

const filter2 = new PageFilter('#search-2', {
	childClass: 'element',
	hiddenClass: 'hidden',
	highlightClass: 'element-high'
});

document.querySelector('.btn').addEventListener('click', () => {
	console.log('click')
	filter.clear();
	filter2.clear();
});