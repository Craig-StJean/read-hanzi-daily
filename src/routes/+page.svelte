<script lang="ts">
  import Greet from "$lib/Greet.svelte";
  import { AppBar } from '@skeletonlabs/skeleton';
  import { LightSwitch } from '@skeletonlabs/skeleton';
  import { FileDropzone } from '@skeletonlabs/skeleton';
  
  let files: FileList;
</script>

<AppBar>
	<svelte:fragment slot="lead"><h3>AUTO SUBTITLE</h3></svelte:fragment>
	(center)
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>

<div class="container mx-auto">
	<h1>Welcome to Tauri!</h1>

	<div class="row">
	<FileDropzone title="Drop video/audio files here or click to select" bind:files />
	</div>

	<p>Click on the Tauri, Vite, and Svelte logos to learn more.</p>

	<div class="row">
	<Greet />
	</div>
</div>


<style>
	div.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
</style>
