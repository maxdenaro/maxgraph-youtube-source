document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelector('.tabs');
	const tabsBtn = document.querySelectorAll('.tabs__btn');
	const tabsContent = document.querySelectorAll('.tabs__content');

	if (tabs) {
		tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__btn')) {
				const tabsPath = e.target.dataset.tabsPath;
				tabsBtn.forEach(el => {el.classList.remove('tabs__btn--active')});
				document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
				tabsHandler(tabsPath);
			}

			if (e.target.classList.contains('tabs__arrow--prev')) {
				let activeBtn = document.querySelector('.tabs__btn--active');
				let activeParent = activeBtn.closest('.tabs__item');
				let previousParent = activeParent.previousElementSibling;

				if (previousParent) {
					let prevActive = previousParent.querySelector('.tabs__btn')
					tabsBtn.forEach(el => {el.classList.remove('tabs__btn--active')});
					prevActive.classList.add('tabs__btn--active');

					let path = prevActive.dataset.tabsPath;
					tabsHandler(path);
				}
			}

			if (e.target.classList.contains('tabs__arrow--next')) {
				let activeBtn = document.querySelector('.tabs__btn--active');
				let activeParent = activeBtn.closest('.tabs__item');
				let nextParent = activeParent.nextElementSibling;

				if (nextParent) {
					let nextActive = nextParent.querySelector('.tabs__btn');
					tabsBtn.forEach(el => {el.classList.remove('tabs__btn--active')});
					nextActive.classList.add('tabs__btn--active');

					let path = nextActive.dataset.tabsPath;
					tabsHandler(path);
				}
			}
		});
	}

	const tabsHandler = (path) => {
		tabsContent.forEach(el => {el.classList.remove('tabs__content--active')});
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
	};
});

