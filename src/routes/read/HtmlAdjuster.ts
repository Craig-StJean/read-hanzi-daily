import { convertFileSrc } from '@tauri-apps/api/tauri';
import { sep } from '@tauri-apps/api/path';

import { MyDictionary, myDictionary, type DictionaryEntry } from '$lib/data/MyDictionary';


let dictionary: MyDictionary;
$: myDictionary.subscribe(value => {
	dictionary = value;
});


export default class HtmlAdjuster {
	htmlText;
	path;
	
	// example fullPath: "C:/.../epub/bt_CHS/OEBPS/"
	constructor(htmlText: string, fullPath: string) {
		this.htmlText = htmlText;
		this.path = fullPath;
		
		// Might not want for other applications
		this.htmlText = this.#cutAllButBodyContents(this.htmlText);
		
		this.htmlText = this.#changeImgSrc(this.htmlText);
		this.htmlText = this.#addRuby(this.htmlText);
	}
	
	// called this as a reminder that #cutAllButBodyContents() was used
	get bodyInnerHtml(): string {
		return this.htmlText;
	}
	
	
	#cutAllButBodyContents(htmlText: string): string {
		return htmlText.slice(htmlText.indexOf('>', htmlText.indexOf('<body') + 5) + 1, htmlText.lastIndexOf('</body>'));
	}
	
	
	#changeImgSrc(htmlText: string): string {
		let newHtml = '';
		let previousIndex = 0;
		
		const regexp = /(?<=<img.+?src=").+?(?=")/g;
		const matches = htmlText.matchAll(regexp);
		
		for (const match of matches) {
			let imgPath = match[0];
			let startIndex = match.index as number;
			let endIndex = startIndex + imgPath.length;
			
			imgPath = imgPath.split('/').join(sep);
			imgPath = imgPath.split('\\').join(sep);
			imgPath = convertFileSrc(this.path + imgPath);
			
			newHtml += htmlText.slice(previousIndex, startIndex) + imgPath;
			
			previousIndex = endIndex;
		}
		
		newHtml += htmlText.slice(previousIndex)
		
		return newHtml;
	}
	
	
	#addRuby(htmlText: string): string {
		//let htmlText = new XMLSerializer().serializeToString(this.html);
		htmlText = htmlText.replaceAll('‏', '');
		
		for (let index1 = htmlText.indexOf('</head>'); index1 < htmlText.length; index1++) {
			
			// no chinese text, keep going
			if (htmlText[index1] == '<') {
				index1 = htmlText.indexOf('>', index1);
				if (index1 == -1) {
					console.log('Poorly formatted html');
					break;
				}
				continue;
			}
			if (!HtmlAdjuster.isChineseCharacter(htmlText[index1])) {
				continue;
			}
			
			// found chinese text, get beginning and ending indices
			let index2 = index1 + 1;
			while(index2 < htmlText.length && HtmlAdjuster.isChineseCharacter(htmlText[index2])) {
				index2++
			}
			
			// add ruby to text
			let chineseText = htmlText.slice(index1, index2);
			let rubyText = this.#addRubyToChineseText(chineseText);
			if (rubyText.length < chineseText.length) {
				console.log(`Problem adding ruby to this text: ${chineseText}`);
			}
			
			// add ruby to html text
			htmlText = htmlText.slice(0, index1) + rubyText + htmlText.slice(index2);
			
			// get ready for next loop iteration
			index1 += rubyText.length;
		}
		
		return htmlText;
	}
	#addRubyToChineseText(chineseText: string): string {
		let rubyText = '';
		
		while (chineseText.length > 0) {
			let index = Math.min(4, chineseText.length);
			while (index > 0) {
				if (dictionary.has(chineseText.slice(0, index))) {
					// add ruby
					rubyText += this.#createRuby(dictionary.get(chineseText.slice(0, index)) as DictionaryEntry);
					break;
				}
				if (index == 1) {
					// add "not found" span
					rubyText += `<span class="noDictionaryEntry">${chineseText.slice(0, index)}</span>`;
					break
				}
				index--;
			}
			chineseText = chineseText.slice(index);
		}
		
		return rubyText;
	}
	#createRuby(entry: DictionaryEntry): string {
		let rubyPinyin = '';
		for (let i = 0; i < entry.characters.length; i++) {
			rubyPinyin += `<ruby class="c" data-char="${entry.characters[i]}">${entry.characters[i]}<rt data-char="${entry.characters[i]}">${entry.pinyin[i]}</ruby>`
		}
		
		return `<ruby class="w" data-word="${entry.word}">${rubyPinyin}<rt data-word="${entry.word}">${entry.definition}</ruby>`;
	}
	
	
	
	static isChineseCharacter(char: string): boolean {
			
		const chineseRegex = /[\u4e00-\u9fa5]/;
		if (!chineseRegex.test(char)) {
			return false;
		}
		
		return true;
	}
}