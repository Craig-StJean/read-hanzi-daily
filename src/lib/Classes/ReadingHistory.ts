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
	
	remove(publicationPath: string): boolean {
		const length = this.history.length;
		this.history = this.history.filter(element => element !== publicationPath);
		
		return this.history.length !== length;
	}
	
	add(publicationPath: string): boolean {
		let previousPath = this.latestRead();
		
		this.remove(publicationPath);
		this.history.unshift(publicationPath);
		
		return previousPath !== publicationPath;
	}
	
	latestRead(): string {
		if (this.history[0]) {
			return this.history[0];
		} else {
			return '';
		}
	}
	
	at(index: number): string {
		return this.history[index];
	}
	
	getFullHistory(): string[] {
		return [...this.history];
	}
	
	getStringifiedData(): string {
		return JSON.stringify(this.history, null, 2);
	}
}