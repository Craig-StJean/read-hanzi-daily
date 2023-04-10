/** @type {import('tailwindcss').Config} */
const config = {
  content: [
	"./src/**/*.{html,js,svelte,ts}",
	require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
],

  theme: {
    extend: {
		typography: {
			DEFAULT: {
				css: {
					':is(p, h1, h2, h3, h4, h5, h6):has(ruby)': {
						lineHeight: 2.5,
					}
				}
			},
			sm: {
				css: {
					':is(h1, h2, h3, h4, h5, h6):has(ruby)': {
						lineHeight: 2.5,
					}
				}
			},
			lg: {
				css: {
					':is(h1, h2, h3, h4, h5, h6):has(ruby)': {
						lineHeight: 2.5,
					}
				}
			},
			xl: {
				css: {
					':is(h1, h2, h3, h4, h5, h6):has(ruby)': {
						lineHeight: 2.5,
					}
				}
			},
			'2xl': {
				css: {
					':is(h1, h2, h3, h4, h5, h6):has(ruby)': {
						lineHeight: 2.5,
					}
				}
			}
		}
	},
  },

  plugins: [
	require('@tailwindcss/forms'),
	require('@tailwindcss/typography'),
	...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
],
  
  darkMode: 'class',
};

module.exports = config;
