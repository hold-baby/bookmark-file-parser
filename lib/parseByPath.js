const fs = require("fs")
const parseByString = require("./parseByString")

module.exports = (path) => {
	const content = fs.readFileSync(path, 'utf-8')
	return parseByString(content)
}
