import "./assets/styles/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animations = () => {
	const headerTL = gsap
		.timeline({
			defaults: { ease: "sine" },
		})
		.from(".tree", { duration: 1, opacity: 0 })
		.from("#falling-persimmon", { opacity: 0 }, "<")
		.delay(0.5)
		.from(".header__sub", { y: -20, opacity: 0 })
		.from(
			".split",
			{ y: -40, opacity: 0, duration: 0.8, stagger: 0.3 },
			"-=0.1"
		);

	gsap.to(".header__content", {
		y: -50,
		opacity: 0,
		duration: 0.75,
		scrollTrigger: {
			trigger: "header",
			start: "20% top",
			end: "100% top",
			toggleActions: "play pause resume reverse",
		},
	});

	gsap.to("#falling-persimmon", {
		y: () =>
			document.getElementById("splash-section").getBoundingClientRect().top +
			window.scrollY,
		rotation: 180,
		scale: 3,
		scrollTrigger: {
			pin: true,
			trigger: "#falling-persimmon",
			start: "-100px top",
			end: () =>
				document.getElementById("splash-section").getBoundingClientRect()
					.bottom + window.scrollY,
			scrub: 1,
		},
	});

	const introductionTL = gsap
		.timeline({
			scrollTrigger: {
				trigger: ".introduction",
				start: "top center",
				end: "bottom top",
				toggleActions: "play pause resume reverse",
			},
			defaults: { duration: 0.5 },
		})
		.from(".introduction", { y: -100, opacity: 0 });

	ScrollTrigger.create({
		// markers: true,
		trigger: ".splash-section",
		start: "top 80%",
		end: "bottom top",
		toggleClass: "splash-section--active",
		onEnter: () =>
			document
				.getElementById("falling-persimmon")
				.classList.add("!opacity-0"),
		onLeaveBack: () =>
			document
				.getElementById("falling-persimmon")
				.classList.remove("!opacity-0"),
	});

	const varietiesTL = gsap
		.timeline({
			scrollTrigger: {
				trigger: ".splash-section",
				start: "top 60%",
				end: "bottom top",
				toggleActions: "play pause resume reverse",
			},
			defaults: { duration: 0.3 },
		})
		.from(".varieties__heading", { y: -100, opacity: 0 })
		.from(".varieties__hachiya", { y: -100, opacity: 0 }, "-=0.15")
		.from(".varieties__fuyu", { y: -100, opacity: 0 }, "-=0.1");

	const months = gsap.utils.toArray(".month");

	gsap.to(months, {
		xPercent: -100 * (months.length - 3),
		scrollTrigger: {
			trigger: ".months-section",
			scrub: 1,
			start: "top bottom",
			end: "top 20%",
		},
	});

	let china = gsap.utils.toArray(".map #china path");
	let japan = gsap.utils.toArray(".map #japan path");
	let korea = gsap.utils.toArray(".map #korea path");
	china = gsap.utils.shuffle(china);
	japan = gsap.utils.shuffle(japan);
	korea = gsap.utils.shuffle(korea);

	const mapTL = gsap.timeline({
		scrollTrigger: {
			trigger: ".map",
			start: "top 50%",
			end: "bottom top",
			toggleActions: "play pause resume reverse",
		},
	});

	china.forEach((path) => {
		mapTL.add(
			gsap.to(path, {
				fill: "white",
				duration: 0.001,
			})
		);
	});

	mapTL.add(
		gsap.from(".map-marker--china", {
			opacity: 0,
			scale: 0.8,
			duration: 0.5,
		})
	);

	korea.forEach((path) => {
		mapTL.add(
			gsap.to(path, {
				fill: "white",
				duration: 0.1,
			})
		);
	});

	mapTL.add(
		gsap.from(".map-marker--korea", {
			opacity: 0,
			scale: 0.8,
			duration: 0.5,
		})
	);

	japan.forEach((path) => {
		mapTL.add(
			gsap.to(path, {
				fill: "white",
				duration: 0.04,
			})
		);
	});

	mapTL.add(
		gsap.from(".map-marker--japan", {
			opacity: 0,
			scale: 0.8,
			duration: 0.5,
		})
	);

	gsap.to(".slice", {
		ease: "none",
		rotate: 360,
		duration: 30,
		repeat: -1,
		scrollTrigger: {
			trigger: ".ending",
			start: "top bottom",
			toggleActions: "play pause resume pause",
		},
	});
};

window.addEventListener("load", () => {
	animations();
});
