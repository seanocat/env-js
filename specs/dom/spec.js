
var QUnit 	= require('specs/qunit').QUnit,
	module 	= require('specs/qunit').module,
	expect 	= require('specs/qunit').expect,
	equals 	= require('specs/qunit').equals,
	assert 	= require('specs/qunit').assert,
	test 	= require('specs/qunit').test,
	ok 		= require('specs/qunit').ok;
	
QUnit.module('DOM Level 3');//A little ambitious but we are on the way

// mock the global document object if not available
try{
    document;
}catch(e){
    document = new Document(new DOMImplementation());
}
var xmlserializer = new XMLSerializer();
var domparser = new DOMParser();

test('DOM Interfaces Available', function(){

    expect(20);
    ok(Attr,                    'Attr defined');
    ok(CDATASection,            'CDATASection defined');
    ok(CharacterData,           'CharacterData defined');
    ok(Comment,                 'Comment defined');
    ok(Document,                'Document defined');
    ok(DocumentFragment,        'DocumentFragment defined');
    ok(DocumentType,            'DocumentType defined');
    ok(DOMException,            'DOMException defined');
    ok(DOMImplementation,       'DOMImplementation defined');
    ok(Element,                 'Element defined');
    ok(Entity,                  'Entity defined');
    ok(EntityReference,         'EntityReference defined');
    ok(NamedNodeMap,            'NamedNodeMap defined');
    ok(Namespace,               'Namespace defined');
    ok(Node,                    'Node defined');
    ok(NodeList,                'NodeList defined');
    ok(Notation,                'Notation defined');
    ok(ProcessingInstruction,   'ProcessingInstruction defined');
    ok(Text,                    'Text defined');
    ok(XMLSerializer,           'XMLSerializer defined');
});


QUnit.module('DOMImplementation');

test('createDocument', function(){

    var doc;

    doc = document.implementation.createDocument('http://www.envjs.com', 'envjs', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.childNodes.length, 1, 'childNodes.length');
    equals(doc.documentElement.tagName, 'envjs', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, 'http://www.envjs.com', '.documentElement.namespaceURI');

    doc = document.implementation.createDocument(null, 'html', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, '.documentElement.namespaceURI');

    doc = document.implementation.createDocument('', 'html', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, '.documentElement.namespaceURI');

    doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, 'http://www.w3.org/1999/xhtml', '.documentElement.namespaceURI');

    var htmldoctype;

    htmldoctype = document.implementation.createDocumentType('html', null, null);
    doc = document.implementation.createDocument(null, 'html', htmldoctype);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, '.documentElement.namespaceURI');


    htmldoctype = document.implementation.createDocumentType('html', null, "-//W3C//DTD HTML 3.2 Final//EN");
    doc = document.implementation.createDocument(null, 'html', htmldoctype);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, '.documentElement.namespaceURI');


    htmldoctype = document.implementation.createDocumentType('html', null, "-//W3C//DTD HTML 4.01//EN");
    doc = document.implementation.createDocument(null, 'html', htmldoctype);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, '.documentElement.namespaceURI');

});

QUnit.module('Document');

test('location', function(){

    var doc;

    doc = document.implementation.createDocument('http://www.envjs.com', 'envjs', null);
    ok(doc, 'doc created');
    equals(doc.baseURI, 'about:blank', '.baseURI');
    equals(doc.documentURI, 'about:blank', '.documentURI');

    equals(doc.baseURI, 'about:blank', '.baseURI');
    equals(doc.documentURI, 'about:blank', '.documentURI');

});

test('createElement', function(){

    var doc,
        element;

    doc = document.implementation.createDocument('', '', null);
    element = doc.createElement('envjs');

    ok(element, 'element created');
    equals(element.attributes.length, 0, '.attributes.length');
    equals(element.tagName, 'envjs', '.name');
    equals(element.childNodes.length, 0, '.childNodes');
    equals(element.localName, 'envjs', '.localName');
    equals(element.namespaceURI, null, '.namespaceURI');
    equals(element.nodeName, 'envjs', '.nodeName');
    equals(element.nodeType, Node.ELEMENT_NODE, 'nodeType');
    equals(element.ownerDocument, doc, '.ownerDocument');
    equals(element.parentNode, null, '.parentNode');
    equals(element.prefix, null, '.prefix');
    equals(element.toString(), '[object Element]', '.toString');
    equals(xmlserializer.serializeToString(element), '<envjs/>', 'xmlserializer');


});

test('createElementNS', function(){

    var doc,
        element;

    doc = document.implementation.createDocument('', '', null);
    element = doc.createElementNS('http://www.envjs.com/','x:envjs');

    ok(element, 'element created');
    equals(element.attributes.length, 0, '.attributes.length');
    equals(element.tagName, 'x:envjs', '.tagName');
    equals(element.childNodes.length, 0, '.childNodes');
    equals(element.localName, 'envjs', '.localName');
    equals(element.namespaceURI, "http://www.envjs.com/", '.namespaceURI');
    equals(element.nodeName, 'x:envjs', '.nodeName');
    equals(element.nodeType, Node.ELEMENT_NODE, 'nodeType');
    equals(element.ownerDocument, doc, '.ownerDocument');
    equals(element.parentNode, null, '.parentNode');
    equals(element.prefix, 'x', '.prefix');
    equals(element.toString(), '[object Element]', '.toString');
    equals(xmlserializer.serializeToString(element), '<x:envjs xmlns:x="http://www.envjs.com/"/>', 'xmlserializer');

    ok(element.prefix = 'y', 'set prefix');
    equals(element.prefix, 'y', '.prefix');
    equals(element.tagName, 'y:envjs', '.tagName');
    equals(xmlserializer.serializeToString(element), '<y:envjs xmlns:y="http://www.envjs.com/"/>', 'xmlserializer');

    element.prefix = null;
    equals(element.prefix, null, '.prefix');
    equals(element.tagName, 'envjs', '.tagName');
    equals(xmlserializer.serializeToString(element), '<envjs xmlns="http://www.envjs.com/"/>', 'xmlserializer');

});



test('createAttribute', function(){

    var doc,
        attribute;

    doc = document.implementation.createDocument('', '', null);
    attribute = doc.createAttribute('envjs');

    ok(attribute, 'attribute created');
    equals(attribute.attributes, null, '.attributes');
    equals(attribute.name, 'envjs', '.name');
    equals(attribute.value, '', '.value');
    equals(attribute.specified, true, '.specified');
    equals(attribute.ownerElement, null, '.ownerElement');
    equals(attribute.childNodes.length, 0, '.childNodes');
    equals(attribute.localName, 'envjs', '.localName');
    equals(attribute.namespaceURI, null, '.namespaceURI');
    equals(attribute.nodeName, 'envjs', '.nodeName');
    equals(attribute.nodeType, Node.ATTRIBUTE_NODE, 'nodeType');
    equals(attribute.ownerDocument, doc, '.ownerDocument');
    equals(attribute.parentNode, null, '.parentNode');
    equals(attribute.prefix, null, '.prefix');
    ok(attribute.value = 'abc123', 'set value');
    equals(attribute.value, 'abc123', '.value');
    equals(attribute.name, 'envjs', '.name');
    equals(attribute.toString(), '[object Attr]', '.toString');
    equals(xmlserializer.serializeToString(attribute), 'abc123', 'xmlserializer');

});

