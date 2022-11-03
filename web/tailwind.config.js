/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.tsx",
	],
	theme: {
		extend: {
			colors: {
				gray: {
					100: '#E1E1E6',
					200: '#C4C4CC',
					400: '#8D8D99',
					600: '#323238',
					700: '#202024',
					950: '#09090A',
				},
				yellow: {
					500: '#F7DD43'
				},
				green: {
					300: '#129E57',
					500: '#35875D'
				}
			},
			fontFamily: {
				sans: 'Roboto, sans-serif',
			},
			backgroundImage: {
				'curved-lines': "url('/background.png')"
			}
		},
	},
	plugins: [],
}
