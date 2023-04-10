/**
 * Essentially an array of string paths.
 * Sorted with first item being most recent and no duplicates.
 * @class
 */
export default class ReadingHistory {
	history: string[] = [];
	
	constructor(arrayOfPublicationPaths: string[] = []) {
		this.history = arrayOfPublicationPaths;
	}
	
	remove(publicationPath: string) {
		this.history = this.history.filter(element => element !== publicationPath);
	}
	
	add(publicationPath: string) {
		this.remove(publicationPath);
		this.history.unshift(publicationPath);
	}
	
	latestRead(): string {
		return this.history[0];
	}
	
	at(index: number) {
		return this.history[index];
	}
	
	getFullHistory(): string[] {
		return [...this.history];
	}
	
	getStringifiedData(): string {
		return JSON.stringify(this.history);
	}
}