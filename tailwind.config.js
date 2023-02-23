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
				primary: '#3F83F8',
				success: '#0E9F6E',
				danger: '#E02424',
			},
		},
	},
	screens: {
		xs: { max: '575px' },
	},
	plugins: [],
};
