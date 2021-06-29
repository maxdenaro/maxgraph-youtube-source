const stepper = document.querySelector('.stepper');
const stepperInput = stepper.querySelector('.stepper__input');
const stepperBtnUp = stepper.querySelector('.stepper__btn--up');
const stepperBtnDown = stepper.querySelector('.stepper__btn--down');

let count = stepperInput.value;

const isNotApple = () => {
	if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		return false;
	}
	return true;
};

function allowNumbersOnly(e) {
	var code = (e.which) ? e.which : e.keyCode;
	if (code > 31 && (code < 48 || code > 57)) {
			e.preventDefault();
	}
}

stepperInput.addEventListener('keyup', (e) => {
	let self = e.currentTarget;

	if (self.value == '0') {
		self.value = 1;
	}

	if (isNotApple) {
		self.style.width = `${self.value.length + 1}ex`;
	} else {
		self.style.width = `${self.value.length + 2}ex`;
	}

	count = stepperInput.value;

	if (count == 1) {
		stepperBtnDown.classList.add('stepper__btn--disabled');
	} else {
		stepperBtnDown.classList.remove('stepper__btn--disabled');
	}
});

stepperInput.addEventListener('keypress', (e) => {
	allowNumbersOnly(e);
});

stepperInput.addEventListener('change', (e) => {
	let self = e.currentTarget;

	if (!self.value) {
		self.value = 1;
	}

	count = stepperInput.value;

	if (count == 1) {
		stepperBtnDown.classList.add('stepper__btn--disabled');
	} else {
		stepperBtnDown.classList.remove('stepper__btn--disabled');
	}
});

stepperBtnUp.addEventListener('click', (e) => {
	e.preventDefault();

	count++;

	if (count == 1) {
		stepperBtnDown.classList.add('stepper__btn--disabled');
	} else {
		stepperBtnDown.classList.remove('stepper__btn--disabled');
	}

	stepperInput.value = count;

	if (isNotApple) {
		stepperInput.style.width = `${stepperInput.value.length + 1}ex`;
	} else {
		stepperInput.style.width = `${stepperInput.value.length + 2}ex`;
	}
});

stepperBtnDown.addEventListener('click', (e) => {
	e.preventDefault();

	count--;

	if (count == 1) {
		stepperBtnDown.classList.add('stepper__btn--disabled');
	} else {
		stepperBtnDown.classList.remove('stepper__btn--disabled');
	}

	stepperInput.value = count;

	if (isNotApple) {
		stepperInput.style.width = `${stepperInput.value.length + 1}ex`;
	} else {
		stepperInput.style.width = `${stepperInput.value.length + 2}ex`;
	}
});