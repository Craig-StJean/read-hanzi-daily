import dictionaryJson  from '$lib/data/dictionary.json';
import type { DictionaryEntry } from '$lib/Classes/MyDictionary';
import type MyDictionary from '$lib/Classes/MyDictionary';

onmessage = async (event) => {
	console.log('You call my liege');
	console.log(event.data)
	let myDictionary = event.data as MyDictionary;
	myDictionary.initiate(dictionaryJson as DictionaryEntry[]);
}