<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	
	import { PUBLICATION_CODES } from '$lib/data/Constants';
	import type { PublicationCode } from '$lib/data/Constants';
	
	export let book: string = '';
	
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
			<ListBoxItem bind:group={book} name="medium" value={bookCode.code}>
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
			</ListBoxItem>
		{/each}
	</ListBox>
</div>