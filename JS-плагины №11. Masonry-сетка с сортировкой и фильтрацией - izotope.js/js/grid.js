const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const elem = document.querySelector('.grid');
const iso = new Isotope( elem, {
  // options
  itemSelector: '.product',
	layoutMode: 'masonry',
	getSortData: {
		price: function(itemElem){
			let price = itemElem.querySelector('.price').textContent;
			price = priceWithoutSpaces(price);
			price = parseInt(price);
			console.log(price)
			return price;
		}
	}
});



document.querySelectorAll('.filter-btn').forEach(el => {
	el.addEventListener('click', (e) => {
		let filter = e.currentTarget.dataset.filter;

		iso.arrange({filter: `${filter}`});
	});
});

document.querySelectorAll('.sort-btn').forEach(el => {
	el.addEventListener('click', (e) => {
		let sortBy = e.currentTarget.getAttribute('data-sort');

		iso.arrange({sortBy: `${sortBy}`});
	});
});
