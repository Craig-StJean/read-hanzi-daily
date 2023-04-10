export type KnownWord = {
	word: string;
	learnedDate: Date;
}

export default class KnownWords {
	knownWords: KnownWord[];
	
	constructor(knownWords: KnownWord[] = []) {
		this.knownWords = knownWords;
	}
	
	add(word: string, learnedDate: Date = new Date()) {
		if (this.has(word)) {
			this.knownWords.push({
				word,
				learnedDate,
			});
		}
	}
	
	remove(word: string) {
		if (this.has(word)) {
			this.knownWords.splice(this.knownWords.findIndex((knownWord => knownWord.word == word)), 1);
		}
	}
	
	has(word: string): boolean {
		return -1 != this.knownWords.findIndex(knownWord => knownWord.word == word);
	}
	
	sort(): void {
		this.knownWords = this.knownWords.sort((a, b) => a.learnedDate.getTime() - b.learnedDate.getTime());
	}
	
	getStringifiedData(): string {
		return JSON.stringify(this.knownWords);
	}
}