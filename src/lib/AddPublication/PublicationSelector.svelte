<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	
	export let publication: string = 'books';
</script>


<div class="flex justify-center">
	<ListBox active="variant-filled-primary" hover="hover:variant-soft-primary">
		
		<ListBoxItem bind:group={publication} name="medium" value="books">
			<svelte:fragment slot="lead">
				<!-- https://feathericons.dev/?search=book&iconset=feather -->
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
					<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
				</svg>
			</svelte:fragment>
			Books
		</ListBoxItem>
		
		<ListBoxItem bind:group={publication} name="medium" value="watchtower">
			<svelte:fragment slot="lead">
				<!-- https://feathericons.dev/?search=book-open&iconset=feather -->
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" data-darkreader-inline-stroke="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="--darkreader-inline-stroke:currentColor;">
					<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
					<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
				</svg>
			</svelte:fragment>
			Watchtower
		</ListBoxItem>
		
	</ListBox>
</div>