test('createAttributeNS', function(){

    var doc,
        attribute;

    doc = document.implementation.createDocument('', '', null);
    attribute = doc.createAttributeNS('http://www.envjs.com/','x:envjs');

    ok(attribute, 'namespaced attribute was created');
    //equals(attribute.isId, false, '.isId');
    equals(attribute.attributes, null, '.attributes');
    //equals(attribute.baseURI, "", '.baseURI');
    equals(attribute.childNodes.length, 0, '.childNodes');
    equals(attribute.localName, 'envjs', '.localName');
    equals(attribute.name, 'x:envjs', '.name');
    equals(attribute.nodeName, 'x:envjs', '.nodeName');
    equals(attribute.nodeType, Node.ATTRIBUTE_NODE, 'nodeType');
    equals(attribute.nodeValue, '', 'nodeValue');
    equals(attribute.ownerDocument, doc, '.ownerDocument');
    equals(attribute.ownerElement, null, '.ownerElement');
    equals(attribute.namespaceURI, 'http://www.envjs.com/', '.namespaceURI');
    equals(attribute.parentNode, null, '.parentNode');
    equals(attribute.prefix, 'x', '.prefix');
    equals(attribute.specified, true, '.specified');
    equals(attribute.textContent, '', '.textContent');
    equals(attribute.value, '', '.value');

    ok(attribute.value = 'abc123', 'set value');
    equals(attribute.value, 'abc123', '.value');

    ok(attribute.prefix = 'y', 'set prefix');
    equals(attribute.prefix, 'y', '.prefix');
    equals(attribute.name, 'y:envjs', '.name');
    equals(attribute.toString(), '[object Attr]', '.toString');
    equals(xmlserializer.serializeToString(attribute), 'abc123', 'xmlserializer');


    attribute = doc.createAttributeNS('http://www.envjs.com/','envjs');

    ok(attribute, 'namespaced attribute was created');
    equals(attribute.attributes, null, '.attributes');
    equals(attribute.name, 'envjs', '.name');
    equals(attribute.value, '', '.value');
    equals(attribute.specified, true, '.specified');
    equals(attribute.ownerElement, null, '.ownerElement');
    equals(attribute.childNodes.length, 0, '.childNodes');
    equals(attribute.localName, 'envjs', '.localName');
    equals(attribute.namespaceURI, 'http://www.envjs.com/', '.namespaceURI');
    equals(attribute.nodeName, 'envjs', '.nodeName');
    equals(attribute.nodeType, Node.ATTRIBUTE_NODE, 'nodeType');
    equals(attribute.ownerDocument, doc, '.ownerDocument');
    equals(attribute.parentNode, null, '.parentNode');
    equals(attribute.prefix, null, '.prefix');

    attribute = doc.createAttributeNS('','envjs');

    ok(attribute, 'namespaced attribute was created');
    equals(attribute.attributes, null, '.attributes');
    equals(attribute.name, 'envjs', '.name');
    equals(attribute.value, '', '.value');
    equals(attribute.specified, true, '.specified');
    equals(attribute.ownerElement, null, '.ownerElement');
    equals(attribute.childNodes.length, 0, '.childNodes');
    equals(attribute.localName, 'envjs', '.localName');
    equals(attribute.namespaceURI, null, '.namespaceURI');
    equals(attribute.nodeName, 'envjs', '.nodeName');
    equals(attribute.nodeType, Node.ATTRIBUTE_NODE, 'nodeType');
    equals(attribute.ownerDocument, doc, '.ownerDocument');
    equals(attribute.parentNode, null, '.parentNode');
    equals(attribute.prefix, null, '.prefix');
});

test('createTextNode', function(){

    var doc,
        text,
        keyboardish=''+
        '`1234567890-='+
        '\tqwertyuiop[]\\'+
        'asdfghjkl;\'\n'+
        'zxcvbnm,./'+
        ' '+
        '~!@#$%^&*()_+'+
        '\tQWERTYUIOP{}|'+
        'ASDFGHJKL:"\n'+
        'ZXCVBNM<>?'+
        ' ';

    doc = document.implementation.createDocument('', '', null);
    text = doc.createTextNode(keyboardish);

    ok(text, 'text node was created');
    equals(text.attributes, null, '.attributes');
    equals(text.baseURI, 'about:blank', '.baseURI');
    equals(text.childNodes.length, 0, '.childNodes');
    equals(text.data, keyboardish, '.data');
    equals(text.length, 100, '.length');
    equals(text.localName, null, '.localName');
    equals(text.namespaceURI, null, '.namespaceURI');
    equals(text.nodeName, '#text', '.nodeName');
    equals(text.nodeType, Node.TEXT_NODE, 'nodeType');
    equals(text.nodeValue, keyboardish, '.nodeValue');
    equals(text.ownerDocument, doc, '.ownerDocument');
    equals(text.parentNode, null, '.parentNode');
    equals(text.prefix, null, '.prefix');
    equals(text.textContent, keyboardish, '.textContent');
});

test('createComment', function(){

    var doc,
        comment,
        keyboardish=''+
        '`1234567890-='+
        '\tqwertyuiop[]\\'+
        'asdfghjkl;\'\n'+
        'zxcvbnm,./'+
        ' '+
        '~!@#$%^&*()_+'+
        '\tQWERTYUIOP{}|'+
        'ASDFGHJKL:"\n'+
        'ZXCVBNM<>?'+
        ' ';

    doc = document.implementation.createDocument('', '', null);
    comment = doc.createComment(keyboardish);

    ok(comment, 'node was created');
    equals(comment.attributes, null, '.attributes');
    equals(comment.baseURI, 'about:blank', '.baseURI');
    equals(comment.childNodes.length, 0, '.childNodes');
    equals(comment.data, keyboardish, '.data');
    equals(comment.length, 100, '.length');
    equals(comment.localName, null, '.localName');
    equals(comment.namespaceURI, null, '.namespaceURI');
    equals(comment.nodeName, '#comment', '.nodeName');
    equals(comment.nodeType, Node.COMMENT_NODE, 'nodeType');
    equals(comment.nodeValue, keyboardish, '.nodeValue');
    equals(comment.ownerDocument, doc, '.ownerDocument');
    equals(comment.parentNode, null, '.parentNode');
    equals(comment.prefix, null, '.prefix');
    equals(comment.textContent, keyboardish, '.textContent');

});

test('createCDATASection', function(){

    var doc,
        cdata,
        keyboardish=''+
        '`1234567890-='+
        '\tqwertyuiop[]\\'+
        'asdfghjkl;\'\n'+
        'zxcvbnm,./'+
        ' '+
        '~!@#$%^&*()_+'+
        '\tQWERTYUIOP{}|'+
        'ASDFGHJKL:"\n'+
        'ZXCVBNM<>?'+
        ' ';

    doc = document.implementation.createDocument('', '', null);
    cdata = doc.createCDATASection(keyboardish);

    ok(cdata, 'node was created');
    equals(cdata.attributes, null, '.attributes');
    equals(cdata.baseURI, 'about:blank', '.baseURI');
    equals(cdata.childNodes.length, 0, '.childNodes');
    equals(cdata.data, keyboardish, '.data');
    equals(cdata.length, 100, '.length');
    equals(cdata.localName, null, '.localName');
    equals(cdata.namespaceURI, null, '.namespaceURI');
    equals(cdata.nodeName, '#cdata-section', '.nodeName');
    equals(cdata.nodeType, Node.CDATA_SECTION_NODE, 'nodeType');
    equals(cdata.nodeValue, keyboardish, '.nodeValue');
    equals(cdata.ownerDocument, doc, '.ownerDocument');
    equals(cdata.parentNode, null, '.parentNode');
    equals(cdata.prefix, null, '.prefix');
    equals(cdata.textContent, keyboardish, '.textContent');
    equals(xmlserializer.serializeToString(cdata),
        "<![CDATA["+keyboardish+"]]>", 'serializeToString');

});

