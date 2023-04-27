import { AVLTree } from '@foxglove/avl';
import dictionaryJson from '$lib/data/dictionary.json';

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

export default class MyDictionary {
	#dictionary: AVLTree<string, DictionaryEntry>;
	initiated: boolean = false;
	
	constructor(dictionaryJson: DictionaryEntry[] = []) {
		this.#dictionary = new AVLTree<string, DictionaryEntry>((a, b) => a.localeCompare(b, 'zh-CN'));
		dictionaryJson.forEach(entry => this.#dictionary.set(entry.word, entry));
	}
	
	async initiate(dictionaryEntries: DictionaryEntry[] = dictionaryJson as DictionaryEntry[]) {
		if (!this.initiated) {
			dictionaryEntries.forEach(entry => this.#dictionary.set(entry.word, entry));
			this.initiated = true;
		}
	}
	
	add(entry: DictionaryEntry) {
		this.remove(entry.word);
		this.#dictionary.set(entry.word, entry);
	}
	
	addMultiple(entries: DictionaryEntry[]) {
		entries.forEach((entry) => this.add(entry));
	}
	
	remove(word: string) {
		this.#dictionary.delete(word);
	}
	
	has(word: string): boolean {
		return this.#dictionary.has(word);
	}
	
	get(word: string): DictionaryEntry | undefined {
		return this.#dictionary.get(word);
	}
}