<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	
	import ChineseSelector from '$lib/MediaSelector/ChineseSelector.svelte';
	import MediaSelector from '$lib/MediaSelector/MediaSelector.svelte';
	import YearMonthSelector from '$lib/MediaSelector/YearMonthSelector.svelte';
	import { getNewEpub } from '$lib/MediaSelector/jwDownloader';
	
	let script: string;
	let media: string;
	let year: number;
	let month: number;
	
	let downloading: boolean = false;
	function downloadCallback(success: boolean): void {
		downloading = false;
		
		let t: ToastSettings;
		if (success) {
			t = {
				message: 'Successfully downloaded 🥳🎉',
				background: 'variant-filled-primary',
			};
		} else {
			t = {
				message: 'There was an error downloading 😭',
				background: 'variant-filled-error',
			};
		}
		toastStore.trigger(t);
	}
	
	let tabSet: number = 0;
	
	let files: FileList;
	function onChangeHandler(e: Event): void {
		console.log('file data:', e);
	}
	
	function onCompleteHandler(): void {
		let pub: string = '';
		let date: string = '';
		let lang: string = (script == 'simplified') ? 'CHS' : 'CH';
		
		if (media == 'watchtower') {
			pub = 'w';
			date = year + String(month + 1).padStart(2, '0');
		}
		
		getNewEpub(pub, date, lang, downloadCallback);
		downloading = true;
	}
	
	
</script>

<div class="container mx-auto space-y-5">
	<TabGroup>
		<Tab bind:group={tabSet} name="download" value={0}>
			<!-- https://feathericons.dev/?search=download-cloud&iconset=feather -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
				<polyline points="8 17 12 21 16 17" />
				<line x1="12" x2="12" y1="12" y2="21" />
				<path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
			</svg>
		</Tab>
		<Tab bind:group={tabSet} name="provide" value={1}>
			<!-- https://feathericons.dev/?search=upload&iconset=feather -->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="17 8 12 3 7 8" />
				<line x1="12" x2="12" y1="3" y2="15" />
			</svg>
		</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<h2 class="my-16 text-center">Download from jw.org</h2>
				<Stepper class="variant-soft-secondary p-6" on:complete={onCompleteHandler}>
					<Step>
						<svelte:fragment slot="header">Select Chinese Script</svelte:fragment>
						<ChineseSelector bind:script />
					</Step>
					<Step>
						<svelte:fragment slot="header">Select Publication</svelte:fragment>
						<MediaSelector bind:media />
					</Step>
					<Step locked={downloading}>
						<svelte:fragment slot="header">Select Publication Date</svelte:fragment>
						<YearMonthSelector bind:year bind:month />
					</Step>
				</Stepper>
			{:else if tabSet === 1}
				<h2 class="my-16 text-center">Load Local File</h2>
				<FileDropzone slotLead="text-center" name="files" bind:files on:change={onChangeHandler}>
					<svelte:fragment slot="lead">
						<!-- https://feathericons.dev/?search=file&iconset=feather -->
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
							<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
							<polyline points="13 2 13 9 20 9" />
						</svg>
					</svelte:fragment>
					<svelte:fragment slot="message">Drag and Drop or Click to Select</svelte:fragment>
					<svelte:fragment slot="meta">EPUB</svelte:fragment>
				</FileDropzone>
			{/if}
		</svelte:fragment>
	</TabGroup>
	
	{#if downloading}
		<div class="fixed inset-0 flex justify-center items-center h-screen variant-glass-surface">
			<ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
		</div>
	{/if}
</div>