import KnownWords from './KnownWords';
import type { KnownWord } from './KnownWords';

type KnownCharacter = {
	character: string;
	dateLearned: Date;
}

export default class KnownCharacters extends KnownWords {
	constructor(knownCharacters: KnownCharacter[] = []) {
		super(KnownCharacters.#knownCharactersToKnownWords(knownCharacters));
	}
	
	static #knownCharactersToKnownWords(knownCharacters: KnownCharacter[]): KnownWord[] {
		return knownCharacters.map(knownCharacter => KnownCharacters.#knownCharacterToKnownWord(knownCharacter));
	}
	static #knownCharacterToKnownWord(knownCharacter: KnownCharacter): KnownWord {
		return {
			word: knownCharacter.character,
			learnedDate: knownCharacter.dateLearned,
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
}