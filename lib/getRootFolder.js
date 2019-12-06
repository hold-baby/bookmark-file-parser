module.exports = function(body){

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
	
}