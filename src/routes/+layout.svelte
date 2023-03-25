<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import "../app.postcss";
	
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<main class="container">
	<AppBar>
		<svelte:fragment slot="lead"><h3>天天阅读汉字</h3></svelte:fragment>
		Read Hanzi Daily
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>
	
  	<slot />
</main>

<style>
	main {
		padding: 0;
		max-width: none;
	}
</style>
