<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { knownWords, knownCharacters } from '$lib/data/AppSaveData';
	
	export let data;
	
	let definitions: NodeListOf<Element>;
	let pinyins: NodeListOf<Element>;
	
	onMount(async () => {
		definitions = document.querySelectorAll('ruby.w > rt');
		definitions.forEach(definition => {
			definition.onclick = (e: Event) => {
				$knownWords.add(e.target.getAttribute('data-word'));
				$knownWords = $knownWords;
				e.target.style.display = 'none';
			}
		});
		
		pinyins = document.querySelectorAll('ruby.c > rt');
		pinyins.forEach(pinyin => {
			pinyin.onclick = (e: Event) => {
				$knownCharacters.add(e.target.getAttribute('data-char'));
				$knownCharacters = $knownCharacters;
				e.target.style.visibility = 'hidden';
			}
		});
	});
	
	async function updateWords(rts: NodeListOf<Element>, words: string[]) {
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
	async function updateCharacters(rts: NodeListOf<Element>, characters: string[]) {
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
	
	$: definitions && updateWords(definitions, $knownWords.getAllWords());
	$: pinyins && updateCharacters(pinyins, $knownCharacters.getAllCharacters());
</script>

<article class="prose prose-xl dark:prose-invert">{@html data.bodyInnerHtml}</article>