import { readFileSync } from "fs"
import { load } from "cheerio"

export enum MarkType {
	"folder" = "folder",
	"site" = "site"
}
export type TMarkType = keyof typeof MarkType

export interface IBaseMark {
	name: string;
	type: TMarkType;
	href: string;
	icon: string;
	children: IBaseMark[];
}

export interface IFolderMark extends IBaseMark {
	type: "folder";
	children: IBaseMark[];
}
export interface ISiteMark extends IBaseMark {
	type: "site";
	children: [];
}

export const getRootFolder = (body: cheerio.Cheerio) => {

	const h3 = body.find("h3").first()

	const isChrome = typeof h3.attr("personal_toolbar_folder") === "string";

	if(isChrome){
		return body.children("dl").first()
	}

	const isSafari = typeof h3.attr("folded") === "string";

	if(isSafari){
		return body
	}

	const isIE = typeof h3.attr("item_id") === "string";

	if(isIE){
		return body.children("dl").first()
	}

	const isFireFox = h3.text() === "Mozilla Firefox";

	if(isFireFox){
		return body.children("dl").first()
	}

	return body.children("dl").first()
	
}

export const parseByString = (content: string) => {
	const $ = load(content, {
		decodeEntities: false
	});

	const body = $("body")
	const root: IBaseMark[] = []
	const rdt = getRootFolder(body).children("dt")

	const parseNode = (node: cheerio.Cheerio) => {
		const eq0 = node.children().eq(0)
		const name = eq0.html() || ""
		let type: TMarkType = "site";
		let href = "";
		let icon = "";
		let children: IBaseMark[] = []

		switch(eq0[0].name){
			case "h3":
				// folder
				type = "folder";
				const dl = node.children("dl").first()
				const dts = dl.children()

				const ls = dts.toArray().map((ele) => {
					if(ele.name !== "dt") return null
					return parseNode($(ele))
				})
				children = ls.filter((item) => item !== null) as IBaseMark[]
			case "a":
				// site
				href = eq0.attr("href") || ""
				icon = eq0.attr("icon") || ""
		}
		return {
			name,
			type,
			href,
			icon,
			children
		}
	}

	rdt.each((_, item) => {
		const node = $(item)
		const child = parseNode(node)
		root.push(child)
	})

	return root
}

export const parseByPath = (path: string) => {
	const content = readFileSync(path, 'utf-8')
	return parseByString(content)
}

export default { parseByPath, parseByString }