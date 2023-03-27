/** @type {import('tailwindcss').Config} */
const config = {
  content: [
	"./src/**/*.{html,js,svelte,ts}",
	require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
],

  theme: {
    extend: {},
  },

  plugins: [
	require('@tailwindcss/forms'),
	require('@tailwindcss/typography'),
	...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
],
  
  darkMode: 'class',
};

module.exports = config;
