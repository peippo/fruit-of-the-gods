import "./assets/styles/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headerTL = gsap
	.timeline({
		defaults: { ease: "sine" },
	})
	.from(".tree", { duration: 2, opacity: 0 })
	.from("#falling-persimmon", { opacity: 0 }, "<")
	.delay(0.5)
	.from(".header__sub", { y: -20, opacity: 0 })
	.from(
		".split",
		{ y: -40, opacity: 0, duration: 0.8, stagger: 0.3 },
		"-=0.1"
	);

gsap.to("#falling-persimmon", {
	y: () =>
		document.getElementById("splash-section").getBoundingClientRect().top +
		window.scrollY,
	rotation: 180,
	scale: 3,
	scrollTrigger: {
		pin: true,
		// markers: true,
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
		document.getElementById("falling-persimmon").classList.add("!opacity-0"),
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
