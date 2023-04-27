export type KnownWord = {
	word: string;
	learnedDate: Date;
};
export type KnownWordUnparsed = {
	word: string;
	learnedDate: string;
};

export default class KnownWords {
	knownWords: KnownWord[];
	
	constructor(knownWordsUnparsed: KnownWordUnparsed[] = []) {
		this.knownWords = knownWordsUnparsed.map((knownWordUnparsed: KnownWordUnparsed): KnownWord => {
			return {
				word: knownWordUnparsed.word,
				learnedDate: new Date(knownWordUnparsed.learnedDate),
			}
		});
	}
	
	add(word: string, learnedDate: Date = new Date()) {
		if (this.has(word)) {
			this.remove(word);
		}
		this.knownWords.push({
			word,
			learnedDate,
		});
	}
	
	remove(word: string) {
		if (this.has(word)) {
			this.knownWords.splice(this.knownWords.findIndex((knownWord => knownWord.word == word)), 1);
		}
	}
	
	has(word: string): boolean {
		return -1 != this.knownWords.findIndex(knownWord => knownWord.word == word);
	}
	
	getAllWords(): string[] {
		let words: string[] = [];
		
		for (let knownWord of this.knownWords) {
			words.push(knownWord.word);
		}
		
		return words;
	}
	
	sort(): void {
		this.knownWords = this.knownWords.sort((a, b) => a.learnedDate.getTime() - b.learnedDate.getTime());
	}
	
	getStringifiedData(): string {
		return JSON.stringify(this.knownWords, null, 2);
	}
}