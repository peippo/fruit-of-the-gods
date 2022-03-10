import "./assets/styles/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animations = () => {
	gsap.from("body", { ease: "linear", autoAlpha: 0 });

	// Header section
	gsap
		.timeline({
			defaults: { ease: "sine" },
		})
		.from(".header__tree", { duration: 1, opacity: 0 })
		.from("#header__persimmon", { opacity: 0 }, "<")
		.delay(0.5)
		.from(".header__sub", { y: -20, opacity: 0 })
		.from(
			".header__heading-slice",
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

	gsap.to("#header__persimmon", {
		y: () =>
			document.getElementById("varieties").getBoundingClientRect().top +
			window.scrollY,
		rotation: 180,
		scale: 3,
		scrollTrigger: {
			pin: true,
			trigger: "#header__persimmon",
			start: "-100px top",
			end: () =>
				document.getElementById("varieties").getBoundingClientRect()
					.bottom + window.scrollY,
			scrub: 1,
		},
	});

	// Introduction section
	gsap
		.timeline({
			scrollTrigger: {
				trigger: ".introduction",
				start: "top center",
				end: "bottom top",
				toggleActions: "play pause resume reverse",
			},
			defaults: { duration: 0.5 },
		})
		.from(".introduction__content", { y: -100, opacity: 0 });

	ScrollTrigger.create({
		trigger: ".varieties",
		start: "top 80%",
		end: "bottom top",
		toggleClass: "varieties--active",
		onEnter: () =>
			document
				.getElementById("header__persimmon")
				.classList.add("!opacity-0"),
		onLeaveBack: () =>
			document
				.getElementById("header__persimmon")
				.classList.remove("!opacity-0"),
	});

	// Varieties section
	gsap
		.timeline({
			scrollTrigger: {
				trigger: ".varieties",
				start: "top 60%",
				end: "bottom top",
				toggleActions: "play pause resume reverse",
			},
			defaults: { duration: 0.3 },
		})
		.from(".varieties__heading", { y: -100, opacity: 0 })
		.from(".varieties__hachiya", { y: -100, opacity: 0 }, "-=0.15")
		.from(".varieties__fuyu", { y: -100, opacity: 0 }, "-=0.1");

	// Season section
	const months = gsap.utils.toArray(".months__month");

	gsap.to(months, {
		xPercent: -100 * (months.length - 3),
		scrollTrigger: {
			trigger: ".months",
			scrub: 1,
			start: "top bottom",
			end: "top 20%",
		},
	});

	// Map section
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

	// Ending section
	gsap.to(".ending__slice", {
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
