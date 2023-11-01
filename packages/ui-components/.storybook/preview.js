import "../src/styles.css";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	darkMode: {
		darkClass: "dark",
		stylePreview: true,
	},
	backgrounds: {
		values: [
			{ name: "dark", value: "#1f2938" },
			{ name: "light", value: "#f4faff" },
			{ name: "gray", value: "#fafafa" },
		],
	},
};
