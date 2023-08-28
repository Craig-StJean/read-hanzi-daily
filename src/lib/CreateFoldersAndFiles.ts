import { exists, createDir, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { SAVE_DIRECTORY } from '$lib/data/Constants';

if (!await exists('epubs', { dir: BaseDirectory.AppData })) {
	await createDir('epubs', { dir: BaseDirectory.AppData });
}

if (!await exists(SAVE_DIRECTORY, { dir: BaseDirectory.AppData })) {
	await createDir(SAVE_DIRECTORY, { dir: BaseDirectory.AppData });
}

if (!await exists(SAVE_DIRECTORY + 'readingHistory.json', { dir: BaseDirectory.AppData })) {
	await writeTextFile({ path: SAVE_DIRECTORY + 'readingHistory.json', contents: '[]' }, { dir: BaseDirectory.AppData });
}

if (!await exists(SAVE_DIRECTORY + 'knownWords.json', { dir: BaseDirectory.AppData })) {
	await writeTextFile({ path: SAVE_DIRECTORY + 'knownWords.json', contents: '[]' }, { dir: BaseDirectory.AppData });
}

if (!await exists(SAVE_DIRECTORY + 'knownCharacters.json', { dir: BaseDirectory.AppData })) {
	await writeTextFile({ path: SAVE_DIRECTORY + 'knownCharacters.json', contents: '[]' }, { dir: BaseDirectory.AppData });
}

if (!await exists(SAVE_DIRECTORY + 'userDictionary.json', { dir: BaseDirectory.AppData })) {
	await writeTextFile({ path: SAVE_DIRECTORY + 'userDictionary.json', contents: '[]' }, { dir: BaseDirectory.AppData });
}

export default {};