import { sep } from '@tauri-apps/api/path';
import { exists, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { writeTextFile } from '@tauri-apps/api/fs';

import { writable } from 'svelte/store';

import ReadingHistory from '$lib/Classes/ReadingHistory';
import KnownWords from '$lib/Classes/KnownWords';
import KnownCharacters from '$lib/Classes/KnownCharacters';
import MyDictionary from '$lib/Classes/MyDictionary';

import { SAVE_DIRECTORY } from '$lib/data/Constants';


type Stringifyable = {
	getStringifiedData: () => string;
}


const canSave = {
	readingHistory: false,
	knownWords: false,
	knownCharacters: false,
	userDictionary: false,
};


// Reading History
let readingHistoryInitial = new ReadingHistory();
if (await exists(SAVE_DIRECTORY + 'readingHistory.json', { dir: BaseDirectory.AppData })) {
	const json = await readTextFile(SAVE_DIRECTORY + 'readingHistory.json', { dir: BaseDirectory.AppData });
	readingHistoryInitial = new ReadingHistory(JSON.parse(json));
}
export const readingHistory = writable(readingHistoryInitial);
canSave.readingHistory = true;


// Known Words
let knownWordsInitial = new KnownWords();
if (await exists(SAVE_DIRECTORY + 'knownWords.json', { dir: BaseDirectory.AppData })) {
	const json = await readTextFile(SAVE_DIRECTORY + 'knownWords.json', { dir: BaseDirectory.AppData });
	knownWordsInitial = new KnownWords(JSON.parse(json));
}
export const knownWords = writable(knownWordsInitial);
canSave.knownWords = true;


// Known Characters
let knownCharactersInitial = new KnownCharacters();
if (await exists(SAVE_DIRECTORY + 'knownCharacters.json', { dir: BaseDirectory.AppData })) {
	const json = await readTextFile(SAVE_DIRECTORY + 'knownCharacters.json', { dir: BaseDirectory.AppData });
	knownCharactersInitial = new KnownCharacters(JSON.parse(json));
}
export const knownCharacters = writable(knownCharactersInitial);
canSave.knownCharacters = true;


// Dictionary
const dictionary = new MyDictionary();
export const userDictionary = writable(dictionary);
async function loadDictionary() {
	await dictionary.initiateType('user');
	canSave.userDictionary = true;
}
loadDictionary();


// Saving
export async function save(saveData: Stringifyable, saveName: string): Promise<void> {
	if (canSave[saveName]) {
		await writeTextFile({ path: SAVE_DIRECTORY + saveName + '.json', contents: saveData.getStringifiedData() }, { dir: BaseDirectory.AppData });
	} else {
		console.log('Cannot save ' + saveName);
	}
}

console.log('appsavedata')