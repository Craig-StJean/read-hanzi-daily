import { convertFileSrc } from '@tauri-apps/api/tauri';
import { sep } from '@tauri-apps/api/path';

export default class HtmlAdjuster {
	html;
	path;
	
	// example fullPath: "C:/.../epub/bt_CHS/OEBPS/"
	constructor(html: Document, fullPath: string) {
		this.html = html;
		this.path = fullPath;
		
		this.#changeImgSrc();
	}
	
	#changeImgSrc() {
		let imgElements = this.html.querySelectorAll('img');
		
		imgElements.forEach(img => {
			let imgPath = img.getAttribute('src');
			imgPath ??= '';
			imgPath = imgPath.split('/').join(sep);
			imgPath = imgPath.split('\\').join(sep);
			img.setAttribute('src', convertFileSrc(this.path + imgPath));
		});
	}
	
	#addRuby() {
		
	}
}