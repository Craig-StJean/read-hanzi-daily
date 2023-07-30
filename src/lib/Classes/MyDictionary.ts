import { exists, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

import { AVLTree } from '@foxglove/avl';
import { SAVE_DIRECTORY } from "$lib/data/Constants";
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
	
	/**
	 * Fills the dictionary with entries depending on what type you want
	 * 
	 * @function
	 * @param {string} type - can be either "master", "user", or "empty"
	 * 
	 * master: fills with default entries and incorporates user entries
	 * user: only user entries
	 * empty: no entries
	 */
	async initiateType(type: string) {
		let userEntries;
		switch (type) {
			case 'master':
				await this.initiate(dictionaryJson as DictionaryEntry[]);
				userEntries = await getUserEntries();
				this.addMultiple(userEntries);
				break;
			case 'user':
				userEntries = await getUserEntries();
				await this.initiate(userEntries);
				break;
			case 'empty':
				this.initiate();
		}
		
		// helper
		async function getUserEntries(): Promise<DictionaryEntry[]> {
			if (await exists(SAVE_DIRECTORY + 'userDictionary.json', { dir: BaseDirectory.AppData })) {
				const json = await readTextFile(SAVE_DIRECTORY + 'userDictionary.json', { dir: BaseDirectory.AppData });
				const entries = JSON.parse(json) as DictionaryEntry[];
				return entries;
			}
			return [];
		}
	}
	async initiate(dictionaryEntries: DictionaryEntry[] = [] as DictionaryEntry[]) {
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
	
	getStringifiedData(): string {
		let json: DictionaryEntry[] = [];
		this.#dictionary.forEach((entry) => json.push(entry));
		
		return JSON.stringify(json, null, 2);
	}
	
	forEach(fn: (value: DictionaryEntry, key: string, tree:AVLTree<string, DictionaryEntry>) => any) {
		this.#dictionary.forEach(fn);
	}
	
	combine(dictionary: MyDictionary) {
		dictionary.forEach((entry => this.add(entry)));
	}
}