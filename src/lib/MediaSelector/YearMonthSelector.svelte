<script lang="ts">
	import { MONTH_NAMES } from '$lib/data/Constants';
	
	const now = new Date();
	
	let years: number[] = [];
	for (let y = 2010; y <= now.getFullYear(); y++) {
		years.push(y);
	}
	
	export let year: number = now.getFullYear();
	export let month: number = now.getMonth();
</script>

<div class="flex justify-center space-x-10">
	<label class="label">
		<span>Year</span>
		<select class="select" size="6" bind:value={year}>
			{#each years as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</label>
	
	
	<label class="label">
		<span>Month</span>
		<select class="select" size="6" bind:value={month}>
			{#each MONTH_NAMES as month, i}
				<option value={i}>{month}</option>
			{/each}
		</select>
	</label>
</div>