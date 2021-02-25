const tl = gsap.timeline();
tl.fromTo('.second', {x: '-100%', y: '+100%'}, {y: 0})
tl.fromTo('.third', {x: '-100%'}, {x: '-200%'})
tl.fromTo('.fourth', {x: '-400%'}, {x: '-300%'})

const main = document.querySelector('.main');
ScrollTrigger.create({
	animation: tl,
	trigger: '.site-container',
	start: 'top top',
	end: () => main.offsetWidth / 2,
	scrub: true,
	pin: true
});