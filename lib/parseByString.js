const cheerio = require('cheerio');
const getRootFolder = require("./getRootFolder")

module.exports = (content) => {
	const $ = cheerio.load(content, {
		decodeEntities: false
	});

	const body = $("body")

	const root = []

	const rdt = getRootFolder(body).children("dt")

	rdt.each((index, item) => {
		const node = $(item)
		const child = parseNode(node)
		root.push(child)
	})

	return root

	function parseNode(node){
		const eq0 = node.children().eq(0)
		const name = eq0.html()
		let type = "";
		let href = "";
		let icon = ""

		switch(eq0[0].name){
			case "h3":
				// folder
				type = "folder";
				const dl = node.children("dl").first()
				const dts = dl.children()

				const children = dts.map((i, ele) => {
					if(ele.name !== "dt") return;

					return parseNode($(ele))
				}).toArray()

				return {
					name,
					type,
					href,
					icon,
					children
				}
				break;
			case "a":
				// site
				type = "site";
				href = eq0.attr("href")
				icon = eq0.attr("icon") || ""

				return {
					name,
					type,
					href,
					icon,
					children: []
				}
				break;
		}
	}
}
