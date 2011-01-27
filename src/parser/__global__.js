/**
 * these are both non-standard globals that
 * provide static namespaces and functions
 * to support the html 5 parser from nu.
 * 
 * these are intentionally leaked globally
 *  XMLParser = {},
 *  HTMLParser = {};
 *
 */ 

var Envjs = Envjs || require('envjs/platform/core').Envjs,
	After = After || require('envjs/platform/core').After,
	DOMImplementation = DOMImplementation || require('envjs/dom').DOMImplementation,
	Document = Document || require('envjs/dom').Document,
	Element = Element || require('envjs/dom').Element,
	NodeList = NodeList || require('envjs/dom').NodeList,
	Node = Node || require('envjs/dom').Node,
	HTMLDocument = HTMLDocument || require('envjs/html').HTMLDocument,
	HTMLElement = HTMLElement || require('envjs/html').HTMLElement,
	setTimeout = setTimeout || require('envjs/timer').setTimeout,
	clearTimeout = clearTimeout || require('envjs/timer').clearTimeout,
	setInterval = setInterval || require('envjs/timer').setInterval,
	clearInterval = clearInterval || require('envjs/timer').clearInterval;