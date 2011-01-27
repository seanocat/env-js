/*
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 *
 * This file simply provides the global definitions we need to
 * be able to correctly implement to core browser DOM HTML interfaces.

 // These are exported/leaked globally

    HTMLDocument,
    HTMLElement,
    HTMLCollection,
    HTMLAnchorElement,
    HTMLAreaElement,
    HTMLBaseElement,
    HTMLQuoteElement,
    HTMLBodyElement,
    HTMLBRElement,
    HTMLButtonElement,
    CanvasRenderingContext2D,
    HTMLCanvasElement,
    HTMLTableColElement,
    HTMLModElement,
    HTMLDivElement,
    HTMLDListElement,
    HTMLFieldSetElement,
    HTMLFormElement,
    HTMLFrameElement,
    HTMLFrameSetElement,
    HTMLHeadElement,
    HTMLHeadingElement,
    HTMLHRElement,
    HTMLHtmlElement,
    HTMLIFrameElement,
    HTMLImageElement,
    HTMLInputElement,
    HTMLLabelElement,
    HTMLLegendElement,
    HTMLLIElement,
    HTMLLinkElement,
    HTMLMapElement,
    HTMLMetaElement,
    HTMLObjectElement,
    HTMLOListElement,
    HTMLOptGroupElement,
    HTMLOptionElement,
    HTMLParagraphElement,
    HTMLParamElement,
    HTMLPreElement,
    HTMLScriptElement,
    HTMLSelectElement,
    HTMLSpanElement,
    HTMLStyleElement,
    HTMLTableElement,
    HTMLTableSectionElement,
    HTMLTableCellElement,
    HTMLTableDataCellElement,
    HTMLTableHeaderCellElement,
    HTMLTableRowElement,
    HTMLTextAreaElement,
    HTMLTitleElement,
    HTMLUListElement,
    HTMLUnknownElement,
    Image,
    Option,
    __loadImage__,
    __loadLink__;
*/

var Envjs = Envjs || require('envjs/platform/core').Envjs,
	After = After || require('envjs/platform/core').After,
	Document = Document || require('envjs/dom').Document,
	Element = Element || require('envjs/dom').Element,
	NodeList = NodeList || require('envjs/dom').NodeList,
	Node = Node || require('envjs/dom').Node,
	Event = Event || require('envjs/event').Event;
	