test('createProcessingInstruction', function(){

    var doc,
        pi,
        target = 'foo',
        data = 'bar="pooh"';
        //seriously i never use pi's--is there a better example

    doc = document.implementation.createDocument('', '', null);
    pi = doc.createProcessingInstruction(target, data);

    ok(pi, 'node was created');
    equals(pi.attributes, null, '.attributes');
    equals(pi.baseURI, 'about:blank', '.baseURI');
    equals(pi.childNodes.length, 0, '.childNodes');
    equals(pi.data, data, '.data');
    equals(pi.localName, null, '.localName');
    equals(pi.namespaceURI, null, '.namespaceURI');
    equals(pi.nodeName, target, '.nodeName');
    equals(pi.nodeType, Node.PROCESSING_INSTRUCTION_NODE, 'nodeType');
    equals(pi.nodeValue, data, '.nodeValue');
    equals(pi.ownerDocument, doc, '.ownerDocument');
    equals(pi.parentNode, null, '.parentNode');
    equals(pi.prefix, null, '.prefix');
    equals(pi.textContent, data, '.textContent');
    equals(xmlserializer.serializeToString(pi),
         '<'+'?foo bar="pooh"?>', '.serializeToString');
});

test('createDocumentFragment', function(){

    var doc,
        fragment;

    doc = document.implementation.createDocument('', '', null);
    fragment = doc.createDocumentFragment();

    ok(fragment, 'fragment');
    //pending implementation in Envjs
    //ok(fragment.querySelector, '.querySelector');
    //ok(fragment.querySelectorAll, '.querySelectorAll');
    equals(fragment.attributes, null, '.attributes');
    equals(fragment.baseURI, 'about:blank', '.baseURI');
    ok(fragment.childNodes,  '.childNodes');
    equals(fragment.childNodes.length, 0, '.childNodes.length');
    equals(fragment.firstChild, null, '.firstChild');
    equals(fragment.lastChild, null, '.lastChild');
    equals(fragment.localName, null, '.localName');
    equals(fragment.namespaceURI, null, '.namespaceURI');
    equals(fragment.nextSibling, null, '.nextSibling');
    equals(fragment.nodeName, '#document-fragment', '.nodeName');
    equals(fragment.nodeType, 11, '.nodeType');
    equals(fragment.nodeValue, null, '.nodeValue');
    equals(fragment.ownerDocument, doc, '.ownerDocument');
    equals(fragment.parentNode, null, '.parentNode');
    equals(fragment.prefix, null, '.prefix');
    equals(fragment.previousSibling, null, '.previousSibling');
    equals(fragment.textContent, "", '.textContent');
    equals(xmlserializer.serializeToString(fragment),
        "", 'serializeToString');


});


test('createComment', function(){

    var doc,
        comment;

    doc = document.implementation.createDocument('', '', null);
    comment = doc.createComment("This is a pig, 'oink, oink'");

    ok(comment, 'comment');
    equals(comment.data, "This is a pig, 'oink, oink'", '.data');
    equals(comment.length, 27, '.length');
    ok(comment.appendData,  '.appendData');
    ok(comment.deleteData,  '.deleteData');
    ok(comment.insertData,  '.insertData');
    ok(comment.replaceData,  '.replaceData');
    ok(comment.substringData,  '.substringData');
    equals(comment.attributes, null, '.attributes');
    equals(comment.baseURI, 'about:blank', '.baseURI');
    ok(comment.childNodes,  '.childNodes');
    equals(comment.childNodes.length, 0, '.childNodes.length');
    equals(comment.firstChild, null, '.firstChild');
    equals(comment.lastChild, null, '.lastChild');
    equals(comment.localName, null, '.localName');
    equals(comment.namespaceURI, null, '.namespaceURI');
    equals(comment.nextSibling, null, '.nextSibling');
    equals(comment.nodeName, '#comment', '.nodeName');
    equals(comment.nodeType, 8, '.nodeType');
    equals(comment.nodeValue, "This is a pig, 'oink, oink'", '.nodeValue');
    equals(comment.ownerDocument, doc, '.ownerDocument');
    equals(comment.parentNode, null, '.parentNode');
    equals(comment.prefix, null, '.prefix');
    equals(comment.previousSibling, null, '.previousSibling');
    equals(comment.textContent, "This is a pig, 'oink, oink'", '.textContent');
    equals(xmlserializer.serializeToString(comment),
        "<!--This is a pig, 'oink, oink'-->", 'serializeToString');
});

QUnit.module('Element');

test('attributes', function(){

    var doc,
        element;

    doc = document.implementation.createDocument('', '', null);
    element = doc.createElement('envjs');
    equals(element.attributes.length, 0, '.attributes.length');

    element.setAttribute('animal', 'pig');
    //console.log('dom-spec setAttribute done');
    equals(element.attributes.length, 1, '.attributes.length');
    //console.log('dom-spec attributes.length');
    equals(element.attributes.animal.value, 'pig', 'element.attributes.animal');
    //console.log('dom-spec attributes.getNamedItem');
    equals(element.attributes.getNamedItem('animal').value, 'pig', 'element.attributes.getNamedItem');
});

test('setAttributeNS', function(){

    var doc,
        element;

    doc = document.implementation.createDocument('', '', null);
    element = doc.createElementNS('','envjs');
    equals(element.attributes.length, 0, '.attributes.length');

    element.setAttributeNS('', 'type', 'animal');
    equals(element.attributes.length, 1, 'set attribute');

});

QUnit.module('DocumentFragment');

