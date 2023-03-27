<script lang="ts">
	import Greet from "$lib/Greet.svelte";
	import { FileDropzone } from '@skeletonlabs/skeleton';
	
	let files: FileList;
</script>

<div class="container mx-auto">
	<h1>Welcome!</h1>
	
	<div class="row">
		<FileDropzone title="Drop video/audio files here or click to select" bind:files />
	</div>
	
	<div class="row">
		<Greet />
	</div>
	
	<div class="row">
		<a href="/add">Add a new file</a>
	</div>
</div>


<style>
	div.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
</style>
