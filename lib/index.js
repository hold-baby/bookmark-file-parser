"use strict";
exports.__esModule = true;
exports.parseByPath = exports.parseByString = exports.getRootFolder = exports.MarkType = void 0;
var fs_1 = require("fs");
var cheerio_1 = require("cheerio");
var MarkType;
(function (MarkType) {
    MarkType["folder"] = "folder";
    MarkType["site"] = "site";
})(MarkType = exports.MarkType || (exports.MarkType = {}));
exports.getRootFolder = function (body) {
    var h3 = body.find("h3").first();
    var isChrome = typeof h3.attr("personal_toolbar_folder") === "string";
    if (isChrome) {
        return body.children("dl").first();
    }
    var isSafari = typeof h3.attr("folded") === "string";
    if (isSafari) {
        return body;
    }
    var isIE = typeof h3.attr("item_id") === "string";
    if (isIE) {
        return body.children("dl").first();
    }
    var isFireFox = h3.text() === "Mozilla Firefox";
    if (isFireFox) {
        return body.children("dl").first();
    }
    return body.children("dl").first();
};
exports.parseByString = function (content) {
    var $ = cheerio_1.load(content, {
        decodeEntities: false
    });
    var body = $("body");
    var root = [];
    var rdt = exports.getRootFolder(body).children("dt");
    var parseNode = function (node) {
        var eq0 = node.children().eq(0);
        var name = eq0.html() || "";
        var type = "site";
        var href = "";
        var icon = "";
        var children = [];
        switch (eq0[0].name) {
            case "h3":
                // folder
                type = "folder";
                var dl = node.children("dl").first();
                var dts = dl.children();
                var ls = dts.toArray().map(function (ele) {
                    if (ele.name !== "dt")
                        return null;
                    return parseNode($(ele));
                });
                children = ls.filter(function (item) { return item !== null; });
            case "a":
                // site
                href = eq0.attr("href") || "";
                icon = eq0.attr("icon") || "";
        }
        return {
            name: name,
            type: type,
            href: href,
            icon: icon,
            children: children
        };
    };
    rdt.each(function (_, item) {
        var node = $(item);
        var child = parseNode(node);
        root.push(child);
    });
    return root;
};
exports.parseByPath = function (path) {
    var content = fs_1.readFileSync(path, 'utf-8');
    return exports.parseByString(content);
};
exports["default"] = { parseByPath: exports.parseByPath, parseByString: exports.parseByString };