test('cloneNode', function(){

    var doc,
        fragment,
        elementA,
        elementB;

    doc = document.implementation.createDocument('', '', null);
    fragment = doc.createDocumentFragment();
    elementA = doc.createElement('elementA');
    elementB = doc.createElement('elementB');
    elementA.textContent = "abc";
    elementB.textContent = "def";
    fragment.appendChild(elementA);
    fragment.appendChild(elementB);

    ok(fragment.childNodes,  '.childNodes');
    equals(fragment.childNodes.length, 2, '.childNodes.length');
    equals(fragment.firstChild, elementA, '.firstChild');
    equals(fragment.lastChild, elementB, '.lastChild');
    equals(fragment.localName, null, '.localName');
    equals(fragment.namespaceURI, null, '.namespaceURI');
    equals(fragment.nextSibling, null, '.nextSibling');
    equals(fragment.nodeName, '#document-fragment', '.nodeName');
    equals(fragment.nodeType, 11, '.nodeType');
    equals(fragment.nodeValue, null, '.nodeValue');
    equals(fragment.ownerDocument, doc, '.ownerDocument');
    equals(fragment.parentNode, null, '.parentNode');
    equals(fragment.prefix, null, '.prefix');
    equals(fragment.previousSibling, null, '.previousSibling');
    equals(fragment.textContent, "abcdef", '.textContent');
    equals(xmlserializer.serializeToString(fragment),
        "<elementA>abc</elementA><elementB>def</elementB>", 'serializeToString');

    var clone = fragment.cloneNode(false);//shallow

    ok(clone, 'clone');
    ok(clone.childNodes,  '.childNodes');
    equals(clone.childNodes.length, 0, '.childNodes.length');
    equals(clone.localName, null, '.localName');
    equals(clone.namespaceURI, null, '.namespaceURI');
    equals(clone.nextSibling, null, '.nextSibling');
    equals(clone.nodeName, '#document-fragment', '.nodeName');
    equals(clone.nodeType, 11, '.nodeType');
    equals(clone.nodeValue, null, '.nodeValue');
    equals(clone.ownerDocument, doc, '.ownerDocument');
    equals(clone.parentNode, null, '.parentNode');
    equals(clone.prefix, null, '.prefix');
    equals(clone.previousSibling, null, '.previousSibling');
    equals(clone.textContent, "", '.textContent');
    equals(xmlserializer.serializeToString(clone),
        "", 'serializeToString');


    clone = fragment.cloneNode(true);//deep

    ok(clone, 'clone');
    ok(clone.childNodes,  '.childNodes');
    equals(clone.childNodes.length, 2, '.childNodes.length');
    equals(clone.firstChild.tagName, 'elementA', '.firstChild');
    equals(clone.lastChild.tagName, 'elementB', '.lastChild');
    ok(clone.firstChild !== elementA, 'clone.firstChild !== elementA');
    ok(clone.lastChild !== elementB, 'clone.lastChild !== elementB');
    equals(clone.localName, null, '.localName');
    equals(clone.namespaceURI, null, '.namespaceURI');
    equals(clone.nextSibling, null, '.nextSibling');
    equals(clone.nodeName, '#document-fragment', '.nodeName');
    equals(clone.nodeType, 11, '.nodeType');
    equals(clone.nodeValue, null, '.nodeValue');
    equals(clone.ownerDocument, doc, '.ownerDocument');
    equals(clone.parentNode, null, '.parentNode');
    equals(clone.prefix, null, '.prefix');
    equals(clone.previousSibling, null, '.previousSibling');
    equals(clone.textContent, "abcdef", '.textContent');
    equals(xmlserializer.serializeToString(clone),
        "<elementA>abc</elementA><elementB>def</elementB>", 'serializeToString');

});

test('compareDocumentPosition', function(){

     var docX,
         docY,
         a, b, c;

    docX = document.implementation.createDocument('', 'elementX', null);
    docY = document.implementation.createDocument('', 'elementY', null);
    a = docX.createElement('elementA');
    b = docX.createElement('elementB');
    c = docX.createElement('elementC');
    b.textContent = "def";
    docX.documentElement.appendChild(a);
    docX.documentElement.appendChild(b);
    a.appendChild(c);

    equals(a.compareDocumentPosition(a), 0,
        'DOCUMENT_POSITION_EQUAL');
    equals(b.compareDocumentPosition(a), Node.DOCUMENT_POSITION_PRECEDING,
        'DOCUMENT_POSITION_FOLLOWING');
    equals(a.compareDocumentPosition(b), Node.DOCUMENT_POSITION_FOLLOWING,
        'DOCUMENT_POSITION_PRECEDING');
    equals(c.compareDocumentPosition(a), Node.DOCUMENT_POSITION_CONTAINS|Node.DOCUMENT_POSITION_PRECEDING,
        'DOCUMENT_POSITION_CONTAINED_BY');
    equals(a.compareDocumentPosition(c), Node.DOCUMENT_POSITION_CONTAINED_BY|Node.DOCUMENT_POSITION_FOLLOWING,
        'DOCUMENT_POSITION_CONTAINS');
    equals(b.compareDocumentPosition(c), Node.DOCUMENT_POSITION_PRECEDING,
        'DOCUMENT_POSITION_DISCONNECTED');
    ok(a.compareDocumentPosition(docY.documentElement) > 32,
        'DOCUMENT_POSITION_OUTSIDE');

});


QUnit.module('DOMParser');

