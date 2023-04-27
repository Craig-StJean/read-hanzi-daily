import dictionaryJson  from '$lib/data/dictionary.json';
import type { DictionaryEntry } from '$lib/Classes/MyDictionary';
import MyDictionary from '$lib/Classes/MyDictionary';

const dictionaryFunctions = {
	newDictionary(): MyDictionary {
		const dictionary = new MyDictionary();
		dictionary.initiate(dictionaryJson as DictionaryEntry[]);
		return dictionary;
	},
	
	initializeDictionary(dictionary: MyDictionary): void {
		console.log(dictionary)
		dictionary.initiate(dictionaryJson as DictionaryEntry[]);
	}
}

export type DictionaryFunctions = typeof dictionaryFunctions;

Comlink.expose(dictionaryFunctions);