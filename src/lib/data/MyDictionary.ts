import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

import { AVLTree } from '@foxglove/avl';
import dictionaryJsonUntyped  from '$lib/data/dictionary.json';
const dictionaryJson: DictionaryEntry[] = dictionaryJsonUntyped as DictionaryEntry[];

export type DictionaryEntry = {
	word: string;
	definition: string;
	characters: string[];
	pinyin: string[];
	duplicates: Duplicate[];
};
type Duplicate = {
	definition: string;
	pinyin: string[];
}

export class MyDictionary {
	#dictionary: AVLTree<string, DictionaryEntry>;
	
	constructor(dictionaryJson: DictionaryEntry[]) {
		this.#dictionary = new AVLTree<string, DictionaryEntry>((a, b) => a.localeCompare(b, 'zh-CN'));
		dictionaryJson.forEach(entry => this.#dictionary.set(entry.word, entry));
	}
	
	has(word: string): boolean {
		return this.#dictionary.has(word);
	}
	
	get(word: string): DictionaryEntry | undefined {
		return this.#dictionary.get(word);
	}
}

let dictionary = new MyDictionary(dictionaryJson);

export const myDictionary: Writable<MyDictionary> = localStorageStore('myDictionary', dictionary);