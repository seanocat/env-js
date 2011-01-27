/*
 * Envjs @VERSION@ 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License

This module leaks the following global definitions. 

var Window,
    Screen,
    History,
    Navigator;

 */

var Envjs               = Envjs             || require('envjs/platform/core').Envjs,
    DOMImplementation   = DOMImplementation || require('envjs/dom').DOMImplementation,
    HTMLDocument        = HTMLDocument      || require('envjs/html').HTMLDocument,
    HTMLFrameElement    = HTMLFrameElement  || require('envjs/html').HTMLFrameElement,
    HTMLIFrameElement   = HTMLIFrameElement || require('envjs/html').HTMLIFrameElement,
    HTMLParser          = HTMLParser        || require('envjs/parser').HTMLParser,
    Location            = Location          || require('envjs/xhr').Location,
    CSSRule             = CSSRule           || require('envjs/css').CSSRule;

