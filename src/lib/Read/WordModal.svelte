<script lang="ts">
	//export let parent: any;
	
	import { modalStore } from '@skeletonlabs/skeleton';
	
	import { knownWords, knownCharacters } from '$lib/data/AppSaveData';
	import { myDictionary } from '$lib/data/Preload';
	import type { DictionaryEntry } from '$lib/Classes/MyDictionary';
	import { userDictionary } from '$lib/data/AppSaveData';
	
	const word = $modalStore[0].meta?.word
	
	const dictionaryEntry: DictionaryEntry = $myDictionary.get(word) as DictionaryEntry;
	
	let formData = {
		definition: dictionaryEntry.definition,
		wordLearned: $knownWords.has(word),
		pinyins: [] as string[],
		charactersLearned: [] as boolean[],
	}
	for (let i = 0; i < dictionaryEntry.characters.length; i++) {
		formData.pinyins.push(dictionaryEntry.pinyin[i]);
		formData.charactersLearned.push($knownCharacters.has(dictionaryEntry.characters[i]));
	}
	
	function handleCancel() {
		modalStore.close();
	}
	function handleSave() {
		let newEntryNeeded = false;
		const entry: DictionaryEntry = {
			word,
			definition: formData.definition,
			characters: [],
			pinyin: [],
			duplicates: [],
		}
		
		// update known words
		if ($knownWords.has(word) !== formData.wordLearned) {
			if (formData.wordLearned) {
				$knownWords.add(word);
			} else {
				$knownWords.remove(word);
			}
			$knownWords = $knownWords;
		}
		
		for (let i = 0; i < formData.charactersLearned.length; i++) {
			const character = dictionaryEntry.characters[i];
			const pinyinOld = dictionaryEntry.pinyin[i];
			const pinyinNew = formData.pinyins[i];
			
			entry.characters.push(character);
			entry.pinyin.push(pinyinNew);
			
			// update known characters
			if ($knownCharacters.has(character) !== formData.charactersLearned[i]) {
				if (formData.charactersLearned[i]) {
					$knownCharacters.add(character);
				} else {
					$knownCharacters.remove(character);
				}
				$knownCharacters = $knownCharacters;
			}
			
			// check if need to add entry to user dictionary
			if (!newEntryNeeded &&
				((pinyinOld !== pinyinNew &&
				pinyinNew !== '') ||
				(dictionaryEntry.definition !== formData.definition &&
				formData.definition !== '')))
			{
				newEntryNeeded = true;
			}
		}
		
		// add user dictionary entry
		if (newEntryNeeded) {
			$userDictionary.add(entry);
			$userDictionary = $userDictionary;
			
			$myDictionary.add(entry);
			$myDictionary = $myDictionary;
			
			// update the html in the current page
			$modalStore[0].meta?.updateRuby(entry);
		}
		
		modalStore.close();
	}
</script>

<div class="table-container w-modal text-center p-4 bg-surface-200-700-token">
	<h1>{word}</h1>
	<hr class="my-4" />
	<table class="table border-spacing-x-40 mb-4">
		<tbody>
			<tr class="bg-secondary-500">
				<th>Word</th>
				<th>Definition</th>
				<th class="pr-2">Learned</th>
			</tr>
			<tr>
				<td class="text-lg font-semibold">{word}</td>
				<td class="">
					<input class="input variant-ghost-secondary" type="text" placeholder="Definition" bind:value={formData.definition}>
				</td>
				<td class=""><input class="checkbox variant-filled-secondary" type="checkbox" bind:checked={formData.wordLearned} /></td>
			</tr>
			<tr class="bg-tertiary-500">
				<th>Character</th>
				<th>Pinyin</th>
				<th class="pr-2">Learned</th>
			</tr>
			{#each dictionaryEntry.characters as character, i}
				<tr>
					<td class="text-lg font-semibold">{character}</td>
					<td class=""><input class="input variant-ghost-tertiary" type="text" placeholder="Pinyin" bind:value={formData.pinyins[i]}></td>
					<td class=""><input class="checkbox variant-filled-tertiary" type="checkbox" bind:checked={formData.charactersLearned[i]} /></td>
				</tr>
			{/each}
		</tbody>
	</table>
	
	<div class="text-right">
		<button type="button" class="btn variant-filled mx-1" on:click={handleCancel}>Cancel</button>
		<button type="button" class="btn variant-filled-primary mx-1" on:click={handleSave}>Save</button>
	</div>
	
</div>

<style>
	.table tbody td {
		vertical-align: middle;
	}
	
	.table tbody td.text-lg {
		font-size: 1.125rem; /* 18px */
		line-height: 1.75rem; /* 28px */
	}
	
	th:first-of-type,
	td:first-of-type {
		padding-left: 1rem;
	}
	th:last-of-type,
	td:last-of-type {
		padding-right: 1rem;
	}
	
	tr > th {
		padding-top: 1rem;
		padding-bottom: .5rem;
	}
</style>