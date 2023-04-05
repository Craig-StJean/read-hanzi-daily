<script lang="ts">
	import type { PageData } from './$types';
	
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	
	import { readingHistory } from '$lib/data/AppSaveData';
	
	
	export let data: PageData;
	
	const tableSimple: TableSource = {
		head: ['Publication', 'Script', 'Year', 'Month'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(data.pubData, ['publication', 'script', 'year', 'month']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(data.pubData, ['path']),
		foot: [`${data.pubData.length} total publications`]
	};
	
	function selectRowHandler(e: any): void {
		$readingHistory.add(e.detail[0]);
		// TODO navigate to reading page for the selected file
	}
</script>

<h2 class="my-16 text-center">Select Something to Read</h2>

<Table source={tableSimple} interactive={true} on:selected={selectRowHandler} />