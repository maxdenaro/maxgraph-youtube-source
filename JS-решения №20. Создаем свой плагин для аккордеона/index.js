const accordion1 = new GraphAccordion('.accordion-1', {
	speed: 500,
	isOpen: (acc) => {
		console.log(acc);
	},
	isClose: (acc) => {
		console.log(acc);
	}
});

const accordion2 = new GraphAccordion('.accordion-2', {
	speed: 1500
});