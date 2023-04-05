<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';
	
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	
	import { page } from '$app/stores';
	
	const storeValue: Writable<number> = writable(0);
	
	const urls = {
		home: '/',
		library: '/library',
		read: '/read',
	};
</script>

<AppRail selected={storeValue}>
	
	<AppRailTile value={0}>
		<!-- https://feathericons.dev/?search=arrow-left&iconset=feather -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
			<line x1="19" x2="5" y1="12" y2="12" />
			<polyline points="12 19 5 12 12 5" />
		</svg>
	</AppRailTile>
	
	<hr />
	
	<AppRailTile tag="a" href={urls.home} class="{urls.home === $page.url.pathname ? '!bg-primary-500' : ''}" label="Home" value={0}>
		<!-- https://feathericons.dev/?search=home&iconset=feather -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	</AppRailTile>
	
	<AppRailTile tag="a" href={urls.library} class="{urls.library === $page.url.pathname ? '!bg-primary-500' : ''}" label="Library" value={1}>
		<!-- https://feathericons.dev/?search=folder&iconset=feather -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
			<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
		</svg>
	</AppRailTile>
	
	<AppRailTile tag="a" href={urls.read} class="{urls.read === $page.url.pathname ? '!bg-primary-500' : ''}" label="Read" value={2}>
		<!-- https://feathericons.dev/?search=bookmark&iconset=feather -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
			<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
		</svg>
	</AppRailTile>
	
</AppRail>
