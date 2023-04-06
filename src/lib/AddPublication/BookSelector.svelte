<script lang="ts">
	import { ListBox } from '@skeletonlabs/skeleton';
	import MyListBoxItem from '$lib/AddPublication/MyListBoxItem.svelte';
	
	import { PUBLICATION_CODES, type PublicationCode } from '$lib/data/Constants';
	
	export let book: string = '';
	export let myBookCodes: string[] = [];
	
	let bookCodes: PublicationCode[] = PUBLICATION_CODES.filter(pubCode => pubCode.category == 'Books');
	bookCodes.sort(mySort);
	book = bookCodes[0].code;
	
	function mySort(a: PublicationCode, b: PublicationCode): number {
		let strA = stripToEnglish(a.nameE);
		let strB = stripToEnglish(b.nameE);
		
		return strA.localeCompare(strB);
		
		function stripToEnglish(str: string): string {
			while (str.charAt(0).toLowerCase() == str.charAt(0).toUpperCase() && str.length > 0) {
				str = str.slice(1);
			}
			return str;
		}
	}
</script>


<div class="flex justify-center">
	<ListBox active="variant-filled-primary" hover="hover:variant-soft-primary">
		{#each bookCodes as bookCode }
			<MyListBoxItem bind:group={book} name="medium" value={bookCode.code}>
				
				<svelte:fragment slot="lead">
					<!-- https://feathericons.dev/?search=book&iconset=feather -->
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
						<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
						<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
					</svg>
				</svelte:fragment>
				
				{bookCode.nameE}
				<br/>
				{bookCode.nameCHS}
				
				<svelte:fragment slot="trail">
					{#if !myBookCodes.includes(bookCode.code)}
						<!-- https://feathericons.dev/?search=download-cloud&iconset=feather -->
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
							<polyline points="8 17 12 21 16 17" />
							<line x1="12" x2="12" y1="12" y2="21" />
							<path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
						</svg>
					{/if}
				</svelte:fragment>
				
			</MyListBoxItem>
		{/each}
	</ListBox>
</div>