test('parseFromString', function(){

    var root,
        doc;

    //elements
    doc = domparser.parseFromString(
        '<farm><pig><oink/></pig><cow sound="moo"/><horse/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(
		xmlserializer.serializeToString(root),
        '<farm><pig><oink/></pig><cow sound="moo"/><horse/></farm>',
		'serializeToString'
	);


    //elements ns
    doc = domparser.parseFromString(
        '<farm><pig xmlns="http://oink"><oink/></pig><cow/><horse/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm><pig xmlns="http://oink"><oink/></pig><cow/><horse/></farm>', 'serializeToString');


    doc = domparser.parseFromString(
        '<farm xmlns:oink="http://oink"><oink:pig>true</oink:pig><cow/><horse/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    //NOTE: known issue with using e4x as it will remove the prefix and add xmlns='http://oink'
    //to the pig <farm xmlns:oink="http://oink"><pig xmlns="http://oink">true</pig><cow/><horse/></farm>
    //equals(xmlserializer.serializeToString(root),
    //    '<farm xmlns:oink="http://oink"><oink:pig>true</oink:pig><cow/><horse/></farm>', 'serializeToString');

    //attribute
    doc = domparser.parseFromString(
        '<farm sound="oink"><pig/><cow/><horse/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    ok(root.hasAttribute('sound'), 'hasAttribute');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink"><pig/><cow/><horse/></farm>', 'serializeToString');


    //attribute ns
    doc = domparser.parseFromString(
        '<farm xmlns:a="abc" a:sound="oink"><pig/><cow/><horse/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm xmlns:a="abc" a:sound="oink"><pig/><cow/><horse/></farm>', 'serializeToString');


    //e4x special characters {} (not evaluated outside XML literals)
    doc = domparser.parseFromString(
        '<farm sound="oink"><pig/>{abc.123}<cow/><horse/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink"><pig/>{abc.123}<cow/><horse/></farm>', 'serializeToString');

    //text
    doc = domparser.parseFromString(
        '<farm sound="oink"><pig/><cow>moo</cow><horse/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink"><pig/><cow>moo</cow><horse/></farm>', 'serializeToString');


    // comment
    doc = domparser.parseFromString(
        '<farm sound="oink"><pig/><cow>moo</cow><horse/><!-- farmer --></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink"><pig/><cow>moo</cow><horse/><!-- farmer --></farm>', 'serializeToString');

    //processing-instruction
    doc = domparser.parseFromString(
        '<farm sound="oink"><pig/><cow>moo</cow><horse/><'+'?farmer hadA="duck"?></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink"><pig/><cow>moo</cow><horse/><'+'?farmer hadA="duck"?></farm>', 'serializeToString');

    //xml pi is stripped out
    doc = domparser.parseFromString(
        '<'+'?xml version="1.0"?><farm sound="oink"><pig/></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink"><pig/></farm>', 'serializeToString');

    //CDATA is a known deficiency in this approach, e4x turns it into an xml encoded text node
    doc = domparser.parseFromString(
        '<farm sound="oink"><pig/><cow>moo</cow><horse/><![CDATA[old mac ><&!-- d]]></farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    //equals(xmlserializer.serializeToString(root),
    //    '<farm sound="oink"><pig/><cow>moo</cow><horse/><![CDATA[old mac ><&!-- d]]></farm>', 'serializeToString');

    // whitespace
    doc = domparser.parseFromString(
        '<'+'?xml version="1.0"?>\
        <farm sound="oink">\
            <pig/>\
            <cow>moo</cow>\
            <horse/>\
        </farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink">\
            <pig/>\
            <cow>moo</cow>\
            <horse/>\
        </farm>', 'serializeToString');

    // line breaks
    doc = domparser.parseFromString(
        '<'+'?xml version="1.0"?>\n\
        <farm sound="oink">\n\
            <pig/>\n\
            <cow>moo</cow>\n\
            <horse/>\n\
        </farm>', 'text/xml');
    root = doc.documentElement;
    equals(root.nodeName, 'farm', 'root.nodeName');
    equals(xmlserializer.serializeToString(root),
        '<farm sound="oink">\n\
            <pig/>\n\
            <cow>moo</cow>\n\
            <horse/>\n\
        </farm>', 'serializeToString');

});

QUnit.module('Live NodeList');

test('getElementsByTagName', function() {
    var all, node, nodes, doc, expected, i;
	doc = domparser.parseFromString(
        '<root>123</root>',
        'text/xml'
    );
	all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 1, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
	expected = ['root'];
	for(i=0;i<all.length;i++){
		equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
	}

	doc = domparser.parseFromString(
        '<root><a>123</a></root>',
        'text/xml'
    );
	all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 2, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 1, 'named index - a');
	expected = ['root','a'];
	for(i=0;i<all.length;i++){
		equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
	}
	
	
	doc = domparser.parseFromString(
        '<root><a>123<b>456</b></a><c/></root>',
        'text/xml'
    );
	all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 4, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 1, 'named index - a');
    nodes = doc.getElementsByTagName('b');
    equals(nodes.length, 1, 'named index - b');
    nodes = doc.getElementsByTagName('c');
    equals(nodes.length, 1, 'named index - c');
	expected = ['root','a','b','c'];
	for(i=0;i<all.length;i++){
		equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
	}
	
	doc = domparser.parseFromString(
        '<root><a id="a1">123<b>456</b></a><c><a id="a2">789</a></c></root>',
        'text/xml'
    );
	all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 5, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 2, 'named index - a');
    nodes = doc.getElementsByTagName('b');
    equals(nodes.length, 1, 'named index - b');
    nodes = doc.getElementsByTagName('c');
    equals(nodes.length, 1, 'named index - c');
    nodes = doc.getElementById('a1');
    equals(nodes.getAttribute('id'), 'a1', 'id index #a1');
    nodes = doc.getElementById('a2');
    equals(nodes.getAttribute('id'), 'a2', 'id index #a2');
	expected = ['root','a','b','c', 'a'];
	for(i=0;i<all.length;i++){
		equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
	}
	
    doc = domparser.parseFromString(
        '<root><div id="d0"><div id="d1">123<a>456</a></div><b>789</b></div><div id="d2"><c/></div><d>abc</d></root>',
        'text/xml'
    );

    all = nodes = doc.getElementsByTagName('*');
    equals(all.length, 8, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('div');
    equals(nodes.length, 3, 'named index - div');
    nodes = doc.getElementsByTagName('b');
    equals(nodes.length, 1, 'named index - b');

	expected = ['root', 'div', 'div', 'a', 'b', 'div', 'c', 'd'];
	for(i=0;i<all.length;i++){
		equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
	}
	
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 1, 'named index - a');
    doc.documentElement.appendChild(doc.createElement('a'));
    equals(nodes.length, 2, 'live list - named index - a');
    equals(all.length, 9, 'all elements');
    nodes[0].parentNode.removeChild(nodes[0]);
    equals(nodes.length, 1, 'live list - named index - a');
    equals(all.length, 8, 'all elements');
});



QUnit.module('XPath');
/**
* XPATH - borrowed from the google ajaxslt project and modified to work inside our unit tests
*/

// Copyright 2005, Google Inc.
// All Rights Reserved.
//
// Unit test for the XPath parser and engine.
//
// Author: Steffen Meschkat <mesch@google.com>
//         Junji Takagi <jtakagi@google.com>

