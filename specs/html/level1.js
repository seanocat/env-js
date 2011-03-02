QUnit.module('DOM HTML Level 1')
/******************************************************************************
http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-html.html

29 September, 2000
2. Document Object Model HTML

Editors
    Mike Champion, ArborText
    Vidur Apparao, Netscape
    Scott Isaacs, Microsoft (until January 1998)
    Chris Wilson, Microsoft (after January 1998)
    Ian Jacobs, W3C

Table of contents

    * 2.1. Introduction
    * 2.2. HTML Application of Core DOM
          o 2.2.1. Naming Conventions 
    * 2.3. Miscellaneous Object Definitions
          o HTMLCollection
    * 2.4. Objects related to HTML documents
          o HTMLDocument
    * 2.5. HTML Elements
          o 2.5.1. Property Attributes
          o 2.5.2. Naming Exceptions
          o 2.5.3. Exposing Element Type Names (tagName)
          o 2.5.4. The HTMLElement interface
                + HTMLElement
          o 2.5.5. Object definitions
                + HTMLHtmlElement, HTMLHeadElement, HTMLLinkElement, 
                  HTMLTitleElement, HTMLMetaElement, HTMLBaseElement, 
                  HTMLIsIndexElement, HTMLStyleElement, HTMLBodyElement, 
                  HTMLFormElement, HTMLSelectElement, HTMLOptGroupElement, 
                  HTMLOptionElement, HTMLInputElement, HTMLTextAreaElement, 
                  HTMLButtonElement, HTMLLabelElement, HTMLFieldSetElement, 
                  HTMLLegendElement, HTMLUListElement, HTMLOListElement, 
                  HTMLDListElement, HTMLDirectoryElement, HTMLMenuElement, 
                  HTMLLIElement, HTMLDivElement, HTMLParagraphElement, 
                  HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, 
                  HTMLBRElement, HTMLBaseFontElement, HTMLFontElement, 
                  HTMLHRElement, HTMLModElement, HTMLAnchorElement, 
                  HTMLImageElement, HTMLObjectElement, HTMLParamElement, 
                  HTMLAppletElement, HTMLMapElement, HTMLAreaElement, 
                  HTMLScriptElement, HTMLTableElement, HTMLTableCaptionElement,
                  HTMLTableColElement, HTMLTableSectionElement, 
                  HTMLTableRowElement, HTMLTableCellElement, 
                  HTMLFrameSetElement, HTMLFrameElement, HTMLIFrameElement

2.1. Introduction

This section extends the Level 1 Core API to describe objects and methods
specific to HTML documents [HTML4.0]. In general, the functionality needed to
manipulate hierarchical document structures, elements, and attributes will be
found in the core section; functionality that depends on the specific elements
defined in HTML will be found in this section.

The goals of the HTML-specific DOM API are:

    * to specialize and add functionality that relates specifically to HTML
      documents and elements.
    * to address issues of backwards compatibility with the DOM Level 0.
    * to provide convenience mechanisms, where appropriate, for common and
      frequent operations on HTML documents.

The key differences between the core DOM and the HTML application of DOM is that
the HTML Document Object Model exposes a number of convenience methods and
properties that are consistent with the existing models and are more appropriate
to script writers. In many cases, these enhancements are not applicable to a
general DOM because they rely on the presence of a predefined DTD. The
transitional and frameset DTDs for HTML 4.0 are assumed. Interoperability between
implementations is only guaranteed for elements and attributes that are specified
in the HTML 4.0 DTDs.

More specifically, this document includes the following specializations for HTML:

    * An HTMLDocument interface, derived from the core Document interface.
      HTMLDocument specifies the operations and queries that can be made on a
      HTML document.
    * An HTMLElement interface, derived from the core Element interface.
      HTMLElement specifies the operations and queries that can be made on any
      HTML element. Methods on HTMLElement include those that allow for the
      retrieval and modification of attributes that apply to all HTML elements.
    * Specializations for all HTML elements that have attributes that extend
      beyond those specified in the HTMLElement interface. For all such
      attributes, the derived interface for the element contains explicit methods
      for setting and getting the values.

The DOM Level 1 does not include mechanisms to access and modify style specified
through CSS 1. Furthermore, it does not define an event model for HTML documents.
This functionality is planned to be specified in a future Level of this
specification.

The interfaces found within this section are not mandatory. A DOM application can
use the hasFeature method of the DOMImplementation interface to determine whether
they are supported or not. The feature string for all the interfaces listed in
this section is "HTML" and the version is "1.0".

The interfaces in this specification are designed for HTML 4.0 documents, and not
for XHTML documents. Use of the HTML DOM with XHTML documents may result in
incorrect processing; see Appendix C11 in the [XHTML10] for more information.

2.2. HTML Application of Core DOM

2.2.1. Naming Conventions

The HTML DOM follows a naming convention for properties, methods, events,
collections, and data types. All names are defined as one or more English words
concatenated together to form a single string.

2.2.1.1. Properties and Methods

The property or method name starts with the initial keyword in lowercase, and
each subsequent word starts with a capital letter. For example, a property that
returns document meta information such as the date the file was created might be
named "fileDateCreated". In the ECMAScript binding, properties are exposed as
properties of a given object. In Java, properties are exposed with get and set
methods.

2.2.1.2. Non-HTML 4.0 interfaces and attributes

While most of the interfaces defined below can be mapped directly to elements
defined in the HTML 4.0 Recommendation, some of them cannot. Similarly, not all
attributes listed below have counterparts in the HTML 4.0 specification (and some
do, but have been renamed to avoid conflicts with scripting languages).
Interfaces and attribute definitions that have links to the HTML 4.0
specification have corresponding element and attribute definitions there; all
others are added by this specification, either for convenience or backwards
compatibility with DOM Level 0 implementations.

2.3. Miscellaneous Object Definitions

Interface HTMLCollection

    An HTMLCollection is a list of nodes. An individual node may be accessed by
    either ordinal index or the node's name or id attributes. Note: Collections
    in the HTML DOM are assumed to be live meaning that they are automatically
    updated when the underlying document is changed.


    IDL Definition

        interface HTMLCollection {
          readonly attribute unsigned long    length;
          Node               item(in unsigned long index);
          Node               namedItem(in DOMString name);
        };
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        length of type unsigned long, readonly
            This attribute specifies the length or size of the list.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Methods

        item
            This method retrieves a node specified by ordinal index. Nodes are numbered in tree order (depth-first traversal order).
            Parameters

            index of type unsigned long
                The index of the node to be fetched. The index origin is 0.

            Return Value

            Node
            		

            The Node at the corresponding position upon success. A value of null is returned if the index is out of range.
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        namedItem
            This method retrieves a Node using a name. It first searches for a Node with a matching id attribute. If it doesn't find one, it then searches for a Node with a matching name attribute, but only on those elements that are allowed a name attribute.
            Parameters

            name of type DOMString
                The name of the Node to be fetched.

            Return Value

            Node
            		

            The Node with a name or id attribute whose value corresponds to the specified string. Upon failure (e.g., no node with this name exists), returns null.
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.4. Objects related to HTML documents

Interface HTMLDocument

    An HTMLDocument is the root of the HTML hierarchy and holds the entire content. Besides providing access to the hierarchy, it also provides some convenience methods for accessing certain sets of information from the document.

    The following properties have been deprecated in favor of the corresponding ones for the BODY element:

        * alinkColor
        * background
        * bgColor
        * fgColor
        * linkColor
        * vlinkColor


    IDL Definition

        interface HTMLDocument : Document {
                   attribute DOMString        title;
          readonly attribute DOMString        referrer;
          readonly attribute DOMString        domain;
          readonly attribute DOMString        URL;
                   attribute HTMLElement      body;
          readonly attribute HTMLCollection   images;
          readonly attribute HTMLCollection   applets;
          readonly attribute HTMLCollection   links;
          readonly attribute HTMLCollection   forms;
          readonly attribute HTMLCollection   anchors;
                   attribute DOMString        cookie;
          void               open();
          void               close();
          void               write(in DOMString text);
          void               writeln(in DOMString text);
          Element            getElementById(in DOMString elementId);
          NodeList           getElementsByName(in DOMString elementName);
        };  
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        URL of type DOMString, readonly
            The complete URI of the document.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        anchors of type HTMLCollection, readonly
            A collection of all the anchor (A) elements in a document with a value for the name attribute.Note. For reasons of backwards compatibility, the returned set of anchors only contains those anchors created with the name attribute, not those created with the id attribute.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        applets of type HTMLCollection, readonly
            A collection of all the OBJECT elements that include applets and APPLET (deprecated) elements in a document.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        body of type HTMLElement
            The element that contains the content for the document. In documents with BODY contents, returns the BODY element. In frameset documents, this returns the outermost FRAMESET element.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        cookie of type DOMString
            The cookies associated with this document. If there are none, the value is an empty string. Otherwise, the value is a string: a semicolon-delimited list of "name=value" pairs for all the cookies associated with the page. For example, name=value;expires=date.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        domain of type DOMString, readonly
            The domain name of the server that served the document, or null if the server cannot be identified by a domain name.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        forms of type HTMLCollection, readonly
            A collection of all the forms of a document.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        images of type HTMLCollection, readonly
            A collection of all the IMG elements in a document. The behavior is limited to IMG elements for backwards compatibility.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        links of type HTMLCollection, readonly
            A collection of all AREA elements and anchor (A) elements in a document with a value for the href attribute.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        referrer of type DOMString, readonly
            Returns the URI of the page that linked to this page. The value is an empty string if the user navigated to the page directly (not through a link, but, for example, via a bookmark).
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        title of type DOMString
            The title of a document as specified by the TITLE element in the head of the document.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        close
            Closes a document stream opened by open() and forces rendering.

            No Parameters
            No Return Value
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        getElementById
            Returns the Element whose id is given by elementId. If no such element exists, returns null. Behavior is not defined if more than one element has this id.
            Parameters

            elementId of type DOMString
                The unique id value for an element.

            Return Value

            Element
            		

            The matching element.
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        getElementsByName
            Returns the (possibly empty) collection of elements whose name value is given by elementName.
            Parameters

            elementName of type DOMString
                The name attribute value for an element.

            Return Value

            NodeList
            		

            The matching elements.
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        open
            Note. This method and the ones following allow a user to add to or replace the structure model of a document using strings of unparsed HTML. At the time of writing alternate methods for providing similar functionality for both HTML and XML documents were being considered. The following methods may be deprecated at some point in the future in favor of a more general-purpose mechanism.
            Open a document stream for writing. If a document exists in the target, this method clears it.

            No Parameters
            No Return Value
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        write
            Write a string of text to a document stream opened by open(). The text is parsed into the document's structure model.
            Parameters

            text of type DOMString
                The string to be parsed into some structure in the document structure model.

            No Return Value
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        writeln
            Write a string of text followed by a newline character to a document stream opened by open(). The text is parsed into the document's structure model.
            Parameters

            text of type DOMString
                The string to be parsed into some structure in the document structure model.

            No Return Value
            No Exceptions
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.5. HTML Elements

2.5.1. Property Attributes

HTML attributes are exposed as properties on the element object. The DOM naming
conventions always determine the name of the exposed property, and is independent
of the case of the attribute in the source document. The data type of the
property is determined by the type of the attribute as determined by the HTML 4.0
transitional and frameset DTDs. The attributes have the semantics (including
case-sensitivity) given in the HTML 4.0 specification.

The attributes are exposed as properties for compatibility with DOM Level 0. This
usage is deprecated because it can not be generalized to all possible attribute
names, as is required both for XML and potentially for future versions of HTML.
We recommend the use of generic methods on the core Element interface for
setting, getting and removing attributes.

DTD Data Type	Object Model Data Type
CDATA	DOMString
Value list (e.g., (left | right | center))	DOMString
one-value Value list (e.g., (disabled))	boolean
Number	long int

The return value of an attribute that has a data type that is a value list is
always capitalized, independent of the case of the value in the source document.
For example, if the value of the align attribute on a P element is "left" then it
is returned as "Left". For attributes with the CDATA data type, the case of the
return value is that given in the source document.

2.5.2. Naming Exceptions

To avoid namespace conflicts, an attribute with the same name as a keyword in one
of our chosen binding languages is prefixed. For HTML, the prefix used is "html".
For example, the for attribute of the LABEL element collides with loop construct
naming conventions and is renamed htmlFor.

2.5.3. Exposing Element Type Names (tagName)

The element type names exposed through a property are in uppercase. For example,
the body element type name is exposed through the tagName property as BODY.

2.5.4. The HTMLElement interface

Interface HTMLElement

    All HTML element interfaces derive from this class. Elements that only expose
    the HTML core attributes are represented by the base HTMLElement interface.
    These elements are as follows:

        * HEAD
        * special: SUB, SUP, SPAN, BDO
        * font: TT, I, B, U, S, STRIKE, BIG, SMALL
        * phrase: EM, STRONG, DFN, CODE, SAMP, KBD, VAR, CITE, ACRONYM, ABBR
        * list: DD, DT
        * NOFRAMES, NOSCRIPT
        * ADDRESS, CENTER

    Note. The style attribute for this interface is reserved for future usage.


    IDL Definition

        interface HTMLElement : Element {
                   attribute DOMString        id;
                   attribute DOMString        title;
                   attribute DOMString        lang;
                   attribute DOMString        dir;
                   attribute DOMString        className;
        };
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        className of type DOMString
            The class attribute of the element. This attribute has been renamed due to conflicts with the "class" keyword exposed by many languages. See the class attribute definition in HTML 4.0.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        dir of type DOMString
            Specifies the base direction of directionally neutral text and the directionality of tables. See the dir attribute definition in HTML 4.0.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        id of type DOMString
            The element's identifier. See the id attribute definition in HTML 4.0.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        lang of type DOMString
            Language code defined in RFC 1766. See the lang attribute definition in HTML 4.0.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        title of type DOMString
            The element's advisory title. See the title attribute definition in HTML 4.0.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
            

2.5.5. Object definitions

Interface HTMLHtmlElement

    Root of an HTML document. See the HTML element definition in HTML 4.0.


    IDL Definition

        interface HTMLHtmlElement : HTMLElement {
                   attribute DOMString        version;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        version of type DOMString
            Version information about the document's DTD. See the version attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLHeadElement

    Document head information. See the HEAD element definition in HTML 4.0.


    IDL Definition

        interface HTMLHeadElement : HTMLElement {
                   attribute DOMString        profile;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        profile of type DOMString
            URI designating a metadata profile. See the profile attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLLinkElement

    The LINK element specifies a link to an external resource, and defines this document's relationship to that resource (or vice versa). See the LINK element definition in HTML 4.0.


    IDL Definition

        interface HTMLLinkElement : HTMLElement {
                   attribute boolean          disabled;
                   attribute DOMString        charset;
                   attribute DOMString        href;
                   attribute DOMString        hreflang;
                   attribute DOMString        media;
                   attribute DOMString        rel;
                   attribute DOMString        rev;
                   attribute DOMString        target;
                   attribute DOMString        type;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        charset of type DOMString
            The character encoding of the resource being linked to. See the charset attribute definition in HTML 4.0.

        disabled of type boolean
            Enables/disables the link. This is currently only used for style sheet links, and may be used to activate or deactivate style sheets.

        href of type DOMString
            The URI of the linked resource. See the href attribute definition in HTML 4.0.

        hreflang of type DOMString
            Language code of the linked resource. See the hreflang attribute definition in HTML 4.0.

        media of type DOMString
            Designed for use with one or more target media. See the media attribute definition in HTML 4.0.

        rel of type DOMString
            Forward link type. See the rel attribute definition in HTML 4.0.

        rev of type DOMString
            Reverse link type. See the rev attribute definition in HTML 4.0.

        target of type DOMString
            Frame to render the resource in. See the target attribute definition in HTML 4.0.

        type of type DOMString
            Advisory content type. See the type attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTitleElement

    The document title. See the TITLE element definition in HTML 4.0.


    IDL Definition

        interface HTMLTitleElement : HTMLElement {
                   attribute DOMString        text;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        text of type DOMString
            The specified title as a string.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLMetaElement

    This contains generic meta-information about the document. See the META element definition in HTML 4.0.


    IDL Definition

        interface HTMLMetaElement : HTMLElement {
                   attribute DOMString        content;
                   attribute DOMString        httpEquiv;
                   attribute DOMString        name;
                   attribute DOMString        scheme;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        content of type DOMString
            Associated information. See the content attribute definition in HTML 4.0.

        httpEquiv of type DOMString
            HTTP response header name. See the http-equiv attribute definition in HTML 4.0.

        name of type DOMString
            Meta information name. See the name attribute definition in HTML 4.0.

        scheme of type DOMString
            Select form of content. See the scheme attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLBaseElement

    Document base URI. See the BASE element definition in HTML 4.0.


    IDL Definition

        interface HTMLBaseElement : HTMLElement {
                   attribute DOMString        href;
                   attribute DOMString        target;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        href of type DOMString
            The base URI. See the href attribute definition in HTML 4.0.

        target of type DOMString
            The default target frame. See the target attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLIsIndexElement

    This element is used for single-line text input. See the ISINDEX element definition in HTML 4.0. This element is deprecated in HTML 4.0.


    IDL Definition

        interface HTMLIsIndexElement : HTMLElement {
          readonly attribute HTMLFormElement  form;
                   attribute DOMString        prompt;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        prompt of type DOMString
            The prompt message. See the prompt attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLStyleElement

    Style information. A more detailed style sheet object model is planned to be defined in a separate document. See the STYLE element definition in HTML 4.0.


    IDL Definition

        interface HTMLStyleElement : HTMLElement {
                   attribute boolean          disabled;
                   attribute DOMString        media;
                   attribute DOMString        type;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        disabled of type boolean
            Enables/disables the style sheet.

        media of type DOMString
            Designed for use with one or more target media. See the media attribute definition in HTML 4.0.

        type of type DOMString
            The content type of the style sheet language. See the type attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLBodyElement

    The HTML document body. This element is always present in the DOM API, even if the tags are not present in the source document. See the BODY element definition in HTML 4.0.


    IDL Definition

        interface HTMLBodyElement : HTMLElement {
                   attribute DOMString        aLink;
                   attribute DOMString        background;
                   attribute DOMString        bgColor;
                   attribute DOMString        link;
                   attribute DOMString        text;
                   attribute DOMString        vLink;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        aLink of type DOMString
            Color of active links (after mouse-button down, but before mouse-button up). See the alink attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        background of type DOMString
            URI of the background texture tile image. See the background attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        bgColor of type DOMString
            Document background color. See the bgcolor attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        link of type DOMString
            Color of links that are not active and unvisited. See the link attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        text of type DOMString
            Document text color. See the text attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        vLink of type DOMString
            Color of links that have been visited by the user. See the vlink attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLFormElement

    The FORM element encompasses behavior similar to a collection and an element.
    It provides direct access to the contained input elements as well as the
    attributes of the form element. See the FORM element definition in HTML 4.0.


    IDL Definition

        interface HTMLFormElement : HTMLElement {
          readonly attribute HTMLCollection   elements;
          readonly attribute long             length;
                   attribute DOMString        name;
                   attribute DOMString        acceptCharset;
                   attribute DOMString        action;
                   attribute DOMString        enctype;
                   attribute DOMString        method;
                   attribute DOMString        target;
          void               submit();
          void               reset();
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        acceptCharset of type DOMString
            List of character sets supported by the server. See the accept-charset attribute definition in HTML 4.0.

        action of type DOMString
            Server-side form handler. See the action attribute definition in HTML 4.0.

        elements of type HTMLCollection, readonly
            Returns a collection of all control elements in the form.

        enctype of type DOMString
            The content type of the submitted form, generally "application/x-www-form-urlencoded". See the enctype attribute definition in HTML 4.0.

        length of type long, readonly
            The number of form controls in the form.

        method of type DOMString
            HTTP method used to submit form. See the method attribute definition in HTML 4.0.

        name of type DOMString
            Names the form.

        target of type DOMString
            Frame to render the resource in. See the target attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        reset
            Restores a form element's default values. It performs the same action as a reset button.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        submit
            Submits the form. It performs the same action as a submit button.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLSelectElement

    The select element allows the selection of an option. The contained options
    can be directly accessed through the select element as a collection. See the
    SELECT element definition in HTML 4.0.


    IDL Definition

        interface HTMLSelectElement : HTMLElement {
          readonly attribute DOMString        type;
                   attribute long             selectedIndex;
                   attribute DOMString        value;
          readonly attribute long             length;
          readonly attribute HTMLFormElement  form;
          readonly attribute HTMLCollection   options;
                   attribute boolean          disabled;
                   attribute boolean          multiple;
                   attribute DOMString        name;
                   attribute long             size;
                   attribute long             tabIndex;
          void               add(in HTMLElement element, 
                                 in HTMLElement before)
                                                raises(DOMException);
          void               remove(in long index);
          void               blur();
          void               focus();
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        disabled of type boolean
            The control is unavailable in this context. See the disabled attribute definition in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        length of type long, readonly
            The number of options in this SELECT.

        multiple of type boolean
            If true, multiple OPTION elements may be selected in this SELECT. See the multiple attribute definition in HTML 4.0.

        name of type DOMString
            Form control or object name when submitted with a form. See the name attribute definition in HTML 4.0.

        options of type HTMLCollection, readonly
            The collection of OPTION elements contained by this element.

        selectedIndex of type long
            The ordinal index of the selected option, starting from 0. The value -1 is returned if no element is selected. If multiple options are selected, the index of the first selected option is returned.

        size of type long
            Number of visible rows. See the size attribute definition in HTML 4.0.

        tabIndex of type long
            Index that represents the element's position in the tabbing order. See the tabindex attribute definition in HTML 4.0.

        type of type DOMString, readonly
            The type of this form control. This is the string "select-multiple" when the multiple attribute is true and the string "select-one" when false.

        value of type DOMString
            The current form control value.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        add
            Add a new element to the collection of OPTION elements for this SELECT.
            Parameters

            element of type HTMLElement
                The element to add.

            before of type HTMLElement
                The element to insert before, or null for the tail of the list.

            Exceptions

            DOMException
            		

            NOT_FOUND_ERR: Raised if before is not a descendant of the SELECT element.
            No Return Value
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        blur
            Removes keyboard focus from this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        focus
            Gives keyboard focus to this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        remove
            Remove an element from the collection of OPTION elements for this SELECT. Does nothing if no element has the given index.
            Parameters

            index of type long
                The index of the item to remove, starting from 0.

            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLOptGroupElement

    Group options together in logical subdivisions. See the OPTGROUP element
    definition in HTML 4.0.


    IDL Definition

        interface HTMLOptGroupElement : HTMLElement {
                   attribute boolean          disabled;
                   attribute DOMString        label;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        disabled of type boolean
            The control is unavailable in this context. See the disabled attribute definition in HTML 4.0.

        label of type DOMString
            Assigns a label to this option group. See the label attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLOptionElement

    A selectable choice. See the OPTION element definition in HTML 4.0.


    IDL Definition

        interface HTMLOptionElement : HTMLElement {
          readonly attribute HTMLFormElement  form;
                   attribute boolean          defaultSelected;
          readonly attribute DOMString        text;
          readonly attribute long             index;
                   attribute boolean          disabled;
                   attribute DOMString        label;
                   attribute boolean          selected;
                   attribute DOMString        value;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        defaultSelected of type boolean
            Represents the value of the HTML selected attribute. The value of this attribute does not change if the state of the corresponding form control, in an interactive user agent, changes. Changing defaultSelected, however, resets the state of the form control. See the selected attribute definition in HTML 4.0.

        disabled of type boolean
            The control is unavailable in this context. See the disabled attribute definition in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        index of type long, readonly
            The index of this OPTION in its parent SELECT, starting from 0.

        label of type DOMString
            Option label for use in hierarchical menus. See the label attribute definition in HTML 4.0.

        selected of type boolean
            Represents the current state of the corresponding form control, in an interactive user agent. Changing this attribute changes the state of the form control, but does not change the value of the HTML selected attribute of the element.

        text of type DOMString, readonly
            The text contained within the option element.

        value of type DOMString
            The current form control value. See the value attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLInputElement

    Form control. Note. Depending upon the environment in which the page is being viewed, the value property may be read-only for the file upload input type. For the "password" input type, the actual value returned may be masked to prevent unauthorized use. See the INPUT element definition in HTML 4.0.


    IDL Definition

        interface HTMLInputElement : HTMLElement {
                   attribute DOMString        defaultValue;
                   attribute boolean          defaultChecked;
          readonly attribute HTMLFormElement  form;
                   attribute DOMString        accept;
                   attribute DOMString        accessKey;
                   attribute DOMString        align;
                   attribute DOMString        alt;
                   attribute boolean          checked;
                   attribute boolean          disabled;
                   attribute long             maxLength;
                   attribute DOMString        name;
                   attribute boolean          readOnly;
                   attribute DOMString        size;
                   attribute DOMString        src;
                   attribute long             tabIndex;
          readonly attribute DOMString        type;
                   attribute DOMString        useMap;
                   attribute DOMString        value;
          void               blur();
          void               focus();
          void               select();
          void               click();
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        accept of type DOMString
            A comma-separated list of content types that a server processing this form will handle correctly. See the accept attribute definition in HTML 4.0.

        accessKey of type DOMString
            A single character access key to give access to the form control. See the accesskey attribute definition in HTML 4.0.

        align of type DOMString
            Aligns this object (vertically or horizontally) with respect to its surrounding text. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        alt of type DOMString
            Alternate text for user agents not rendering the normal content of this element. See the alt attribute definition in HTML 4.0.

        checked of type boolean
            When the type attribute of the element has the value "Radio" or "Checkbox", this represents the current state of the form control, in an interactive user agent. Changes to this attribute change the state of the form control, but do not change the value of the HTML value attribute of the element.

        defaultChecked of type boolean
            When type has the value "Radio" or "Checkbox", this represents the HTML checked attribute of the element. The value of this attribute does not change if the state of the corresponding form control, in an interactive user agent, changes. Changes to this attribute, however, resets the state of the form control. See the checked attribute definition in HTML 4.0.

        defaultValue of type DOMString
            When the type attribute of the element has the value "Text", "File" or "Password", this represents the HTML value attribute of the element. The value of this attribute does not change if the contents of the corresponding form control, in an interactive user agent, changes. Changing this attribute, however, resets the contents of the form control. See the value attribute definition in HTML 4.0.

        disabled of type boolean
            The control is unavailable in this context. See the disabled attribute definition in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        maxLength of type long
            Maximum number of characters for text fields, when type has the value "Text" or "Password". See the maxlength attribute definition in HTML 4.0.

        name of type DOMString
            Form control or object name when submitted with a form. See the name attribute definition in HTML 4.0.

        readOnly of type boolean
            This control is read-only. Relevant only when type has the value "Text" or "Password". See the readonly attribute definition in HTML 4.0.

        size of type DOMString
            Size information. The precise meaning is specific to each type of field. See the size attribute definition in HTML 4.0.

        src of type DOMString
            When the type attribute has the value "Image", this attribute specifies the location of the image to be used to decorate the graphical submit button. See the src attribute definition in HTML 4.0.

        tabIndex of type long
            Index that represents the element's position in the tabbing order. See the tabindex attribute definition in HTML 4.0.

        type of type DOMString, readonly
            The type of control created. See the type attribute definition in HTML 4.0.

        useMap of type DOMString
            Use client-side image map. See the usemap attribute definition in HTML 4.0.

        value of type DOMString
            When the type attribute of the element has the value "Text", "File" or "Password", this represents the current contents of the corresponding form control, in an interactive user agent. Changing this attribute changes the contents of the form control, but does not change the value of the HTML value attribute of the element. When the type attribute of the element has the value "Button", "Hidden", "Submit", "Reset", "Image", "Checkbox" or "Radio", this represents the HTML value attribute of the element. See the value attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        blur
            Removes keyboard focus from this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        click
            Simulate a mouse-click. For INPUT elements whose type attribute has one of the following values: "Button", "Checkbox", "Radio", "Reset", or "Submit".

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        focus
            Gives keyboard focus to this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        select
            Select the contents of the text area. For INPUT elements whose type attribute has one of the following values: "Text", "File", or "Password".

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTextAreaElement

    Multi-line text field. See the TEXTAREA element definition in HTML 4.0.


    IDL Definition

        interface HTMLTextAreaElement : HTMLElement {
                   attribute DOMString        defaultValue;
          readonly attribute HTMLFormElement  form;
                   attribute DOMString        accessKey;
                   attribute long             cols;
                   attribute boolean          disabled;
                   attribute DOMString        name;
                   attribute boolean          readOnly;
                   attribute long             rows;
                   attribute long             tabIndex;
          readonly attribute DOMString        type;
                   attribute DOMString        value;
          void               blur();
          void               focus();
          void               select();
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        accessKey of type DOMString
            A single character access key to give access to the form control. See the accesskey attribute definition in HTML 4.0.

        cols of type long
            Width of control (in characters). See the cols attribute definition in HTML 4.0.

        defaultValue of type DOMString
            Represents the contents of the element. The value of this attribute does not change if the contents of the corresponding form control, in an interactive user agent, changes. Changing this attribute, however, resets the contents of the form control.

        disabled of type boolean
            The control is unavailable in this context. See the disabled attribute definition in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        name of type DOMString
            Form control or object name when submitted with a form. See the name attribute definition in HTML 4.0.

        readOnly of type boolean
            This control is read-only. See the readonly attribute definition in HTML 4.0.

        rows of type long
            Number of text rows. See the rows attribute definition in HTML 4.0.

        tabIndex of type long
            Index that represents the element's position in the tabbing order. See the tabindex attribute definition in HTML 4.0.

        type of type DOMString, readonly
            The type of this form control. This the string "textarea".

        value of type DOMString
            Represents the current contents of the corresponding form control, in an interactive user agent. Changing this attribute changes the contents of the form control, but does not change the contents of the element. If the entirety of the data can not fit into a single DOMString, the implementation may truncate the data.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        blur
            Removes keyboard focus from this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        focus
            Gives keyboard focus to this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        select
            Select the contents of the TEXTAREA.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLButtonElement

    Push button. See the BUTTON element definition in HTML 4.0.


    IDL Definition

        interface HTMLButtonElement : HTMLElement {
          readonly attribute HTMLFormElement  form;
                   attribute DOMString        accessKey;
                   attribute boolean          disabled;
                   attribute DOMString        name;
                   attribute long             tabIndex;
          readonly attribute DOMString        type;
                   attribute DOMString        value;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        accessKey of type DOMString
            A single character access key to give access to the form control. See the accesskey attribute definition in HTML 4.0.

        disabled of type boolean
            The control is unavailable in this context. See the disabled attribute definition in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        name of type DOMString
            Form control or object name when submitted with a form. See the name attribute definition in HTML 4.0.

        tabIndex of type long
            Index that represents the element's position in the tabbing order. See the tabindex attribute definition in HTML 4.0.

        type of type DOMString, readonly
            The type of button. See the type attribute definition in HTML 4.0.

        value of type DOMString
            The cu
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
            
Interface HTMLLabelElement

    Form field label text. See the LABEL element definition in HTML 4.0.


    IDL Definition

        interface HTMLLabelElement : HTMLElement {
          readonly attribute HTMLFormElement  form;
                   attribute DOMString        accessKey;
                   attribute DOMString        htmlFor;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        accessKey of type DOMString
            A single character access key to give access to the form control. See the accesskey attribute definition in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        htmlFor of type DOMString
            This attribute links this label with another form control by id attribute. See the for attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLFieldSetElement

    Organizes form controls into logical groups. See the FIELDSET element definition in HTML 4.0.


    IDL Definition

        interface HTMLFieldSetElement : HTMLElement {
          readonly attribute HTMLFormElement  form;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLLegendElement

    Provides a caption for a FIELDSET grouping. See the LEGEND element definition in HTML 4.0.


    IDL Definition

        interface HTMLLegendElement : HTMLElement {
          readonly attribute HTMLFormElement  form;
                   attribute DOMString        accessKey;
                   attribute DOMString        align;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        accessKey of type DOMString
            A single character access key to give access to the form control. See the accesskey attribute definition in HTML 4.0.

        align of type DOMString
            Text alignment relative to FIELDSET. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLUListElement

    Unordered list. See the UL element definition in HTML 4.0.


    IDL Definition

        interface HTMLUListElement : HTMLElement {
                   attribute boolean          compact;
                   attribute DOMString        type;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        compact of type boolean
            Reduce spacing between list items. See the compact attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        type of type DOMString
            Bullet style. See the type attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLOListElement

    Ordered list. See the OL element definition in HTML 4.0.


    IDL Definition

        interface HTMLOListElement : HTMLElement {
                   attribute boolean          compact;
                   attribute long             start;
                   attribute DOMString        type;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        compact of type boolean
            Reduce spacing between list items. See the compact attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        start of type long
            Starting sequence number. See the start attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        type of type DOMString
            Numbering style. See the type attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLDListElement

    Definition list. See the DL element definition in HTML 4.0.


    IDL Definition

        interface HTMLDListElement : HTMLElement {
                   attribute boolean          compact;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        compact of type boolean
            Reduce spacing between list items. See the compact attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLDirectoryElement

    Directory list. See the DIR element definition in HTML 4.0. This element is deprecated in HTML 4.0.


    IDL Definition

        interface HTMLDirectoryElement : HTMLElement {
                   attribute boolean          compact;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        compact of type boolean
            Reduce spacing between list items. See the compact attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLMenuElement

    Menu list. See the MENU element definition in HTML 4.0. This element is deprecated in HTML 4.0.


    IDL Definition

        interface HTMLMenuElement : HTMLElement {
                   attribute boolean          compact;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        compact of type boolean
            Reduce spacing between list items. See the compact attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLLIElement

    List item. See the LI element definition in HTML 4.0.


    IDL Definition

        interface HTMLLIElement : HTMLElement {
                   attribute DOMString        type;
                   attribute long             value;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        type of type DOMString
            List item bullet style. See the type attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        value of type long
            Reset sequence number when used in OL. See the value attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLDivElement

    Generic block container. See the DIV element definition in HTML 4.0.


    IDL Definition

        interface HTMLDivElement : HTMLElement {
                   attribute DOMString        align;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Horizontal text alignment. See the align attribute definition in HTML
            4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLParagraphElement

    Paragraphs. See the P element definition in HTML 4.0.


    IDL Definition

        interface HTMLParagraphElement : HTMLElement {
                   attribute DOMString        align;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Horizontal text alignment. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLHeadingElement

    For the H1 to H6 elements. See the H1 element definition in HTML 4.0.


    IDL Definition

        interface HTMLHeadingElement : HTMLElement {
                   attribute DOMString        align;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Horizontal text alignment. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLQuoteElement

    For the Q and BLOCKQUOTE elements. See the Q element definition in HTML 4.0.


    IDL Definition

        interface HTMLQuoteElement : HTMLElement {
                   attribute DOMString        cite;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        cite of type DOMString
            A URI designating a source document or message. See the cite attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLPreElement

    Preformatted text. See the PRE element definition in HTML 4.0.


    IDL Definition

        interface HTMLPreElement : HTMLElement {
                   attribute long             width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        width of type long
            Fixed width for content. See the width attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLBRElement

    Force a line break. See the BR element definition in HTML 4.0.


    IDL Definition

        interface HTMLBRElement : HTMLElement {
                   attribute DOMString        clear;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        clear of type DOMString
            Control flow of text around floats. See the clear attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLBaseFontElement

    Base font. See the BASEFONT element definition in HTML 4.0. This element is deprecated in HTML 4.0.


    IDL Definition

        interface HTMLBaseFontElement : HTMLElement {
                   attribute DOMString        color;
                   attribute DOMString        face;
                   attribute DOMString        size;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        color of type DOMString
            Font color. See the color attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        face of type DOMString
            Font face identifier. See the face attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        size of type DOMString
            Font size. See the size attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLFontElement

    Local change to font. See the FONT element definition in HTML 4.0. This element is deprecated in HTML 4.0.


    IDL Definition

        interface HTMLFontElement : HTMLElement {
                   attribute DOMString        color;
                   attribute DOMString        face;
                   attribute DOMString        size;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        color of type DOMString
            Font color. See the color attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        face of type DOMString
            Font face identifier. See the face attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        size of type DOMString
            Font size. See the size attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLHRElement

    Create a horizontal rule. See the HR element definition in HTML 4.0.


    IDL Definition

        interface HTMLHRElement : HTMLElement {
                   attribute DOMString        align;
                   attribute boolean          noShade;
                   attribute DOMString        size;
                   attribute DOMString        width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Align the rule on the page. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        noShade of type boolean
            Indicates to the user agent that there should be no shading in the rendering of this element. See the noshade attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        size of type DOMString
            The height of the rule. See the size attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        width of type DOMString
            The width of the rule. See the width attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLModElement

    Notice of modification to part of a document. See the INS and DEL element definitions in HTML 4.0.


******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    IDL Definition

        interface HTMLModElement : HTMLElement {
                   attribute DOMString        cite;
                   attribute DOMString        dateTime;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        cite of type DOMString
            A URI designating a document that describes the reason for the change. See the cite attribute definition in HTML 4.0.

        dateTime of type DOMString
            The date and time of the change. See the datetime attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLAnchorElement

    The anchor element. See the A element definition in HTML 4.0.


    IDL Definition

        interface HTMLAnchorElement : HTMLElement {
                   attribute DOMString        accessKey;
                   attribute DOMString        charset;
                   attribute DOMString        coords;
                   attribute DOMString        href;
                   attribute DOMString        hreflang;
                   attribute DOMString        name;
                   attribute DOMString        rel;
                   attribute DOMString        rev;
                   attribute DOMString        shape;
                   attribute long             tabIndex;
                   attribute DOMString        target;
                   attribute DOMString        type;
          void               blur();
          void               focus();
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        accessKey of type DOMString
            A single character access key to give access to the form control. See the accesskey attribute definition in HTML 4.0.

        charset of type DOMString
            The character encoding of the linked resource. See the charset attribute definition in HTML 4.0.

        coords of type DOMString
            Comma-separated list of lengths, defining an active region geometry. See also shape for the shape of the region. See the coords attribute definition in HTML 4.0.

        href of type DOMString
            The URI of the linked resource. See the href attribute definition in HTML 4.0.

        hreflang of type DOMString
            Language code of the linked resource. See the hreflang attribute definition in HTML 4.0.

        name of type DOMString
            Anchor name. See the name attribute definition in HTML 4.0.

        rel of type DOMString
            Forward link type. See the rel attribute definition in HTML 4.0.

        rev of type DOMString
            Reverse link type. See the rev attribute definition in HTML 4.0.

        shape of type DOMString
            The shape of the active area. The coordinates are given by coords. See the shape attribute definition in HTML 4.0.

        tabIndex of type long
            Index that represents the element's position in the tabbing order. See the tabindex attribute definition in HTML 4.0.

        target of type DOMString
            Frame to render the resource in. See the target attribute definition in HTML 4.0.

        type of type DOMString
            Advisory content type. See the type attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        blur
            Removes keyboard focus from this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        focus
            Gives keyboard focus to this element.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLImageElement

    Embedded image. See the IMG element definition in HTML 4.0.


    IDL Definition

        interface HTMLImageElement : HTMLElement {
                   attribute DOMString        lowSrc;
                   attribute DOMString        name;
                   attribute DOMString        align;
                   attribute DOMString        alt;
                   attribute DOMString        border;
                   attribute DOMString        height;
                   attribute DOMString        hspace;
                   attribute boolean          isMap;
                   attribute DOMString        longDesc;
                   attribute DOMString        src;
                   attribute DOMString        useMap;
                   attribute DOMString        vspace;
                   attribute DOMString        width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Aligns this object (vertically or horizontally) with respect to its surrounding text. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        alt of type DOMString
            Alternate text for user agents not rendering the normal content of this element. See the alt attribute definition in HTML 4.0.

        border of type DOMString
            Width of border around image. See the border attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        height of type DOMString
            Override height. See the height attribute definition in HTML 4.0.

        hspace of type DOMString
            Horizontal space to the left and right of this image. See the hspace attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        isMap of type boolean
            Use server-side image map. See the ismap attribute definition in HTML 4.0.

        longDesc of type DOMString
            URI designating a long description of this image or frame. See the longdesc attribute definition in HTML 4.0.

        lowSrc of type DOMString
            URI designating the source of this image, for low-resolution output.

        name of type DOMString
            The name of the element (for backwards compatibility).

        src of type DOMString
            URI designating the source of this image. See the src attribute definition in HTML 4.0.

        useMap of type DOMString
            Use client-side image map. See the usemap attribute definition in HTML 4.0.

        vspace of type DOMString
            Vertical space above and below this image. See the vspace attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        width of type DOMString
            Override width. See the width attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLObjectElement

    Generic embedded object. Note. In principle, all properties on the object
    element are read-write but in some environments some properties may be
    read-only once the underlying object is instantiated. See the OBJECT element
    definition in HTML 4.0.


    IDL Definition

        interface HTMLObjectElement : HTMLElement {
          readonly attribute HTMLFormElement  form;
                   attribute DOMString        code;
                   attribute DOMString        align;
                   attribute DOMString        archive;
                   attribute DOMString        border;
                   attribute DOMString        codeBase;
                   attribute DOMString        codeType;
                   attribute DOMString        data;
                   attribute boolean          declare;
                   attribute DOMString        height;
                   attribute DOMString        hspace;
                   attribute DOMString        name;
                   attribute DOMString        standby;
                   attribute long             tabIndex;
                   attribute DOMString        type;
                   attribute DOMString        useMap;
                   attribute DOMString        vspace;
                   attribute DOMString        width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Aligns this object (vertically or horizontally) with respect to its surrounding text. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        archive of type DOMString
            Space-separated list of archives. See the archive attribute definition in HTML 4.0.

        border of type DOMString
            Width of border around the object. See the border attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        code of type DOMString
            Applet class file. See the code attribute for HTMLAppletElement.

        codeBase of type DOMString
            Base URI for classid, data, and archive attributes. See the codebase attribute definition in HTML 4.0.

        codeType of type DOMString
            Content type for data downloaded via classid attribute. See the codetype attribute definition in HTML 4.0.

        data of type DOMString
            A URI specifying the location of the object's data. See the data attribute definition in HTML 4.0.

        declare of type boolean
            Declare (for future reference), but do not instantiate, this object. See the declare attribute definition in HTML 4.0.

        form of type HTMLFormElement, readonly
            Returns the FORM element containing this control. Returns null if this control is not within the context of a form.

        height of type DOMString
            Override height. See the height attribute definition in HTML 4.0.

        hspace of type DOMString
            Horizontal space to the left and right of this image, applet, or object. See the hspace attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        name of type DOMString
            Form control or object name when submitted with a form. See the name attribute definition in HTML 4.0.

        standby of type DOMString
            Message to render while loading the object. See the standby attribute definition in HTML 4.0.

        tabIndex of type long
            Index that represents the element's position in the tabbing order. See the tabindex attribute definition in HTML 4.0.

        type of type DOMString
            Content type for data downloaded via data attribute. See the type attribute definition in HTML 4.0.

        useMap of type DOMString
            Use client-side image map. See the usemap attribute definition in HTML 4.0.

        vspace of type DOMString
            Vertical space above and below this image, applet, or object. See the vspace attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        width of type DOMString
            Override width. See the width attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLParamElement

    Parameters fed to the OBJECT element. See the PARAM element definition in
    HTML 4.0.


    IDL Definition

        interface HTMLParamElement : HTMLElement {
                   attribute DOMString        name;
                   attribute DOMString        type;
                   attribute DOMString        value;
                   attribute DOMString        valueType;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        name of type DOMString
            The name of a run-time parameter. See the name attribute definition in HTML 4.0.

        type of type DOMString
            Content type for the value attribute when valuetype has the value "ref". See the type attribute definition in HTML 4.0.

        value of type DOMString
            The value of a run-time parameter. See the value attribute definition in HTML 4.0.

        valueType of type DOMString
            Information about the meaning of the value attribute value. See the valuetype attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLAppletElement

    An embedded Java applet. See the APPLET element definition in HTML 4.0. This element is deprecated in HTML 4.0.


    IDL Definition

        interface HTMLAppletElement : HTMLElement {
                   attribute DOMString        align;
                   attribute DOMString        alt;
                   attribute DOMString        archive;
                   attribute DOMString        code;
                   attribute DOMString        codeBase;
                   attribute DOMString        height;
                   attribute DOMString        hspace;
                   attribute DOMString        name;
                   attribute DOMString        object;
                   attribute DOMString        vspace;
                   attribute DOMString        width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Aligns this object (vertically or horizontally) with respect to its surrounding text. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        alt of type DOMString
            Alternate text for user agents not rendering the normal content of this element. See the alt attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        archive of type DOMString
            Comma-separated archive list. See the archive attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        code of type DOMString
            Applet class file. See the code attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        codeBase of type DOMString
            Optional base URI for applet. See the codebase attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        height of type DOMString
            Override height. See the height attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        hspace of type DOMString
            Horizontal space to the left and right of this image, applet, or object. See the hspace attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        name of type DOMString
            The name of the applet. See the name attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        object of type DOMString
            Serialized applet file. See the object attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        vspace of type DOMString
            Vertical space above and below this image, applet, or object. See the vspace attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        width of type DOMString
            Override width. See the width attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLMapElement

    Client-side image map. See the MAP element definition in HTML 4.0.


    IDL Definition

        interface HTMLMapElement : HTMLElement {
          readonly attribute HTMLCollection   areas;
                   attribute DOMString        name;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        areas of type HTMLCollection, readonly
            The list of areas defined for the image map.

        name of type DOMString
            Names the map (for use with usemap). See the name attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLAreaElement

    Client-side image map area definition. See the AREA element definition in HTML 4.0.


    IDL Definition

        interface HTMLAreaElement : HTMLElement {
                   attribute DOMString        accessKey;
                   attribute DOMString        alt;
                   attribute DOMString        coords;
                   attribute DOMString        href;
                   attribute boolean          noHref;
                   attribute DOMString        shape;
                   attribute long             tabIndex;
                   attribute DOMString        target;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        accessKey of type DOMString
            A single character access key to give access to the form control. See the accesskey attribute definition in HTML 4.0.

        alt of type DOMString
            Alternate text for user agents not rendering the normal content of this element. See the alt attribute definition in HTML 4.0.

        coords of type DOMString
            Comma-separated list of lengths, defining an active region geometry. See also shape for the shape of the region. See the coords attribute definition in HTML 4.0.

        href of type DOMString
            The URI of the linked resource. See the href attribute definition in HTML 4.0.

        noHref of type boolean
            Specifies that this area is inactive, i.e., has no associated action. See the nohref attribute definition in HTML 4.0.

        shape of type DOMString
            The shape of the active area. The coordinates are given by coords. See the shape attribute definition in HTML 4.0.

        tabIndex of type long
            Index that represents the element's position in the tabbing order. See the tabindex attribute definition in HTML 4.0.

        target of type DOMString
            Frame to render the resource in. See the target attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLScriptElement

    Script statements. See the SCRIPT element definition in HTML 4.0.


    IDL Definition

        interface HTMLScriptElement : HTMLElement {
                   attribute DOMString        text;
                   attribute DOMString        htmlFor;
                   attribute DOMString        event;
                   attribute DOMString        charset;
                   attribute boolean          defer;
                   attribute DOMString        src;
                   attribute DOMString        type;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        charset of type DOMString
            The character encoding of the linked resource. See the charset attribute definition in HTML 4.0.

        defer of type boolean
            Indicates that the user agent can defer processing of the script. See the defer attribute definition in HTML 4.0.

        event of type DOMString
            Reserved for future use.

        htmlFor of type DOMString
            Reserved for future use.

        src of type DOMString
            URI designating an external script. See the src attribute definition in HTML 4.0.

        text of type DOMString
            The script content of the element.

        type of type DOMString
            The content type of the script language. See the type attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTableElement

    The create* and delete* methods on the table allow authors to construct and modify tables. HTML 4.0 specifies that only one of each of the CAPTION, THEAD, and TFOOT elements may exist in a table. Therefore, if one exists, and the createTHead() or createTFoot() method is called, the method returns the existing THead or TFoot element. See the TABLE element definition in HTML 4.0.


    IDL Definition

        interface HTMLTableElement : HTMLElement {
                   attribute HTMLTableCaptionElement  caption;
                   attribute HTMLTableSectionElement  tHead;
                   attribute HTMLTableSectionElement  tFoot;
          readonly attribute HTMLCollection   rows;
          readonly attribute HTMLCollection   tBodies;
                   attribute DOMString        align;
                   attribute DOMString        bgColor;
                   attribute DOMString        border;
                   attribute DOMString        cellPadding;
                   attribute DOMString        cellSpacing;
                   attribute DOMString        frame;
                   attribute DOMString        rules;
                   attribute DOMString        summary;
                   attribute DOMString        width;
          HTMLElement        createTHead();
          void               deleteTHead();
          HTMLElement        createTFoot();
          void               deleteTFoot();
          HTMLElement        createCaption();
          void               deleteCaption();
          HTMLElement        insertRow(in long index)
                                                raises(DOMException);
          void               deleteRow(in long index)
                                                raises(DOMException);
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Specifies the table's position with respect to the rest of the document. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        bgColor of type DOMString
            Cell background color. See the bgcolor attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        border of type DOMString
            The width of the border around the table. See the border attribute definition in HTML 4.0.

        caption of type HTMLTableCaptionElement
            Returns the table's CAPTION, or void if none exists.

        cellPadding of type DOMString
            Specifies the horizontal and vertical space between cell content and cell borders. See the cellpadding attribute definition in HTML 4.0.

        cellSpacing of type DOMString
            Specifies the horizontal and vertical separation between cells. See the cellspacing attribute definition in HTML 4.0.

        frame of type DOMString
            Specifies which external table borders to render. See the frame attribute definition in HTML 4.0.

        rows of type HTMLCollection, readonly
            Returns a collection of all the rows in the table, including all in THEAD, TFOOT, all TBODY elements.

        rules of type DOMString
            Specifies which internal table borders to render. See the rules attribute definition in HTML 4.0.

        summary of type DOMString
            Description about the purpose or structure of a table. See the summary attribute definition in HTML 4.0.

        tBodies of type HTMLCollection, readonly
            Returns a collection of the defined table bodies.

        tFoot of type HTMLTableSectionElement
            Returns the table's TFOOT, or null if none exists.

        tHead of type HTMLTableSectionElement
            Returns the table's THEAD, or null if none exists.

        width of type DOMString
            Specifies the desired table width. See the width attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        createCaption
            Create a new table caption object or return an existing one.
            Return Value

            HTMLElement
            		

            A CAPTION element.
            No Parameters
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        createTFoot
            Create a table footer row or return an existing one.
            Return Value

            HTMLElement
            		

            A footer element (TFOOT).
            No Parameters
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        createTHead
            Create a table header row or return an existing one.
            Return Value

            HTMLElement
            		

            A new table header element (THEAD).
            No Parameters
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        deleteCaption
            Delete the table caption, if one exists.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        deleteRow
            Delete a table row.
            Parameters

            index of type long
                The index of the row to be deleted. This index starts from 0 and is relative to all the rows contained inside the table, regardless of section parentage.

            Exceptions

            DOMException
            		

            INDEX_SIZE_ERR: Raised if the specified index is greater than or equal to the number of rows or if the index is negative.
            No Return Value
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        deleteTFoot
            Delete the footer from the table, if one exists.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        deleteTHead
            Delete the header from the table, if one exists.

            No Parameters
            No Return Value
            No Exceptions
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        insertRow
            Insert a new empty row in the table. The new row is inserted immediately before and in the same section as the current indexth row in the table. If index is equal to the number of rows, the new row is appended. In addition, when the table is empty the row is inserted into a TBODY which is created and inserted into the table. Note. A table row cannot be empty according to HTML 4.0 Recommendation.
            Parameters

            index of type long
                The row number where to insert a new row. This index starts from 0 and is relative to all the rows contained inside the table, regardless of section parentage.

            Return Value

            HTMLElement
            		

            The newly created row.
            Exceptions

            DOMException
            		

            INDEX_SIZE_ERR: Raised if the specified index is greater than the number of rows or if the index is negative.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTableCaptionElement

    Table caption See the CAPTION element definition in HTML 4.0.


    IDL Definition

        interface HTMLTableCaptionElement : HTMLElement {
                   attribute DOMString        align;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Caption alignment with respect to the table. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTableColElement

    Regroups the COL and COLGROUP elements. See the COL element definition in HTML 4.0.


    IDL Definition

        interface HTMLTableColElement : HTMLElement {
                   attribute DOMString        align;
                   attribute DOMString        ch;
                   attribute DOMString        chOff;
                   attribute long             span;
                   attribute DOMString        vAlign;
                   attribute DOMString        width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Horizontal alignment of cell data in column. See the align attribute definition in HTML 4.0.

        ch of type DOMString
            Alignment character for cells in a column. See the char attribute definition in HTML 4.0.

        chOff of type DOMString
            Offset of alignment character. See the charoff attribute definition in HTML 4.0.

        span of type long
            Indicates the number of columns in a group or affected by a grouping. See the span attribute definition in HTML 4.0.

        vAlign of type DOMString
            Vertical alignment of cell data in column. See the valign attribute definition in HTML 4.0.

        width of type DOMString
            Default column width. See the width attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTableSectionElement

    The THEAD, TFOOT, and TBODY elements.


    IDL Definition

        interface HTMLTableSectionElement : HTMLElement {
                   attribute DOMString        align;
                   attribute DOMString        ch;
                   attribute DOMString        chOff;
                   attribute DOMString        vAlign;
          readonly attribute HTMLCollection   rows;
          HTMLElement        insertRow(in long index)
                                                raises(DOMException);
          void               deleteRow(in long index)
                                                raises(DOMException);
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Horizontal alignment of data in cells. See the align attribute for HTMLTheadElement for details.

        ch of type DOMString
            Alignment character for cells in a column. See the char attribute definition in HTML 4.0.

        chOff of type DOMString
            Offset of alignment character. See the charoff attribute definition in HTML 4.0.

        rows of type HTMLCollection, readonly
            The collection of rows in this table section.

        vAlign of type DOMString
            Vertical alignment of data in cells. See the valign attribute for HTMLTheadElement for details.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        deleteRow
            Delete a row from this section.
            Parameters

            index of type long
                The index of the row to be deleted. This index starts from 0 and is relative only to the rows contained inside this section, not all the rows in the table.

            Exceptions

            DOMException
            		

            INDEX_SIZE_ERR: Raised if the specified index is greater than or equal to the number of rows or if the index is negative.
            No Return Value
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        insertRow
            Insert a row into this section. The new row is inserted immediately before the current indexth row in this section. If index is equal to the number of rows in this section, the new row is appended.
            Parameters

            index of type long
                The row number where to insert a new row. This index starts from 0 and is relative only to the rows contained inside this section, not all the rows in the table.

            Return Value

            HTMLElement
            		

            The newly created row.
            Exceptions

            DOMException
            		

            INDEX_SIZE_ERR: Raised if the specified index is greater than the number of rows or if the index is negative.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTableRowElement

    A row in a table. See the TR element definition in HTML 4.0.


    IDL Definition

        interface HTMLTableRowElement : HTMLElement {
          readonly attribute long             rowIndex;
          readonly attribute long             sectionRowIndex;
          readonly attribute HTMLCollection   cells;
                   attribute DOMString        align;
                   attribute DOMString        bgColor;
                   attribute DOMString        ch;
                   attribute DOMString        chOff;
                   attribute DOMString        vAlign;
          HTMLElement        insertCell(in long index)
                                                raises(DOMException);
          void               deleteCell(in long index)
                                                raises(DOMException);
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Horizontal alignment of data within cells of this row. See the align attribute definition in HTML 4.0.

        bgColor of type DOMString
            Background color for rows. See the bgcolor attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        cells of type HTMLCollection, readonly
            The collection of cells in this row.

        ch of type DOMString
            Alignment character for cells in a column. See the char attribute definition in HTML 4.0.

        chOff of type DOMString
            Offset of alignment character. See the charoff attribute definition in HTML 4.0.

        rowIndex of type long, readonly
            The index of this row, relative to the entire table, starting from 0. This is in document tree order and not display order. The rowIndex does not take into account sections (THEAD, TFOOT, or TBODY) within the table.

        sectionRowIndex of type long, readonly
            The index of this row, relative to the current section (THEAD, TFOOT, or TBODY), starting from 0.

        vAlign of type DOMString
            Vertical alignment of data within cells of this row. See the valign attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Methods

        deleteCell
            Delete a cell from the current row.
            Parameters

            index of type long
                The index of the cell to delete, starting from 0.

            Exceptions

            DOMException
            		

            INDEX_SIZE_ERR: Raised if the specified index is greater than or equal to the number of cells or if the index is negative.
            No Return Value
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

        insertCell
            Insert an empty TD cell into this row. If index is equal to the number of cells, the new cell is appended.
            Parameters

            index of type long
                The place to insert the cell, starting from 0.

            Return Value

            HTMLElement
            		

            The newly created cell.
            Exceptions

            DOMException
            		

            INDEX_SIZE_ERR: Raised if the specified index is greater than the number of cells or if the index is negative.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLTableCellElement

    The object used to represent the TH and TD elements. See the TD element
    definition in HTML 4.0.


    IDL Definition

        interface HTMLTableCellElement : HTMLElement {
          readonly attribute long             cellIndex;
                   attribute DOMString        abbr;
                   attribute DOMString        align;
                   attribute DOMString        axis;
                   attribute DOMString        bgColor;
                   attribute DOMString        ch;
                   attribute DOMString        chOff;
                   attribute long             colSpan;
                   attribute DOMString        headers;
                   attribute DOMString        height;
                   attribute boolean          noWrap;
                   attribute long             rowSpan;
                   attribute DOMString        scope;
                   attribute DOMString        vAlign;
                   attribute DOMString        width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        abbr of type DOMString
            Abbreviation for header cells. See the abbr attribute definition in HTML 4.0.

        align of type DOMString
            Horizontal alignment of data in cell. See the align attribute definition in HTML 4.0.

        axis of type DOMString
            Names group of related headers. See the axis attribute definition in HTML 4.0.

        bgColor of type DOMString
            Cell background color. See the bgcolor attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        cellIndex of type long, readonly
            The index of this cell in the row, starting from 0. This index is in document tree order and not display order.

        ch of type DOMString
            Alignment character for cells in a column. See the char attribute definition in HTML 4.0.

        chOff of type DOMString
            Offset of alignment character. See the charoff attribute definition in HTML 4.0.

        colSpan of type long
            Number of columns spanned by cell. See the colspan attribute definition in HTML 4.0.

        headers of type DOMString
            List of id attribute values for header cells. See the headers attribute definition in HTML 4.0.

        height of type DOMString
            Cell height. See the height attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        noWrap of type boolean
            Suppress word wrapping. See the nowrap attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        rowSpan of type long
            Number of rows spanned by cell. See the rowspan attribute definition in HTML 4.0.

        scope of type DOMString
            Scope covered by header cells. See the scope attribute definition in HTML 4.0.

        vAlign of type DOMString
            Vertical alignment of data in cell. See the valign attribute definition in HTML 4.0.

        width of type DOMString
            Cell width. See the width attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLFrameSetElement

    Create a grid of frames. See the FRAMESET element definition in HTML 4.0.


    IDL Definition

        interface HTMLFrameSetElement : HTMLElement {
                   attribute DOMString        cols;
                   attribute DOMString        rows;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        cols of type DOMString
            The number of columns of frames in the frameset. See the cols attribute definition in HTML 4.0.

        rows of type DOMString
            The number of rows of frames in the frameset. See the rows attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLFrameElement

    Create a frame. See the FRAME element definition in HTML 4.0.


    IDL Definition

        interface HTMLFrameElement : HTMLElement {
                   attribute DOMString        frameBorder;
                   attribute DOMString        longDesc;
                   attribute DOMString        marginHeight;
                   attribute DOMString        marginWidth;
                   attribute DOMString        name;
                   attribute boolean          noResize;
                   attribute DOMString        scrolling;
                   attribute DOMString        src;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        frameBorder of type DOMString
            Request frame borders. See the frameborder attribute definition in HTML 4.0.

        longDesc of type DOMString
            URI designating a long description of this image or frame. See the longdesc attribute definition in HTML 4.0.

        marginHeight of type DOMString
            Frame margin height, in pixels. See the marginheight attribute definition in HTML 4.0.

        marginWidth of type DOMString
            Frame margin width, in pixels. See the marginwidth attribute definition in HTML 4.0.

        name of type DOMString
            The frame name (object of the target attribute). See the name attribute definition in HTML 4.0.

        noResize of type boolean
            When true, forbid user from resizing frame. See the noresize attribute definition in HTML 4.0.

        scrolling of type DOMString
            Specify whether or not the frame should have scrollbars. See the scrolling attribute definition in HTML 4.0.

        src of type DOMString
            A URI designating the initial frame contents. See the src attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Interface HTMLIFrameElement

    Inline subwindows. See the IFRAME element definition in HTML 4.0.


    IDL Definition

        interface HTMLIFrameElement : HTMLElement {
                   attribute DOMString        align;
                   attribute DOMString        frameBorder;
                   attribute DOMString        height;
                   attribute DOMString        longDesc;
                   attribute DOMString        marginHeight;
                   attribute DOMString        marginWidth;
                   attribute DOMString        name;
                   attribute DOMString        scrolling;
                   attribute DOMString        src;
                   attribute DOMString        width;
        };
        
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************


    Attributes

        align of type DOMString
            Aligns this object (vertically or horizontally) with respect to its surrounding text. See the align attribute definition in HTML 4.0. This attribute is deprecated in HTML 4.0.

        frameBorder of type DOMString
            Request frame borders. See the frameborder attribute definition in HTML 4.0.

        height of type DOMString
            Frame height. See the height attribute definition in HTML 4.0.

        longDesc of type DOMString
            URI designating a long description of this image or frame. See the longdesc attribute definition in HTML 4.0.

        marginHeight of type DOMString
            Frame margin height, in pixels. See the marginheight attribute definition in HTML 4.0.

        marginWidth of type DOMString
            Frame margin width, in pixels. See the marginwidth attribute definition in HTML 4.0.

        name of type DOMString
            The frame name (object of the target attribute). See the name attribute definition in HTML 4.0.

        scrolling of type DOMString
            Specify whether or not the frame should have scrollbars. See the scrolling attribute definition in HTML 4.0.

        src of type DOMString
            A URI designating the initial frame contents. See the src attribute definition in HTML 4.0.

        width of type DOMString
            Frame width. See the width attribute definition in HTML 4.0.
            
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-html.html
******************************************************************************/