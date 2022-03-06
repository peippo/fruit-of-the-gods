module.exports = {
	content: ["./index.html", "./main.js"],
	theme: {
		container: {
			padding: "2rem",
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		colors: {
			white: "#ffffff",
			yellow: "#f7fd04",
			"orange-1": "#f9b208",
			"orange-2": "#f98404",
			"orange-3": "#fc5404",
		},
		fontFamily: {
			serif: ["Abril Fatface", "cursive"],
			sans: ["Montserrat", "sans-serif"],
		},
		extend: {
			fontSize: {
				"10xl": ["10rem", { lineHeight: "1" }],
				"11xl": ["12rem", { lineHeight: "1" }],
			},
		},
	},
	plugins: [],
};
