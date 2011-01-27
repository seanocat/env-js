/*
 * Envjs @VERSION@
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 *
 * This file simply provides the global definitions we need to
 * be able to correctly implement to core browser DOM Event interfaces.

 - leaked globally -

var Event,
    MouseEvent,
    UIEvent,
    KeyboardEvent,
    MutationEvent,
    DocumentEvent,
    EventTarget,
    EventException;
    
 */

var Envjs = Envjs || require('envjs/platform/core').Envjs,
	After = After || require('envjs/platform/core').After,
	Document = Document || require('envjs/dom').Document;