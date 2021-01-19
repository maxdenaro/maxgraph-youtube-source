class GraphModal {
	constructor(options) {
		let defaultOptions = {
			isOpen: ()=>{},
			isClose: ()=>{},
		}
		this.options = Object.assign(defaultOptions, options);
		this.modal = document.querySelector('.modal');
		this.speed = false;
		this.animation = false;
		this._reOpen = false;
		this._nextContainer = false;
		this.modalContainer = false;
		this.isOpen = false;
		this.previousActiveElement = false;
		this._focusElements = [
			'a[href]',
			'input',
			'select',
			'textarea',
			'button',
			'iframe',
			'[contenteditable]',
			'[tabindex]:not([tabindex^="-"])'
		];
		this._fixBlocks = document.querySelectorAll('.fix-block');
		this.events();
	}

	events() {
		if (this.modal) {
			document.addEventListener('click', function(e) {
				const clickedElement = e.target.closest(`[data-graph-path]`);
				if (clickedElement) {
					let target = clickedElement.dataset.graphPath;
					let animation = clickedElement.dataset.graphAnimation;
					let speed =  clickedElement.dataset.graphSpeed;
					this.animation = animation ? animation : 'fade';
					this.speed = speed ? parseInt(speed) : 300;
					this._nextContainer = document.querySelector(`[data-graph-target="${target}"]`); 
					this.open();
					return;
				}

				if (e.target.closest('.modal__close')) {
					this.close();
					return;
				}
			}.bind(this));

			window.addEventListener('keydown', function(e) {
				if (e.keyCode == 27) {
					if (this.modalContainer.classList.contains('modal-open')) {
						this.close();
					}
				}

				if (e.which == 9 && this.isOpen) {
					this.focusCatch(e);
					return;
				}
			}.bind(this));

			this.modal.addEventListener('click', function(e) {
				if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
					this.close();
				}
			}.bind(this));
		}
		
	}

	open(selector) {
		this.previousActiveElement = document.activeElement;

		if (this.isOpen) {
			this.reOpen = true;
			this.close();
			return;
		}

		this.modalContainer = this._nextContainer;

		if (selector) {
			this.modalContainer = document.querySelector(`[data-graph-target="${selector}"]`);
		}

		this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
		this.modal.classList.add('is-open');
		this.disableScroll();
		
		this.modalContainer.classList.add('modal-open');
		this.modalContainer.classList.add(this.animation);
		
		setTimeout(() => {
			this.options.isOpen(this);
			this.modalContainer.classList.add('animate-open');
			this.isOpen = true;
			this.focusTrap();
		}, this.speed);
	}
	
	close() {
		if (this.modalContainer) {
			this.modalContainer.classList.remove('animate-open');
			this.modalContainer.classList.remove(this.animation);
			this.modal.classList.remove('is-open');
			this.modalContainer.classList.remove('modal-open');
			
			this.enableScroll();
			this.options.isClose(this);
			this.isOpen = false;
			this.focusTrap();

			if (this.reOpen) {
				this.reOpen = false;
				this.open();
			}
		}
	}

	focusCatch(e) {
		const nodes = this.modalContainer.querySelectorAll(this._focusElements);
		const nodesArray = Array.prototype.slice.call(nodes);
		const focusedItemIndex = nodesArray.indexOf(document.activeElement)
		if (e.shiftKey && focusedItemIndex === 0) {
			nodesArray[nodesArray.length - 1].focus();
			e.preventDefault();
		}
		if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
			nodesArray[0].focus();
			e.preventDefault();
		}
	}

	focusTrap() {
		const nodes = this.modalContainer.querySelectorAll(this._focusElements);
		if (this.isOpen) {
			if (nodes.length) nodes[0].focus();
		} else {
			this.previousActiveElement.focus();
		}
	}

	disableScroll() {
		let pagePosition = window.scrollY;
		this.lockPadding();
		document.body.classList.add('disable-scroll');
		document.body.dataset.position = pagePosition;
		document.body.style.top = -pagePosition + 'px';
	}

	enableScroll() {
		let pagePosition = parseInt(document.body.dataset.position, 10);
		this.unlockPadding();
		document.body.style.top = 'auto';
		document.body.classList.remove('disable-scroll');
		window.scroll({
			top: pagePosition,
			left: 0
		});
		document.body.removeAttribute('data-position');
	}

	lockPadding() {
		let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
		this._fixBlocks.forEach((el) => {
			el.style.paddingRight = paddingOffset;
		});
		document.body.style.paddingRight = paddingOffset;
	}

	unlockPadding() {
		this._fixBlocks.forEach((el) => {
			el.style.paddingRight = '0px';
		});
		document.body.style.paddingRight = '0px';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const modal = new GraphModal({
		isOpen: (modal) => {
			console.log('opened');
		},
		isClose: () => {
			console.log('closed');
		}
	});

// new Modal().open('second');
});

