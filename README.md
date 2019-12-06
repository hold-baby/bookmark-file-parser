# bookmark-file-parser
Parse Firefox/Chrome/IE/Safari HTML bookmarks files

## use
```javascript
const parseByPath = require("bookmark-file-parser").parseByPath

const dirname = "./chrome.html"
const data = parseByPath(dirname)

```
or
```javascript
const fs = require("fs")
const parseByString = require("bookmark-file-parser").parseByString

const dirname = "./chrome.html"
const content = fs.readFileSync(dirname, "utf-8")
const data = parseByString(content)
```
## output
```javascript
[{
	"name": "chrome",
    "type": "folder",
    "href": "",
    "icon": "",
    "children": [{
        "name": "google",
        "type": "site",
        "href": "https://www.google.com/",
        "icon": "",
        "children": []
    }]
}]  
```