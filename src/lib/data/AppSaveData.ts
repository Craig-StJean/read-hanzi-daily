import { sep } from '@tauri-apps/api/path';
import { exists, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { writeTextFile } from '@tauri-apps/api/fs';

import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

import ReadingHistory from '$lib/Classes/ReadingHistory';
import KnownWords from '$lib/Classes/KnownWords';
import KnownCharacters from '$lib/Classes/KnownCharacters';

const saveDirectory = 'save' + sep;


type Stringifyable = {
	getStringifiedData: () => string;
}


// Reading History
let readingHistoryInitial = new ReadingHistory();
if (await exists(saveDirectory + 'readingHistory.json', { dir: BaseDirectory.AppData })) {
	const json = await readTextFile(saveDirectory + 'readingHistory.json', { dir: BaseDirectory.AppData });
	readingHistoryInitial = new ReadingHistory(JSON.parse(json));
}
export const readingHistory: Writable<ReadingHistory> = localStorageStore('readingHistory', readingHistoryInitial);


// Known Words
let knownWordsInitial = new KnownWords();
if (await exists(saveDirectory + 'knownWords.json', { dir: BaseDirectory.AppData })) {
	const json = await readTextFile(saveDirectory + 'knownWords.json', { dir: BaseDirectory.AppData });
	knownWordsInitial = new KnownWords(JSON.parse(json));
}
export const knownWords: Writable<KnownWords> = localStorageStore('knownWords', knownWordsInitial);


// Known Characters
let knownCharactersInitial = new KnownCharacters();
if (await exists(saveDirectory + 'knownCharacters.json', { dir: BaseDirectory.AppData })) {
	const json = await readTextFile(saveDirectory + 'knownCharacters.json', { dir: BaseDirectory.AppData });
	knownCharactersInitial = new KnownCharacters(JSON.parse(json));
}
export const knownCharacters: Writable<KnownCharacters> = localStorageStore('knownCharacters', knownCharactersInitial);


// Saving
export async function save(saveData: Stringifyable, saveName: string): Promise<void> {
	await writeTextFile({ path: saveDirectory + saveName + '.json', contents: saveData.getStringifiedData() }, { dir: BaseDirectory.AppData });
	console.log(`"${saveData.getStringifiedData()}" saved to "${saveName}"`);
}