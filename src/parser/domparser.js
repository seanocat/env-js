(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.Parser.XMLParser').
		debug('XMLParser available');    
});

/**
 * XMLParser
 */
exports.XMLParser = XMLParser = {};

XMLParser.parseDocument = function(xmlstring, xmldoc, mimetype){
    log.debug('parseDocument');
    var tmpdoc = new Document(new DOMImplementation()),
		importing,
        parent,
        importedNode,
        tmpNode;

    if(mimetype && mimetype == 'text/xml'){
        log.debug('mimetype: text/xml');
        xmldoc.baseURI = 'http://envjs.com/xml';
        xmlstring = '<?xml version="1.0" encoding="utf-8"?>\n'+
		'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" '+
		'"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n'+
		'<html xmlns:envjs="http://envjs.com/xml">'+
			'<head></head>'+
			'<body>'+
            '<envjs:xmlp id="envjs_1234567890">'+
                xmlstring+
			'</envjs:xmlp>'+
			'</body>'+
		'</html>';
        Envjs.parseXmlDocument(xmlstring, tmpdoc, false, null, null);
		__Nu5toDomNode__(tmpdoc.getElementById('envjs_1234567890').childNodes, xmldoc, xmldoc);
    }

    return xmldoc;
};


var __Nu5toDomNode__ = function(nu5, parent, doc){
    var xnode,
        domnode,
        children,
        target,
        value,
        length,
        element,
        kind,
		k;
    log.debug('converting nu5 node list %s', nu5);
	
	//for elements and namednodemaps
    for (k = 0; k < nu5.length; k++) {
		//for elements and namednodemaps
        xnode = nu5[k];
        kind = xnode.nodeType;
        log.debug('treating node kind %s', kind);
        switch(kind){
        case Node.ELEMENT_NODE:
            // add node
            log.debug('creating element %s %s', xnode.localName, xnode.namespaceURI);
            if(xnode.namespaceURI && (xnode.namespaceURI+'') !== ''){
                log.debug('createElementNS %s %s',xnode.namespaceURI, xnode.localName);
                domnode = doc.createElementNS(xnode.namespaceURI+'', xnode.localName);
            }else{
                domnode = doc.createElement(xnode.tagName);
            }
            parent.appendChild(domnode);

            // add attributes
            __Nu5toDomNode__(xnode.attributes, domnode, doc);

            // add children
            children = xnode.childNodes;
            length = children.length;
            log.debug('recursing? %s', length ? 'yes' : 'no');
            if (length > 0) {
                __Nu5toDomNode__(children, domnode, doc);
            }
            break;

        case Node.ATTRIBUTE_NODE:
            log.debug(
				'setting attribute %s %s %s',
                xnode.localName, xnode.namespaceURI, xnode.value
			);
            
            if(xnode.namespaceURI && xnode.prefix){
                log.debug("xmlns:%s=%s", xnode.prefix, xnode.namespaceURI);
                parent.setAttributeNS(
					xnode.namespaceURI,
                    xnode.prefix+':'+xnode.localName,
                    xnode.value);
            }else if((xnode.name+'').match('xmlns')){
                if(xnode.localName!=='xmlns'){
                    parent.setAttributeNS(
						'http://www.w3.org/2000/xmlns/',
                        'xmlns:'+xnode.localName,
                         xnode.value);
                }
            }else{
				log.debug('setting attribute %s', xnode.localName);
                parent.setAttribute(xnode.localName+'', xnode.value);
            }
            break;

        case Node.TEXT_NODE:
            log.debug('creating text node : %s', xnode);
            domnode = doc.createTextNode(xnode.nodeValue);
            parent.appendChild(domnode);
            break;

        case Node.COMMENT_NODE:
            log.debug('creating comment node : %s', xnode);
            value = xnode+'';
            domnode = doc.createComment(value);
            parent.appendChild(domnode);
            break;

        case Node.PROCESSING_INSTRUCTION_NODE:
            log.debug('creating processing-instruction node : %s', xnode);
            value = xnode+'';
            target = value.split(' ')[0].substring(2);
            value = value.split(' ').splice(1).join(' ').replace('?>','');

            log.debug('creating processing-instruction data : %s', value);
            domnode = doc.createProcessingInstruction(target, value);
            parent.appendChild(domnode);
            break;

        default:
            log.debug('nu5 DOM ERROR');
            throw new Error("Assertion failed in xml parser");
        }
    }
};

})(/*Envjs.Parser.XMLParser*/);


(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.Parser.HTMLParser').
		debug('HTMLParser available');    
});

var __fragmentCache__ = {length:0},
    __cachable__ = 255;

exports.HTMLParser = HTMLParser = {};

HTMLParser.parseDocument = function(htmlstring, htmldoc){
    log.info('parseDocument %s', htmlstring.length);
    htmldoc.parsing = true;
	var start = Date.now();
    Envjs.parseHtmlDocument(htmlstring, htmldoc, htmldoc.async, function(){
		var end = Date.now(),
			total = (end-start)/1000;
		log.info("from parse start to after document ready in %s", total);
	}, null);
    log.debug('Finished HTMLParser.parseDocument in %s (async? %s)', start - Date.now(), htmldoc.async);
    return htmldoc;
};
HTMLParser.parseFragment = function(htmlstring, element){
    log.debug('parseFragment')
    // fragment is allowed to be an element as well
    var tmpdoc,
        parent,
        importedNode,
        tmpNode,
        length,
        i,
        docstring,
        start = Date.now();
    log.debug('parsing fragment: %s (cached %s)', htmlstring.length,  __fragmentCache__.length);
    if( htmlstring.length > __cachable__ && htmlstring in __fragmentCache__){
        tmpdoc = __fragmentCache__[htmlstring];
    }else{
        log.debug('not cached, parsing html fragment %s', htmlstring.length);
        tmpdoc = new HTMLDocument(new DOMImplementation());
        // Need some indicator that this document isn't THE document
        // to fire off img.src change events and other items.
        // Otherwise, what happens is the tmpdoc fires and img.src
        // event, then when it's all imported to the original document
        // it happens again.

        tmpdoc.fragment = true;

        //preserves leading white space
        docstring = '<html><head></head><body>'+
            '<envjs_1234567890 xmlns="envjs_1234567890">'
                +htmlstring+
            '</envjs_1234567890>'+
        '</body></html>';
        Envjs.parseHtmlDocument(docstring,tmpdoc, false, null,null);
        if(htmlstring.length > __cachable__ ){
            tmpdoc.normalizeDocument();
            __fragmentCache__[htmlstring] = tmpdoc;
            __fragmentCache__.length += htmlstring.length;
            tmpdoc.cached = true;
        }else{
            tmpdoc.cached = false;
        }
    }

    //parent is envjs_1234567890 element
    parent = tmpdoc.body.childNodes[0];
    while(element.firstChild != null){
        //zap the elements children so we can import
        element.removeChild( element.firstChild );
    }

    if(tmpdoc.cached){
        length = parent.childNodes.length;
        for(i=0;i<length;i++){
            importedNode = element.importNode( parent.childNodes[i], true );
            element.appendChild( importedNode );
        }
    }else{
        while(parent.firstChild != null){
            tmpNode  = parent.removeChild( parent.firstChild );
            importedNode = element.importNode( tmpNode, true);
            element.appendChild( importedNode );
        }
    }

    log.debug('finished fragment: %s, time: %s', htmlstring.length, start - Date.now());
    return element;
};

var __clearFragmentCache__ = function(){
    __fragmentCache__ = {};
}

})(/*Envjs.Parser.HTMLParser*/);
