/******************************************************************************
W3C
Document Object Model (DOM) Level 4 Core Specification
W3C Editor's Draft 19 October 2009

This version:
    http://dev.w3.org/cvsweb/~checkout~/2006/webapi/DOM4Core/DOM4Core.html?rev=1.8 
Latest version:
    http://dev.w3.org/2006/webapi/DOM4Core/DOM4Core.html 
Previous version:
    http://dev.w3.org/cvsweb/~checkout~/2006/webapi/DOM4Core/DOM4Core.html?rev=1.7 

Editor:
    Doug Schepers (W3C) 
    Simon Pieters (Opera ASA) ? 
    your name here! 

Copyright © 2009 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

Abstract

This specification defines the Document Object Model Core Level 4, a platform-
and language-neutral interface that allows programs and scripts to dynamically
access and update the content, structure and style of documents. The Document
Object Model Core Level 4 builds on the Document Object Model Core Level 3 [DOM
Level 3 Core].

This version emphasizes the set of features used by Web browsers, and
integrates features from DOM Level 2 HTML Recommendation [DOM2HTML], Element
Traversal [ET], and other DOM-based specifications, as well as specifying
behavior for interfaces implemented in browsers but not previously
standardized.

Note: This specification is a work in progress, and is missing most of it
functionality.

@@ integrate Web DOM Core?
Status of this Document

Publication as an Editor's Draft does not imply endorsement by the W3C
Membership. This is a draft document and may be updated, replaced or obsoleted
by other documents at any time. It is inappropriate to cite this document as
other than work in progress.

This section describes the status of this document at the time of its
publication. Other documents may supersede this document. A list of current W3C
publications and the latest revision of this technical report can be found in
the W3C technical reports index at http://www.w3.org/TR/.

This is the 19 October 2009 Editor's Draft of the Document Object Model (DOM)
Level 4 Core Specification. The Web Applications (WebApps) Working Group
expects to request that the Director advance this document to Proposed
Recommendation once the Working Group has developed a comprehensive DOM 4 Core
test suite, and demonstrated at least two interoperable implementations for
each test.

Please send comments to www-dom@w3.org, the public email list for issues
related to WebApps WG DOM deliverables, with the string "[DOM4]" in the subject
line. This list is publicly archived, and acceptance of this archiving policy
is requested automatically upon first post. To subscribe to this list send an
email to www-dom-request@w3.org with the word "subscribe" in the subject line.

This document has been produced by the Web Applications (WebApps) Working Group
as part of the W3C Rich Web Clients Activity, following the procedures set out
for the W3C Process. The WebApps Working Group expects to advance this Working
Draft to Recommendation Status.

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

Table of Contents

    * 1. Introduction
    *
          o 1.1. Not in This Specification
          o 1.2. Conformance
    * 2. Element Interfaces
    *
          o 2.1. ElementCollection interface
          o 2.2. Element interface
    * 4. Relationship to other DOM specifications
    * 5. Security Considerations

    * A. Changes
    * B. References
    * C. Acknowledgements

1. Introduction

This section is informative.

The DOM Level 1 Node interface defines 11 node types, but most commonly authors
wish to operate solely on nodeType 1, the Element node. Other node types
include the Document element and Text nodes, which include whitespace and line
breaks. DOM 1 node traversal includes all of these node types, which is often a
source of confusion for authors and which requires an extra step for authors to
confirm that the expected Element node interfaces are available. This
introduces an additional performance constraint.

ElementTraversal is an interface which allows the author to restrict navigation
to Element nodes. It permits navigation from an element to its first element
child, its last element child, and to its next or previous element siblings.
Because the implementation exposes only the element nodes, the memory and
computational footprint of the DOM representation can be optimized for
constrained devices.

The DOM Level 1 Node interface also defines the childNodes attribute, which is
a live list of all child nodes of the node; the childNodes list has a length
attribute to expose the total number of child nodes of all nodeTypes, useful
for preprocessing operations and calculations before, or instead of, looping
through the child nodes. The ElementTraversal interface has a similar
attribute, childElementCount, that reports only the number of Element nodes,
which is often what is desired for such operations.

1.1. Not in This Specification

This specification does not include the complete list of attributes, methods,
and other interfaces available on the Element object. Additional interfaces are
found in other specifications, notably the DOM Core specifications.

1.2. Conformance

This section is normative.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in RFC 2119 [RFC2119]. For purposes of readability,
these terms are not necessarily used in a case-sensitive manner in this
document.

Sometimes, for readability, conformance requirements are phrased as
requirements on elements, attributes, methods, interfaces, properties or
functions. In all cases these are conformance requirements on implementations.
A conforming implementation of this specification meets all requirements
identified by the use of these terms, within the scope of its language
bindings.

2. Element Interfaces

This section is normative.
2.1. ElementCollection interface

Interface ElementCollection

    An ElementCollection is a list of element nodes. An individual element node
    may be accessed by either ordinal index or the element's name or id
    attributes.
    
     An list of type ElementCollection must contain only elements, i.e. nodes
    with nodeType 1, the Element node. An ElementCollection list must not
    contain elements of another type, such as Text or Comment nodes.
    
     Note: Collections in the DOM are assumed to be live, meaning that they are
    automatically updated when the underlying document is changed. @@ should
    this be a live or static list?
    
     The ElementCollection interface is a more generic equivalent of the
    HTMLCollection interface.

    IDL Definition

          interface ElementCollection {
            readonly attribute unsigned long   length;
            Element                            item(in unsigned long index);
            Element                            namedItem(in DOMString name);
          };  
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        length of type unsigned long, readonly
            This attribute specifies the number of items in the list. If there
            are no items in this list, the value of this attribute must be 0.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        item
            This method retrieves an element specified by ordinal index.
            Elements are numbered in tree order (depth-first traversal order).
            Parameters

            index of type unsigned long
                The index of the element to be fetched. The index origin is 0.

            Return Value

            Element
            	
            The Element at the corresponding position upon success. A value of
            null is returned if the index is out of range.
            
            No Exceptions
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
       namedItem
            This method retrieves an Element using a name. In languages with an
            id attribute (such as HTML or SVG), this method searches for an
            Element with a matching id attribute value. In languages which also
            have a name attribute (such as HTML), if no element with a matching
            matching id attribute value is found, this method then searches for
            an Element with a matching name attribute value, but only on those
            elements on which the name attribute is valid. This method is case
            insensitive in HTML documents and case sensitive in XML documents.

            Parameters

            name of type DOMString
                The name of the Element to be fetched.

            Return Value

            Element
            	
            The Element with an id or name attribute whose value corresponds to
            the specified string. Upon failure (e.g., no element with this name
            exists), returns null.
            No Exceptions

*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
2.2. Element interface

Interface Element

    The Element interface represents an element in an HTML or XML document.
    Elements may have attributes associated with them; since the Element
    interface inherits from Node, the generic Node interface attribute
    attributes may be used to retrieve the set of all attributes for an
    element. There are methods on the Element interface to retrieve either an
    Attr object by name or an attribute value by name. In XML, where an
    attribute value may contain entity references, an Attr object should be
    retrieved to examine the possibly fairly complex sub-tree representing the
    attribute value. On the other hand, in HTML, where all attributes have
    simple string values, methods to directly access an attribute value can
    safely be used as a convenience.
    
     EntityReference nodes are not visible to the Element interface; if the
    tree-walker encounters an EntityReference node, it descends into it without
    informing the caller, and processes any children as if they had been
    present at the place where the entity node was found.
    
     Note: This is a partial definition of the Element interface for purpose of
    defining new functionality. This interface will be expanded to include
    existing functionality as this specification is developed.
    
     @@ this interface may be named children rather than childElements,
    depending on whether implementations return nodes of other types than
    Element in planned releases. children is implemented widely but
    inconsistently at the time of this writing.

    IDL Definition

        interface Element : Node {
          ...
          readonly attribute ElementCollection  childElements;  
          readonly attribute HTMLCollection  children;  
          readonly attribute Element            firstElementChild;
          readonly attribute Element            lastElementChild;
          readonly attribute Element            previousElementSibling;
          readonly attribute Element            nextElementSibling;
          ...
        };  
        
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Attributes

        ...
        childElements of type ElementCollection, readonly
            A collection of all the elements which are children of the current
            element node.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
        children of type HTMLCollection, readonly
            A collection of all the HTML elements which are children of the
            current element node. Note: In Internet Explorer, this may include
            Comment nodes, and in browsers other than WebKit this may include
            SVG elements.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
        firstElementChild of type Element, readonly
            Returns the first child element node of this element. null if this
            element has no child elements.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
        firstElementChild of type Element, readonly
            Returns the first child element node of this element. null if this
            element has no child elements.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
        lastElementChild of type Element, readonly
            Returns the last child element node of this element. null if this
            element has no child elements.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
        previousElementSibling of type Element, readonly
            Returns the previous sibling element node of this element. null if
            this element has no element sibling nodes that come before this one
            in the document tree.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
        nextElementSibling of type Element, readonly
            Returns the next sibling element node of this element. null if this
            element has no element sibling nodes that come after this one in
            the document tree.
*******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
        ...

    Methods
    ...

4. Relationship to other DOM specifications

This section is informative.
5. Security Considerations

This section is informative.

There are no known security considerations involved in the implementation or
use of these interfaces. This section shall be revised if future security
considerations are discovered.

A. Change History

Various editorial changes and corrections and modifications to the examples are
made from draft to draft.

B. References
Normative references

[RFC2119]
    Key words for use in RFCs to indicate Requirement Levels, S. Bradner, March
    1997. The specification for how to use English as if it were a technical
    language to indicate normative requirements.
[DOM1Core]
    Document Object Model - Level 1 Core, V. Apparao, S. Byrne, M. Champion, S.
    Isaacs, I. Jacobs, A. Le Hors, G. Nicol, J. Robie, R. Sutor, C. Wilson, L.
    Wood, Editors. World Wide Web Consortium, 1 October 1998. A standard set of
    objects for representing HTML and XML documents, a standard model of how
    these objects can be combined, and a standard interface for accessing and
    manipulating them.
[DOM2HTML]
    Document Object Model (DOM) Level 2 HTML Specification, J. Stenback, P. Le
    Hégaret, A. Le Hors, Editors. World Wide Web Consortium, 09 January 2003. A
    platform- and language-neutral interface that allows programs and scripts
    to dynamically access and update the content and structure of HTML 4.01 and
    XHTML 1.0 documents. This version of the DOM Level 2 HTML Recommendation is
    http://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109. The latest version
    of DOM Level 2 HTML is available at http://www.w3.org/TR/DOM-Level-2-HTML.
[DOM3Core]
    Document Object Model (DOM) Level 3 Core Specification, A. Le Hors, P. Le
    Hégaret, L. Wood, G. Nicol, J. Robie, M. Champion, S. Byrne, Editors. World
    Wide Web Consortium, 07 April 2004. A platform- and language-neutral
    interface that allows programs and scripts to dynamically access and update
    the content, structure and style of documents.
[ET]
    Element Traversal Specification, D. Schepers, R. Berjon, Editors. World
    Wide Web Consortium, 22 December 2008. A platform- and language-neutral
    interface that allows script navigation of the elements of a DOM tree,
    excluding all other nodes in the DOM, such as text nodes. This version of
    the Element Traversal Recommendation is
    http://www.w3.org/TR/2008/REC-ElementTraversal-20081222/. The latest
    version of Element Traversal is available at
    http://www.w3.org/TR/ElementTraversal/.
[ECMA262]
    Standard ECMA-262, 3rd edition. ECMA International, December 1999. The
    specification for the ECMAScript language, of which JavaScript is a
    dialect.

Informative references

[DOM2TR]
    Document Object Model (DOM) Level 2 Traversal and Range Specification, J.
    Kesselman, J. Robie, M. Champion, P. Sharpe, V. Apparao, L. Wood, Editors.
    World Wide Web Consortium, 13 November 2000. A set of platform- and
    language-neutral interfaces that allow programs and scripts to dynamically
    traverse and identify a range of content in a document.

C. Acknowledgments

The editor would like to thank the following people for contributing to this
specification: Simon Pieters, Jonas Sicking, John Resig, Garrett Smith.

******************************************************************************/