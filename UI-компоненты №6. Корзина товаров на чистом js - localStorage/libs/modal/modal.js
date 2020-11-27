class GraphModal {
	constructor(options) {
		let defaultOptions = {
			isOpen: ()=>{},
			isClose: ()=>{},
		}
		this.options = Object.assign(defaultOptions, options);
		this.modal = document.querySelector('.modal');
		this.speed = 300;
		this.animation = false;
		this.reOpen = false;
		this.nextWindow = false;
		this.modalContainer = false;
		this.isOpened = false;
		this.previousActiveElement = false;
		this._focusElements = [
				'a[href]',
				'area[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
		];
		this.fixBlocks = document.querySelectorAll('.fix-block');
		this.events();
	}

	events() {
		document.addEventListener('click', function(e) {
		 	const clickedElement = e.target.closest(`[data-graph-path]`);
		 	if (clickedElement) {
				let target = clickedElement.dataset.graphPath;
				let animation = clickedElement.dataset.graphAnimation;
				let speed =  clickedElement.dataset.graphSpeed;
				this.animation = animation ? animation : 'fade';
				this.speed = speed ? parseInt(speed) : 300;
				this.nextWindow = document.querySelector(`[data-graph-target="${target}"]`); 
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

			if (e.which == 9 && this.isOpened) {
				this.focusCatch(e);
				return;
			}
		}.bind(this));

		this.modal.addEventListener('click', function(e) {
			if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpened) {
				this.close();
			}
		}.bind(this));
	}

	open(selector) {
		this.previousActiveElement = document.activeElement;

		if (this.isOpened) {
			this.reOpen = true;
			this.close();
			return;
		}

		this.modalContainer = this.nextWindow;

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
			this.isOpened = true;
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
			this.isOpened = false;
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
		if (this.isOpened) {
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
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = paddingOffset;
		});
		document.body.style.paddingRight = paddingOffset;
	}

	unlockPadding() {
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = '0px';
		});
		document.body.style.paddingRight = '0px';
	}
}

// new Modal().open('second');
