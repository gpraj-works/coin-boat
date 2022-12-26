const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				section: {
					dark: 'rgb(74,85,104)',
					light: 'rgb(247, 250, 252)',
				},
				primaryHover: '#3182CE',
				success: '#48BB78',
				danger: '#E53E3E',
			},
		},
	},
	screens: {
		xs: { max: '575px' },
	},
	plugins: [],
};
