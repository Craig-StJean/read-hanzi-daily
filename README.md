# auto-subtitle-gui
Automatically generate and overlay subtitles for any video.

## Dev
### Recommended IDE Setup
[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

### Prerequisites
[Tauri Setup](https://tauri.app/v1/guides/getting-started/prerequisites)
[nvm-windows](https://github.com/coreybutler/nvm-windows)
[Skeleton](https://www.skeleton.dev/guides/install)

### Setup New Tauri/SvelteKit/Skeleton App
	npm create tauri-app
	npm i @skeletonlabs/skeleton --save-dev
	npx svelte-add@latest tailwindcss
	npm install
	npm install -D @tailwindcss/forms
	npm install -D @tailwindcss/typography
	npm install -D @tailwindcss/line-clamp

Add to `tailwind.config.cjs`
	const config = {
		content: [
			// Keep existing values and append the following:
			require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
		],
		darkMode: 'class',
		plugins: [
			// Keep any existing plugins present and append the following:
			require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
			require('@tailwindcss/forms'),
			require('@tailwindcss/typography'),
			require('@tailwindcss/line-clamp'),
		]
	}

Add to `/src/routes/+layout.svelte`
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

Add to `/src/app.html`
	<body data-theme="skeleton">

REMOVE from `/src/app.postcss`
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

### To Develop Deno Binaries
Install Deno on Windows
	irm https://deno.land/install.ps1 | iex

Compile file
	deno compile --allow-net --allow-write jwDownloader.ts
Add `-x86_64-pc-windows-msvc` to the executable name

### Run
	npm run tauri dev

### Build
	npm run tauri build