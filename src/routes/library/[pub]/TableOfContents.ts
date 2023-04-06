export type TOCInfo = {
	title: string;
	fileName: string;
}

export default class TableOfContents {
	#xmlTOC;
	#docTitle: string;
	#chapterTitles: string[];
	#chapterFileNames: string[];
	
	constructor(tocncxRaw: string) {
		const parser = new DOMParser();
		this.#xmlTOC = parser.parseFromString(tocncxRaw, 'text/xml');
		this.#docTitle = TableOfContents.#getDocTitle(this.#xmlTOC);
		this.#chapterTitles = TableOfContents.#getChapterTitles(this.#xmlTOC);
		this.#chapterFileNames = TableOfContents.#getChapterFileNames(this.#xmlTOC);
	}
	
	static #getDocTitle(xml: Document): string {
		const docTitleElement = xml.querySelector('docTitle > text');
		let docTitle = docTitleElement?.textContent;
		docTitle ??= '';
		return docTitle;
	}
	
	static #getChapterTitles(xml: Document): string[] {
		const navPointTitleElements = xml.querySelectorAll('navPoint.chapter > navLabel > text');
		let titles: string[] = [];
		navPointTitleElements.forEach((titleElement: Element) => titles.push((titleElement.textContent === null) ? '' : titleElement.textContent));
		
		return titles;
	}
	
	static #getChapterFileNames(xml: Document): string[] {
		const contentElements = xml.querySelectorAll('navPoint.chapter > content');
		let fileNames: string[] = [];
		
		contentElements.forEach((contentElement: Element) => {
			let fileName = contentElement.getAttribute('src');
			fileName ??= '';
			fileNames.push(fileName)
		});
		
		return fileNames;
	}
	
	get docTitle(): string {
		return this.#docTitle;
	}
	
	get chapterTitles(): string[] {
		return this.#chapterTitles;
	}
	
	get chapterFileNames(): string[] {
		return this.#chapterFileNames;
	}
	
	get chapterInfo(): TOCInfo[] {
		if (this.#chapterFileNames.length != this.#chapterTitles.length) {
			throw new Error(`There arn't the same number of titles and file names`);
		}
		
		let info: TOCInfo[] = [];
		
		for (let i = 0; i < this.#chapterTitles.length; i++) {
			info.push({
				title: this.#chapterTitles[i],
				fileName: this.#chapterFileNames[i],
			});
		}
		
		return info;
	}
}