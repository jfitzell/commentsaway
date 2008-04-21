// ==UserScript==
// @name           Comments Away
// @namespace      http://code.google.com/p/commentsaway
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function hideNode(node) {
	var showLink = document.createElement('a');
	showLink.href = '#';
	showLink.innerHTML = 'Show Comments >>';

	// This is how we have to set event handlers:
	// See http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=3
	var oldDisplay = node.style.display;
	showLink.addEventListener("click", function(event) {
			node.style.display = oldDisplay;
			event.preventDefault();
		}, true);

	node.parentNode.insertBefore(showLink, node);

	//node.parentNode.removeChild(node);
	node.style.display = 'none';

}

var commentNodes = [];

// Blogspot
var nodes = xpath("//div[@id='comments']");
var node;

for (var i=0; i < nodes.snapshotLength; i++) {
	node = nodes.snapshotItem(i);

	commentNodes.push(node);
}

commentNodes.forEach(hideNode);