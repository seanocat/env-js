QUnit.module('DOM Level 2');
/******************************************************************************
http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html

13 November, 2000
1. Document Object Model Core

Editors
    Arnaud Le Hors, IBM
    Gavin Nicol, Inso EPS (for DOM Level 1)
    Lauren Wood, SoftQuad, Inc. (for DOM Level 1)
    Mike Champion, ArborText (for DOM Level 1 from November 20, 1997)
    Steve Byrne, JavaSoft (for DOM Level 1 until November 19, 1997)

Table of contents

    * 1.1. Overview of the DOM Core Interfaces
          o 1.1.1. The DOM Structure Model
          o 1.1.2. Memory Management
          o 1.1.3. Naming Conventions
          o 1.1.4. Inheritance vs. Flattened Views of the API
          o 1.1.5. The DOMString type
          o 1.1.6. The DOMTimeStamp type
          o 1.1.7. String comparisons in the DOM
          o 1.1.8. XML Namespaces
    * 1.2. Fundamental Interfaces
          o DOMException, ExceptionCode, DOMImplementation, DocumentFragment, 
            Document, Node, NodeList, NamedNodeMap, CharacterData, Attr, 
            Element, Text, Comment
    * 1.3. Extended Interfaces
          o CDATASection, DocumentType, Notation, Entity, EntityReference, 
            ProcessingInstruction

******************************************************************************/
test('Fundamental Interfaces Available', function(){
    ok(true, 'DOM 2 has no additional fundamental interfaces');
});
test('Extended Interfaces Available', function(){
    ok(true, 'DOM 2 has no additional extended interfaces');
});
/******************************************************************************
1.1. Overview of the DOM Core Interfaces

This section defines a set of objects and interfaces for accessing and 
manipulating document objects. The functionality specified in this section (the
Core functionality) is sufficient to allow software developers and web script 
authors to access and manipulate parsed HTML and XML content inside conforming 
products. The DOM Core API also allows creation and population of a Document 
object using only DOM API calls; loading a Document and saving it persistently 
is left to the product that implements the DOM API.

1.1.1. The DOM Structure Model

The DOM presents documents as a hierarchy of Node objects that also implement 
other, more specialized interfaces. Some types of nodes may have child nodes of
various types, and others are leaf nodes that cannot have anything below them 
in the document structure. For XML and HTML, the node types, and which node 
types they may have as children, are as follows:

    * Document -- Element (maximum of one), ProcessingInstruction, Comment, 
                DocumentType (maximum of one)
    * DocumentFragment -- Element, ProcessingInstruction, Comment, Text, 
                CDATASection, EntityReference
    * DocumentType -- no children
    * EntityReference -- Element, ProcessingInstruction, Comment, Text, 
                CDATASection, EntityReference
    * Element -- Element, Text, Comment, ProcessingInstruction, CDATASection, 
                EntityReference
    * Attr -- Text, EntityReference
    * ProcessingInstruction -- no children
    * Comment -- no children
    * Text -- no children
    * CDATASection -- no children
    * Entity -- Element, ProcessingInstruction, Comment, Text, CDATASection, 
                EntityReference
    * Notation -- no children

The DOM also specifies a NodeList interface to handle ordered lists of Nodes, 
such as the children of a Node, or the elements returned by the 
getElementsByTagName method of the Element interface, and also a NamedNodeMap 
interface to handle unordered sets of nodes referenced by their name attribute, 
such as the attributes of an Element. NodeList and NamedNodeMap objects in the 
DOM are live; that is, changes to the underlying document structure are 
reflected in all relevant NodeList and NamedNodeMap objects. For example, if a 
DOM user gets a NodeList object containing the children of an Element, then 
subsequently adds more children to that element (or removes children, or 
modifies them), those changes are automatically reflected in the NodeList, 
without further action on the user's part. Likewise, changes to a Node in the 
tree are reflected in all references to that Node in NodeList and NamedNodeMap 
objects.

Finally, the interfaces Text, Comment, and CDATASection all inherit from the 
CharacterData interface.

1.1.2. Memory Management

Most of the APIs defined by this specification are interfaces rather than
classes. That means that an implementation need only expose methods with the
defined names and specified operation, not implement classes that correspond
directly to the interfaces. This allows the DOM APIs to be implemented as a
thin veneer on top of legacy applications with their own data structures, or
on top of newer applications with different class hierarchies. This also means
that ordinary constructors (in the Java or C++ sense) cannot be used to create
DOM objects, since the underlying objects to be constructed may have little
relationship to the DOM interfaces. The conventional solution to this in
object-oriented design is to define factory methods that create instances of
objects that implement the various interfaces. Objects implementing some
interface "X" are created by a "createX()" method on the Document interface;
this is because all DOM objects live in the context of a specific Document.

The DOM Level 2 API does not define a standard way to create DOMImplementation
objects; DOM implementations must provide some proprietary way of
bootstrapping these DOM interfaces, and then all other objects can be built
from there.

The Core DOM APIs are designed to be compatible with a wide range of
languages, including both general-user scripting languages and the more
challenging languages used mostly by professional programmers. Thus, the DOM
APIs need to operate across a variety of memory management philosophies, from
language bindings that do not expose memory management to the user at all,
through those (notably Java) that provide explicit constructors but provide an
automatic garbage collection mechanism to automatically reclaim unused memory,
to those (especially C/C++) that generally require the programmer to
explicitly allocate object memory, track where it is used, and explicitly free
it for re-use. To ensure a consistent API across these platforms, the DOM does
not address memory management issues at all, but instead leaves these for the
implementation. Neither of the explicit language bindings defined by the DOM
API (for ECMAScript and Java) require any memory management methods, but DOM
bindings for other languages (especially C or C++) may require such support.
These extensions will be the responsibility of those adapting the DOM API to a
specific language, not the DOM Working Group. 1.1.3. Naming Conventions

While it would be nice to have attribute and method names that are short,
informative, internally consistent, and familiar to users of similar APIs, the
names also should not clash with the names in legacy APIs supported by DOM
implementations. Furthermore, both OMG IDL and ECMAScript have significant
limitations in their ability to disambiguate names from different namespaces
that make it difficult to avoid naming conflicts with short, familiar names.
So, DOM names tend to be long and descriptive in order to be unique across all
environments.

The Working Group has also attempted to be internally consistent in its use of
various terms, even though these may not be common distinctions in other APIs.
For example, the DOM API uses the method name "remove" when the method changes
the structural model, and the method name "delete" when the method gets rid of
something inside the structure model. The thing that is deleted is not
returned. The thing that is removed may be returned, when it makes sense to
return it. 1.1.4. Inheritance vs. Flattened Views of the API

The DOM Core APIs present two somewhat different sets of interfaces to an
XML/HTML document: one presenting an "object oriented" approach with a
hierarchy of inheritance, and a "simplified" view that allows all manipulation
to be done via the Node interface without requiring casts (in Java and other
C-like languages) or query interface calls in COM environments. These
operations are fairly expensive in Java and COM, and the DOM may be used in
performance-critical environments, so we allow significant functionality using
just the Node interface. Because many other users will find the inheritance
hierarchy easier to understand than the "everything is a Node" approach to the
DOM, we also support the full higher-level interfaces for those who prefer a
more object-oriented API.

In practice, this means that there is a certain amount of redundancy in the
API. The Working Group considers the "inheritance" approach the primary view
of the API, and the full set of functionality on Node to be "extra"
functionality that users may employ, but that does not eliminate the need for
methods on other interfaces that an object-oriented analysis would dictate.
(Of course, when the O-O analysis yields an attribute or method that is
identical to one on the Node interface, we don't specify a completely
redundant one.) Thus, even though there is a generic nodeName attribute on the
Node interface, there is still a tagName attribute on the Element interface;
these two attributes must contain the same value, but the it is worthwhile to
support both, given the different constituencies the DOM API must satisfy.
1.1.5. The DOMString type

To ensure interoperability, the DOM specifies the following:

    * Type Definition DOMString

          A DOMString is a sequence of 16-bit units.


          IDL Definition

              valuetype DOMString sequence<unsigned short>;


    * Applications must encode DOMString using UTF-16 (defined in [Unicode] and
      Amendment 1 of [ISO/IEC 10646]).
      
      The UTF-16 encoding was chosen because of its widespread industry 
      practice. Note that for both HTML and XML, the document character 
      set (and therefore the notation of numeric character references) is 
      based on UCS [ISO-10646]. A single numeric character reference in a 
      source document may therefore in some cases correspond to two 16-bit 
      units in a DOMString (a high surrogate and a low surrogate).

      Note: Even though the DOM defines the name of the string type to be 
            DOMString, bindings may use different names. For example for Java, 
            DOMString is bound to the String type because it also uses UTF-16 
            as its encoding.

Note: As of August 2000, the OMG IDL specification ([OMGIDL]) included a
wstring type. However, that definition did not meet the interoperability
criteria of the DOM API since it relied on negotiation to decide the width and
encoding of a character.

1.1.6. The DOMTimeStamp type

To ensure interoperability, the DOM specifies the following:

    * Type Definition DOMTimeStamp

          A DOMTimeStamp represents a number of milliseconds.


          IDL Definition

              typedef unsigned long long DOMTimeStamp;


    * Note: Even though the DOM uses the type DOMTimeStamp, bindings may use 
            different types. For example for Java, DOMTimeStamp is bound to 
            the long type. In ECMAScript, TimeStamp is bound to the Date type 
            because the range of the integer type is too small.

1.1.7. String comparisons in the DOM

The DOM has many interfaces that imply string matching. HTML processors
generally assume an uppercase (less often, lowercase) normalization of names
for such things as elements, while XML is explicitly case sensitive. For the
purposes of the DOM, string matching is performed purely by binary comparison
of the 16-bit units of the DOMString. In addition, the DOM assumes that any
case normalizations take place in the processor, before the DOM structures
are built.

Note: Besides case folding, there are additional normalizations that can be
applied to text. The W3C I18N Working Group is in the process of defining
exactly which normalizations are necessary, and where they should be applied.
The W3C I18N Working Group expects to require early normalization, which
means that data read into the DOM is assumed to already be normalized. The
DOM and applications built on top of it in this case only have to assure that
text remains normalized when being changed. For further details, please see
[Charmod].

1.1.8. XML Namespaces

The DOM Level 2 supports XML namespaces [Namespaces] by augmenting several
interfaces of the DOM Level 1 Core to allow creating and manipulating
elements and attributes associated to a namespace.

As far as the DOM is concerned, special attributes used for declaring XML
namespaces are still exposed and can be manipulated just like any other
attribute. However, nodes are permanently bound to namespace URIs as they get
created. Consequently, moving a node within a document, using the DOM, in no
case results in a change of its namespace prefix or namespace URI. Similarly,
creating a node with a namespace prefix and namespace URI, or changing the
namespace prefix of a node, does not result in any addition, removal, or
modification of any special attributes for declaring the appropriate XML
namespaces. Namespace validation is not enforced; the DOM application is
responsible. In particular, since the mapping between prefixes and namespace
URIs is not enforced, in general, the resulting document cannot be serialized
naively. For example, applications may have to declare every namespace in use
when serializing a document.

DOM Level 2 doesn't perform any URI normalization or canonicalization. The
URIs given to the DOM are assumed to be valid (e.g., characters such as
whitespaces are properly escaped), and no lexical checking is performed.
Absolute URI references are treated as strings and compared literally. How
relative namespace URI references are treated is undefined. To ensure
interoperability only absolute namespace URI references (i.e., URI references
beginning with a scheme name and a colon) should be used. Note that because
the DOM does no lexical checking, the empty string will be treated as a real
namespace URI in DOM Level 2 methods. Applications must use the value null as
the namespaceURI parameter for methods if they wish to have no namespace.

Note: In the DOM, all namespace declaration attributes are by definition
bound to the namespace URI: "http://www.w3.org/2000/xmlns/". These are the
attributes whose namespace prefix or qualified name is "xmlns". Although, at
the time of writing, this is not part of the XML Namespaces specification
[Namespaces], it is planned to be incorporated in a future revision.

In a document with no namespaces, the child list of an EntityReference node
is always the same as that of the corresponding Entity. This is not true in a
document where an entity contains unbound namespace prefixes. In such a case,
the descendants of the corresponding EntityReference nodes may be bound to
different namespace URIs, depending on where the entity references are. Also,
because, in the DOM, nodes always remain bound to the same namespace URI,
moving such EntityReference nodes can lead to documents that cannot be
serialized. This is also true when the DOM Level 1 method
createEntityReference of the Document interface is used to create entity
references that correspond to such entities, since the descendants of the
returned EntityReference are unbound. The DOM Level 2 does not support any
mechanism to resolve namespace prefixes. For all of these reasons, use of
such entities and entity references should be avoided or used with extreme
care. A future Level of the DOM may include some additional support for
handling these.

The new methods, such as createElementNS and createAttributeNS of the
Document interface, are meant to be used by namespace aware applications.
Simple applications that do not use namespaces can use the DOM Level 1
methods, such as createElement and createAttribute. Elements and attributes
created in this way do not have any namespace prefix, namespace URI, or local
name.

Note: DOM Level 1 methods are namespace ignorant. Therefore, while it is safe
to use these methods when not dealing with namespaces, using them and the new
ones at the same time should be avoided. DOM Level 1 methods solely identify
attribute nodes by their nodeName. On the contrary, the DOM Level 2 methods
related to namespaces, identify attribute nodes by their namespaceURI and
localName. Because of this fundamental difference, mixing both sets of
methods can lead to unpredictable results. In particular, using
setAttributeNS, an element may have two attributes (or more) that have the
same nodeName, but different namespaceURIs. Calling getAttribute with that
nodeName could then return any of those attributes. The result depends on the
implementation. Similarly, using setAttributeNode, one can set two attributes
(or more) that have different nodeNames but the same prefix and namespaceURI.
In this case getAttributeNodeNS will return either attribute, in an
implementation dependent manner. The only guarantee in such cases is that all
methods that access a named item by its nodeName will access the same item,
and all methods which access a node by its URI and local name will access the
same node. For instance, setAttribute and setAttributeNS affect the node that
getAttribute and getAttributeNS, respectively, return. 1.2. Fundamental
Interfaces

The interfaces within this section are considered fundamental, and must be
fully implemented by all conforming implementations of the DOM, including all
HTML DOM implementations [DOM Level 2 HTML], unless otherwise specified.

A DOM application may use the hasFeature(feature, version) method of the
DOMImplementation interface with parameter values "Core" and "2.0"
(respectively) to determine whether or not this module is supported by the
implementation. Any implementation that conforms to DOM Level 2 or a DOM
Level 2 module must conform to the Core module. Please refer to additional
information about conformance in this specification.

Exception DOMException

    DOM operations only raise exceptions in "exceptional" circumstances, i.e., 
    when an operation is impossible to perform (either for logical reasons, 
    because data is lost, or because the implementation has become unstable). 
    In general, DOM methods return specific error values in ordinary processing
    situations, such as out-of-bound errors when using NodeList.

    Implementations should raise other exceptions under other circumstances. 
    For example, implementations should raise an implementation-dependent 
    exception if a null argument is passed.

    Some languages and object systems do not support the concept of exceptions. 
    For such systems, error conditions may be indicated using native error 
    reporting mechanisms. For some bindings, for example, methods may return 
    error codes similar to those listed in the corresponding method 
    descriptions.


    IDL Definition

        exception DOMException {
          unsigned short   code;
        };
        // ExceptionCode
        const unsigned short      INDEX_SIZE_ERR                 = 1;
        const unsigned short      DOMSTRING_SIZE_ERR             = 2;
        const unsigned short      HIERARCHY_REQUEST_ERR          = 3;
        const unsigned short      WRONG_DOCUMENT_ERR             = 4;
        const unsigned short      INVALID_CHARACTER_ERR          = 5;
        const unsigned short      NO_DATA_ALLOWED_ERR            = 6;
        const unsigned short      NO_MODIFICATION_ALLOWED_ERR    = 7;
        const unsigned short      NOT_FOUND_ERR                  = 8;
        const unsigned short      NOT_SUPPORTED_ERR              = 9;
        const unsigned short      INUSE_ATTRIBUTE_ERR            = 10;
        // Introduced in DOM Level 2:
        const unsigned short      INVALID_STATE_ERR              = 11;
        // Introduced in DOM Level 2:
        const unsigned short      SYNTAX_ERR                     = 12;
        // Introduced in DOM Level 2:
        const unsigned short      INVALID_MODIFICATION_ERR       = 13;
        // Introduced in DOM Level 2:
        const unsigned short      NAMESPACE_ERR                  = 14;
        // Introduced in DOM Level 2:
        const unsigned short      INVALID_ACCESS_ERR             = 15;

******************************************************************************/
test('DOMException ExceptionCode', function(){
   equals(DOMException.INVALID_STATE_ERR, 11);
   equals(DOMException.SYNTAX_ERR, 12);
   equals(DOMException.INVALID_MODIFICATION_ERR, 13);
   equals(DOMException.NAMESPACE_ERR, 14);
   equals(DOMException.INVALID_ACCESS_ERR, 15);
});
/******************************************************************************

    Definition group ExceptionCode

        An integer indicating the type of error generated.

        Note: Other numeric codes are reserved for W3C for possible future use.

        Defined Constants

            DOMSTRING_SIZE_ERR
                If the specified range of text does not fit into a DOMString
            HIERARCHY_REQUEST_ERR
                If any node is inserted somewhere it doesn't belong
            INDEX_SIZE_ERR
                If index or size is negative, or greater than the allowed 
                value
            INUSE_ATTRIBUTE_ERR
                If an attempt is made to add an attribute that is already in 
                use elsewhere
            INVALID_ACCESS_ERR, introduced in DOM Level 2.
                If a parameter or an operation is not supported by the 
                underlying object.
            INVALID_CHARACTER_ERR
                If an invalid or illegal character is specified, such as in a 
                name. See production 2 in the XML specification for the 
                definition of a legal character, and production 5 for the 
                definition of a legal name character.
            INVALID_MODIFICATION_ERR, introduced in DOM Level 2.
                If an attempt is made to modify the type of the underlying 
                object.
            INVALID_STATE_ERR, introduced in DOM Level 2.
                If an attempt is made to use an object that is not, or is no 
                longer, usable.
            NAMESPACE_ERR, introduced in DOM Level 2.
                If an attempt is made to create or change an object in a way 
                which is incorrect with regard to namespaces.
            NOT_FOUND_ERR
                If an attempt is made to reference a node in a context where 
                it does not exist
            NOT_SUPPORTED_ERR
                If the implementation does not support the requested type of 
                object or operation.
            NO_DATA_ALLOWED_ERR
                If data is specified for a node which does not support data
            NO_MODIFICATION_ALLOWED_ERR
                If an attempt is made to modify an object where modifications 
                are not allowed
            SYNTAX_ERR, introduced in DOM Level 2.
                If an invalid or illegal string is specified.
            WRONG_DOCUMENT_ERR
                If a node is used in a different document than the one that c
                reated it (that doesn't support it)

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface DOMImplementation

    The DOMImplementation interface provides a number of methods for performing 
    operations that are independent of any particular instance of the document 
    object model.


    IDL Definition

        interface DOMImplementation {
          boolean            hasFeature(in DOMString feature, 
                                        in DOMString version);
          // Introduced in DOM Level 2:
          DocumentType       createDocumentType(in DOMString qualifiedName, 
                                                in DOMString publicId, 
                                                in DOMString systemId)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Document           createDocument(in DOMString namespaceURI, 
                                            in DOMString qualifiedName, 
                                            in DocumentType doctype)
                                                raises(DOMException);
        };


******************************************************************************/
test('DOMImplementation.prototype', function(){
    ok(true, 'See DOM Level 1');
    ok(DOMImplementation.prototype.createDocumentType, 'createDocumentType');
    ok(DOMImplementation.prototype.createDocument, 'createDocument');
});
/******************************************************************************
    Methods

        createDocument introduced in DOM Level 2
            Creates an XML Document object of the specified type with its 
            document element. HTML-only DOM implementations do not need to 
            implement this method.
            
            Parameters

            namespaceURI of type DOMString
                The namespace URI of the document element to create.
            qualifiedName of type DOMString
                The qualified name of the document element to be created.
            doctype of type DocumentType
                The type of document to be created or null.
                When doctype is not null, its Node.ownerDocument attribute is 
                set to the document being created.

            Return Value

            Document
            	

            A new Document object.
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified qualified name 
            contains an illegal character.

            NAMESPACE_ERR: Raised if the qualifiedName is malformed, if the 
            qualifiedName has a prefix and the namespaceURI is null, or if the 
            qualifiedName has a prefix that is "xml" and the namespaceURI is 
            different from "http://www.w3.org/XML/1998/namespace" [Namespaces].

            WRONG_DOCUMENT_ERR: Raised if doctype has already been used with a 
            different document or was created from a different implementation.
******************************************************************************/
test('DOMImplementation.prototype.createDocument', function(){

    var doc;

    doc = document.implementation.createDocument('http://www.envjs.com', 
        'envjs', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.childNodes.length, 1, 'childNodes.length');
    equals(doc.documentElement.tagName, 'envjs', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, 'http://www.envjs.com', 
        '.documentElement.namespaceURI');

    doc = document.implementation.createDocument(null, 'html', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, 
        '.documentElement.namespaceURI');

    doc = document.implementation.createDocument('', 'html', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, 
        '.documentElement.namespaceURI');

    doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, 'http://www.w3.org/1999/xhtml', 
        '.documentElement.namespaceURI');
});
/******************************************************************************
        createDocumentType introduced in DOM Level 2
            Creates an empty DocumentType node. Entity declarations and 
            notations are not made available. Entity reference expansions and 
            default attribute additions do not occur. It is expected that a 
            future version of the DOM will provide a way for populating a 
            DocumentType.
            
            HTML-only DOM implementations do not need to implement this method.
            
            Parameters

            qualifiedName of type DOMString
                The qualified name of the document type to be created.
            publicId of type DOMString
                The external subset public identifier.
            systemId of type DOMString
                The external subset system identifier.

            Return Value

            DocumentType
            	

            A new DocumentType node with Node.ownerDocument set to null.
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified qualified name 
            contains an illegal character.

            NAMESPACE_ERR: Raised if the qualifiedName is malformed.
*******************************************************************************/
test('DOMImplementation.prototype.createDocumentType', function(){
    var htmldoctype, doc;

    htmldoctype = document.implementation.createDocumentType(
        'html', null, null);
    doc = document.implementation.createDocument(null, 'html', htmldoctype);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, 
        '.documentElement.namespaceURI');


    htmldoctype = document.implementation.createDocumentType('html', null, 
        "-//W3C//DTD HTML 3.2 Final//EN");
    doc = document.implementation.createDocument(null, 'html', htmldoctype);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, 
        '.documentElement.namespaceURI');


    htmldoctype = document.implementation.createDocumentType('html', null, 
        "-//W3C//DTD HTML 4.01//EN");
    doc = document.implementation.createDocument(null, 'html', htmldoctype);
    ok(doc, 'doc created');
    equals(doc.toString(), '[object XMLDocument]', '.toString()');
    equals(doc.attributes, null, '.attributes');
    equals(doc.documentElement.tagName, 'html', '.documentElement.tagName');
    equals(doc.documentElement.namespaceURI, null, 
        '.documentElement.namespaceURI');

});
/******************************************************************************
        hasFeature
            Test if the DOM implementation implements a specific feature.
            Parameters

            feature of type DOMString
                The name of the feature to test (case-insensitive). The values
                used by DOM features are defined throughout the DOM Level 2 
                specifications and listed in the Conformance section. The name 
                must be an XML name. To avoid possible conflicts, as a 
                convention, names referring to features defined outside the DOM
                specification should be made unique by reversing the name of 
                the Internet domain name of the person (or the organization 
                that the person belongs to) who defines the feature, component 
                by component, and using this as a prefix. For instance, the W3C
                SVG Working Group defines the feature "org.w3c.dom.svg".
            version of type DOMString
                This is the version number of the feature to test. In Level 2, 
                the string can be either "2.0" or "1.0". If the version is not 
                specified, supporting any version of the feature causes the 
                method to return true.

            Return Value

            boolean
            	

            true if the feature is implemented in the specified version, false 
            otherwise.
            
            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

Interface DocumentFragment

    DocumentFragment is a "lightweight" or "minimal" Document object. It is very common to want to be able to extract a portion of a document's tree or to create a new fragment of a document. Imagine implementing a user command like cut or rearranging a document by moving fragments around. It is desirable to have an object which can hold such fragments and it is quite natural to use a Node for this purpose. While it is true that a Document object could fulfill this role, a Document object can potentially be a heavyweight object, depending on the underlying implementation. What is really needed for this is a very lightweight object. DocumentFragment is such an object.

    Furthermore, various operations -- such as inserting nodes as children of another Node -- may take DocumentFragment objects as arguments; this results in all the child nodes of the DocumentFragment being moved to the child list of this node.

    The children of a DocumentFragment node are zero or more nodes representing the tops of any sub-trees defining the structure of the document. DocumentFragment nodes do not need to be well-formed XML documents (although they do need to follow the rules imposed upon well-formed XML parsed entities, which can have multiple top nodes). For example, a DocumentFragment might have only one child and that child node could be a Text node. Such a structure model represents neither an HTML document nor a well-formed XML document.

    When a DocumentFragment is inserted into a Document (or indeed any other Node that may take children) the children of the DocumentFragment and not the DocumentFragment itself are inserted into the Node. This makes the DocumentFragment very useful when the user wishes to create nodes that are siblings; the DocumentFragment acts as the parent of these nodes so that the user can use the standard methods from the Node interface, such as insertBefore and appendChild.


    IDL Definition

        interface DocumentFragment : Node {
        };
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

Interface Document

    The Document interface represents the entire HTML or XML document. Conceptually, it is the root of the document tree, and provides the primary access to the document's data.

    Since elements, text nodes, comments, processing instructions, etc. cannot exist outside the context of a Document, the Document interface also contains the factory methods needed to create these objects. The Node objects created have a ownerDocument attribute which associates them with the Document within whose context they were created.


    IDL Definition

        interface Document : Node {
          readonly attribute DocumentType     doctype;
          readonly attribute DOMImplementation  implementation;
          readonly attribute Element          documentElement;
          Element            createElement(in DOMString tagName)
                                                raises(DOMException);
          DocumentFragment   createDocumentFragment();
          Text               createTextNode(in DOMString data);
          Comment            createComment(in DOMString data);
          CDATASection       createCDATASection(in DOMString data)
                                                raises(DOMException);
          ProcessingInstruction createProcessingInstruction(in DOMString target, 
                                                            in DOMString data)
                                                raises(DOMException);
          Attr               createAttribute(in DOMString name)
                                                raises(DOMException);
          EntityReference    createEntityReference(in DOMString name)
                                                raises(DOMException);
          NodeList           getElementsByTagName(in DOMString tagname);
          // Introduced in DOM Level 2:
          Node               importNode(in Node importedNode, 
                                        in boolean deep)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Element            createElementNS(in DOMString namespaceURI, 
                                             in DOMString qualifiedName)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Attr               createAttributeNS(in DOMString namespaceURI, 
                                               in DOMString qualifiedName)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          NodeList           getElementsByTagNameNS(in DOMString namespaceURI, 
                                                    in DOMString localName);
          // Introduced in DOM Level 2:
          Element            getElementById(in DOMString elementId);
        };

******************************************************************************/
test('TODO: Document.prototype', function(){
   
});
/******************************************************************************

    Attributes

        doctype of type DocumentType, readonly
            The Document Type Declaration (see DocumentType) associated with this document. For HTML documents as well as XML documents without a document type declaration this returns null. The DOM Level 2 does not support editing the Document Type Declaration. docType cannot be altered in any way, including through the use of methods inherited from the Node interface, such as insertNode or removeNode.
        documentElement of type Element, readonly
            This is a convenience attribute that allows direct access to the child node that is the root element of the document. For HTML documents, this is the element with the tagName "HTML".
        implementation of type DOMImplementation, readonly
            The DOMImplementation object that handles this document. A DOM application may use objects from multiple implementations.

    Methods

        createAttribute
            Creates an Attr of the given name. Note that the Attr instance can 
            then be set on an Element using the setAttributeNode method.
            
            To create an attribute with a qualified name and namespace URI, use
            the createAttributeNS method.
            
            Parameters

            name of type DOMString
                The name of the attribute.

            Return Value

            Attr
            	

            A new Attr object with the nodeName attribute set to name, and 
            localName, prefix, and namespaceURI set to null. The value of the 
            attribute is the empty string.
            
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.
******************************************************************************/
test('Document.prototype.createAttribute', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        createAttributeNS introduced in DOM Level 2
            Creates an attribute of the given qualified name and namespace URI.
            HTML-only DOM implementations do not need to implement this method.
            
            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to create.
            qualifiedName of type DOMString
                The qualified name of the attribute to instantiate.

            Return Value

            Attr
            	

            A new Attr object with the following attributes:
            Attribute 	Value
            Node.nodeName 	qualifiedName
            Node.namespaceURI 	namespaceURI
            Node.prefix 	prefix, extracted from qualifiedName, or null if 
                            there is no prefix
            Node.localName 	local name, extracted from qualifiedName
            Attr.name 	qualifiedName
            Node.nodeValue 	the empty string
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified qualified name 
            contains an illegal character.

            NAMESPACE_ERR: Raised if the qualifiedName is malformed, if the 
            qualifiedName has a prefix and the namespaceURI is null, if the 
            qualifiedName has a prefix that is "xml" and the namespaceURI is 
            different from "http://www.w3.org/XML/1998/namespace", or if the 
            qualifiedName is "xmlns" and the namespaceURI is different from 
            "http://www.w3.org/2000/xmlns/".
******************************************************************************/
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
/******************************************************************************
        createCDATASection
            Creates a CDATASection node whose value is the specified string.
            Parameters

            data of type DOMString
                The data for the CDATASection contents.

            Return Value

            CDATASection
            	

            The new CDATASection object.
            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
******************************************************************************/
test('Document.prototype.createCDATASection', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        createComment
            Creates a Comment node given the specified string.
            Parameters

            data of type DOMString
                The data for the node.

            Return Value

            Comment
            	

            The new Comment object.
            No Exceptions
******************************************************************************/
test('Document.prototype.createComment', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        createDocumentFragment
            Creates an empty DocumentFragment object.
            Return Value

            DocumentFragment
            	

            A new DocumentFragment.
            No Parameters
            No Exceptions
******************************************************************************/
test('Document.prototype.createDocumentFragment', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        createElement
            Creates an element of the type specified. Note that the instance 
            returned implements the Element interface, so attributes can be 
            specified directly on the returned object.
            
            In addition, if there are known attributes with default values, 
            Attr nodes representing them are automatically created and attached
            to the element.
            
            To create an element with a qualified name and namespace URI, use 
            the createElementNS method.
            
            Parameters

            tagName of type DOMString
                The name of the element type to instantiate. For XML, this is 
                case-sensitive. For HTML, the tagName parameter may be provided
                in any case, but it must be mapped to the canonical uppercase 
                form by the DOM implementation.

            Return Value

            Element
            	

            A new Element object with the nodeName attribute set to tagName, 
            and localName, prefix, and namespaceURI set to null.
            
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.
******************************************************************************/
test('Document.prototype.createElement', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        createElementNS introduced in DOM Level 2
            Creates an element of the given qualified name and namespace URI. 
            HTML-only DOM implementations do not need to implement this method.
            
            Parameters

            namespaceURI of type DOMString
                The namespace URI of the element to create.
            qualifiedName of type DOMString
                The qualified name of the element type to instantiate.

            Return Value

            Element
            	

            A new Element object with the following attributes:
            Attribute 	Value
            Node.nodeName 	qualifiedName
            Node.namespaceURI 	namespaceURI
            Node.prefix 	prefix, extracted from qualifiedName, or null if 
                            there is no prefix
            Node.localName 	local name, extracted from qualifiedName
            Element.tagName 	qualifiedName
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified qualified name 
            contains an illegal character.

            NAMESPACE_ERR: Raised if the qualifiedName is malformed, if the 
            qualifiedName has a prefix and the namespaceURI is null, or if the qualifiedName has a prefix that is "xml" and the namespaceURI is different from "http://www.w3.org/XML/1998/namespace" [Namespaces].
******************************************************************************/
test('Document.prototype.createElementNS', function(){

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
    equals(xmlserializer.serializeToString(element), 
        '<x:envjs xmlns:x="http://www.envjs.com/"/>', 'xmlserializer');

    ok(element.prefix = 'y', 'set prefix');
    equals(element.prefix, 'y', '.prefix');
    equals(element.tagName, 'y:envjs', '.tagName');
    equals(xmlserializer.serializeToString(element), 
        '<y:envjs xmlns:y="http://www.envjs.com/"/>', 'xmlserializer');

    element.prefix = null;
    equals(element.prefix, null, '.prefix');
    equals(element.tagName, 'envjs', '.tagName');
    equals(xmlserializer.serializeToString(element), 
        '<envjs xmlns="http://www.envjs.com/"/>', 'xmlserializer');

});
/******************************************************************************
        createEntityReference
            Creates an EntityReference object. In addition, if the referenced 
            entity is known, the child list of the EntityReference node is made 
            the same as that of the corresponding Entity node.

            Note: If any descendant of the Entity node has an unbound namespace 
            prefix, the corresponding descendant of the created EntityReference 
            node is also unbound; (its namespaceURI is null). The DOM Level 2 
            does not support any mechanism to resolve namespace prefixes.
            
            Parameters

            name of type DOMString
                The name of the entity to reference.

            Return Value

            EntityReference
            	

            The new EntityReference object.
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.

            NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
******************************************************************************/
test('Document.prototype.createEntityReference', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        createProcessingInstruction
            Creates a ProcessingInstruction node given the specified name and 
            data strings.
            
            Parameters

            target of type DOMString
                The target part of the processing instruction.
            data of type DOMString
                The data for the node.

            Return Value

            ProcessingInstruction
            	

            The new ProcessingInstruction object.
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified target contains an 
            illegal character.

            NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
******************************************************************************/
test('Document.prototype.createProcessingInstruction', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        createTextNode
            Creates a Text node given the specified string.
            Parameters

            data of type DOMString
                The data for the node.

            Return Value

            Text
            	

            The new Text object.
            No Exceptions
******************************************************************************/
test('Document.prototype.createTextNode', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        getElementById introduced in DOM Level 2
            Returns the Element whose ID is given by elementId. If no such 
            element exists, returns null. Behavior is not defined if more than 
            one element has this ID.

            Note: The DOM implementation must have information that says which 
            attributes are of type ID. Attributes with the name "ID" are not of
            type ID unless so defined. Implementations that do not know whether
            attributes are of type ID or not are expected to return null.
            
            Parameters

            elementId of type DOMString
                The unique id value for an element.

            Return Value

            Element
            	

            The matching element.
            No Exceptions
******************************************************************************/
test('TODO: Document.prototype.getElementById', function(){
   
});
/******************************************************************************
        getElementsByTagName
            Returns a NodeList of all the Elements with a given tag name in the
            order in which they are encountered in a preorder traversal of the 
            Document tree.
            
            Parameters

            tagname of type DOMString
                The name of the tag to match on. The special value "*" matches 
                all tags.

            Return Value

            NodeList
            	

            A new NodeList object containing all the matched Elements.
            No Exceptions
******************************************************************************/
test('Document.prototype.getElementsByTagName', function(){
   ok(true, 'See DOM Level 1'); 
});
/******************************************************************************
        getElementsByTagNameNS introduced in DOM Level 2
            Returns a NodeList of all the Elements with a given local name and 
            namespace URI in the order in which they are encountered in a 
            preorder traversal of the Document tree.
            
            Parameters

            namespaceURI of type DOMString
                The namespace URI of the elements to match on. The special 
                value "*" matches all namespaces.
                
            localName of type DOMString
                The local name of the elements to match on. The special value 
                "*" matches all local names.

            Return Value

            NodeList
            	

            A new NodeList object containing all the matched Elements.
            No Exceptions
******************************************************************************/
test('TODO: Document.prototype.getElementsByTagNameNS', function(){
   
});
/******************************************************************************
        importNode introduced in DOM Level 2
            Imports a node from another document to this document. The returned
            node has no parent; (parentNode is null). The source node is not 
            altered or removed from the original document; this method creates 
            a new copy of the source node.
            
            For all nodes, importing a node creates a node object owned by the 
            importing document, with attribute values identical to the source 
            node's nodeName and nodeType, plus the attributes related to 
            namespaces (prefix, localName, and namespaceURI). As in the 
            cloneNode operation on a Node, the source node is not altered.
            
            Additional information is copied as appropriate to the nodeType, 
            attempting to mirror the behavior expected if a fragment of XML or 
            HTML source was copied from one document to another, recognizing 
            that the two documents may have different DTDs in the XML case. The
            following list describes the specifics for each type of node.

            ATTRIBUTE_NODE
                The ownerElement attribute is set to null and the specified 
                flag is set to true on the generated Attr. The descendants of 
                the source Attr are recursively imported and the resulting 
                nodes reassembled to form the corresponding subtree.
                
                Note that the deep parameter has no effect on Attr nodes; they 
                always carry their children with them when imported.
            DOCUMENT_FRAGMENT_NODE
                If the deep option was set to true, the descendants of the 
                source element are recursively imported and the resulting nodes
                reassembled to form the corresponding subtree. Otherwise, this 
                simply generates an empty DocumentFragment.
            DOCUMENT_NODE
                Document nodes cannot be imported.
            DOCUMENT_TYPE_NODE
                DocumentType nodes cannot be imported.
            ELEMENT_NODE
                Specified attribute nodes of the source element are imported, 
                and the generated Attr nodes are attached to the generated 
                Element. Default attributes are not copied, though if the 
                document being imported into defines default attributes for 
                this element name, those are assigned. If the importNode deep 
                parameter was set to true, the descendants of the source 
                element are recursively imported and the resulting nodes 
                reassembled to form the corresponding subtree.
            ENTITY_NODE
                Entity nodes can be imported, however in the current release of
                the DOM the DocumentType is readonly. Ability to add these 
                imported nodes to a DocumentType will be considered for 
                addition to a future release of the DOM.
                
                On import, the publicId, systemId, and notationName attributes 
                are copied. If a deep import is requested, the descendants of 
                the the source Entity are recursively imported and the 
                resulting nodes reassembled to form the corresponding subtree.
            ENTITY_REFERENCE_NODE
                Only the EntityReference itself is copied, even if a deep 
                import is requested, since the source and destination documents
                might have defined the entity differently. If the document 
                being imported into provides a definition for this entity name,
                its value is assigned.
            NOTATION_NODE
                Notation nodes can be imported, however in the current release 
                of the DOM the DocumentType is readonly. Ability to add these 
                imported nodes to a DocumentType will be considered for 
                addition to a future release of the DOM.
                
                On import, the publicId and systemId attributes are copied.
                Note that the deep parameter has no effect on Notation nodes 
                since they never have any children.
            PROCESSING_INSTRUCTION_NODE
                The imported node copies its target and data values from those 
                of the source node.
            TEXT_NODE, CDATA_SECTION_NODE, COMMENT_NODE
                These three types of nodes inheriting from CharacterData copy 
                their data and length attributes from those of the source node.

            Parameters

            importedNode of type Node
                The node to import.
            deep of type boolean
                If true, recursively import the subtree under the specified 
                node; if false, import only the node itself, as explained 
                above. This has no effect on Attr, EntityReference, and 
                Notation nodes.

            Return Value

            Node
            	

            The imported node that belongs to this Document.
            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: Raised if the type of node being imported is 
            not supported.

******************************************************************************/
test('TODO: Document.prototype.importNode', function(){
   
});
/******************************************************************************
Interface Node

    The Node interface is the primary datatype for the entire Document Object Model. It represents a single node in the document tree. While all objects implementing the Node interface expose methods for dealing with children, not all objects implementing the Node interface may have children. For example, Text nodes may not have children, and adding children to such nodes results in a DOMException being raised.

    The attributes nodeName, nodeValue and attributes are included as a mechanism to get at node information without casting down to the specific derived interface. In cases where there is no obvious mapping of these attributes for a specific nodeType (e.g., nodeValue for an Element or attributes for a Comment), this returns null. Note that the specialized interfaces may contain additional and more convenient mechanisms to get and set the relevant information.


    IDL Definition

        interface Node {

          // NodeType
          const unsigned short      ELEMENT_NODE                   = 1;
          const unsigned short      ATTRIBUTE_NODE                 = 2;
          const unsigned short      TEXT_NODE                      = 3;
          const unsigned short      CDATA_SECTION_NODE             = 4;
          const unsigned short      ENTITY_REFERENCE_NODE          = 5;
          const unsigned short      ENTITY_NODE                    = 6;
          const unsigned short      PROCESSING_INSTRUCTION_NODE    = 7;
          const unsigned short      COMMENT_NODE                   = 8;
          const unsigned short      DOCUMENT_NODE                  = 9;
          const unsigned short      DOCUMENT_TYPE_NODE             = 10;
          const unsigned short      DOCUMENT_FRAGMENT_NODE         = 11;
          const unsigned short      NOTATION_NODE                  = 12;

          readonly attribute DOMString        nodeName;
                   attribute DOMString        nodeValue;
                                                // raises(DOMException) on setting
                                                // raises(DOMException) on retrieval

          readonly attribute unsigned short   nodeType;
          readonly attribute Node             parentNode;
          readonly attribute NodeList         childNodes;
          readonly attribute Node             firstChild;
          readonly attribute Node             lastChild;
          readonly attribute Node             previousSibling;
          readonly attribute Node             nextSibling;
          readonly attribute NamedNodeMap     attributes;
          // Modified in DOM Level 2:
          readonly attribute Document         ownerDocument;
          Node               insertBefore(in Node newChild, 
                                          in Node refChild)
                                                raises(DOMException);
          Node               replaceChild(in Node newChild, 
                                          in Node oldChild)
                                                raises(DOMException);
          Node               removeChild(in Node oldChild)
                                                raises(DOMException);
          Node               appendChild(in Node newChild)
                                                raises(DOMException);
          boolean            hasChildNodes();
          Node               cloneNode(in boolean deep);
          // Modified in DOM Level 2:
          void               normalize();
          // Introduced in DOM Level 2:
          boolean            isSupported(in DOMString feature, 
                                         in DOMString version);
          // Introduced in DOM Level 2:
          readonly attribute DOMString        namespaceURI;
          // Introduced in DOM Level 2:
                   attribute DOMString        prefix;
                                            // raises(DOMException) on setting

          // Introduced in DOM Level 2:
          readonly attribute DOMString        localName;
          // Introduced in DOM Level 2:
          boolean            hasAttributes();
        };

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

    Definition group NodeType

        An integer indicating which type of node this is.

        Note: Numeric codes up to 200 are reserved to W3C for possible future
        use.

        Defined Constants

            ATTRIBUTE_NODE
                The node is an Attr.
            CDATA_SECTION_NODE
                The node is a CDATASection.
            COMMENT_NODE
                The node is a Comment.
            DOCUMENT_FRAGMENT_NODE
                The node is a DocumentFragment.
            DOCUMENT_NODE
                The node is a Document.
            DOCUMENT_TYPE_NODE
                The node is a DocumentType.
            ELEMENT_NODE
                The node is an Element.
            ENTITY_NODE
                The node is an Entity.
            ENTITY_REFERENCE_NODE
                The node is an EntityReference.
            NOTATION_NODE
                The node is a Notation.
            PROCESSING_INSTRUCTION_NODE
                The node is a ProcessingInstruction.
            TEXT_NODE
                The node is a Text node.

        The values of nodeName, nodeValue, and attributes vary according to the node type as follows:
        Interface 	nodeName 	nodeValue 	attributes
        Attr 	name of attribute 	value of attribute 	null
        CDATASection 	#cdata-section 	content of the CDATA Section 	null
        Comment 	#comment 	content of the comment 	null
        Document 	#document 	null 	null
        DocumentFragment 	#document-fragment 	null 	null
        DocumentType 	document type name 	null 	null
        Element 	tag name 	null 	NamedNodeMap
        Entity 	entity name 	null 	null
        EntityReference 	name of entity referenced 	null 	null
        Notation 	notation name 	null 	null
        ProcessingInstruction 	target 	entire content excluding the target 	null
        Text 	#text 	content of the text node 	null
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Attributes

        attributes of type NamedNodeMap, readonly
            A NamedNodeMap containing the attributes of this node (if it is an
            Element) or null otherwise.
        childNodes of type NodeList, readonly
            A NodeList that contains all children of this node. If there are
            no children, this is a NodeList containing no nodes.
        firstChild of type Node, readonly
            The first child of this node. If there is no such node, this
            returns null.
        lastChild of type Node, readonly
            The last child of this node. If there is no such node, this
            returns null.
        localName of type DOMString, readonly, introduced in DOM Level 2
            Returns the local part of the qualified name of this node.
            
             For nodes of any type other than ELEMENT_NODE and ATTRIBUTE_NODE
            and nodes created with a DOM Level 1 method, such as createElement
            from the Document interface, this is always null.
        namespaceURI of type DOMString, readonly, introduced in DOM Level 2
            The namespace URI of this node, or null if it is unspecified.
            
             This is not a computed value that is the result of a namespace
            lookup based on an examination of the namespace declarations in
            scope. It is merely the namespace URI given at creation time.
            
             For nodes of any type other than ELEMENT_NODE and ATTRIBUTE_NODE
            and nodes created with a DOM Level 1 method, such as createElement
            from the Document interface, this is always null.

            Note: Per the Namespaces in XML Specification [Namespaces] an
            attribute does not inherit its namespace from the element it is
            attached to. If an attribute is not explicitly given a namespace,
            it simply has no namespace.
        nextSibling of type Node, readonly
            The node immediately following this node. If there is no such
            node, this returns null.
        nodeName of type DOMString, readonly
            The name of this node, depending on its type; see the table above.
        nodeType of type unsigned short, readonly
            A code representing the type of the underlying object, as defined
            above.
        nodeValue of type DOMString
            The value of this node, depending on its type; see the table
            above. When it is defined to be null, setting it has no effect.

            Exceptions on setting

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
            Exceptions on retrieval

            DOMException
            	

            DOMSTRING_SIZE_ERR: Raised when it would return more characters
            than fit in a DOMString variable on the implementation platform.
        ownerDocument of type Document, readonly, modified in DOM Level 2
            The Document object associated with this node. This is also the
            Document object used to create new nodes. When this node is a
            Document or a DocumentType which is not used with any Document
            yet, this is null.
        parentNode of type Node, readonly
            The parent of this node. All nodes, except Attr, Document,
            DocumentFragment, Entity, and Notation may have a parent. However,
            if a node has just been created and not yet added to the tree, or
            if it has been removed from the tree, this is null.
        prefix of type DOMString, introduced in DOM Level 2
            The namespace prefix of this node, or null if it is unspecified.
            
             Note that setting this attribute, when permitted, changes the
            nodeName attribute, which holds the qualified name, as well as the
            tagName and name attributes of the Element and Attr interfaces,
            when applicable.
            
             Note also that changing the prefix of an attribute that is known
            to have a default value, does not make a new attribute with the
            default value and the original prefix appear, since the
            namespaceURI and localName do not change.
            
             For nodes of any type other than ELEMENT_NODE and ATTRIBUTE_NODE
            and nodes created with a DOM Level 1 method, such as createElement
            from the Document interface, this is always null.

            Exceptions on setting

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified prefix contains an 
            illegal character.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NAMESPACE_ERR: Raised if the specified prefix is malformed, if the 
            namespaceURI of this node is null, if the specified prefix is "xml" 
            and the namespaceURI of this node is different from 
            "http://www.w3.org/XML/1998/namespace", if this node is an 
            attribute and the specified prefix is "xmlns" and the namespaceURI 
            of this node is different from "http://www.w3.org/2000/xmlns/", or 
            if this node is an attribute and the qualifiedName of this node is 
            "xmlns" [Namespaces].
            
        previousSibling of type Node, readonly
            The node immediately preceding this node. If there is no such node,
            this returns null.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Methods

        appendChild
            Adds the node newChild to the end of the list of children of this
            node. If the newChild is already in the tree, it is first removed.

            Parameters

            newChild of type Node
                The node to add.
                
                If it is a DocumentFragment object, the entire contents of the
                document fragment are moved into the child list of this node

            Return Value

            Node
            	
            The node added.
            
            Exceptions

            DOMException
            	
            HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does
            not allow children of the type of the newChild node, or if the
            node to append is one of this node's ancestors.
            
             WRONG_DOCUMENT_ERR: Raised if newChild was created from a
            different document than the one that created this node.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        cloneNode
            Returns a duplicate of this node, i.e., serves as a generic copy
            constructor for nodes. The duplicate node has no parent;
            (parentNode is null.).
            
             Cloning an Element copies all attributes and their values,
            including those generated by the XML processor to represent
            defaulted attributes, but this method does not copy any text it
            contains unless it is a deep clone, since the text is contained in
            a child Text node. Cloning an Attribute directly, as opposed to be
            cloned as part of an Element cloning operation, returns a
            specified attribute (specified is true). Cloning any other type of
            node simply returns a copy of this node.
            
             Note that cloning an immutable subtree results in a mutable copy,
            but the children of an EntityReference clone are readonly. In
            addition, clones of unspecified Attr nodes are specified. And,
            cloning Document, DocumentType, Entity, and Notation nodes is
            implementation dependent.

            Parameters

            deep of type boolean
                If true, recursively clone the subtree under the specified
                node; if false, clone only the node itself (and its
                attributes, if it is an Element).

            Return Value

            Node
            	

            The duplicate node.
            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        hasAttributes introduced in DOM Level 2
            Returns whether this node (if it is an element) has any
            attributes.

            Return Value

            boolean
            	

            true if this node has any attributes, false otherwise.
            No Parameters
            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        hasChildNodes
            Returns whether this node has any children.
            Return Value

            boolean
            	

            true if this node has any children, false otherwise.
            No Parameters
            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        insertBefore
            Inserts the node newChild before the existing child node refChild.
            If refChild is null, insert newChild at the end of the list of
            children.
            
             If newChild is a DocumentFragment object, all of its children are
            inserted, in the same order, before refChild. If the newChild is
            already in the tree, it is first removed.

            Parameters

            newChild of type Node
                The node to insert.
            refChild of type Node
                The reference node, i.e., the node before which the new node
                must be inserted.

            Return Value

            Node
            	

            The node being inserted.
            Exceptions

            DOMException
            	

            HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does
            not allow children of the type of the newChild node, or if the
            node to insert is one of this node's ancestors.
            
             WRONG_DOCUMENT_ERR: Raised if newChild was created from a
            different document than the one that created this node.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly or
            if the parent of the node being inserted is readonly.

            NOT_FOUND_ERR: Raised if refChild is not a child of this node.
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        isSupported introduced in DOM Level 2
            Tests whether the DOM implementation implements a specific feature
            and that feature is supported by this node.

            Parameters

            feature of type DOMString
                The name of the feature to test. This is the same name which
                can be passed to the method hasFeature on DOMImplementation.
            version of type DOMString
                This is the version number of the feature to test. In Level 2,
                version 1, this is the string "2.0". If the version is not
                specified, supporting any version of the feature will cause
                the method to return true.

            Return Value

            boolean
            	

            Returns true if the specified feature is supported on this node,
            false otherwise.

            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        normalize modified in DOM Level 2
            Puts all Text nodes in the full depth of the sub-tree underneath
            this Node, including attribute nodes, into a "normal" form where
            only structure (e.g., elements, comments, processing instructions,
            CDATA sections, and entity references) separates Text nodes, i.e.,
            there are neither adjacent Text nodes nor empty Text nodes. This
            can be used to ensure that the DOM view of a document is the same
            as if it were saved and re-loaded, and is useful when operations
            (such as XPointer [XPointer] lookups) that depend on a particular
            document tree structure are to be used.

            Note: In cases where the document contains CDATASections, the
            normalize operation alone may not be sufficient, since XPointers
            do not differentiate between Text nodes and CDATASection nodes.

            No Parameters
            No Return Value
            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        removeChild
            Removes the child node indicated by oldChild from the list of
            children, and returns it.

            Parameters

            oldChild of type Node
                The node being removed.

            Return Value

            Node
            	

            The node removed.
            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if oldChild is not a child of this node.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        replaceChild
            Replaces the child node oldChild with newChild in the list of 
            children, and returns the oldChild node.
            
            If newChild is a DocumentFragment object, oldChild is replaced by 
            all of the DocumentFragment children, which are inserted in the 
            same order. If the newChild is already in the tree, it is first 
            removed.
            
            Parameters

            newChild of type Node
                The new node to put in the child list.
            oldChild of type Node
                The node being replaced in the list.

            Return Value

            Node
            	

            The node replaced.
            Exceptions

            DOMException
            	

            HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does 
            not allow children of the type of the newChild node, or if the node 
            to put in is one of this node's ancestors.

            WRONG_DOCUMENT_ERR: Raised if newChild was created from a different 
            document than the one that created this node.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node or the parent of 
            the new node is readonly.

            NOT_FOUND_ERR: Raised if oldChild is not a child of this node.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface NodeList

    The NodeList interface provides the abstraction of an ordered collection of 
    nodes, without defining or constraining how this collection is implemented. 
    NodeList objects in the DOM are live.

    The items in the NodeList are accessible via an integral index, starting 
    from 0.


    IDL Definition

        interface NodeList {
          Node               item(in unsigned long index);
          readonly attribute unsigned long    length;
        };


******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Attributes

        length of type unsigned long, readonly
            The number of nodes in the list. The range of valid child node 
            indices is 0 to length-1 inclusive.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Methods

        item
            Returns the indexth item in the collection. If index is greater 
            than or equal to the number of nodes in the list, this returns 
            null.
            
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            Node
            	

            The node at the indexth position in the NodeList, or null if that
            is not a valid index.

            No Exceptions

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface NamedNodeMap

    Objects implementing the NamedNodeMap interface are used to represent
    collections of nodes that can be accessed by name. Note that NamedNodeMap
    does not inherit from NodeList; NamedNodeMaps are not maintained in any
    particular order. Objects contained in an object implementing NamedNodeMap
    may also be accessed by an ordinal index, but this is simply to allow
    convenient enumeration of the contents of a NamedNodeMap, and does not
    imply that the DOM specifies an order to these Nodes.

    NamedNodeMap objects in the DOM are live.


    IDL Definition

        interface NamedNodeMap {
          Node               getNamedItem(in DOMString name);
          Node               setNamedItem(in Node arg)
                                                raises(DOMException);
          Node               removeNamedItem(in DOMString name)
                                                raises(DOMException);
          Node               item(in unsigned long index);
          readonly attribute unsigned long    length;
          // Introduced in DOM Level 2:
          Node               getNamedItemNS(in DOMString namespaceURI, 
                                            in DOMString localName);
          // Introduced in DOM Level 2:
          Node               setNamedItemNS(in Node arg)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Node               removeNamedItemNS(in DOMString namespaceURI, 
                                               in DOMString localName)
                                                raises(DOMException);
        };


******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Attributes

        length of type unsigned long, readonly
            The number of nodes in this map. The range of valid child node
            indices is 0 to length-1 inclusive.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Methods

        getNamedItem
            Retrieves a node specified by name.
            Parameters

            name of type DOMString
                The nodeName of a node to retrieve.

            Return Value

            Node
            	

            A Node (of any type) with the specified nodeName, or null if it
            does not identify any node in this map.

            No Exceptions

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        getNamedItemNS introduced in DOM Level 2
            Retrieves a node specified by local name and namespace URI.
            HTML-only DOM implementations do not need to implement this
            method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the node to retrieve.
            localName of type DOMString
                The local name of the node to retrieve.

            Return Value

            Node
            	

            A Node (of any type) with the specified local name and namespace
            URI, or null if they do not identify any node in this map.

            No Exceptions

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        item
            Returns the indexth item in the map. If index is greater than or equal to the number of nodes in this map, this returns null.
            Parameters

            index of type unsigned long
                Index into this map.

            Return Value

            Node
            	
            The node at the indexth position in the map, or null if that is
            not a valid index.

            No Exceptions

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        removeNamedItem
            Removes a node specified by name. When this map contains the
            attributes attached to an element, if the removed attribute is
            known to have a default value, an attribute immediately appears
            containing the default value as well as the corresponding
            namespace URI, local name, and prefix when applicable.

            Parameters

            name of type DOMString
                The nodeName of the node to remove.

            Return Value

            Node
            	

            The node removed from this map if a node with such a name exists.
            Exceptions

            DOMException
            	

            NOT_FOUND_ERR: Raised if there is no node named name in this map.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this map is readonly.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        removeNamedItemNS introduced in DOM Level 2
            Removes a node specified by local name and namespace URI. A
            removed attribute may be known to have a default value when this
            map contains the attributes attached to an element, as returned by
            the attributes attribute of the Node interface. If so, an
            attribute immediately appears containing the default value as well
            as the corresponding namespace URI, local name, and prefix when
            applicable.
            
             HTML-only DOM implementations do not need to implement this
            method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the node to remove.
            localName of type DOMString
                The local name of the node to remove.

            Return Value

            Node
            	
            The node removed from this map if a node with such a local name
            and namespace URI exists.
            
            Exceptions

            DOMException
            	

            NOT_FOUND_ERR: Raised if there is no node with the specified
            namespaceURI and localName in this map.
            
            NO_MODIFICATION_ALLOWED_ERR: Raised if this map is readonly.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        setNamedItem
            Adds a node using its nodeName attribute. If a node with that name
            is already present in this map, it is replaced by the new one.
            
             As the nodeName attribute is used to derive the name which the
            node must be stored under, multiple nodes of certain types (those
            that have a "special" string value) cannot be stored as the names
            would clash. This is seen as preferable to allowing nodes to be
            aliased.

            Parameters

            arg of type Node
                A node to store in this map. The node will later be accessible
                using the value of its nodeName attribute.

            Return Value

            Node
            	
            If the new Node replaces an existing node the replaced Node is
            returned, otherwise null is returned.

            Exceptions

            DOMException
            	
            WRONG_DOCUMENT_ERR: Raised if arg was created from a different
            document than the one that created this map.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this map is readonly.
            
             INUSE_ATTRIBUTE_ERR: Raised if arg is an Attr that is already an
            attribute of another Element object. The DOM user must explicitly
            clone Attr nodes to re-use them in other elements.           
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        setNamedItemNS introduced in DOM Level 2
            Adds a node using its namespaceURI and localName. If a node with
            that namespace URI and that local name is already present in this
            map, it is replaced by the new one.
            
             HTML-only DOM implementations do not need to implement this
            method.

            Parameters

            arg of type Node
                A node to store in this map. The node will later be accessible
                using the value of its namespaceURI and localName attributes.

            Return Value

            Node
            	
            If the new Node replaces an existing node the replaced Node is
            returned, otherwise null is returned.

            Exceptions

            DOMException
            	
            WRONG_DOCUMENT_ERR: Raised if arg was created from a different
            document than the one that created this map.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this map is readonly.
            
             INUSE_ATTRIBUTE_ERR: Raised if arg is an Attr that is already an
            attribute of another Element object. The DOM user must explicitly
            clone Attr nodes to re-use them in other elements.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface CharacterData

    The CharacterData interface extends Node with a set of attributes and
    methods for accessing character data in the DOM. For clarity this set is
    defined here rather than on each object that uses these attributes and
    methods. No DOM objects correspond directly to CharacterData, though Text
    and others do inherit the interface from it. All offsets in this interface
    start from 0.
    
     As explained in the DOMString interface, text strings in the DOM are
    represented in UTF-16, i.e. as a sequence of 16-bit units. In the
    following, the term 16-bit units is used whenever necessary to indicate
    that indexing on CharacterData is done in 16-bit units.


    IDL Definition

        interface CharacterData : Node {
                   attribute DOMString        data;
                                        // raises(DOMException) on setting
                                        // raises(DOMException) on retrieval

          readonly attribute unsigned long    length;
          DOMString          substringData(in unsigned long offset, 
                                           in unsigned long count)
                                                raises(DOMException);
          void               appendData(in DOMString arg)
                                                raises(DOMException);
          void               insertData(in unsigned long offset, 
                                        in DOMString arg)
                                                raises(DOMException);
          void               deleteData(in unsigned long offset, 
                                        in unsigned long count)
                                                raises(DOMException);
          void               replaceData(in unsigned long offset, 
                                         in unsigned long count, 
                                         in DOMString arg)
                                                raises(DOMException);
        };


******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Attributes

        data of type DOMString
            The character data of the node that implements this interface. The
            DOM implementation may not put arbitrary limits on the amount of
            data that may be stored in a CharacterData node. However,
            implementation limits may mean that the entirety of a node's data
            may not fit into a single DOMString. In such cases, the user may
            call substringData to retrieve the data in appropriately sized
            pieces.

            Exceptions on setting

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
            Exceptions on retrieval

            DOMException
            	

            DOMSTRING_SIZE_ERR: Raised when it would return more characters
            than fit in a DOMString variable on the implementation platform.
        length of type unsigned long, readonly
            The number of 16-bit units that are available through data and the
            substringData method below. This may have the value zero, i.e.,
            CharacterData nodes may be empty.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Methods

        appendData
            Append the string to the end of the character data of the node.
            Upon success, data provides access to the concatenation of data
            and the DOMString specified.

            Parameters

            arg of type DOMString
                The DOMString to append.

            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        deleteData
            Remove a range of 16-bit units from the node. Upon success, data
            and length reflect the change.

            Parameters

            offset of type unsigned long
                The offset from which to start removing.
            count of type unsigned long
                The number of 16-bit units to delete. If the sum of offset and
                count exceeds length then all 16-bit units from offset to the
                end of the data are deleted.

            Exceptions

            DOMException
            	

            INDEX_SIZE_ERR: Raised if the specified offset is negative or
            greater than the number of 16-bit units in data, or if the
            specified count is negative.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        insertData
            Insert a string at the specified 16-bit unit offset.
            Parameters

            offset of type unsigned long
                The character offset at which to insert.
            arg of type DOMString
                The DOMString to insert.

            Exceptions

            DOMException	

            INDEX_SIZE_ERR: Raised if the specified offset is negative or
            greater than the number of 16-bit units in data.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        replaceData
            Replace the characters starting at the specified 16-bit unit
            offset with the specified string.
            
            Parameters

            offset of type unsigned long
                The offset from which to start replacing.
            count of type unsigned long
                The number of 16-bit units to replace. If the sum of offset
                and count exceeds length, then all 16-bit units to the end of
                the data are replaced; (i.e., the effect is the same as a
                remove method call with the same range, followed by an append
                method invocation).
            arg of type DOMString
                The DOMString with which the range must be replaced.

            Exceptions

            DOMException
            	

            INDEX_SIZE_ERR: Raised if the specified offset is negative or
            greater than the number of 16-bit units in data, or if the
            specified count is negative.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        substringData
            Extracts a range of data from the node.
            Parameters

            offset of type unsigned long
                Start offset of substring to extract.
            count of type unsigned long
                The number of 16-bit units to extract.

            Return Value

            DOMString
            	

            The specified substring. If the sum of offset and count exceeds 
            the length, then all 16-bit units to the end of the data are 
            returned.
            
            Exceptions

            DOMException
            	

            INDEX_SIZE_ERR: Raised if the specified offset is negative or 
            greater than the number of 16-bit units in data, or if the 
            specified count is negative.

            DOMSTRING_SIZE_ERR: Raised if the specified range of text does not 
            fit into a DOMString.
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

Interface Attr

    The Attr interface represents an attribute in an Element object. Typically 
    the allowable values for the attribute are defined in a document type 
    definition.

    Attr objects inherit the Node interface, but since they are not actually 
    child nodes of the element they describe, the DOM does not consider them 
    part of the document tree. Thus, the Node attributes parentNode, 
    previousSibling, and nextSibling have a null value for Attr objects. The 
    DOM takes the view that attributes are properties of elements rather than 
    having a separate identity from the elements they are associated with; this
    should make it more efficient to implement such features as default 
    attributes associated with all elements of a given type. Furthermore, Attr 
    nodes may not be immediate children of a DocumentFragment. However, they 
    can be associated with Element nodes contained within a DocumentFragment. 
    In short, users and implementors of the DOM need to be aware that Attr 
    nodes have some things in common with other objects inheriting the Node 
    interface, but they also are quite distinct.

    The attribute's effective value is determined as follows: if this attribute
    has been explicitly assigned any value, that value is the attribute's 
    effective value; otherwise, if there is a declaration for this attribute, 
    and that declaration includes a default value, then that default value is 
    the attribute's effective value; otherwise, the attribute does not exist on
    this element in the structure model until it has been explicitly added. 
    Note that the nodeValue attribute on the Attr instance can also be used to 
    retrieve the string version of the attribute's value(s).

    In XML, where the value of an attribute can contain entity references, the 
    child nodes of the Attr node may be either Text or EntityReference nodes 
    (when these are in use; see the description of EntityReference for 
    discussion). Because the DOM Core is not aware of attribute types, it 
    treats all attribute values as simple strings, even if the DTD or schema 
    declares them as having tokenized types.


    IDL Definition

        interface Attr : Node {
          readonly attribute DOMString        name;
          readonly attribute boolean          specified;
                   attribute DOMString        value;
                                        // raises(DOMException) on setting

          // Introduced in DOM Level 2:
          readonly attribute Element          ownerElement;
        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Attributes

        name of type DOMString, readonly
            Returns the name of this attribute.
        ownerElement of type Element, readonly, introduced in DOM Level 2
            The Element node this attribute is attached to or null if this
            attribute is not in use.
        specified of type boolean, readonly
            If this attribute was explicitly given a value in the original
            document, this is true; otherwise, it is false. Note that the
            implementation is in charge of this attribute, not the user. If
            the user changes the value of the attribute (even if it ends up
            having the same value as the default value) then the specified
            flag is automatically flipped to true. To re-specify the attribute
            as the default value from the DTD, the user must delete the
            attribute. The implementation will then make a new attribute
            available with specified set to false and the default value (if
            one exists).
            In summary:

                * If the attribute has an assigned value in the document then
                  specified is true, and the value is the assigned value.
                * If the attribute has no assigned value in the document and
                  has a default value in the DTD, then specified is false, and
                  the value is the default value in the DTD.
                * If the attribute has no assigned value in the document and
                  has a value of #IMPLIED in the DTD, then the attribute does
                  not appear in the structure model of the document.
                * If the ownerElement attribute is null (i.e. because it was
                  just created or was set to null by the various removal and
                  cloning operations) specified is true.


        value of type DOMString
            On retrieval, the value of the attribute is returned as a string.
            Character and general entity references are replaced with their
            values. See also the method getAttribute on the Element interface.

            On setting, this creates a Text node with the unparsed contents of
            the string. I.e. any characters that an XML processor would
            recognize as markup are instead treated as literal text. See also
            the method setAttribute on the Element interface.

            Exceptions on setting

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
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

    Note: In DOM Level 2, the method normalize is inherited from the Node 
          interface where it was moved.


    IDL Definition

        interface Element : Node {
          readonly attribute DOMString        tagName;
          DOMString          getAttribute(in DOMString name);
          void               setAttribute(in DOMString name, 
                                          in DOMString value)
                                                raises(DOMException);
          void               removeAttribute(in DOMString name)
                                                raises(DOMException);
          Attr               getAttributeNode(in DOMString name);
          Attr               setAttributeNode(in Attr newAttr)
                                                raises(DOMException);
          Attr               removeAttributeNode(in Attr oldAttr)
                                                raises(DOMException);
          NodeList           getElementsByTagName(in DOMString name);
          // Introduced in DOM Level 2:
          DOMString          getAttributeNS(in DOMString namespaceURI, 
                                            in DOMString localName);
          // Introduced in DOM Level 2:
          void               setAttributeNS(in DOMString namespaceURI, 
                                            in DOMString qualifiedName, 
                                            in DOMString value)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          void               removeAttributeNS(in DOMString namespaceURI, 
                                               in DOMString localName)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Attr               getAttributeNodeNS(in DOMString namespaceURI, 
                                                in DOMString localName);
          // Introduced in DOM Level 2:
          Attr               setAttributeNodeNS(in Attr newAttr)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          NodeList           getElementsByTagNameNS(in DOMString namespaceURI, 
                                                    in DOMString localName);
          // Introduced in DOM Level 2:
          boolean            hasAttribute(in DOMString name);
          // Introduced in DOM Level 2:
          boolean            hasAttributeNS(in DOMString namespaceURI, 
                                            in DOMString localName);
        };


******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Attributes

        tagName of type DOMString, readonly
            The name of the element. For example, in:

            <elementExample id="demo"> 
                    ... 
            </elementExample> ,

            tagName has the value "elementExample". Note that this is
            case-preserving in XML, as are all of the operations of the DOM.
            The HTML DOM returns the tagName of an HTML element in the
            canonical uppercase form, regardless of the case in the source
            HTML document.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Methods

        getAttribute
            Retrieves an attribute value by name.
            Parameters

            name of type DOMString
                The name of the attribute to retrieve.

            Return Value

            DOMString
            	

            The Attr value as a string, or the empty string if that attribute
            does not have a specified or default value.

            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        getAttributeNS introduced in DOM Level 2
            Retrieves an attribute value by local name and namespace URI.
            HTML-only DOM implementations do not need to implement this
            method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to retrieve.
            localName of type DOMString
                The local name of the attribute to retrieve.

            Return Value

            DOMString
            	

            The Attr value as a string, or the empty string if that attribute
            does not have a specified or default value.

            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        getAttributeNode
            Retrieves an attribute node by name.

            To retrieve an attribute node by qualified name and namespace URI,
            use the getAttributeNodeNS method.

            Parameters

            name of type DOMString
                The name (nodeName) of the attribute to retrieve.

            Return Value

            Attr
            	
            The Attr node with the specified name (nodeName) or null if there
            is no such attribute.

            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        getAttributeNodeNS introduced in DOM Level 2
            Retrieves an Attr node by local name and namespace URI. HTML-only
            DOM implementations do not need to implement this method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to retrieve.
            localName of type DOMString
                The local name of the attribute to retrieve.

            Return Value

            Attr            	

            The Attr node with the specified attribute local name and
            namespace URI or null if there is no such attribute.

            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        getElementsByTagName
            Returns a NodeList of all descendant Elements with a given tag
            name, in the order in which they are encountered in a preorder
            traversal of this Element tree.

            Parameters

            name of type DOMString
                The name of the tag to match on. The special value "*" matches
                all tags.

            Return Value

            NodeList
            	

            A list of matching Element nodes.
            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        getElementsByTagNameNS introduced in DOM Level 2
            Returns a NodeList of all the descendant Elements with a given
            local name and namespace URI in the order in which they are
            encountered in a preorder traversal of this Element tree.

            HTML-only DOM implementations do not need to implement this
            method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the elements to match on. The special
                value "*" matches all namespaces.
            localName of type DOMString
                The local name of the elements to match on. The special value
                "*" matches all local names.

            Return Value

            NodeList
            	

            A new NodeList object containing all the matched Elements.
            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        hasAttribute introduced in DOM Level 2
            Returns true when an attribute with a given name is specified on
            this element or has a default value, false otherwise.

            Parameters

            name of type DOMString
                The name of the attribute to look for.

            Return Value

            boolean
            	
            true if an attribute with the given name is specified on this
            element or has a default value, false otherwise.

            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        hasAttributeNS introduced in DOM Level 2
            Returns true when an attribute with a given local name and
            namespace URI is specified on this element or has a default value,
            false otherwise. HTML-only DOM implementations do not need to
            implement this method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to look for.
            localName of type DOMString
                The local name of the attribute to look for.

            Return Value

            boolean
            	
            true if an attribute with the given local name and namespace URI
            is specified or has a default value on this element, false
            otherwise.

            No Exceptions
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        removeAttribute
            Removes an attribute by name. If the removed attribute is known to
            have a default value, an attribute immediately appears containing
            the default value as well as the corresponding namespace URI,
            local name, and prefix when applicable.

            To remove an attribute by local name and namespace URI, use the
            removeAttributeNS method.

            Parameters

            name of type DOMString
                The name of the attribute to remove.

            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        removeAttributeNS introduced in DOM Level 2
            Removes an attribute by local name and namespace URI. If the
            removed attribute has a default value it is immediately replaced.
            The replacing attribute has the same namespace URI and local name,
            as well as the original prefix.

            HTML-only DOM implementations do not need to implement this
            method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to remove.
            localName of type DOMString
                The local name of the attribute to remove.

            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        removeAttributeNode
            Removes the specified attribute node. If the removed Attr has a 
            default value it is immediately replaced. The replacing attribute 
            has the same namespace URI and local name, as well as the original 
            prefix, when applicable.
            
            Parameters

            oldAttr of type Attr
                The Attr node to remove from the attribute list.

            Return Value

            Attr
            	

            The Attr node that was removed.
            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if oldAttr is not an attribute of the 
            element.
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        setAttribute
            Adds a new attribute. If an attribute with that name is already 
            present in the element, its value is changed to be that of the 
            value parameter. This value is a simple string; it is not parsed as
            it is being set. So any markup (such as syntax to be recognized as 
            an entity reference) is treated as literal text, and needs to be 
            appropriately escaped by the implementation when it is written out.
            In order to assign an attribute value that contains entity 
            references, the user must create an Attr node plus any Text and 
            EntityReference nodes, build the appropriate subtree, and use 
            setAttributeNode to assign it as the value of an attribute.
            
            To set an attribute with a qualified name and namespace URI, use 
            the setAttributeNS method.
            
            Parameters

            name of type DOMString
                The name of the attribute to create or alter.
            value of type DOMString
                Value to set in string form.

            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
        setAttributeNS introduced in DOM Level 2
            Adds a new attribute. If an attribute with the same local name and 
            namespace URI is already present on the element, its prefix is 
            changed to be the prefix part of the qualifiedName, and its value 
            is changed to be the value parameter. This value is a simple 
            string; it is not parsed as it is being set. So any markup (such as
            syntax to be recognized as an entity reference) is treated as 
            literal text, and needs to be appropriately escaped by the 
            implementation when it is written out. In order to assign an 
            attribute value that contains entity references, the user must 
            create an Attr node plus any Text and EntityReference nodes, build 
            the appropriate subtree, and use setAttributeNodeNS or 
            setAttributeNode to assign it as the value of an attribute.
            
            HTML-only DOM implementations do not need to implement this method.
            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to create or alter.
            qualifiedName of type DOMString
                The qualified name of the attribute to create or alter.
            value of type DOMString
                The value to set in string form.

            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified qualified name 
            contains an illegal character.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NAMESPACE_ERR: Raised if the qualifiedName is malformed, if the 
            qualifiedName has a prefix and the namespaceURI is null, if the 
            qualifiedName has a prefix that is "xml" and the namespaceURI is 
            different from "http://www.w3.org/XML/1998/namespace", or if the 
            qualifiedName is "xmlns" and the namespaceURI is different from 
            "http://www.w3.org/2000/xmlns/".
            
            No Return Value
******************************************************************************/
test('Element.prototype.setAttributeNS', function(){

    var doc,
        element;

    doc = document.implementation.createDocument('', '', null);
    element = doc.createElementNS('','envjs');
    equals(element.attributes.length, 0, '.attributes.length');

    element.setAttributeNS('', 'type', 'animal');
    equals(element.attributes.length, 1, 'set attribute');

});
/******************************************************************************
        setAttributeNode
            Adds a new attribute node. If an attribute with that name
            (nodeName) is already present in the element, it is replaced by
            the new one.

            To add a new attribute node with a qualified name and namespace
            URI, use the setAttributeNodeNS method.

            Parameters

            newAttr of type Attr
                The Attr node to add to the attribute list.

            Return Value

            Attr
            	
            If the newAttr attribute replaces an existing attribute, the
            replaced Attr node is returned, otherwise null is returned.

            Exceptions

            DOMException
            	

            WRONG_DOCUMENT_ERR: Raised if newAttr was created from a different
            document than the one that created the element.
            
            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            
            INUSE_ATTRIBUTE_ERR: Raised if newAttr is already an attribute of
            another Element object. The DOM user must explicitly clone Attr
            nodes to re-use them in other elements.
******************************************************************************/
test('Element.prototype.setAttributeNS', function(){
   
});
/******************************************************************************
        setAttributeNodeNS introduced in DOM Level 2
            Adds a new attribute. If an attribute with that local name and that 
            namespace URI is already present in the element, it is replaced by 
            the new one.
            
            HTML-only DOM implementations do not need to implement this
            method.
            
            Parameters

            newAttr of type Attr
                The Attr node to add to the attribute list.

            Return Value

            Attr
            	

            If the newAttr attribute replaces an existing attribute with the
            same local name and namespace URI, the replaced Attr node is
            returned, otherwise null is returned.

            Exceptions

            DOMException
            	

            WRONG_DOCUMENT_ERR: Raised if newAttr was created from a different
            document than the one that created the element.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            
             INUSE_ATTRIBUTE_ERR: Raised if newAttr is already an attribute of
            another Element object. The DOM user must explicitly clone Attr
            nodes to re-use them in other elements.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface Text

    The Text interface inherits from CharacterData and represents the textual
    content (termed character data in XML) of an Element or Attr. If there is
    no markup inside an element's content, the text is contained in a single
    object implementing the Text interface that is the only child of the
    element. If there is markup, it is parsed into the information items
    (elements, comments, etc.) and Text nodes that form the list of children
    of the element.
    
     When a document is first made available via the DOM, there is only one
    Text node for each block of text. Users may create adjacent Text nodes
    that represent the contents of a given element without any intervening
    markup, but should be aware that there is no way to represent the
    separations between these nodes in XML or HTML, so they will not (in
    general) persist between DOM editing sessions. The normalize() method on
    Node merges any such adjacent Text objects into a single node for each
    block of text.


    IDL Definition

        interface Text : CharacterData {
          Text               splitText(in unsigned long offset)
                                                raises(DOMException);
        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

    Methods

        splitText
            Breaks this node into two nodes at the specified offset, keeping
            both in the tree as siblings. After being split, this node will
            contain all the content up to the offset point. A new node of the
            same type, which contains all the content at and after the offset
            point, is returned. If the original node had a parent node, the
            new node is inserted as the next sibling of the original node.
            When the offset is equal to the length of this node, the new node
            has no data.

            Parameters

            offset of type unsigned long
                The 16-bit unit offset at which to split, starting from 0.

            Return Value

            Text
            	

            The new node, of the same type as this node.
            Exceptions

            DOMException
            	

            INDEX_SIZE_ERR: Raised if the specified offset is negative or
            greater than the number of 16-bit units in data.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface Comment

    This interface inherits from CharacterData and represents the content of a 
    comment, i.e., all the characters between the starting 
    '<!--' and ending '-->'. Note that this is the definition of a comment in 
    XML, and, in practice, HTML, although some HTML tools may implement the 
    full SGML comment structure.


    IDL Definition

        interface Comment : CharacterData {
        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

1.3. Extended Interfaces

The interfaces defined here form part of the DOM Core specification, but
objects that expose these interfaces will never be encountered in a DOM
implementation that deals only with HTML. As such, HTML-only DOM
implementations [DOM Level 2 HTML] do not need to have objects that implement
these interfaces.

The interfaces found within this section are not mandatory. A DOM application
may use the hasFeature(feature, version) method of the DOMImplementation
interface with parameter values "XML" and "2.0" (respectively) to determine
whether or not this module is supported by the implementation. In order to
fully support this module, an implementation must also support the "Core"
feature defined in Fundamental Interfaces. Please refer to additional
information about Conformance in this specification.

Interface CDATASection

    CDATA sections are used to escape blocks of text containing characters
    that would otherwise be regarded as markup. The only delimiter that is
    recognized in a CDATA section is the "]]>" string that ends the CDATA
    section. CDATA sections cannot be nested. Their primary purpose is for
    including material such as XML fragments, without needing to escape all
    the delimiters.
    
     The DOMString attribute of the Text node holds the text that is contained
    by the CDATA section. Note that this may contain characters that need to
    be escaped outside of CDATA sections and that, depending on the character
    encoding ("charset") chosen for serialization, it may be impossible to
    write out some characters as part of a CDATA section.
    
     The CDATASection interface inherits from the CharacterData interface
    through the Text interface. Adjacent CDATASection nodes are not merged by
    use of the normalize method of the Node interface.
    
     Note: Because no markup is recognized within a CDATASection, character
    numeric references cannot be used as an escape mechanism when serializing.
    Therefore, action needs to be taken when serializing a CDATASection with a
    character encoding where some of the contained characters cannot be
    represented. Failure to do so would not produce well-formed XML.

    One potential solution in the serialization process is to end the CDATA
    section before the character, output the character using a character
    reference or entity reference, and open a new CDATA section for any
    further characters in the text node. Note, however, that some code
    conversion libraries at the time of writing do not return an error or
    exception when a character is missing from the encoding, making the task
    of ensuring that data is not corrupted on serialization more difficult.


    IDL Definition

        interface CDATASection : Text {
        };
        
******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface DocumentType

    Each Document has a doctype attribute whose value is either null or a
    DocumentType object. The DocumentType interface in the DOM Core provides
    an interface to the list of entities that are defined for the document,
    and little else because the effect of namespaces and the various XML
    schema efforts on DTD representation are not clearly understood as of this
    writing.

    The DOM Level 2 doesn't support editing DocumentType nodes.


    IDL Definition

        interface DocumentType : Node {
          readonly attribute DOMString        name;
          readonly attribute NamedNodeMap     entities;
          readonly attribute NamedNodeMap     notations;
          // Introduced in DOM Level 2:
          readonly attribute DOMString        publicId;
          // Introduced in DOM Level 2:
          readonly attribute DOMString        systemId;
          // Introduced in DOM Level 2:
          readonly attribute DOMString        internalSubset;
        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
    Attributes

        entities of type NamedNodeMap, readonly
            A NamedNodeMap containing the general entities, both external and
            internal, declared in the DTD. Parameter entities are not
            contained. Duplicates are discarded. For example in:

            <!DOCTYPE ex SYSTEM "ex.dtd" [
              <!ENTITY foo "foo">
              <!ENTITY bar "bar">
              <!ENTITY bar "bar2">
              <!ENTITY % baz "baz">
            ]>
            <ex/>

            the interface provides access to foo and the first declaration of
            bar but not the second declaration of bar or baz. Every node in
            this map also implements the Entity interface.

            The DOM Level 2 does not support editing entities, therefore
            entities cannot be altered in any way.
        internalSubset of type DOMString, readonly, introduced in DOM Level 2
            The internal subset as a string.

            Note: The actual content returned depends on how much information
            is available to the implementation. This may vary depending on
            various parameters, including the XML processor used to build the
            document.
        name of type DOMString, readonly
            The name of DTD; i.e., the name immediately following the DOCTYPE
            keyword.
        notations of type NamedNodeMap, readonly
            A NamedNodeMap containing the notations declared in the DTD.
            Duplicates are discarded. Every node in this map also implements
            the Notation interface.

            The DOM Level 2 does not support editing notations, therefore
            notations cannot be altered in any way.
        publicId of type DOMString, readonly, introduced in DOM Level 2
            The public identifier of the external subset.
        systemId of type DOMString, readonly, introduced in DOM Level 2
            The system identifier of the external subset.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************
Interface Notation

    This interface represents a notation declared in the DTD. A notation
    either declares, by name, the format of an unparsed entity (see section
    4.7 of the XML 1.0 specification [XML]), or is used for formal declaration
    of processing instruction targets (see section 2.6 of the XML 1.0
    specification [XML]). The nodeName attribute inherited from Node is set to
    the declared name of the notation.
    
     The DOM Level 1 does not support editing Notation nodes; they are
    therefore readonly.

    A Notation node does not have any parent.


    IDL Definition

        interface Notation : Node {
          readonly attribute DOMString        publicId;
          readonly attribute DOMString        systemId;
        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

    Attributes

        publicId of type DOMString, readonly
            The public identifier of this notation. If the public identifier
            was not specified, this is null.
        systemId of type DOMString, readonly
            The system identifier of this notation. If the system identifier
            was not specified, this is null.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

Interface Entity

    This interface represents an entity, either parsed or unparsed, in an XML
    document. Note that this models the entity itself not the entity
    declaration. Entity declaration modeling has been left for a later Level
    of the DOM specification.
    
     The nodeName attribute that is inherited from Node contains the name of
    the entity.
    
     An XML processor may choose to completely expand entities before the
    structure model is passed to the DOM; in this case there will be no
    EntityReference nodes in the document tree.
    
     XML does not mandate that a non-validating XML processor read and process
    entity declarations made in the external subset or declared in external
    parameter entities. This means that parsed entities declared in the
    external subset need not be expanded by some classes of applications, and
    that the replacement value of the entity may not be available. When the
    replacement value is available, the corresponding Entity node's child list
    represents the structure of that replacement text. Otherwise, the child
    list is empty.
    
     The DOM Level 2 does not support editing Entity nodes; if a user wants to
    make changes to the contents of an Entity, every related EntityReference
    node has to be replaced in the structure model by a clone of the Entity's
    contents, and then the desired changes must be made to each of those
    clones instead. Entity nodes and all their descendants are readonly.
    
     An Entity node does not have any parent.
    
     Note: If the entity contains an unbound namespace prefix, the
    namespaceURI of the corresponding node in the Entity node subtree is null.
    The same is true for EntityReference nodes that refer to this entity, when
    they are created using the createEntityReference method of the Document
    interface. The DOM Level 2 does not support any mechanism to resolve
    namespace prefixes.


    IDL Definition

        interface Entity : Node {
          readonly attribute DOMString        publicId;
          readonly attribute DOMString        systemId;
          readonly attribute DOMString        notationName;
        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

    Attributes

        notationName of type DOMString, readonly
            For unparsed entities, the name of the notation for the entity.
            For parsed entities, this is null.
        publicId of type DOMString, readonly
            The public identifier associated with the entity, if specified. If
            the public identifier was not specified, this is null.
        systemId of type DOMString, readonly
            The system identifier associated with the entity, if specified. If
            the system identifier was not specified, this is null.

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

Interface EntityReference

    EntityReference objects may be inserted into the structure model when an
    entity reference is in the source document, or when the user wishes to
    insert an entity reference. Note that character references and references
    to predefined entities are considered to be expanded by the HTML or XML
    processor so that characters are represented by their Unicode equivalent
    rather than by an entity reference. Moreover, the XML processor may
    completely expand references to entities while building the structure
    model, instead of providing EntityReference objects. If it does provide
    such objects, then for a given EntityReference node, it may be that there
    is no Entity node representing the referenced entity. If such an Entity
    exists, then the subtree of the EntityReference node is in general a copy
    of the Entity node subtree. However, this may not be true when an entity
    contains an unbound namespace prefix. In such a case, because the
    namespace prefix resolution depends on where the entity reference is, the
    descendants of the EntityReference node may be bound to different
    namespace URIs.
    
     As for Entity nodes, EntityReference nodes and all their descendants are
    readonly.


    IDL Definition

        interface EntityReference : Node {
        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

Interface ProcessingInstruction

    The ProcessingInstruction interface represents a "processing instruction",
    used in XML as a way to keep processor-specific information in the text of
    the document.


    IDL Definition

        interface ProcessingInstruction : Node {
          readonly attribute DOMString        target;
                   attribute DOMString        data;
                                            // raises(DOMException) on setting

        };

******************************************************************************/
test('TODO: ', function(){
   
});
/******************************************************************************

    Attributes

        data of type DOMString
            The content of this processing instruction. This is from the first
            non white space character after the target to the character
            immediately preceding the ?>.

            Exceptions on setting

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
        target of type DOMString, readonly
            The target of this processing instruction. XML defines this as
           being the first token following the markup that begins the
           processing instruction.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************



******************************************************************************/
