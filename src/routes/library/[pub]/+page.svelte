<script lang="ts">
	import { sep } from '@tauri-apps/api/path';
	
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	
	import { readingHistory } from '$lib/data/AppSaveData';
  
	export let data: PageData;
	
	async function click(fileName: string) {
		const added = $readingHistory.add(data.relativeDirectory + fileName);
		if (added) {
			$readingHistory = $readingHistory;
		}
		goto(`/read`);
	}
  </script>
  
  <h1>{data.title}</h1>
  
  <nav class="list-nav p-4">
	<ul>
		{#each data.chapterInfo as chapter}
			<li class="truncate"><a href="#" on:click={() => click(chapter.fileName)}>{chapter.title}</a></li>
		{/each}
	</ul>
  </nav>