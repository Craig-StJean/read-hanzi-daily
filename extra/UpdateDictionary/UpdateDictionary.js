/**
 * UpdateDictionary
 * @description Combines the main dictionary.json with another updates.json and writes the result to dictionary_updated.json
 */

import dictionary from './dictionary.json' assert { type: 'json' };
import updates from './updates.json' assert { type: 'json' };

updates.forEach(entry => {
	const index = dictionary.findIndex(item => item.word === entry.word);
	if (index == -1) {
		dictionary.push(entry);
	} else {
		dictionary[index] = entry;
	}
});
dictionary.sort((a, b) => a.word.localeCompare(b.word, 'zh', { collation: 'pinyin' }))

await Deno.writeTextFile('./dictionary_updated.json', JSON.stringify(dictionary, null, 2));