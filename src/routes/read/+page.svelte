<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	
	import { knownWords, knownCharacters } from '$lib/data/AppSaveData';
	import { myDictionary, readHtml, readHtmlLoading } from '$lib/data/Preload';
	import type { DictionaryEntry } from '$lib/Classes/MyDictionary';
	
	
	let definitions: NodeListOf<Element>;
	let pinyins: NodeListOf<Element>;
	let words: NodeListOf<Element>;
	let anchors: NodeListOf<Element>;
		
	async function makeInteractable() {
		// clicking on definition hides it
		definitions = document.querySelectorAll('ruby.w > rt');
		definitions.forEach(definition => {
			definition.onclick = (e: Event) => {
				$knownWords.add(e.currentTarget.getAttribute('data-word'));
				$knownWords = $knownWords;
				e.target.style.display = 'none';
			}
		});
		// clicking on pinyin hides it
		pinyins = document.querySelectorAll('ruby.c > rt');
		pinyins.forEach(pinyin => {
			pinyin.onclick = (e: Event) => {
				$knownCharacters.add(e.currentTarget.getAttribute('data-char'));
				$knownCharacters = $knownCharacters;
				e.target.style.visibility = 'hidden';
			}
		});
		// RIGHT clicking on word (including definition/pinyin) brings up dictionary modal
		words = document.querySelectorAll('ruby.w');
		words.forEach(word => {
			word.oncontextmenu = (e: Event) => {
				const mSettings: ModalSettings = {
					type: 'component',
					component: 'wordComponent',
					meta: { word: e.currentTarget.getAttribute('data-word'), updateRuby },
				};
				modalStore.trigger(mSettings);
				return false;
			}
		});
		// prevents anchors from working if you click on the definition/pinyin
		anchors = document.querySelectorAll('#readArticle a');
		anchors.forEach((anchor) => {
			anchor.addEventListener('click', (e: Event) => {
				if (e.target.closest('rt')) {
					console.log('prevented')
					e.preventDefault();
				}
			});
		});
	}
	
	async function updateDefinitions(rts: NodeListOf<Element>, words: string[]) {
		if (rts) {
			outer: for (let i = 0; i < rts.length; i++) {
				for (const word of words) {
					if (rts[i].getAttribute('data-word') == word) {
						rts[i].style.display = 'none';
						continue outer;
					}
				}
				
				rts[i].style.display = 'block';
			}
		}
	}
	async function updateCharacters(rts: NodeListOf<Element>, characters: string[]) {
		if (rts) {
			outer: for (let i = 0; i < rts.length; i++) {
				for (const character of characters) {
					if (rts[i].getAttribute('data-char') == character) {
						rts[i].style.visibility = 'hidden';
						continue outer;
					}
				}
				
				rts[i].style.visibility = 'visible';
			}
		}
	}
	async function updateRuby(entry: DictionaryEntry) { // called by modal
		// update definition
		const definitionElements: NodeListOf<Element> = document.querySelectorAll(`ruby.w[data-word="${entry.word}"] > rt`);
		definitionElements.forEach((element) => element.textContent = entry.definition);
		
		// update pinyin
		for (let i = 0; i < entry.characters.length; i++) {
			const pinyinElements = document.querySelectorAll(`ruby.w[data-word="${entry.word}"] > ruby.c > rt[data-char="${entry.characters[i]}"]`);
			pinyinElements.forEach((element) => element.textContent = entry.pinyin[i]);
		}
	}
	
	onMount(makeInteractable);
	
	$: $readHtml, afterUpdate(makeInteractable);
	$: updateDefinitions(definitions, $knownWords.getAllWords());
	$: updateCharacters(pinyins, $knownCharacters.getAllCharacters());
</script>

{#if $readHtmlLoading}
	<div class="fixed inset-0 flex justify-center items-center h-screen variant-glass-surface">
		<div>
			<h3 class="text-center m-5">Loading...</h3>
			<ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" class="mx-auto" />
		</div>
	</div>
{:else}
	<article id="readArticle" class="prose prose-2xl dark:prose-invert">{@html $readHtml}</article>
{/if}