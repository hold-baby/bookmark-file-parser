import { parseByPath, parseByString } from "../lib"
import { resolve } from "path"
import { readFileSync } from "fs"

const file = {
	chrome: resolve(__dirname, "./chrome.html")
}

test("parse by path", () => {
  const marks = parseByPath(file.chrome, "utf-8")
  expect(marks instanceof Array).toBeTruthy()
})

test("parse by string", () => {
  const str = readFileSync(file.chrome, "utf-8")
  const marks = parseByString(str)
  expect(marks instanceof Array).toBeTruthy()
})