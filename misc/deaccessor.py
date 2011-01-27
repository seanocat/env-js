#!/usr/bin/env python
#
# deaccessor.py
# http://blog.client9.com/2010/03/using-jslint-with-javascript-getters.html
# Copyright 2010 Nick Galbreath
# MIT License
# http://www.opensource.org/licenses/mit-license.php
#
# Converts javascript getters/setters to traditional function format.
# This allows static analysis tools such as jslint to still run.  Also
# has minimal checking to make sure getters do not have an arg and
# that setters have only 1 arg.
#
# specifically:
#  get NAME() {  ----> get_NAME: function () {
#  set NAME(arg) { ----> set_NAME: function (ARG) {
#
# usage:
#   ./deaccessor.py < INFILE > OUTFILE
#
# then with jslint http://www.JSLint.com/rhino/jslint.js
#  java -jar js.jar jslint.js OUTFILE
#
#
import re
import sys

write = sys.stdout.write
error = sys.stderr.write

getsetre = re.compile('\s+(get|set)\s+(\w+)\s*\\(([^)]*)\\)')

# put whatever you want as preamble
write("""
/*jslint browser: false,
   evil: true,
   nomen: false,
   regexp: false,
   plusplus: false,
   rhino: true,
   white: false,
   onevar: false,
   eqeqeq: false,
   bitwise: false,
   maxerr: 100000,
   es5: false
*/
/*global __this__: true,
	console: true, 
    window:true, 
    document:true, 
    XML: true, 
    XMLList: true, 
    exports: true, 
    require: true,
    Envjs:true,
	Aspect: true,
	setTimeout: true,
	XMLHttpRequest: true,
	NodeList: true,
	HTMLDocument: true,
	DOMImplementation: true,
	JSON: true,
	Window: true,
	Console: true,
	Node: true,
	NamespaceNodeMap: true,
	DOMException: true,
	NamedNodeMap: true,
	Namespace: true,
	CharacterData: true,
	Text: true,
	CDATASection: true,
	Comment: true,
	DocumentType: true,
	Attr: true,
	Element: true,
	Document: true,
	XPathExpression: true,
	DocumentFragment: true,
	ProcessingInstruction: true,
	Range: true,
	DOMParser: true,
	XMLParser: true,
	ProcessingInstruction: true,
	Entity: true,
	EntityReference: true,
	Notation: true,
	XMLSerializer: true,
	XPathResult: true,
	EventTarget: true,
	Event: true,
	EventException: true,
	KeyboardEvent: true,
	MouseEvent: true,
	MutationEvent: true, 
	UIEvent: true,
	DocumentEvent: true,
	setTimeout: true,
	clearTimeout: true,
	setInterval: true,
	clearInterval: true,
	HTMLAnchorElement: true,
	HTMLAreaElement: true,
	HTMLBaseElement: true,
	HTMLQuoteElement: true,
	HTMLCanvasElement: true,
	CanvasRenderingContext2D: true,
	HTMLQuoteElement: true,
	HTMLBodyElement: true,
	HTMLBRElement: true,
	HTMLButtonElement: true,
	HTMLElement: true,
	HTMLTableColElement: true,
	HTMLModElement: true,
	HTMLDivElement: true,
	HTMLFieldSetElement: true,
	HTMLFormElement: true,
	HTMLFrameElement: true,
	HTMLFrameSetElement: true,
	HTMLHeadingElement: true,
	HTMLHeadElement: true,
	HTMLHRElement: true,
	HTMLHtmlElement: true,
	HTMLIFrameElement: true,
	HTMLImageElement: true,
	Image: true,
	HTMLInputElement: true,
	HTMLLabelElement: true,
	HTMLLegendElement: true,
	HTMLDListElement: true,
	HTMLLIElement: true,
	HTMLLinkElement: true,
	HTMLMapElement: true,
	HTMLMetaElement: true,
	HTMLObjectElement: true,
	HTMLOptGroupElement: true,
	HTMLOListElement: true,
	HTMLOptionElement: true,
	Option: true,
	HTMLParagraphElement: true,
	HTMLParamElement: true,
	HTMLPreElement: true,
	HTMLScriptElement: true,
	HTMLSelectElement: true,
	HTMLSpanElement: true,
	HTMLStyleElement: true,
	HTMLTableElement: true,
	HTMLTableHeaderCellElement: true,
	HTMLTableSectionElement: true,
	HTMLTableDataCellElement: true,
	HTMLTableCellElement: true,
	HTMLTextAreaElement: true,
	HTMLTitleElement: true,
	HTMLTableRowElement: true,
	HTMLUListElement: true,
	HTMLUnknownElement: true,
	HTMLCollection: true,
	CSSRule: true,
	CSSStyleRule: true,
	CSSImportRule: true,
	CSSMediaRule: true,
	CSSFontFaceRule: true,
	CSSPageRule: true,
	CSSStyleSheet: true,
	CSSRuleList: true,
	CSS2Properties: true,
	CSSStyleDeclaration: true,
	StyleSheet: true,
	StyleSheetList: true,
	History: true,
	Navigator: true,
	Screen: true,
	Location: true
*/
""")
count = 0
for line in sys.stdin:
    count += 1
    mo = getsetre.search(line)
    if mo:
        if mo.group(1) == 'get':
            if len(mo.group(3).strip()) > 0:
                error("WARNING: line %d: Getter has argument: %s\n" % (count, line.strip()))
        elif mo.group(1) == 'set':
            if len(mo.group(3).strip().split(',')) > 1:
                error("WARNING: line %d: Setter has more than one arg: %s\n" % (count, line.strip()))

        write("%s%s_%s: function (%s)%s" %
              (line[0:mo.start(1)], # before def
               mo.group(1),         # get or set
               mo.group(2),         # function name
               mo.group(3),         # arg list
               line[mo.end(3)+1:])  # after arglist ending ')'
              )
    else:
        write(line)