test('document.createExpression', function(){
	
	var expr = [
	    "@*",
	    "@*|node()",
	    "/descendant-or-self::div",
	    "/div",
	    "//div",
	    "/descendant-or-self::node()/child::para",
	    "substring('12345', 0, 3)",
	    "//title | //link",
	    "$x//title",
	    // "$x/title",  // TODO(mesch): parsing of this expression is broken
	    "id('a')//title",
	    "//*[@about]",
	    "count(descendant::*)",
	    "count(descendant::*) + count(ancestor::*)",
	    "concat(substring-before(@image,'marker'),'icon',substring-after(@image,'marker'))",
	    "@*|text()",
	    "*|/",
	    "source|destination",
	    "$page != 'to' and $page != 'from'",
	    "substring-after(icon/@image, '/mapfiles/marker')",
	    "substring-before($str, $c)",
	    "$page = 'from'",
	    "segments/@time",
	    "child::para",
	    "child::*",
	    "child::text()",
	    "child::node()",
	    "attribute::name",
	    "attribute::*",
	    "descendant::para",
	    "ancestor::div",
	    "ancestor-or-self::div",
	    "descendant-or-self::para",
	    "self::para",
	    "child::chapter/descendant::para",
	    "child::*/child::para",
	    "/",
	    "/descendant::para",
	    "/descendant::olist/child::item",
	    "child::para[position()=1]",
	    "child::para[position()=last()]",
	    "child::para[position()=last()-1]",
	    "child::para[position()>1]",
	    "following-sibling::chapter[position()=1]",
	    "preceding-sibling::chapter[position()=1]",
	    "/descendant::figure[position()=42]",
	    "/child::doc/child::chapter[position()=5]/child::section[position()=2]",
	    "child::para[attribute::type='warning']",
	    "child::para[attribute::type='warning'][position()=5]",
	    "child::para[position()=5][attribute::type='warning']",
	    "child::chapter[child::title='Introduction']",
	    "child::chapter[child::title]",
	    "child::*[self::chapter or self::appendix]",
	    "child::*[self::chapter or self::appendix][position()=last()]",
	    "count(//*[id='u1']|//*[id='u2'])",
	    "count(//*[id='u1']|//*[class='u'])",
	    "count(//*[class='u']|//*[class='u'])",
	    "count(//*[class='u']|//*[id='u1'])",

	    // Axis expressions
	    "count(//*[@id='self']/ancestor-or-self::*)",
	    "count(//*[@id='self']/ancestor::*)",
	    "count(//*[@id='self']/attribute::*)",
	    "count(//*[@id='self']/child::*)",
	    "count(//*[@id='self']/descendant-or-self::*)",
	    "count(//*[@id='self']/descendant::*)",
	    "count(//*[@id='self']/following-sibling::*)",
	    "count(//*[@id='self']/following::*)",
	    "//*[@id='self']/parent::*/@id",
	    "count(//*[@id='self']/preceding-sibling::*)",
	    "count(//*[@id='self']/preceding::*)",
	    "//*[@id='self']/self::*/@id",

	    // (Japanese)
	    "/descendant-or-self::\u90e8\u5206",
	    "//\u90e8\u5206",
	    "substring('\uff11\uff12\uff13\uff14\uff15', 0, 3)",
	    "//\u30bf\u30a4\u30c8\u30eb | //\u30ea\u30f3\u30af",
	    "$\u8b0e//\u30bf\u30a4\u30c8\u30eb",
	    "//*[@\u30c7\u30b9\u30c6\u30a3\u30cd\u30a4\u30b7\u30e7\u30f3]",
	    "concat(substring-before(@\u30a4\u30e1\u30fc\u30b8,'\u76ee\u5370'),'\u30a2\u30a4\u30b3\u30f3',substring-after(@\u30a4\u30e1\u30fc\u30b8,'\u76ee\u5370'))",
	    "\u30bd\u30fc\u30b9|\u30c7\u30b9\u30c6\u30a3\u30cd\u30a4\u30b7\u30e7\u30f3",
	    "$\u30da\u30fc\u30b8 != '\u307e\u3067' and $\u30da\u30fc\u30b8 != '\u304b\u3089'",
	    "substring-after(\u30a2\u30a4\u30b3\u30f3/@\u30a4\u30e1\u30fc\u30b8, '/\u5730\u56f3\u30d5\u30a1\u30a4\u30eb/\u76ee\u5370')",
	    "substring-before($\u6587\u5b57\u5217, $\u6587\u5b57)",
	    "$\u30da\u30fc\u30b8 = '\u304b\u3089'",
	    "\u30bb\u30b0\u30e1\u30f3\u30c8/@\u6642\u523b",
	    "child::\u6bb5\u843d",
	    "attribute::\u540d\u524d",
	    "descendant::\u6bb5\u843d",
	    "ancestor::\u90e8\u5206",
	    "ancestor-or-self::\u90e8\u5206",
	    "descendant-or-self::\u6bb5\u843d",
	    "self::\u6bb5\u843d",
	    "child::\u7ae0/descendant::\u6bb5\u843d",
	    "child::*/child::\u6bb5\u843d",
	    "/descendant::\u6bb5\u843d",
	    "/descendant::\u9806\u5e8f\u30ea\u30b9\u30c8/child::\u9805\u76ee",
	    "child::\u6bb5\u843d[position()=1]",
	    "child::\u6bb5\u843d[position()=last()]",
	    "child::\u6bb5\u843d[position()=last()-1]",
	    "child::\u6bb5\u843d[position()>1]",
	    "following-sibling::\u7ae0[position()=1]",
	    "preceding-sibling::\u7ae0[position()=1]",
	    "/descendant::\u56f3\u8868[position()=42]",
	    "/child::\u6587\u66f8/child::\u7ae0[position()=5]/child::\u7bc0[position()=2]",
	    "child::\u6bb5\u843d[attribute::\u30bf\u30a4\u30d7='\u8b66\u544a']",
	    "child::\u6bb5\u843d[attribute::\u30bf\u30a4\u30d7='\u8b66\u544a'][position()=5]",
	    "child::\u6bb5\u843d[position()=5][attribute::\u30bf\u30a4\u30d7='\u8b66\u544a']",
	    "child::\u7ae0[child::\u30bf\u30a4\u30c8\u30eb='\u306f\u3058\u3081\u306b']",
	    "child::\u7ae0[child::\u30bf\u30a4\u30c8\u30eb]",
	    "child::*[self::\u7ae0 or self::\u4ed8\u9332]",
	    "child::*[self::\u7ae0 or self::\u4ed8\u9332][position()=last()]",

	    //Selenium bugs
	    "id('nested1')/div[1]//input[2]",
	    "id('foo')//div[contains(@id, 'useful')]//input",
	    "(//table[@class='stylee'])//th[text()='theHeaderText']/../td",

	    // The following are all expressions that used to occur in google
	    // maps XSLT templates.
	    "$address",
	    "$address=string(/page/user/defaultlocation)",
	    "$count-of-snippet-of-url = 0",
	    "$daddr",
	    "$form",
	    "$form = 'from'",
	    "$form = 'to'",
	    "$form='near'",
	    "$home",
	    "$i",
	    "$i > $page and $i < $page + $range",
	    "$i < $page and $i >= $page - $range",
	    "$i < @max",
	    "$i <= $page",
	    "$i + 1",
	    "$i = $page",
	    "$i = 1",
	    "$info = position() or (not($info) and position() = 1)",
	    "$is-first-order",
	    "$is-first-order and $snippets-exist",
	    "$more",
	    "$more > 0",
	    "$near-point",
	    "$page",
	    "$page != 'from'",
	    "$page != 'to'",
	    "$page != 'to' and $page != 'from'",
	    "$page > 1",
	    "$page = 'basics'",
	    "$page = 'details'",
	    "$page = 'from'",
	    "$page = 'to'",
	    "$page='from'",
	    "$page='to'",
	    "$r >= 0.5",
	    "$r >= 1",
	    "$r - 0",
	    "$r - 1",
	    "$r - 2",
	    "$r - 3",
	    "$r - 4",
	    "$saddr",
	    "$sources",
	    "$sources[position() < $details]",
	    "$src",
	    "$str",
	    "\"'\"",
	    "(//location[string(info/references/reference[1]/url)=string($current-url)]/info/references/reference[1])[1]",
	    "(not($count-of-snippet-of-url = 0) and (position() = 1) or not($current-url = //locations/location[position() = $last-pos]//reference[1]/url))",
	    "(not($info) and position() = 1) or $info = position()",
	    ".",
	    "../@arg0",
	    "../@filterpng",
	    "/page/@filterpng",
	    "4",
	    "@attribution",
	    "@id",
	    "@max > @num",
	    "@meters > 16093",
	    "@name",
	    "@start div @num + 1",
	    "@url",
	    "ad",
	    "address/line",
	    "adsmessage",
	    "attr",
	    "boolean(location[@id='near'][icon/@image])",
	    "bubble/node()",
	    "calltoaction/node()",
	    "category",
	    "contains($str, $c)",
	    "count(//location[string(info/references/reference[1]/url)=string($current-url)]//snippet)",
	    "count(//snippet)",
	    "count(attr)",
	    "count(location)",
	    "count(structured/source) > 1",
	    "description/node()",
	    "destination",
	    "destinationAddress",
	    "domain",
	    "false()",
	    "icon/@class != 'noicon'",
	    "icon/@image",
	    "info",
	    "info/address/line",
	    "info/distance",
	    "info/distance and $near-point",
	    "info/distance and info/phone and $near-point",
	    "info/distance or info/phone",
	    "info/panel/node()",
	    "info/phone",
	    "info/references/reference[1]",
	    "info/references/reference[1]/snippet",
	    "info/references/reference[1]/url",
	    "info/title",
	    "info/title/node()",
	    "line",
	    "location",
	    "location[@id!='near']",
	    "location[@id='near'][icon/@image]",
	    "location[position() > $numlocations div 2]",
	    "location[position() <= $numlocations div 2]",
	    "locations",
	    "locations/location",
	    "near",
	    "node()",
	    "not($count-of-snippets = 0)",
	    "not($form = 'from')",
	    "not($form = 'near')",
	    "not($form = 'to')",
	    "not(../@page)",
	    "not(structured/source)",
	    "notice",
	    "number(../@info)",
	    "number(../@items)",
	    "number(/page/@linewidth)",
	    "page/ads",
	    "page/directions",
	    "page/error",
	    "page/overlay",
	    "page/overlay/locations/location",
	    "page/refinements",
	    "page/request/canonicalnear",
	    "page/request/near",
	    "page/request/query",
	    "page/spelling/suggestion",
	    "page/user/defaultlocation",
	    "phone",
	    "position()",
	    "position() != 1",
	    "position() != last()",
	    "position() > 1",
	    "position() < $details",
	    "position()-1",
	    "query",
	    "references/@total",
	    "references/reference",
	    "references/reference/domain",
	    "references/reference/url",
	    "reviews/@positive div (reviews/@positive + reviews/@negative) * 5",
	    "reviews/@positive div (reviews/@positive + reviews/@negative) * (5)",
	    "reviews/@total",
	    "reviews/@total > 1",
	    "reviews/@total > 5",
	    "reviews/@total = 1",
	    "segments/@distance",
	    "segments/@time",
	    "segments/segment",
	    "shorttitle/node()",
	    "snippet",
	    "snippet/node()",
	    "source",
	    "sourceAddress",
	    "sourceAddress and destinationAddress",
	    "string(../@daddr)",
	    "string(../@form)",
	    "string(../@page)",
	    "string(../@saddr)",
	    "string(info/title)",
	    "string(page/request/canonicalnear) != ''",
	    "string(page/request/near) != ''",
	    "string-length($address) > $linewidth",
	    "structured/@total - $details",
	    "structured/source",
	    "structured/source[@name]",
	    "substring($address, 1, $linewidth - 3)",
	    "substring-after($str, $c)",
	    "substring-after(icon/@image, '/mapfiles/marker')",
	    "substring-before($str, $c)",
	    "tagline/node()",
	    "targetedlocation",
	    "title",
	    "title/node()",
	    "true()",
	    "url",
	    "visibleurl"
	];
	for (var i = 0; i < expr.length; ++i) {
	    ok( document.createExpression(expr[i], null), expr[i]);
	}
	
});

