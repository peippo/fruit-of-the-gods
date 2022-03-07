import "./assets/styles/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to("#falling-persimmon", {
	y: 1000,
	rotation: 180,
	scale: 2,
	scrollTrigger: {
		pin: true,
		trigger: "#falling-persimmon",
		start: "-100px top",
		end: () =>
			document.getElementById("splash-section").getBoundingClientRect().top +
			window.scrollY,
		scrub: 1,
	},
});

ScrollTrigger.create({
	// markers: true,
	trigger: ".splash-section",
	start: "top 80%",
	end: "bottom top",
	toggleClass: "splash-section--active",
	onEnter: () =>
		document.getElementById("falling-persimmon").classList.add("opacity-0"),
	onLeaveBack: () =>
		document
			.getElementById("falling-persimmon")
			.classList.remove("opacity-0"),
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
