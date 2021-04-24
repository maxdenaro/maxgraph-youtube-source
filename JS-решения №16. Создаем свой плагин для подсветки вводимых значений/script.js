class PageFilter {
	constructor(selector, options) {
		let defaultOptions = {
			childClass: 'filter-element',
			highlightClass: 'filter-highlight',
			hiddenClass: 'filter-hidden',
			onInput: () => {

			}
		};

		this.options = Object.assign(defaultOptions, options);
		this.input = document.querySelector(selector);
		this.itemsParent = document.querySelector(`[data-items-target="${this.input.dataset.items}"]`);
		this.items = this.itemsParent.querySelectorAll(`.${this.options.childClass}`);
		this.rex = /(<span.+?>)(.+?)(<\/span>)/g;
		this.rexAtt = 'gi';
		this.event();
	}

	event() {
		console.log('event');
		if (this.input) {
			this.input.addEventListener('input', (e) => {
				if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
					return false;
				} else {
					let filterText = e.currentTarget.value;
					
					if (filterText.length) {
						this.clear();

						[].filter.call(this.items, (item) => {
							if (item.textContent.toUpperCase().includes(filterText.toUpperCase())) {
								let newHtml = item.textContent;
								item.innerHTML = newHtml.replace(
									new RegExp(filterText, this.rexAtt), (match) => {
										return [`<span class="${this.options.highlightClass}">${match}</span>`].join("");
									}
								)
							} else {
								item.classList.add(this.options.hiddenClass);
							}
						});

					} else {
						console.log('пусто')
						this.clear();
					}
				}

				this.options.onInput(this);
			});
		}
	}

	clear() {
		console.log('clear');
		this.items.forEach(item => {
			item.classList.remove(this.options.hiddenClass);
			item.innerHTML = `${item.innerHTML.replace(new RegExp(this.rex), "$2")}`;
		});
	}
}