test('expression.evaluate', function(){
	
	var numExpr = [
	    /* number expressions */
	    [ "1+1", 2 ],
	    [ "floor( -3.1415 )", -4 ],
	    [ "-5 mod -2", -1 ],
	    [ "-5 mod 2", -1 ],
	    [ "5 mod -2", 1 ],
	    [ "5 mod 2", 1 ],
	    [ "ceiling( 3.1415 )", 4.0 ],
	    [ "floor( 3.1415 )", 3.0 ],
	    [ "ceiling( -3.1415 )", -3.0 ],
	    /* string expressions */
	    [ "substring('12345', -42, 1 div 0)", "12345" ],
	    [ "normalize-space( '  qwerty ' )", "qwerty" ],
	    [ "contains('1234567890','9')", true ],
	    [ "contains('1234567890','1')", true ],
	    [ "'Hello World!'", 'Hello World!' ],
	    [ "substring('12345', 1.5, 2.6)", "234" ],
	    [ "substring('12345', 0, 3)", "12" ],
	    /* string expressions (Japanese) */
	    [ "substring('\u3042\u3044\u3046\u3048\u304a', -42, 1 div 0)",
	      "\u3042\u3044\u3046\u3048\u304a" ],
	    [ "normalize-space( '  \u3044\u308d\u306f\u306b\u307b\u3078\u3068 ' )",
	      "\u3044\u308d\u306f\u306b\u307b\u3078\u3068" ],
	    [ "contains('\u5357\u7121\u5999\u6cd5\u9023\u83ef\u7d4c','\u7d4c')",
	      true ],
	    [ "contains('\u5357\u7121\u5999\u6cd5\u9023\u83ef\u7d4c','\u5357')",
	      true ],
	    [ "'\u3053\u3093\u306b\u3061\u306f\u3001\u4e16\u754c\uff01'",
	      '\u3053\u3093\u306b\u3061\u306f\u3001\u4e16\u754c\uff01' ],
	    [ "substring('\uff11\uff12\uff13\uff14\uff15', 1.5, 2.6)",
	      "\uff12\uff13\uff14" ],
	    [ "substring('\uff11\uff12\uff13\uff14\uff15', 0, 3)",
	      "\uff11\uff12" ],
	    /* selenium bug SEL-347, AJAXSLT issue 19 */
	    [ "count(//a[@href=\"javascript:doFoo('a', 'b')\"])", 1 ],
	    /* variables */
	    //[ "$foo", 'bar', { foo: 'bar' } ],
	    //[ "$foo", 100, { foo: 100 } ],
	    //[ "$foo", true, { foo: true } ],
	    //[ "$foo + 1", 101, { foo: 100 } ],
	    /* variables (Japanese) */
	    //[ "$\u307b\u3052", '\u307b\u3048', { \u307b\u3052: '\u307b\u3048' } ],
	    //[ "$\u307b\u3052", 100, { \u307b\u3052: 100 } ],
	    //[ "$\u307b\u3052", true, { \u307b\u3052: true } ],
	    //[ "$\u307b\u3052 + 1", 101, { \u307b\u3052: 100 } ],
	    /* functions */
	    // function id() with string argument
	    [ "count(id('test1'))", 1 ],
	    // function id() with node-set argument
	    [ "count(id(//*[@id='testid']))", 1 ],
	    /* union expressions */
	    [ "count(//*[@id='u1'])", 1 ],
	    [ "count(//*[@class='u'])", 3 ],
	    [ "count(//*[@id='u1']|//*[@id='u2'])", 2 ],
	    [ "count(//*[@id='u1']|//*[@class='u'])", 3 ],
	    [ "count(//*[@class='u']|//*[@class='u'])", 3 ],
	    [ "count(//*[@class='u']|//*[@id='u1'])", 3 ]
	];

	
    var doc = domparser.parseFromString(
        '<body>\
			\
		    <div id="test1"></div>\
		    <div id="testid">test1</div>\
		    <a id="jshref" href="javascript:doFoo(\'a\', \'b\')">javascript href with spaces</a>\
			\
		    <!-- for union expression -->\
		    <span id="u1" class="u"></span>\
		    <span id="u2" class="u"></span>\
		    <span id="u3" class="u"></span>\
		  </body>',
        'text/xml'
    );
	
	for (var i = 0; i < numExpr.length; ++i) {
    	
    	var e = numExpr[i];
		/**
		 * this is related to xslt variables and we haven't
		 * pulled this into Envjs yet.  Implementation details will
		 * have to change.
		 */
		/*  
		var ctx = new ExprContext(document.body);
    	if (e[2]) {
      		for (var k in e[2]) {
        		var v = e[2][k];
        		if (typeof v == 'number') {
          			ctx.setVariable(k, new NumberValue(v));
        		} else if (typeof v == 'string') {
          			ctx.setVariable(k, new StringValue(v));
        		} else if (typeof v == 'boolean') {
          			ctx.setVariable(k, new BooleanValue(v));
        		}
      		}
    	}
		*/

    	var result = doc.createExpression(e[0], null).evaluate(doc, null, null);
    	if (typeof e[1] == 'number') {
      		equals(e[1], result.numberValue, 'expected .numberValue');
    	} else if (typeof e[1] == 'string') {
      		equals(e[1], result.stringValue, 'expected .stringValue');
    	} else if (typeof e[1] == 'boolean') {
      		equals(e[1], result.booleanValue, 'expected .booleanValue');
    	}
  	}
	
	// For the following axis expressions, we need full control over the
	// entire document, so we cannot evaluate them against document.body,
	// but use our own XML document here. We verify that they give the
	// right results by counting the nodes in their result node sets. For
	// the axes that contain only one node, we check that we found the
	// right node using the id. For axes that contain elements, we only
	// count the elements, so we don't have to worry about whitespace
	// normalization for the text nodes.
	var axisTests = [
	    [ "count(//*[@id='self']/ancestor-or-self::*)", 3 ],
	    [ "count(//*[@id='self']/ancestor::*)", 2 ],
	    [ "count(//*[@id='self']/attribute::node())", 1 ],
	    [ "count(//*[@id='self']/child::*)", 1 ],
	    [ "count(//*[@id='self']/descendant-or-self::*)", 3 ],
	    [ "count(//*[@id='self']/descendant::*)", 2 ],
	    [ "count(//*[@id='self']/following-sibling::*)", 3 ],
	    [ "count(//*[@id='self']/@*/following-sibling::*)", 0 ],
	    [ "count(//*[@id='self']/following::*)", 4 ],
	    [ "//*[@id='self']/parent::*/@id", "parent" ],
	    [ "count(/parent::*)", 0 ],
	    [ "count(//*[@id='self']/preceding-sibling::*)", 1 ],
	    [ "count(//*[@id='self']/@*/preceding-sibling::*)", 0 ],
	    [ "count(//*[@id='self']/preceding::*)", 2 ],
	    [ "//*[@id='self']/self::*/@id", "self" ]
	];
	
	doc = domparser.parseFromString(
	  	'<page>\
	       	<p></p>\
	       	<list id="parent">\
	        	<item></item>\
	        	<item id="self"><d><d></d></d></item>\
	        	<item></item>\
	        	<item></item>\
	        	<item></item>\
	       	</list>\
	       	<f></f>\
	    </page>'
	);
	
	for (var i = 0; i < axisTests.length; ++i) {
	    var e = axisTests[i];
    	var result = doc.createExpression(e[0], null).evaluate(doc, null, null);
	    if (typeof e[1] == 'number') {
	      equals(e[1], result.numberValue, 'expected .numberValue');
	    } else if (typeof e[1] == 'string') {
	      equals(e[1], result.stringValue, 'expected .stringValue');
	    } else if (typeof e[1] == 'boolean') {
	      equals(e[1], result.booleanValue, 'expected .booleanValue');
	    }
	}
});

