# bookmark-file-parser
Parse Firefox/Chrome/IE/Safari HTML bookmarks files

## install
```cmd
npm i bookmark-file-parser -S
```
## use
```javascript
import { parseByPath, parseByString } from "bookmark-file-parser"
import { readFileSync } from "fs"

const dirname = "./chrome.html"

const data1 = parseByPath(dirname)

const content = readFileSync(dirname, "utf-8")
const data2 = parseByString(content)
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