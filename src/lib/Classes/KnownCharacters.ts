import KnownWords from './KnownWords';
import type { KnownWordUnparsed } from './KnownWords';

type KnownCharacter = {
	character: string;
	learnedDate: Date;
}
type KnownCharacterUnparsed = {
	character: string;
	learnedDate: string;
}

export default class KnownCharacters extends KnownWords {
	constructor(knownCharactersUnparsed: KnownCharacterUnparsed[] = []) {
		super(KnownCharacters.#knownCharactersToKnownWords(knownCharactersUnparsed));
	}
	
	// just for helping the constructor
	static #knownCharactersToKnownWords(knownCharacters: KnownCharacterUnparsed[]): KnownWordUnparsed[] {
		return knownCharacters.map(knownCharacter => KnownCharacters.#knownCharacterToKnownWord(knownCharacter));
	}
	static #knownCharacterToKnownWord(knownCharacter: KnownCharacterUnparsed): KnownWordUnparsed {
		return {
			word: knownCharacter.character,
			learnedDate: knownCharacter.learnedDate,
		}
	}
	
	add(character: string, learnedDate: Date = new Date()) {
		super.add(character, learnedDate);
	}
	
	remove(character: string) {
		super.remove(character);
	}
	
	has(character: string): boolean {
		return super.has(character);
	}
	
	/**
	 * DO NOT USE!
	 * @returns {string[]} only returns an empty array.
	 */
	getAllWords(): string[] {
		return [];
	}
	
	getAllCharacters(): string[] {
		return super.getAllWords();
	}
	
	getStringifiedData(): string {
		let stringifiedData = super.getStringifiedData();
		stringifiedData = stringifiedData.replaceAll('word', 'character');
		return stringifiedData;
	}
}