test('document.evalute', function(){
	
	//test attribute asterisk
	var doc = domparser.parseFromString('<x a="1" b="1"><y><z></z></y></x>');
	var result = doc.evaluate("count(/x/@*)", doc, null, XPathResult.NUMBER_TYPE, null);
	equals(2, result.numberValue, 'attribute asterisk');
	
	doc = domparser.parseFromString(
		'<page>\
			<request>\
	    		<q>new york</q>\
	      	</request>\
	      	<location lat="100" lon="200"/>\
	    </page>'
	);
	
	doTestEvalDom(doc, 'page', 'location', 'lat', '100', 'lon', '200');
	
	doc = domparser.parseFromString(
	    '<\u30da\u30fc\u30b8>\
	      	<\u30ea\u30af\u30a8\u30b9\u30c8>\
	      		<\u30af\u30a8\u30ea>\u6771\u4eac</\u30af\u30a8\u30ea>\
	      	</\u30ea\u30af\u30a8\u30b9\u30c8>\
	      	<\u4f4d\u7f6e \u7def\u5ea6="\u4e09\u5341\u4e94" \u7d4c\u5ea6="\u767e\u56db\u5341"/>\
	    </\u30da\u30fc\u30b8>'
	);

	doTestEvalDom(doc, '\u30da\u30fc\u30b8', '\u4f4d\u7f6e', '\u7def\u5ea6', '\u4e09\u5341\u4e94', '\u7d4c\u5ea6', '\u767e\u56db\u5341');
	
	function doTestEvalDom(doc, page, location, lat, latValue, lon, lonValue) {
	  	var slashPage = '/' + page;
	  	var slashPageLocationAtLat = '/' + page + '/' + location + '/@' + lat;
	  	var slashPageLocationAtLon = '/' + page + '/' + location + '/@' + lon;

	  	var result = doc.evaluate(page, doc, null, XPathResult.ANY_TYPE, null);
	  	equals(result.snapshotLength, 1, "snapshotLength for xpath "+page);
	  	ok(result.singleNodeValue, "singleNodeValue for xpath "+page);
	  	equals(result.singleNodeValue.nodeName, page, "nodeName page");

	  	result = doc.evaluate(slashPage, doc, null, XPathResult.ANY_TYPE, null);
	  	equals(result.snapshotLength, 1, "snapshotLength for xpath "+slashPage);
	  	ok(result.singleNodeValue, "singleNodeValue for xpath "+slashPage);
	  	equals(result.singleNodeValue.nodeName, page, "nodeName page");
	
	  	result = doc.evaluate('/', doc, null, XPathResult.ANY_TYPE, null);
	  	equals(result.snapshotLength, 1, "snapshotLength for xpath /");
	  	ok(result.singleNodeValue, "singleNodeValue for xpath /");
	  	equals(result.singleNodeValue.nodeName, '#document', "nodeName #document");
	
		result = doc.evaluate(slashPageLocationAtLat, doc, null, XPathResult.ANY_TYPE, null);
		equals(result.snapshotLength, 1, "snapshotLength for xpath "+slashPageLocationAtLat);
		ok(result.singleNodeValue, "singleNodeValue for xpath "+slashPageLocationAtLat);
		equals(result.singleNodeValue.nodeName, lat, "nodeName");
		equals(result.singleNodeValue.nodeValue, latValue, "nodeValue");
		
		result = doc.evaluate(slashPageLocationAtLon, doc, null, XPathResult.ANY_TYPE, null);
		equals(result.snapshotLength, 1, "snapshotLength for xpath "+slashPageLocationAtLon);
		ok(result.singleNodeValue, "singleNodeValue for xpath "+slashPageLocationAtLon);
		equals(result.singleNodeValue.nodeName, lon, "nodeName");
		equals(result.singleNodeValue.nodeValue, lonValue, "nodeValue");
		
		
		result = doc.evaluate('//*', doc, null, XPathResult.ANY_TYPE, null);
		
		equals(result.snapshotLength, 4, "snapshotLength for xpath //*");
		equals(result.iterateNext().nodeName, page, "iterateNext().nodeName");
		ok(result.iterateNext(), "iterateNext");
		ok(result.iterateNext(), "iterateNext");
		equals(result.iterateNext().nodeName, location, "iterateNext().nodeName");
		equals(result.iterateNext(), null, "iterateNext should be null");
		
	}
});

