QUnit.module('DOM Level 3');
/******************************************************************************
http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html

07 April 2004
1. Document Object Model Core

Editors:
    Arnaud Le Hors, IBM
    Philippe Le Hégaret, W3C
    Gavin Nicol, Inso EPS (for DOM Level 1)
    Lauren Wood, SoftQuad, Inc. (for DOM Level 1)
    Mike Champion, Arbortext and Software AG (for DOM Level 1 from November 20, 1997)
    Steve Byrne, JavaSoft (for DOM Level 1 until November 19, 1997)

Table of contents

    * 1.1 Overview of the DOM Core Interfaces
          o 1.1.1 The DOM Structure Model
          o 1.1.2 Memory Management
          o 1.1.3 Naming Conventions
          o 1.1.4 Inheritance vs. Flattened Views of the API 
    * 1.2 Basic Types
          o 1.2.1 The DOMString Type
                + DOMString
          o 1.2.2 The DOMTimeStamp Type
                + DOMTimeStamp
          o 1.2.3 The DOMUserData Type
                + DOMUserData
          o 1.2.4 The DOMObject Type
                + DOMObject
    * 1.3 General Considerations
          o 1.3.1 String Comparisons in the DOM
          o 1.3.2 DOM URIs
          o 1.3.3 XML Namespaces
          o 1.3.4 Base URIs
          o 1.3.5 Mixed DOM Implementations
          o 1.3.6 DOM Features
          o 1.3.7 Bootstrapping 
    * 1.4 Fundamental Interfaces: Core Module
          o DOMException, ExceptionCode, DOMStringList, NameList, 
            DOMImplementationList, DOMImplementationSource, DOMImplementation, 
            DocumentFragment, Document, Node, NodeList, NamedNodeMap, 
            CharacterData, Attr, Element, Text, Comment, TypeInfo, 
            UserDataHandler, DOMError, DOMErrorHandler, DOMLocator, 
            DOMConfiguration
******************************************************************************/
test('Fundamental Interfaces', function(){
    
});
/******************************************************************************
    * 1.5 Extended Interfaces: XML Module
          o CDATASection, DocumentType, Notation, Entity, EntityReference, 
            ProcessingInstruction
******************************************************************************/
test('Extended Interfaces', function(){
    
});
/******************************************************************************
This specification defines a set of objects and interfaces for accessing and
manipulating document objects. The functionality specified (the Core
functionality) is sufficient to allow software developers and Web script
authors to access and manipulate parsed HTML [HTML 4.01] and XML [XML 1.0]
content inside conforming products. The DOM Core API also allows creation and
population of a Document object using only DOM API calls. A solution for
loading a Document and saving it persistently is proposed in [DOM Level 3 Load
and Save].

1.1 Overview of the DOM Core Interfaces

1.1.1 The DOM Structure Model

The DOM presents documents as a hierarchy of Node objects that also implement
other, more specialized interfaces. Some types of nodes may have child nodes
of various types, and others are leaf nodes that cannot have anything below
them in the document structure. For XML and HTML, the node types, and which
node types they may have as children, are as follows:

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
Element.getElementsByTagNameNS(namespaceURI, localName) method, and also a
NamedNodeMap interface to handle unordered sets of nodes referenced by their
name attribute, such as the attributes of an Element. NodeList and
NamedNodeMap objects in the DOM are live; that is, changes to the underlying
document structure are reflected in all relevant NodeList and NamedNodeMap
objects. For example, if a DOM user gets a NodeList object containing the
children of an Element, then subsequently adds more children to that element
(or removes children, or modifies them), those changes are automatically
reflected in the NodeList, without further action on the user's part.
Likewise, changes to a Node in the tree are reflected in all references to
that Node in NodeList and NamedNodeMap objects.

Finally, the interfaces Text, Comment, and CDATASection all inherit from the
CharacterData interface.

1.1.2 Memory Management

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
specific language, not the DOM Working Group.

1.1.3 Naming Conventions

While it would be nice to have attribute and method names that are short,
informative, internally consistent, and familiar to users of similar APIs, the
names also should not clash with the names in legacy APIs supported by DOM
implementations. Furthermore, both OMG IDL [OMG IDL] and ECMAScript
[ECMAScript] have significant limitations in their ability to disambiguate
names from different namespaces that make it difficult to avoid naming
conflicts with short, familiar names. So, DOM names tend to be long and
descriptive in order to be unique across all environments.

The Working Group has also attempted to be internally consistent in its use of
various terms, even though these may not be common distinctions in other APIs.
For example, the DOM API uses the method name "remove" when the method changes
the structural model, and the method name "delete" when the method gets rid of
something inside the structure model. The thing that is deleted is not
returned. The thing that is removed may be returned, when it makes sense to
return it.

1.1.4 Inheritance vs. Flattened Views of the API

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
redundant one.) Thus, even though there is a generic Node.nodeName attribute
on the Node interface, there is still a Element.tagName attribute on the
Element interface; these two attributes must contain the same value, but the
it is worthwhile to support both, given the different constituencies the DOM
API must satisfy.

1.2 Basic Types

To ensure interoperability, this specification specifies the following basic
types used in various DOM modules. Even though the DOM uses the basic types in
the interfaces, bindings may use different types and normative bindings are
only given for Java and ECMAScript in this specification.

1.2.1 The DOMString Type

The DOMString type is used to store [Unicode] characters as a sequence of
16-bit units using UTF-16 as defined in [Unicode] and Amendment 1 of [ISO/IEC
10646].

Characters are fully normalized as defined in appendix B of [XML 1.1] if:

    * the parameter "normalize-characters" was set to true while loading the 
      document or the document was certified as defined in [XML 1.1];
    * the parameter "normalize-characters" was set to true while using the 
      method Document.normalizeDocument(), or while using the method 
      Node.normalize();

Note that, with the exceptions of Document.normalizeDocument() and
Node.normalize(), manipulating characters using DOM methods does not guarantee
to preserve a fully-normalized text.

Type Definition DOMString

    A DOMString is a sequence of 16-bit units.


    IDL Definition

        valuetype DOMString sequence<unsigned short>;


The UTF-16 encoding was chosen because of its widespread industry practice.
Note that for both HTML and XML, the document character set (and therefore the
notation of numeric character references) is based on UCS [ISO/IEC 10646]. A
single numeric character reference in a source document may therefore in some
cases correspond to two 16-bit units in a DOMString (a high surrogate and a
low surrogate). For issues related to string comparisons, refer to String
Comparisons in the DOM.

For Java and ECMAScript, DOMString is bound to the String type because both
languages also use UTF-16 as their encoding.

Note: As of August 2000, the OMG IDL specification ([OMG IDL]) included a
wstring type. However, that definition did not meet the interoperability
criteria of the DOM API since it relied on negotiation to decide the width and
encoding of a character. 

1.2.2 The DOMTimeStamp Type

The DOMTimeStamp type is used to store an absolute or relative time.

Type Definition DOMTimeStamp

    A DOMTimeStamp represents a number of milliseconds.


    IDL Definition

        typedef unsigned long long DOMTimeStamp;


For Java, DOMTimeStamp is bound to the long type. For ECMAScript, DOMTimeStamp
is bound to the Date type because the range of the integer type is too small.

1.2.3 The DOMUserData Type

The DOMUserData type is used to store application data.

Type Definition DOMUserData

    A DOMUserData represents a reference to application data.


    IDL Definition

        typedef any DOMUserData;


For Java, DOMUserData is bound to the Object type. For ECMAScript, DOMUserData
is bound to any type.

1.2.4 The DOMObject Type

The DOMObject type is used to represent an object.

Type Definition DOMObject

    A DOMObject represents an object reference.


    IDL Definition

        typedef Object DOMObject;


For Java and ECMAScript, DOMObject is bound to the Object type.

1.3 General Considerations
1.3.1 String Comparisons in the DOM

The DOM has many interfaces that imply string matching. For XML, string
comparisons are case-sensitive and performed with a binary comparison of the
16-bit units of the DOMStrings. However, for case-insensitive markup
languages, such as HTML 4.01 or earlier, these comparisons are
case-insensitive where appropriate.

Note that HTML processors often perform specific case normalizations
(canonicalization) of the markup before the DOM structures are built. This is
typically using uppercase for element names and lowercase for attribute names.
For this reason, applications should also compare element and attribute names
returned by the DOM implementation in a case-insensitive manner.

The character normalization, i.e. transforming into their fully normalized
form as as defined in [XML 1.1], is assumed to happen at serialization time.
The DOM Level 3 Load and Save module [DOM Level 3 Load and Save] provides a
serialization mechanism (see the DOMSerializer interface, section 2.3.1) and
uses the DOMConfiguration parameters "normalize-characters" and
"check-character-normalization" to assure that text is fully normalized [XML
1.1]. Other serialization mechanisms built on top of the DOM Level 3 Core also
have to assure that text is fully normalized.

1.3.2 DOM URIs

The DOM specification relies on DOMString values as resource identifiers, such
that the following conditions are met:

   1. An absolute identifier absolutely identifies a resource on the Web;
   2. Simple string equality establishes equality of absolute resource
      identifiers, and no other equivalence of resource identifiers is
      considered significant to the DOM specification;
   3. A relative identifier is easily detected and made absolute relative to
      an absolute identifier;
   4. Retrieval of content of a resource may be accomplished where required.

The term "absolute URI" refers to a complete resource identifier and the term
"relative URI" refers to an incomplete resource identifier.

Within the DOM specifications, these identifiers are called URIs, "Uniform
Resource Identifiers", but this is meant abstractly. The DOM implementation
does not necessarily process its URIs according to the URI specification [IETF
RFC 2396]. Generally the particular form of these identifiers must be ignored.

When is not possible to completely ignore the type of a DOM URI, either
because a relative identifier must be made absolute or because content must be
retrieved, the DOM implementation must at least support identifier types
appropriate to the content being processed. [HTML 4.01], [XML 1.0], and
associated namespace specification [XML Namespaces] rely on [IETF RFC 2396] to
determine permissible characters and resolving relative URIs. Other
specifications such as namespaces in XML 1.1 [XML Namespaces 1.1] may rely on
alternative resource identifier types that may, for example, include non-ASCII
characters, necessitating support for alternative resource identifier types
where required by applicable specifications.

1.3.3 XML Namespaces

DOM Level 2 and 3 support XML namespaces [XML Namespaces] by augmenting
several interfaces of the DOM Level 1 Core to allow creating and manipulating
elements and attributes associated to a namespace. When [XML 1.1] is in use
(see Document.xmlVersion), DOM Level 3 also supports [XML Namespaces 1.1].

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

In general, the DOM implementation (and higher) doesn't perform any URI
normalization or canonicalization. The URIs given to the DOM are assumed to be
valid (e.g., characters such as white spaces are properly escaped), and no
lexical checking is performed. Absolute URI references are treated as strings
and compared literally. How relative namespace URI references are treated is
undefined. To ensure interoperability only absolute namespace URI references
(i.e., URI references beginning with a scheme name and a colon) should be
used. Applications should use the value null as the namespaceURI parameter for
methods if they wish to have no namespace. In programming languages where
empty strings can be differentiated from null, empty strings, when given as a
namespace URI, are converted to null. This is true even though the DOM does no
lexical checking of URIs.

Note: Element.setAttributeNS(null, ...) puts the attribute in the
per-element-type partitions as defined in XML Namespace Partitions in [XML
Namespaces].

Note: In the DOM, all namespace declaration attributes are by definition bound
to the namespace URI: "http://www.w3.org/2000/xmlns/". These are the
attributes whose namespace prefix or qualified name is "xmlns" as introduced
in [XML Namespaces 1.1].

In a document with no namespaces, the child list of an EntityReference node is
always the same as that of the corresponding Entity. This is not true in a
document where an entity contains unbound namespace prefixes. In such a case,
the descendants of the corresponding EntityReference nodes may be bound to
different namespace URIs, depending on where the entity references are. Also,
because, in the DOM, nodes always remain bound to the same namespace URI,
moving such EntityReference nodes can lead to documents that cannot be
serialized. This is also true when the DOM Level 1 method
Document.createEntityReference(name) is used to create entity references that
correspond to such entities, since the descendants of the returned
EntityReference are unbound. While DOM Level 3 does have support for the
resolution of namespace prefixes, use of such entities and entity references
should be avoided or used with extreme care.

The "NS" methods, such as Document.createElementNS(namespaceURI,
qualifiedName) and Document.createAttributeNS(namespaceURI, qualifiedName),
are meant to be used by namespace aware applications. Simple applications that
do not use namespaces can use the DOM Level 1 methods, such as
Document.createElement(tagName) and Document.createAttribute(name). Elements
and attributes created in this way do not have any namespace prefix, namespace
URI, or local name.

Note: DOM Level 1 methods are namespace ignorant. Therefore, while it is safe
to use these methods when not dealing with namespaces, using them and the new
ones at the same time should be avoided. DOM Level 1 methods solely identify
attribute nodes by their Node.nodeName. On the contrary, the DOM Level 2
methods related to namespaces, identify attribute nodes by their
Node.namespaceURI and Node.localName. Because of this fundamental difference,
mixing both sets of methods can lead to unpredictable results. In particular,
using Element.setAttributeNS(namespaceURI, qualifiedName, value), an element
may have two attributes (or more) that have the same Node.nodeName, but
different Node.namespaceURIs. Calling Element.getAttribute(name) with that
nodeName could then return any of those attributes. The result depends on the
implementation. Similarly, using Element.setAttributeNode(newAttr), one can
set two attributes (or more) that have different Node.nodeNames but the same
Node.prefix and Node.namespaceURI. In this case
Element.getAttributeNodeNS(namespaceURI, localName) will return either
attribute, in an implementation dependent manner. The only guarantee in such
cases is that all methods that access a named item by its nodeName will access
the same item, and all methods which access a node by its URI and local name
will access the same node. For instance, Element.setAttribute(name, value) and
Element.setAttributeNS(namespaceURI, qualifiedName, value) affect the node
that Element.getAttribute(name) and Element.getAttributeNS(namespaceURI,
localName), respectively, return.

1.3.4 Base URIs

The DOM Level 3 adds support for the [base URI] property defined in [XML
Information Set] by providing a new attribute on the Node interface that
exposes this information. However, unlike the Node.namespaceURI attribute, the
Node.baseURI attribute is not a static piece of information that every node
carries. Instead, it is a value that is dynamically computed according to [XML
Base]. This means its value depends on the location of the node in the tree
and moving the node from one place to another in the tree may affect its
value. Other changes, such as adding or changing an xml:base attribute on the
node being queried or one of its ancestors may also affect its value.

One consequence of this it that when external entity references are expanded
while building a Document one may need to add, or change, an xml:base
attribute to the Element nodes originally contained in the entity being
expanded so that the Node.baseURI returns the correct value. In the case of
ProcessingInstruction nodes originally contained in the entity being expanded
the information is lost. [DOM Level 3 Load and Save] handles elements as
described here and generates a warning in the latter case.

1.3.5 Mixed DOM Implementations

As new XML vocabularies are developed, those defining the vocabularies are
also beginning to define specialized APIs for manipulating XML instances of
those vocabularies. This is usually done by extending the DOM to provide
interfaces and methods that perform operations frequently needed by their
users. For example, the MathML [MathML 2.0] and SVG [SVG 1.1] specifications
have developed DOM extensions to allow users to manipulate instances of these
vocabularies using semantics appropriate to images and mathematics,
respectively, as well as the generic DOM XML semantics. Instances of SVG or
MathML are often embedded in XML documents conforming to a different schema
such as XHTML.

While the Namespaces in XML specification [XML Namespaces] provides a
mechanism for integrating these documents at the syntax level, it has become
clear that the DOM Level 2 Recommendation [DOM Level 2 Core] is not rich
enough to cover all the issues that have been encountered in having these
different DOM implementations be used together in a single application. DOM
Level 3 deals with the requirements brought about by embedding fragments
written according to a specific markup language (the embedded component) in a
document where the rest of the markup is not written according to that
specific markup language (the host document). It does not deal with fragments
embedded by reference or linking.

A DOM implementation supporting DOM Level 3 Core should be able to collaborate
with subcomponents implementing specific DOMs to assemble a compound document
that can be traversed and manipulated via DOM interfaces as if it were a
seamless whole.

The normal typecast operation on an object should support the interfaces
expected by legacy code for a given document type. Typecasting techniques may
not be adequate for selecting between multiple DOM specializations of an
object which were combined at run time, because they may not all be part of
the same object as defined by the binding's object model. Conflicts are most
obvious with the Document object, since it is shared as owner by the rest of
the document. In a homogeneous document, elements rely on the Document for
specialized services and construction of specialized nodes. In a heterogeneous
document, elements from different modules expect different services and APIs
from the same Document object, since there can only be one owner and root of
the document hierarchy.

1.3.6 DOM Features

Each DOM module defines one or more features, as listed in the conformance
section (Conformance). Features are case-insensitive and are also defined for
a specific set of versions. For example, this specification defines the
features "Core" and "XML", for the version "3.0". Versions "1.0" and "2.0" can
also be used for features defined in the corresponding DOM Levels. To avoid
possible conflicts, as a convention, names referring to features defined
outside the DOM specification should be made unique. Applications could then
request for features to be supported by a DOM implementation using the methods
DOMImplementationSource.getDOMImplementation(features) or
DOMImplementationSource.getDOMImplementationList(features), check the features
supported by a DOM implementation using the method
DOMImplementation.hasFeature(feature, version), or by a specific node using
Node.isSupported(feature, version). Note that when using the methods that take
a feature and a version as parameters, applications can use null or empty
string for the version parameter if they don't wish to specify a particular
version for the specified feature.

Up to the DOM Level 2 modules, all interfaces, that were an extension of
existing ones, were accessible using binding-specific casting mechanisms if
the feature associated to the extension was supported. For example, an
instance of the EventTarget interface could be obtained from an instance of
the Node interface if the feature "Events" was supported by the node.

As discussed Mixed DOM Implementations, DOM Level 3 Core should be able to
collaborate with subcomponents implementing specific DOMs. For that effect,
the methods DOMImplementation.getFeature(feature, version) and
Node.getFeature(feature, version) were introduced. In the case of
DOMImplementation.hasFeature(feature, version) and Node.isSupported(feature,
version), if a plus sign "+" is prepended to any feature name, implementations
are considered in which the specified feature may not be directly castable but
would require discovery through DOMImplementation.getFeature(feature, version)
and Node.getFeature(feature, version). Without a plus, only features whose
interfaces are directly castable are considered.

// example 1, without prepending the "+"
if (myNode.isSupported("Events", "3.0")) {
    EventTarget evt = (EventTarget) myNode;
    // ...
}
// example 2, with the "+"
if (myNode.isSupported("+Events", "3.0")) {
    // (the plus sign "+" is irrelevant for the getFeature method itself
    // and is ignored by this method anyway)
    EventTarget evt = (EventTarget) myNode.getFeature("Events", "3.0");
    // ...
}

1.3.7 Bootstrapping

Because previous versions of the DOM specification only defined a set of
interfaces, applications had to rely on some implementation dependent code to
start from. However, hard-coding the application to a specific implementation
prevents the application from running on other implementations and from using
the most-suitable implementation of the environment. At the same time,
implementations may also need to load modules or perform other setup to
efficiently adapt to different and sometimes mutually-exclusive feature sets.

To solve these problems this specification introduces a
DOMImplementationRegistry object with a function that lets an application find
implementations, based on the specific features it requires. How this object
is found and what it exactly looks like is not defined here, because this
cannot be done in a language-independent manner. Instead, each language
binding defines its own way of doing this. See Java Language Binding and
ECMAScript Language Binding for specifics.

In all cases, though, the DOMImplementationRegistry provides a
getDOMImplementation method accepting a features string, which is passed to
every known DOMImplementationSource until a suitable DOMImplementation is
found and returned. The DOMImplementationRegistry also provides a
getDOMImplementationList method accepting a features string, which is passed
to every known DOMImplementationSource, and returns a list of suitable
DOMImplementations. Those two methods are the same as the ones found on the
DOMImplementationSource interface.

Any number of DOMImplementationSource objects can be registered. A source may
return one or more DOMImplementation singletons or construct new
DOMImplementation objects, depending upon whether the requested features
require specialized state in the DOMImplementation object.

1.4 Fundamental Interfaces: Core Module

The interfaces within this section are considered fundamental, and must be
fully implemented by all conforming implementations of the DOM, including all
HTML DOM implementations [DOM Level 2 HTML], unless otherwise specified.

A DOM application may use the DOMImplementation.hasFeature(feature, version)
method with parameter values "Core" and "3.0" (respectively) to determine
whether or not this module is supported by the implementation. Any
implementation that conforms to DOM Level 3 or a DOM Level 3 module must
conform to the Core module. Please refer to additional information about
conformance in this specification. The DOM Level 3 Core module is backward
compatible with the DOM Level 2 Core [DOM Level 2 Core] module, i.e. a DOM
Level 3 Core implementation who returns true for "Core" with the version
number "3.0" must also return true for this feature when the version number is
"2.0", "" or, null.

Exception DOMException

    DOM operations only raise exceptions in "exceptional" circumstances, i.e., 
    when an operation is impossible to perform (either for logical reasons, 
    because data is lost, or because the implementation has become unstable). 
    In general, DOM methods return specific error values in ordinary processing
    situations, such as out-of-bound errors when using NodeList.

    Implementations should raise other exceptions under other circumstances. 
    For example, implementations should raise an implementation-dependent 
    exception if a null argument is passed when null was not expected.

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
        // Introduced in DOM Level 3:
        const unsigned short      VALIDATION_ERR                 = 16;
        // Introduced in DOM Level 3:
        const unsigned short      TYPE_MISMATCH_ERR              = 17;

******************************************************************************/
test('DOMException ExceptionCode', function(){
   equals(DOMException.VALIDATION_ERR, 16);
   equals(DOMException.TYPE_MISMATCH_ERR, 17);
});
/******************************************************************************

    Definition group ExceptionCode

        An integer indicating the type of error generated.

        Note: Other numeric codes are reserved for W3C for possible future use.

        Defined Constants

            DOMSTRING_SIZE_ERR
                If the specified range of text does not fit into a DOMString.
            HIERARCHY_REQUEST_ERR
                If any Node is inserted somewhere it doesn't belong.
            INDEX_SIZE_ERR
                If index or size is negative, or greater than the allowed 
                value.
            INUSE_ATTRIBUTE_ERR
                If an attempt is made to add an attribute that is already in 
                use elsewhere.
            INVALID_ACCESS_ERR, introduced in DOM Level 2.
                If a parameter or an operation is not supported by the 
                underlying object.
            INVALID_CHARACTER_ERR
                If an invalid or illegal character is specified, such as in an 
                XML name.
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
                If an attempt is made to reference a Node in a context where it
                does not exist.
            NOT_SUPPORTED_ERR
                If the implementation does not support the requested type of 
                object or operation.
            NO_DATA_ALLOWED_ERR
                If data is specified for a Node which does not support data.
            NO_MODIFICATION_ALLOWED_ERR
                If an attempt is made to modify an object where modifications 
                are not allowed.
            SYNTAX_ERR, introduced in DOM Level 2.
                If an invalid or illegal string is specified.
            TYPE_MISMATCH_ERR, introduced in DOM Level 3.
                If the type of an object is incompatible with the expected type
                of the parameter associated to the object. 
            VALIDATION_ERR, introduced in DOM Level 3.
                If a call to a method such as insertBefore or removeChild would
                make the Node invalid with respect to "partial validity", this 
                exception would be raised and the operation would not be done. 
                This code is used in [DOM Level 3 Validation]. Refer to this 
                specification for further information.
            WRONG_DOCUMENT_ERR
                If a Node is used in a different document than the one that 
                created it (that doesn't support it).
******************************************************************************/
test('DOMException Message', function(){
    
});
/******************************************************************************
Interface DOMStringList (introduced in DOM Level 3)

    The DOMStringList interface provides the abstraction of an ordered 
    collection of DOMString values, without defining or constraining how this 
    collection is implemented. The items in the DOMStringList are accessible 
    via an integral index, starting from 0.


    IDL Definition

        // Introduced in DOM Level 3:
        interface DOMStringList {
          DOMString          item(in unsigned long index);
          readonly attribute unsigned long   length;
          boolean            contains(in DOMString str);
        };

******************************************************************************/
test('DOMStringList.prototype', function(){
    
});
/******************************************************************************
    Attributes

        length of type unsigned long, readonly
            The number of DOMStrings in the list. The range of valid child node
            indices is 0 to length-1 inclusive.
******************************************************************************/
test('DOMStringList.prototype.length', function(){
    
});
/******************************************************************************
    Methods

        contains
            Test if a string is part of this DOMStringList.
            Parameters

            str of type DOMString
                The string to look for.

            Return Value

            boolean
            	

            true if the string has been found, false otherwise.
            No Exceptions
******************************************************************************/
test('DOMStringList.prototype.contains', function(){
    
});
/******************************************************************************
        item
            Returns the indexth item in the collection. If index is greater 
            than or equal to the number of DOMStrings in the list, this returns 
            null.
            
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            DOMString

            The DOMString at the indexth position in the DOMStringList, or null
            if that is not a valid index.
            
            No Exceptions
******************************************************************************/
test('DOMStringList.prototype.item', function(){
    
});
/******************************************************************************

Interface NameList (introduced in DOM Level 3)

    The NameList interface provides the abstraction of an ordered collection of
    parallel pairs of name and namespace values (which could be null values), 
    without defining or constraining how this collection is implemented. The 
    items in the NameList are accessible via an integral index, starting from 0.


    IDL Definition

        // Introduced in DOM Level 3:
        interface NameList {
          DOMString          getName(in unsigned long index);
          DOMString          getNamespaceURI(in unsigned long index);
          readonly attribute unsigned long   length;
          boolean            contains(in DOMString str);
          boolean            containsNS(in DOMString namespaceURI, 
                                        in DOMString name);
        };
******************************************************************************/
test('NameList.prototype', function(){
    
});
/******************************************************************************

    Attributes

        length of type unsigned long, readonly
            The number of pairs (name and namespaceURI) in the list. The range 
            of valid child node indices is 0 to length-1 inclusive.
******************************************************************************/
test('NameList.prototype.length', function(){
    
});
/******************************************************************************
    Methods

        contains
            Test if a name is part of this NameList.
            Parameters

            str of type DOMString
                The name to look for.

            Return Value

            boolean
            	

            true if the name has been found, false otherwise.
            No Exceptions
******************************************************************************/
test('NameList.prototype.contains', function(){
    
});
/******************************************************************************
        containsNS
            Test if the pair namespaceURI/name is part of this NameList.
            Parameters

            namespaceURI of type DOMString
                The namespace URI to look for.
            name of type DOMString
                The name to look for.

            Return Value

            boolean
            	

            true if the pair namespaceURI/name has been found, false otherwise.
            No Exceptions
******************************************************************************/
test('NameList.prototype.containsNS', function(){
    
});
/******************************************************************************
        getName
            Returns the indexth name item in the collection.
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            DOMString
            	

            The name at the indexth position in the NameList, or null if there 
            is no name for the specified index or if the index is out of range.
            
            No Exceptions
******************************************************************************/
test('NameList.prototype.getName', function(){
    
});
/******************************************************************************
        getNamespaceURI
            Returns the indexth namespaceURI item in the collection.
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            DOMString
            	

            The namespace URI at the indexth position in the NameList, or null 
            if there is no name for the specified index or if the index is out 
            of range.
            
            No Exceptions
******************************************************************************/
test('NameList.prototype.getNamespaceURI', function(){
    
});
/******************************************************************************

Interface DOMImplementationList (introduced in DOM Level 3)

    The DOMImplementationList interface provides the abstraction of an ordered 
    collection of DOM implementations, without defining or constraining how 
    this collection is implemented. The items in the DOMImplementationList are 
    accessible via an integral index, starting from 0.


    IDL Definition

        // Introduced in DOM Level 3:
        interface DOMImplementationList {
          DOMImplementation  item(in unsigned long index);
          readonly attribute unsigned long   length;
        };
******************************************************************************/
test('DOMImplementationList.prototype', function(){
    
});
/******************************************************************************

    Attributes

        length of type unsigned long, readonly
            The number of DOMImplementations in the list. The range of valid 
            child node indices is 0 to length-1 inclusive.
******************************************************************************/
test('DOMImplementationList.prototype.length', function(){
    
});
/******************************************************************************
    Methods

        item
            Returns the indexth item in the collection. If index is greater 
            than or equal to the number of DOMImplementations in the list, 
            this returns null.
            
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            DOMImplementation
            	

            The DOMImplementation at the indexth position in the 
            DOMImplementationList, or null if that is not a valid index.
            No Exceptions
******************************************************************************/
test('DOMImplementationList.prototype', function(){
    
});
/******************************************************************************

Interface DOMImplementationSource (introduced in DOM Level 3)

    This interface permits a DOM implementer to supply one or more 
    implementations, based upon requested features and versions, as specified 
    in DOM Features. Each implemented DOMImplementationSource object is listed 
    in the binding-specific list of available sources so that its 
    DOMImplementation objects are made available.


    IDL Definition

        // Introduced in DOM Level 3:
        interface DOMImplementationSource {
          DOMImplementation  getDOMImplementation(in DOMString features);
          DOMImplementationList getDOMImplementationList(in DOMString features);
        };
******************************************************************************/
test('DOMImplementationSource.prototype', function(){
    
});
/******************************************************************************

    Methods

        getDOMImplementation
            A method to request the first DOM implementation that supports the
            specified features.

            Parameters

            features of type DOMString
                A string that specifies which features and versions are
                required. This is a space separated list in which each feature
                is specified by its name optionally followed by a space and a
                version number.

                This method returns the first item of the list returned by
                getDOMImplementationList.

                As an example, the string "XML 3.0 Traversal +Events 2.0" will
                request a DOM implementation that supports the module "XML"
                for its 3.0 version, a module that support of the "Traversal"
                module for any version, and the module "Events" for its 2.0
                version. The module "Events" must be accessible using the
                method Node.getFeature() and DOMImplementation.getFeature().

            Return Value

            DOMImplementation
            	

            The first DOM implementation that support the desired features, or null if this source has none.
            No Exceptions
******************************************************************************/
test('DOMImplementationSource.prototype.getDOMImplementation', function(){
    
});
/******************************************************************************
        getDOMImplementationList
            A method to request a list of DOM implementations that support the
            specified features and versions, as specified in DOM Features.

            Parameters

            features of type DOMString
                A string that specifies which features and versions are
                required. This is a space separated list in which each feature
                is specified by its name optionally followed by a space and a
                version number. This is something like: "XML 3.0 Traversal
                +Events 2.0"

            Return Value

            DOMImplementationList
            	
            A list of DOM implementations that support the desired features.
            No Exceptions
******************************************************************************/
test('DOMImplementationSource.prototype.getDOMImplementationList', function(){
    
});
/******************************************************************************
Interface DOMImplementation

    The DOMImplementation interface provides a number of methods for
    performing operations that are independent of any particular instance of
    the document object model.

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
          // Introduced in DOM Level 3:
          DOMObject          getFeature(in DOMString feature, 
                                        in DOMString version);
        };
******************************************************************************/
test('DOMImplementation.prototype', function(){
    
});
/******************************************************************************

    Methods

        createDocument introduced in DOM Level 2
            Creates a DOM Document object of the specified type with its 
            document element.
            
            Note that based on the DocumentType given to create the document, 
            the implementation may instantiate specialized Document objects 
            that support additional features than the "Core", such as "HTML" 
            [DOM Level 2 HTML]. On the other hand, setting the DocumentType 
            after the document was created makes this very unlikely to happen. 
            Alternatively, specialized Document creation methods, such as 
            createHTMLDocument [DOM Level 2 HTML], can be used to obtain 
            specific types of Document objects.
            
            Parameters

            namespaceURI of type DOMString
                The namespace URI of the document element to create or null.
            qualifiedName of type DOMString
                The qualified name of the document element to be created or 
                null.
            doctype of type DocumentType
                The type of document to be created or null.
                When doctype is not null, its Node.ownerDocument attribute is 
                set to the document being created.

            Return Value

            Document

            A new Document object with its document element. If the 
            NamespaceURI, qualifiedName, and doctype are null, the returned 
            Document is empty with no document element.
            
            Exceptions

            DOMException

            INVALID_CHARACTER_ERR: Raised if the specified qualified name is 
            not an XML name according to [XML 1.0].

            NAMESPACE_ERR: Raised if the qualifiedName is malformed, if the 
            qualifiedName has a prefix and the namespaceURI is null, or if the 
            qualifiedName is null and the namespaceURI is different from null, 
            or if the qualifiedName has a prefix that is "xml" and the 
            namespaceURI is different from 
            "http://www.w3.org/XML/1998/namespace" [XML Namespaces], or if the 
            DOM implementation does not support the "XML" feature but a 
            non-null namespace URI was provided, since namespaces were defined 
            by XML.

            WRONG_DOCUMENT_ERR: Raised if doctype has already been used with a 
            different document or was created from a different implementation.

            NOT_SUPPORTED_ERR: May be raised if the implementation does not 
            support the feature "XML" and the language exposed through the 
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('DOMImplementation.prototype.createDocument', function(){
    ok(true, 'See DOM Level 2 DOMImplementation.prototype.createDocument');
});
/******************************************************************************
        createDocumentType introduced in DOM Level 2
            Creates an empty DocumentType node. Entity declarations and 
            notations are not made available. Entity reference expansions and 
            default attribute additions do not occur..
            
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

            INVALID_CHARACTER_ERR: Raised if the specified qualified name is 
            not an XML name according to [XML 1.0].

            NAMESPACE_ERR: Raised if the qualifiedName is malformed.

            NOT_SUPPORTED_ERR: May be raised if the implementation does not 
            support the feature "XML" and the language exposed through the 
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('DOMImplementation.prototype.createDocumentType', function(){
    ok(true, 'See DOM Level 2 DOMImplementation.prototype.createDocumentType');
});
/******************************************************************************
        getFeature introduced in DOM Level 3
            This method returns a specialized object which implements the 
            specialized APIs of the specified feature and version, as 
            specified in DOM Features. The specialized object may also be 
            obtained by using binding-specific casting methods but is not 
            necessarily expected to, as discussed in Mixed DOM Implementations.
            This method also allow the implementation to provide specialized 
            objects which do not support the DOMImplementation interface.
            Parameters

            feature of type DOMString
                The name of the feature requested. Note that any plus sign "+" 
                prepended to the name of the feature will be ignored since it 
                is not significant in the context of this method.
            version of type DOMString
                This is the version number of the feature to test.

            Return Value

            DOMObject

            Returns an object which implements the specialized APIs of the 
            specified feature and version, if any, or null if there is no 
            object which implements interfaces associated with that feature. If
            the DOMObject returned by this method implements the 
            DOMImplementation interface, it must delegate to the primary core 
            DOMImplementation and not return results inconsistent with the 
            primary core DOMImplementation such as hasFeature, getFeature, etc.
            
            No Exceptions
******************************************************************************/
test('DOMImplementation.prototype.getFeature', function(){
    
});
/******************************************************************************
        hasFeature
            Test if the DOM implementation implements a specific feature and 
            version, as specified in DOM Features.
            
            Parameters

            feature of type DOMString
                The name of the feature to test.
            version of type DOMString
                This is the version number of the feature to test.

            Return Value

            boolean

            true if the feature is implemented in the specified version, false 
            otherwise.
            
            No Exceptions
******************************************************************************/
test('DOMImplementation.prototype.hasFeature', function(){
    ok(true, 'See DOM Level 1 DOMImplementation.prototype.hasFeature');
});
/******************************************************************************

Interface DocumentFragment

    DocumentFragment is a "lightweight" or "minimal" Document object. It is 
    very common to want to be able to extract a portion of a document's tree 
    or to create a new fragment of a document. Imagine implementing a user 
    command like cut or rearranging a document by moving fragments around. It 
    is desirable to have an object which can hold such fragments and it is 
    quite natural to use a Node for this purpose. While it is true that a 
    Document object could fulfill this role, a Document object can potentially 
    be a heavyweight object, depending on the underlying implementation. What 
    is really needed for this is a very lightweight object. DocumentFragment 
    is such an object.

    Furthermore, various operations -- such as inserting nodes as children of 
    another Node -- may take DocumentFragment objects as arguments; this 
    results in all the child nodes of the DocumentFragment being moved to the 
    child list of this node.

    The children of a DocumentFragment node are zero or more nodes representing 
    the tops of any sub-trees defining the structure of the document. 
    DocumentFragment nodes do not need to be well-formed XML documents (although 
    they do need to follow the rules imposed upon well-formed XML parsed 
    entities, which can have multiple top nodes). For example, a 
    DocumentFragment might have only one child and that child node could be a 
    Text node. Such a structure model represents neither an HTML document nor 
    a well-formed XML document.

    When a DocumentFragment is inserted into a Document (or indeed any other
    Node that may take children) the children of the DocumentFragment and not
    the DocumentFragment itself are inserted into the Node. This makes the
    DocumentFragment very useful when the user wishes to create nodes that are
    siblings; the DocumentFragment acts as the parent of these nodes so that
    the user can use the standard methods from the Node interface, such as
    Node.insertBefore and Node.appendChild.


    IDL Definition

        interface DocumentFragment : Node {
        };
******************************************************************************/
test('DocumentFragment.prototypes', function(){
    
});
/******************************************************************************

Interface Document

    The Document interface represents the entire HTML or XML document.
    Conceptually, it is the root of the document tree, and provides the
    primary access to the document's data.
    
    Since elements, text nodes, comments, processing instructions, etc.
    cannot exist outside the context of a Document, the Document interface
    also contains the factory methods needed to create these objects. The Node
    objects created have a ownerDocument attribute which associates them with
    the Document within whose context they were created.


    IDL Definition

        interface Document : Node {
          // Modified in DOM Level 3:
          readonly attribute DocumentType    doctype;
          readonly attribute DOMImplementation implementation;
          readonly attribute Element         documentElement;
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
          // Introduced in DOM Level 3:
          readonly attribute DOMString       inputEncoding;
          // Introduced in DOM Level 3:
          readonly attribute DOMString       xmlEncoding;
          // Introduced in DOM Level 3:
                   attribute boolean         xmlStandalone;
                                                // raises(DOMException) on setting

          // Introduced in DOM Level 3:
                   attribute DOMString       xmlVersion;
                                                // raises(DOMException) on setting

          // Introduced in DOM Level 3:
                   attribute boolean         strictErrorChecking;
          // Introduced in DOM Level 3:
                   attribute DOMString       documentURI;
          // Introduced in DOM Level 3:
          Node               adoptNode(in Node source)
                                                raises(DOMException);
          // Introduced in DOM Level 3:
          readonly attribute DOMConfiguration domConfig;
          // Introduced in DOM Level 3:
          void               normalizeDocument();
          // Introduced in DOM Level 3:
          Node               renameNode(in Node n, 
                                        in DOMString namespaceURI, 
                                        in DOMString qualifiedName)
                                                raises(DOMException);
        };
******************************************************************************/
test('Document.prototype', function(){
    
});
/******************************************************************************

    Attributes

        doctype of type DocumentType, readonly, modified in DOM Level 3
            The Document Type Declaration (see DocumentType) associated with
            this document. For XML documents without a document type
            declaration this returns null. For HTML documents, a DocumentType
            object may be returned, independently of the presence or absence
            of document type declaration in the HTML document.

            This provides direct access to the DocumentType node, child node
            of this Document. This node can be set at document creation time
            and later changed through the use of child nodes manipulation
            methods, such as Node.insertBefore, or Node.replaceChild. Note,
            however, that while some implementations may instantiate different
            types of Document objects supporting additional features than the
            "Core", such as "HTML" [DOM Level 2 HTML], based on the
            DocumentType specified at creation time, changing it afterwards is
            very unlikely to result in a change of the features supported.
******************************************************************************/
test('Document.prototype.doctype', function(){
    
});
/******************************************************************************
        documentElement of type Element, readonly
            This is a convenience attribute that allows direct access to the
            child node that is the document element of the document.
******************************************************************************/
test('Document.prototype.documentElement', function(){
    ok(true, 'See DOM Level 1 Document.prototype.documentElement');
});
/******************************************************************************
        documentURI of type DOMString, introduced in DOM Level 3
            The location of the document or null if undefined or if the
            Document was created using DOMImplementation.createDocument. No
            lexical checking is performed when setting this attribute; this
            could result in a null value returned when using Node.baseURI.

            Beware that when the Document supports the feature "HTML" [DOM
            Level 2 HTML], the href attribute of the HTML BASE element takes
            precedence over this attribute when computing Node.baseURI.
******************************************************************************/
test('Document.prototype.documentURI', function(){
    
});
/******************************************************************************
        domConfig of type DOMConfiguration, readonly, introduced in DOM Level 3
            The configuration used when Document.normalizeDocument() is
            invoked.
******************************************************************************/
test('Document.prototype.domConfig', function(){
    
});
/******************************************************************************
        implementation of type DOMImplementation, readonly
            The DOMImplementation object that handles this document. A DOM
            application may use objects from multiple implementations.
******************************************************************************/
test('Document.prototype.implementation', function(){
    ok(true, 'See DOM Level 1 Document.prototype.implementation');
});
/******************************************************************************
        inputEncoding of type DOMString, readonly, introduced in DOM Level 3
            An attribute specifying the encoding used for this document at the
            time of the parsing. This is null when it is not known, such as
            when the Document was created in memory.
******************************************************************************/
test('Document.prototype.inputEncoding', function(){
    
});
/******************************************************************************
        strictErrorChecking of type boolean, introduced in DOM Level 3
            An attribute specifying whether error checking is enforced or not.
            When set to false, the implementation is free to not test every
            possible error case normally defined on DOM operations, and not
            raise any DOMException on DOM operations or report errors while
            using Document.normalizeDocument(). In case of error, the behavior
            is undefined. This attribute is true by default.
******************************************************************************/
test('Document.prototype.strictErrorChecking', function(){
    
});
/******************************************************************************
        xmlEncoding of type DOMString, readonly, introduced in DOM Level 3
            An attribute specifying, as part of the XML declaration, the
            encoding of this document. This is null when unspecified or when
            it is not known, such as when the Document was created in memory.
******************************************************************************/
test('Document.prototype.xmlEncoding', function(){
    
});
/******************************************************************************
        xmlStandalone of type boolean, introduced in DOM Level 3
            An attribute specifying, as part of the XML declaration, whether 
            this document is standalone. This is false when unspecified.

            Note: No verification is done on the value when setting this 
            attribute. Applications should use Document.normalizeDocument() 
            with the "validate" parameter to verify if the value matches the 
            validity constraint for standalone document declaration as defined 
            in [XML 1.0].
            
            Exceptions on setting

            DOMException

            NOT_SUPPORTED_ERR: Raised if this document does not support the 
            "XML" feature.
******************************************************************************/
test('Document.prototype.xmlStandalone', function(){
    
});
/******************************************************************************
        xmlVersion of type DOMString, introduced in DOM Level 3
            An attribute specifying, as part of the XML declaration, the 
            version number of this document. If there is no declaration and if 
            this document supports the "XML" feature, the value is "1.0". If 
            this document does not support the "XML" feature, the value is 
            always null. Changing this attribute will affect methods that check
            for invalid characters in XML names. Application should invoke 
            Document.normalizeDocument() in order to check for invalid 
            characters in the Nodes that are already part of this Document.
            
            DOM applications may use the 
            DOMImplementation.hasFeature(feature, version) method with 
            parameter values "XMLVersion" and "1.0" (respectively) to determine
            if an implementation supports [XML 1.0]. DOM applications may use 
            the same method with parameter values "XMLVersion" and "1.1" 
            (respectively) to determine if an implementation supports 
            [XML 1.1]. In both cases, in order to support XML, an 
            implementation must also support the "XML" feature defined in this 
            specification. Document objects supporting a version of the 
            "XMLVersion" feature must not raise a NOT_SUPPORTED_ERR exception 
            for the same version number when using Document.xmlVersion.
            
            Exceptions on setting

            DOMException

            NOT_SUPPORTED_ERR: Raised if the version is set to a value that is 
            not supported by this Document or if this document does not 
            support the "XML" feature.
******************************************************************************/
test('Document.prototype.xmlVersion', function(){
    
});
/******************************************************************************
    Methods

        adoptNode introduced in DOM Level 3
            Attempts to adopt a node from another document to this document.
            If supported, it changes the ownerDocument of the source node, its
            children, as well as the attached attribute nodes if there are
            any. If the source node has a parent it is first removed from the
            child list of its parent. This effectively allows moving a subtree
            from one document to another (unlike importNode() which create a
            copy of the source node instead of moving it). When it fails,
            applications should use Document.importNode() instead. Note that
            if the adopted node is already part of this document (i.e. the
            source and target document are the same), this method still has
            the effect of removing the source node from the child list of its
            parent, if any. The following list describes the specifics for
            each type of node.

            ATTRIBUTE_NODE
                The ownerElement attribute is set to null and the specified
                flag is set to true on the adopted Attr. The descendants of
                the source Attr are recursively adopted.
            DOCUMENT_FRAGMENT_NODE
                The descendants of the source node are recursively adopted.
            DOCUMENT_NODE
                Document nodes cannot be adopted.
            DOCUMENT_TYPE_NODE
                DocumentType nodes cannot be adopted.
            ELEMENT_NODE
                Specified attribute nodes of the source element are adopted.
                Default attributes are discarded, though if the document being
                adopted into defines default attributes for this element name,
                those are assigned. The descendants of the source element are
                recursively adopted.
            ENTITY_NODE
                Entity nodes cannot be adopted.
            ENTITY_REFERENCE_NODE
                Only the EntityReference node itself is adopted, the
                descendants are discarded, since the source and destination
                documents might have defined the entity differently. If the
                document being imported into provides a definition for this
                entity name, its value is assigned.
            NOTATION_NODE
                Notation nodes cannot be adopted.
            PROCESSING_INSTRUCTION_NODE, TEXT_NODE, CDATA_SECTION_NODE, 
            COMMENT_NODE
                These nodes can all be adopted. No specifics.

            Note: Since it does not create new nodes unlike the
            Document.importNode() method, this method does not raise an
            INVALID_CHARACTER_ERR exception, and applications should use the
            Document.normalizeDocument() method to check if an imported name
            is not an XML name according to the XML version in use.

            Parameters

            source of type Node
                The node to move into this document.

            Return Value

            Node
            	
            The adopted node, or null if this operation fails, such as when
            the source node comes from a different implementation.

            Exceptions

            DOMException
            	
            NOT_SUPPORTED_ERR: Raised if the source node is of type DOCUMENT,
            DOCUMENT_TYPE.
            
            NO_MODIFICATION_ALLOWED_ERR: Raised when the source node is
            readonly.
******************************************************************************/
test('Document.prototype.adoptNode', function(){
    
});
/******************************************************************************
        createAttribute
            Creates an Attr of the given name. Note that the Attr instance can
            then be set on an Element using the setAttributeNode method.

            To create an attribute with a qualified name and namespace URI,
            use the createAttributeNS method.

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
            	
            INVALID_CHARACTER_ERR: Raised if the specified name is not an XML
            name according to the XML version in use specified in the
            Document.xmlVersion attribute.

******************************************************************************/
test('Document.prototype.createAttribute', function(){
    ok(true, 'See DOM Level 1 Document.prototype.createAttribute');
});
/******************************************************************************
        createAttributeNS introduced in DOM Level 2
            Creates an attribute of the given qualified name and namespace
            URI.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to create.
            qualifiedName of type DOMString
                The qualified name of the attribute to instantiate.

            Return Value

            Attr
            	

            A new Attr object with the following attributes:
            Attribute	Value
            Node.nodeName	qualifiedName
            Node.namespaceURI	namespaceURI
            Node.prefix	prefix, extracted from qualifiedName, or null if there is no prefix
            Node.localName	local name, extracted from qualifiedName
            Attr.name	qualifiedName
            Node.nodeValue	the empty string
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified qualifiedName is
            not an XML name according to the XML version in use specified in
            the Document.xmlVersion attribute.
            
            NAMESPACE_ERR: Raised if the qualifiedName is a malformed
            qualified name, if the qualifiedName has a prefix and the
            namespaceURI is null, if the qualifiedName has a prefix that is
            "xml" and the namespaceURI is different from
            "http://www.w3.org/XML/1998/namespace", if the qualifiedName or
            its prefix is "xmlns" and the namespaceURI is different from
            "http://www.w3.org/2000/xmlns/", or if the namespaceURI is
            "http://www.w3.org/2000/xmlns/" and neither the qualifiedName nor
            its prefix is "xmlns".
            
            NOT_SUPPORTED_ERR: Always thrown if the current document does not
            support the "XML" feature, since namespaces were defined by XML.

******************************************************************************/
test('Document.prototype.createAttributeNS', function(){
    ok(true, 'See DOM Level 2 Document.prototype.createAttributeNS');
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
    ok(true, 'See DOM Level 1 Document.prototype.createCDATASection');
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
    ok(true, 'See DOM Level 1 Document.prototype.createComment');
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
    ok(true, 'See DOM Level 1 Document.prototype.createDocumentFragment');
});
/******************************************************************************
        createElement
            Creates an element of the type specified. Note that the instance
            returned implements the Element interface, so attributes can be
            specified directly on the returned object.

            In addition, if there are known attributes with default values,
            Attr nodes representing them are automatically created and
            attached to the element.

            To create an element with a qualified name and namespace URI, use
            the createElementNS method.

            Parameters

            tagName of type DOMString
                The name of the element type to instantiate. For XML, this is
                case-sensitive, otherwise it depends on the case-sensitivity
                of the markup language in use. In that case, the name is
                mapped to the canonical form of that markup by the DOM
                implementation.

            Return Value

            Element
            	
            A new Element object with the nodeName attribute set to tagName,
            and localName, prefix, and namespaceURI set to null.

            Exceptions

            DOMException
            	
            INVALID_CHARACTER_ERR: Raised if the specified name is not an XML
            name according to the XML version in use specified in the
            Document.xmlVersion attribute.

******************************************************************************/
test('Document.prototype.createElement', function(){
    ok(true, 'See DOM Level 1 Document.prototype.createElement');
});
/******************************************************************************
        createElementNS introduced in DOM Level 2
            Creates an element of the given qualified name and namespace URI.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the element to create.
            qualifiedName of type DOMString
                The qualified name of the element type to instantiate.

            Return Value

            Element
            	

            A new Element object with the following attributes:
            Attribute	Value
            Node.nodeName	qualifiedName
            Node.namespaceURI	namespaceURI
            Node.prefix	prefix, extracted from qualifiedName, or null if there is no prefix
            Node.localName	local name, extracted from qualifiedName
            Element.tagName	qualifiedName
            Exceptions

            DOMException
            	
            INVALID_CHARACTER_ERR: Raised if the specified qualifiedName is
            not an XML name according to the XML version in use specified in
            the Document.xmlVersion attribute.
            
            NAMESPACE_ERR: Raised if the qualifiedName is a malformed
            qualified name, if the qualifiedName has a prefix and the
            namespaceURI is null, or if the qualifiedName has a prefix that is
            "xml" and the namespaceURI is different from
            "http://www.w3.org/XML/1998/namespace" [XML Namespaces], or if the
            qualifiedName or its prefix is "xmlns" and the namespaceURI is
            different from "http://www.w3.org/2000/xmlns/", or if the
            namespaceURI is "http://www.w3.org/2000/xmlns/" and neither the
            qualifiedName nor its prefix is "xmlns".
            
            NOT_SUPPORTED_ERR: Always thrown if the current document does not
            support the "XML" feature, since namespaces were defined by XML.

******************************************************************************/
test('Document.prototype.createElementNS', function(){
    ok(true, 'See DOM Level 1 Document.prototype.createElementNS');
});
/******************************************************************************
        createEntityReference
            Creates an EntityReference object. In addition, if the referenced
            entity is known, the child list of the EntityReference node is
            made the same as that of the corresponding Entity node.

            Note: If any descendant of the Entity node has an unbound
            namespace prefix, the corresponding descendant of the created
            EntityReference node is also unbound; (its namespaceURI is null).
            The DOM Level 2 and 3 do not support any mechanism to resolve
            namespace prefixes in this case.

            Parameters

            name of type DOMString
                The name of the entity to reference.

                Unlike Document.createElementNS or Document.createAttributeNS,
                no namespace well-formed checking is done on the entity name.
                Applications should invoke Document.normalizeDocument() with
                the parameter "namespaces" set to true in order to ensure that
                the entity name is namespace well-formed.

            Return Value

            EntityReference
            	
            The new EntityReference object.
            
            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified name is not an XML
            name according to the XML version in use specified in the
            Document.xmlVersion attribute.
            
            NOT_SUPPORTED_ERR: Raised if this document is an HTML document.

******************************************************************************/
test('Document.prototype.createEntityReference', function(){
    ok(true, 'See DOM Level 1 Document.prototype.createEntityReference');
});
/******************************************************************************
        createProcessingInstruction
            Creates a ProcessingInstruction node given the specified name and
            data strings.

            Parameters

            target of type DOMString
                The target part of the processing instruction.

                Unlike Document.createElementNS or Document.createAttributeNS,
                no namespace well-formed checking is done on the target name.
                Applications should invoke Document.normalizeDocument() with
                the parameter "namespaces" set to true in order to ensure that
                the target name is namespace well-formed.
            data of type DOMString
                The data for the node.

            Return Value

            ProcessingInstruction
            	
            The new ProcessingInstruction object.
            
            Exceptions

            DOMException
            	
            INVALID_CHARACTER_ERR: Raised if the specified target is not an
            XML name according to the XML version in use specified in the
            Document.xmlVersion attribute.
            
             NOT_SUPPORTED_ERR: Raised if this document is an HTML document.

******************************************************************************/
test('Document.prototype.createProcessingInstruction', function(){
    ok(true, 'See DOM Level 1 Document.prototype.createProcessingInstruction');
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
    ok(true, 'See DOM Level 1 Document.prototype.createTextNode');
});
/******************************************************************************
        getElementById introduced in DOM Level 2
            Returns the Element that has an ID attribute with the given value.
            If no such element exists, this returns null. If more than one
            element has an ID attribute with that value, what is returned is
            undefined.

            The DOM implementation is expected to use the attribute Attr.isId
            to determine if an attribute is of type ID.

            Note: Attributes with the name "ID" or "id" are not of type ID
            unless so defined.

            Parameters

            elementId of type DOMString
                The unique id value for an element.

            Return Value

            Element
            	
            The matching element or null if there is none.
            No Exceptions

******************************************************************************/
test('Document.prototype.getElementById', function(){
    ok(true, 'See DOM Level 2 Document.prototype.getElementById');
});
/******************************************************************************
        getElementsByTagName
            Returns a NodeList of all the Elements in document order with a
            given tag name and are contained in the document.

            Parameters

            tagname of type DOMString
                The name of the tag to match on. The special value "*" matches
                all tags. For XML, the tagname parameter is case-sensitive,
                otherwise it depends on the case-sensitivity of the markup
                language in use.

            Return Value

            NodeList
            	
            A new NodeList object containing all the matched Elements.
            No Exceptions

******************************************************************************/
test('Document.prototype.getElementsByTagName', function(){
    ok(true, 'See DOM Level 1 Document.prototype.getElementsByTagName');
});
/******************************************************************************
        getElementsByTagNameNS introduced in DOM Level 2
            Returns a NodeList of all the Elements with a given local name and
            namespace URI in document order.

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
test('Document.prototype.getElementsByTagNameNS', function(){
    ok(true, 'See DOM Level 2 Document.prototype.getElementsByTagNameNS');
});
/******************************************************************************
        importNode introduced in DOM Level 2
            Imports a node from another document to this document, without
            altering or removing the source node from the original document;
            this method creates a new copy of the source node. The returned
            node has no parent; (parentNode is null).

            For all nodes, importing a node creates a node object owned by the
            importing document, with attribute values identical to the source
            node's nodeName and nodeType, plus the attributes related to
            namespaces (prefix, localName, and namespaceURI). As in the
            cloneNode operation, the source node is not altered. User data
            associated to the imported node is not carried over. However, if
            any UserDataHandlers has been specified along with the associated
            data these handlers will be called with the appropriate parameters
            before this method returns.

            Additional information is copied as appropriate to the nodeType,
            attempting to mirror the behavior expected if a fragment of XML or
            HTML source was copied from one document to another, recognizing
            that the two documents may have different DTDs in the XML case.
            The following list describes the specifics for each type of node.

            ATTRIBUTE_NODE
                The ownerElement attribute is set to null and the specified
                flag is set to true on the generated Attr. The descendants of
                the source Attr are recursively imported and the resulting
                nodes reassembled to form the corresponding subtree.

                Note that the deep parameter has no effect on Attr nodes; they
                always carry their children with them when imported.
            DOCUMENT_FRAGMENT_NODE
                If the deep option was set to true, the descendants of the
                source DocumentFragment are recursively imported and the
                resulting nodes reassembled under the imported
                DocumentFragment to form the corresponding subtree. Otherwise,
                this simply generates an empty DocumentFragment.
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
                Entity nodes can be imported, however in the current release
                of the DOM the DocumentType is readonly. Ability to add these
                imported nodes to a DocumentType will be considered for
                addition to a future release of the DOM.

                On import, the publicId, systemId, and notationName attributes
                are copied. If a deep import is requested, the descendants of
                the the source Entity are recursively imported and the
                resulting nodes reassembled to form the corresponding subtree.
            ENTITY_REFERENCE_NODE
                Only the EntityReference itself is copied, even if a deep
                import is requested, since the source and destination
                documents might have defined the entity differently. If the
                document being imported into provides a definition for this
                entity name, its value is assigned.
            NOTATION_NODE
                Notation nodes can be imported, however in the current release
                of the DOM the DocumentType is readonly. Ability to add these
                imported nodes to a DocumentType will be considered for
                addition to a future release of the DOM.

                On import, the publicId and systemId attributes are copied.

                Note that the deep parameter has no effect on this type of
                nodes since they cannot have any children.
            PROCESSING_INSTRUCTION_NODE
                The imported node copies its target and data values from those
                of the source node.

                Note that the deep parameter has no effect on this type of
                nodes since they cannot have any children.
            TEXT_NODE, CDATA_SECTION_NODE, COMMENT_NODE
                These three types of nodes inheriting from CharacterData copy
                their data and length attributes from those of the source
                node.

                Note that the deep parameter has no effect on these types of
                nodes since they cannot have any children.

            Parameters

            importedNode of type Node
                The node to import.
            deep of type boolean
                If true, recursively import the subtree under the specified
                node; if false, import only the node itself, as explained
                above. This has no effect on nodes that cannot have any
                children, and on Attr, and EntityReference nodes.

            Return Value

            Node
            	

            The imported node that belongs to this Document.
            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: Raised if the type of node being imported is
            not supported.
            
            INVALID_CHARACTER_ERR: Raised if one of the imported names is not
            an XML name according to the XML version in use specified in the
            Document.xmlVersion attribute. This may happen when importing an
            XML 1.1 [XML 1.1] element into an XML 1.0 document, for instance.

******************************************************************************/
test('Document.prototype.importNode', function(){
    ok(true, 'See DOM Level 2 Document.prototype.importNode');
});
/******************************************************************************
        normalizeDocument introduced in DOM Level 3
            This method acts as if the document was going through a save and
            load cycle, putting the document in a "normal" form. As a
            consequence, this method updates the replacement tree of
            EntityReference nodes and normalizes Text nodes, as defined in the
            method Node.normalize().

            Otherwise, the actual result depends on the features being set on
            the Document.domConfig object and governing what operations
            actually take place. Noticeably this method could also make the
            document namespace well-formed according to the algorithm
            described in Namespace Normalization, check the character
            normalization, remove the CDATASection nodes, etc. See
            DOMConfiguration for details.

            // Keep in the document the information defined
            // in the XML Information Set (Java example)
            DOMConfiguration docConfig = myDocument.getDomConfig();
            docConfig.setParameter("infoset", Boolean.TRUE);
            myDocument.normalizeDocument();


            Mutation events, when supported, are generated to reflect the
            changes occurring on the document.

            If errors occur during the invocation of this method, such as an
            attempt to update a read-only node or a Node.nodeName contains an
            invalid character according to the XML version in use, errors or
            warnings (DOMError.SEVERITY_ERROR or DOMError.SEVERITY_WARNING)
            will be reported using the DOMErrorHandler object associated with
            the "error-handler" parameter. Note this method might also report
            fatal errors (DOMError.SEVERITY_FATAL_ERROR) if an implementation
            cannot recover from an error.

            No Parameters
            No Return Value
            No Exceptions

******************************************************************************/
test('Document.prototype.normalizeDocument', function(){
    
});
/******************************************************************************
        renameNode introduced in DOM Level 3
            Rename an existing node of type ELEMENT_NODE or ATTRIBUTE_NODE.
            
            When possible this simply changes the name of the given node,
            otherwise this creates a new node with the specified name and
            replaces the existing node with the new node as described below.
            
            If simply changing the name of the given node is not possible,
            the following operations are performed: a new node is created, any
            registered event listener is registered on the new node, any user
            data attached to the old node is removed from that node, the old
            node is removed from its parent if it has one, the children are
            moved to the new node, if the renamed node is an Element its
            attributes are moved to the new node, the new node is inserted at
            the position the old node used to have in its parent's child nodes
            list if it has one, the user data that was attached to the old
            node is attached to the new node.
            
            When the node being renamed is an Element only the specified
            attributes are moved, default attributes originated from the DTD
            are updated according to the new element name. In addition, the
            implementation may update default attributes from other schemas.
            Applications should use Document.normalizeDocument() to guarantee
            these attributes are up-to-date.
            
            When the node being renamed is an Attr that is attached to an
            Element, the node is first removed from the Element attributes
            map. Then, once renamed, either by modifying the existing node or
            creating a new one as described above, it is put back.

            In addition,

                * a user data event NODE_RENAMED is fired,
                * when the implementation supports the feature
                  "MutationNameEvents", each mutation operation involved in
                  this method fires the appropriate event, and in the end the
                  event {http://www.w3.org/2001/xml-events,
                  DOMElementNameChanged} or
                  {http://www.w3.org/2001/xml-events, DOMAttributeNameChanged}
                  is fired.

            Parameters

            n of type Node
                The node to rename.
            namespaceURI of type DOMString
                The new namespace URI.
            qualifiedName of type DOMString
                The new qualified name.

            Return Value

            Node
            	
            The renamed node. This is either the specified node or the new
            node that was created to replace the specified node.

            Exceptions

            DOMException
            	
            NOT_SUPPORTED_ERR: Raised when the type of the specified node is
            neither ELEMENT_NODE nor ATTRIBUTE_NODE, or if the implementation
            does not support the renaming of the document element.
            
            INVALID_CHARACTER_ERR: Raised if the new qualified name is not an
            XML name according to the XML version in use specified in the
            Document.xmlVersion attribute.
            
            WRONG_DOCUMENT_ERR: Raised when the specified node was created
            from a different document than this document.
            
            NAMESPACE_ERR: Raised if the qualifiedName is a malformed
            qualified name, if the qualifiedName has a prefix and the
            namespaceURI is null, or if the qualifiedName has a prefix that is
            "xml" and the namespaceURI is different from
            "http://www.w3.org/XML/1998/namespace" [XML Namespaces]. Also
            raised, when the node being renamed is an attribute, if the
            qualifiedName, or its prefix, is "xmlns" and the namespaceURI is
            different from "http://www.w3.org/2000/xmlns/".
******************************************************************************/
test('Document.prototype.renameNode', function(){
    
});
/******************************************************************************

Interface Node

    The Node interface is the primary datatype for the entire Document Object
    Model. It represents a single node in the document tree. While all objects
    implementing the Node interface expose methods for dealing with children,
    not all objects implementing the Node interface may have children. For
    example, Text nodes may not have children, and adding children to such
    nodes results in a DOMException being raised.
    
    The attributes nodeName, nodeValue and attributes are included as a
    mechanism to get at node information without casting down to the specific
    derived interface. In cases where there is no obvious mapping of these
    attributes for a specific nodeType (e.g., nodeValue for an Element or
    attributes for a Comment), this returns null. Note that the specialized
    interfaces may contain additional and more convenient mechanisms to get
    and set the relevant information.


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

          readonly attribute DOMString       nodeName;
                   attribute DOMString       nodeValue;
                                        // raises(DOMException) on setting
                                        // raises(DOMException) on retrieval

          readonly attribute unsigned short  nodeType;
          readonly attribute Node            parentNode;
          readonly attribute NodeList        childNodes;
          readonly attribute Node            firstChild;
          readonly attribute Node            lastChild;
          readonly attribute Node            previousSibling;
          readonly attribute Node            nextSibling;
          readonly attribute NamedNodeMap    attributes;
          // Modified in DOM Level 2:
          readonly attribute Document        ownerDocument;
          // Modified in DOM Level 3:
          Node               insertBefore(in Node newChild, 
                                          in Node refChild)
                                                raises(DOMException);
          // Modified in DOM Level 3:
          Node               replaceChild(in Node newChild, 
                                          in Node oldChild)
                                                raises(DOMException);
          // Modified in DOM Level 3:
          Node               removeChild(in Node oldChild)
                                                raises(DOMException);
          // Modified in DOM Level 3:
          Node               appendChild(in Node newChild)
                                                raises(DOMException);
          boolean            hasChildNodes();
          Node               cloneNode(in boolean deep);
          // Modified in DOM Level 3:
          void               normalize();
          // Introduced in DOM Level 2:
          boolean            isSupported(in DOMString feature, 
                                         in DOMString version);
          // Introduced in DOM Level 2:
          readonly attribute DOMString       namespaceURI;
          // Introduced in DOM Level 2:
                   attribute DOMString       prefix;
                                            // raises(DOMException) on setting

          // Introduced in DOM Level 2:
          readonly attribute DOMString       localName;
          // Introduced in DOM Level 2:
          boolean            hasAttributes();
          // Introduced in DOM Level 3:
          readonly attribute DOMString       baseURI;

          // DocumentPosition
          const unsigned short      DOCUMENT_POSITION_DISCONNECTED = 0x01;
          const unsigned short      DOCUMENT_POSITION_PRECEDING    = 0x02;
          const unsigned short      DOCUMENT_POSITION_FOLLOWING    = 0x04;
          const unsigned short      DOCUMENT_POSITION_CONTAINS     = 0x08;
          const unsigned short      DOCUMENT_POSITION_CONTAINED_BY = 0x10;
          const unsigned short      DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;

          // Introduced in DOM Level 3:
          unsigned short     compareDocumentPosition(in Node other)
                                                raises(DOMException);
          // Introduced in DOM Level 3:
                   attribute DOMString       textContent;
                                        // raises(DOMException) on setting
                                        // raises(DOMException) on retrieval

          // Introduced in DOM Level 3:
          boolean            isSameNode(in Node other);
          // Introduced in DOM Level 3:
          DOMString          lookupPrefix(in DOMString namespaceURI);
          // Introduced in DOM Level 3:
          boolean            isDefaultNamespace(in DOMString namespaceURI);
          // Introduced in DOM Level 3:
          DOMString          lookupNamespaceURI(in DOMString prefix);
          // Introduced in DOM Level 3:
          boolean            isEqualNode(in Node arg);
          // Introduced in DOM Level 3:
          DOMObject          getFeature(in DOMString feature, 
                                        in DOMString version);
          // Introduced in DOM Level 3:
          DOMUserData        setUserData(in DOMString key, 
                                         in DOMUserData data, 
                                         in UserDataHandler handler);
          // Introduced in DOM Level 3:
          DOMUserData        getUserData(in DOMString key);
        };

******************************************************************************/
test('Node.prototype', function(){
    
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
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

        The values of nodeName, nodeValue, and attributes vary according to the node type as follows:
        Interface	nodeName	nodeValue	attributes
        Attr	same as Attr.name	same as Attr.value	null
        CDATASection	"#cdata-section"	same as CharacterData.data, the content of the CDATA Section	null
        Comment	"#comment"	same as CharacterData.data, the content of the comment	null
        Document	"#document"	null	null
        DocumentFragment	"#document-fragment"	null	null
        DocumentType	same as DocumentType.name	null	null
        Element	same as Element.tagName	null	NamedNodeMap
        Entity	entity name	null	null
        EntityReference	name of entity referenced	null	null
        Notation	notation name	null	null
        ProcessingInstruction	same as ProcessingInstruction.target	same as ProcessingInstruction.data	null
        Text	"#text"	same as CharacterData.data, the content of the text node	null
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Definition group DocumentPosition

        A bitmask indicating the relative document position of a node with
        respect to another node.
        
         If the two nodes being compared are the same node, then no flags are
        set on the return.
        
         Otherwise, the order of two nodes is determined by looking for common
        containers -- containers which contain both. A node directly contains
        any child nodes. A node also directly contains any other nodes
        attached to it such as attributes contained in an element or entities
        and notations contained in a document type. Nodes contained in
        contained nodes are also contained, but less-directly as the number of
        intervening containers increases.
        
         If there is no common container node, then the order is based upon
        order between the root container of each node that is in no container.
        In this case, the result is disconnected and implementation-specific.
        This result is stable as long as these outer-most containing nodes
        remain in memory and are not inserted into some other containing node.
        This would be the case when the nodes belong to different documents or
        fragments, and cloning the document or inserting a fragment might
        change the order.
        
         If one of the nodes being compared contains the other node, then the
        container precedes the contained node, and reversely the contained
        node follows the container. For example, when comparing an element
        against its own attribute or child, the element node precedes its
        attribute node and its child node, which both follow it.
        
         If neither of the previous cases apply, then there exists a
        most-direct container common to both nodes being compared. In this
        case, the order is determined based upon the two determining nodes
        directly contained in this most-direct common container that either
        are or contain the corresponding nodes being compared.
        
         If these two determining nodes are both child nodes, then the natural
        DOM order of these determining nodes within the containing node is
        returned as the order of the corresponding nodes. This would be the
        case, for example, when comparing two child elements of the same
        element.
        
         If one of the two determining nodes is a child node and the other is
        not, then the corresponding node of the child node follows the
        corresponding node of the non-child node. This would be the case, for
        example, when comparing an attribute of an element with a child
        element of the same element.
        
         If neither of the two determining node is a child node and one
        determining node has a greater value of nodeType than the other, then
        the corresponding node precedes the other. This would be the case, for
        example, when comparing an entity of a document type against a
        notation of the same document type.
        
         If neither of the two determining node is a child node and nodeType
        is the same for both determining nodes, then an
        implementation-dependent order between the determining nodes is
        returned. This order is stable as long as no nodes of the same
        nodeType are inserted into or removed from the direct container. This
        would be the case, for example, when comparing two attributes of the
        same element, and inserting or removing additional attributes might
        change the order between existing attributes.

        Defined Constants

            DOCUMENT_POSITION_CONTAINED_BY
                The node is contained by the reference node. A node which is
                contained is always following, too.
            DOCUMENT_POSITION_CONTAINS
                The node contains the reference node. A node which contains is
                always preceding, too.
            DOCUMENT_POSITION_DISCONNECTED
                The two nodes are disconnected. Order between disconnected
                nodes is always implementation-specific.
            DOCUMENT_POSITION_FOLLOWING
                The node follows the reference node.
            DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
                The determination of preceding versus following is
                implementation-specific.
            DOCUMENT_POSITION_PRECEDING
                The second node precedes the reference node.
******************************************************************************/
test('Node/DocumentPosition.CONSTANTS', function(){

});
/******************************************************************************

    Attributes

        attributes of type NamedNodeMap, readonly
            A NamedNodeMap containing the attributes of this node (if it is an
            Element) or null otherwise.
        baseURI of type DOMString, readonly, introduced in DOM Level 3
            The absolute base URI of this node or null if the implementation
            wasn't able to obtain an absolute URI. This value is computed as
            described in Base URIs. However, when the Document supports the
            feature "HTML" [DOM Level 2 HTML], the base URI is computed using
            first the value of the href attribute of the HTML BASE element if
            any, and the value of the documentURI attribute from the Document
            interface otherwise.
******************************************************************************/
test('Node.prototype.baseURI', function(){

});
/******************************************************************************
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
            and nodes created with a DOM Level 1 method, such as
            Document.createElement(), this is always null.
        namespaceURI of type DOMString, readonly, introduced in DOM Level 2
            The namespace URI of this node, or null if it is unspecified (see
            XML Namespaces).

            This is not a computed value that is the result of a namespace
            lookup based on an examination of the namespace declarations in
            scope. It is merely the namespace URI given at creation time.

            For nodes of any type other than ELEMENT_NODE and ATTRIBUTE_NODE
            and nodes created with a DOM Level 1 method, such as
            Document.createElement(), this is always null.

            Note: Per the Namespaces in XML Specification [XML Namespaces] an
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
            above. When it is defined to be null, setting it has no effect,
            including if the node is read-only.

            Exceptions on setting

            DOMException
            	
            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly and
            if it is not defined to be null.

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
            When it is defined to be null, setting it has no effect, including
            if the node is read-only.
            
             Note that setting this attribute, when permitted, changes the
            nodeName attribute, which holds the qualified name, as well as the
            tagName and name attributes of the Element and Attr interfaces,
            when applicable.
            
             Setting the prefix to null makes it unspecified, setting it to an
            empty string is implementation dependent.
            
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
            illegal character according to the XML version in use specified in
            the Document.xmlVersion attribute.
            
            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            
            NAMESPACE_ERR: Raised if the specified prefix is malformed per
            the Namespaces in XML specification, if the namespaceURI of this
            node is null, if the specified prefix is "xml" and the
            namespaceURI of this node is different from
            "http://www.w3.org/XML/1998/namespace", if this node is an
            attribute and the specified prefix is "xmlns" and the namespaceURI
            of this node is different from "http://www.w3.org/2000/xmlns/", or
            if this node is an attribute and the qualifiedName of this node is
            "xmlns" [XML Namespaces].
        previousSibling of type Node, readonly
            The node immediately preceding this node. If there is no such
            node, this returns null.
        textContent of type DOMString, introduced in DOM Level 3
            This attribute returns the text content of this node and its
            descendants. When it is defined to be null, setting it has no
            effect. On setting, any possible children this node may have are
            removed and, if it the new string is not empty or null, replaced
            by a single Text node containing the string this attribute is set
            to.
            
            On getting, no serialization is performed, the returned string
            does not contain any markup. No whitespace normalization is
            performed and the returned string does not contain the white
            spaces in element content (see the attribute
            Text.isElementContentWhitespace). Similarly, on setting, no
            parsing is performed either, the input string is taken as pure
            textual content.
            
            The string returned is made of the text content of this node
            depending on its type, as defined below:

            Node type	Content
            ELEMENT_NODE, ATTRIBUTE_NODE, ENTITY_NODE, ENTITY_REFERENCE_NODE, DOCUMENT_FRAGMENT_NODE	concatenation of the textContent attribute value of every child node, excluding COMMENT_NODE and PROCESSING_INSTRUCTION_NODE nodes. This is the empty string if the node has no children.
            TEXT_NODE, CDATA_SECTION_NODE, COMMENT_NODE, PROCESSING_INSTRUCTION_NODE	nodeValue
            DOCUMENT_NODE, DOCUMENT_TYPE_NODE, NOTATION_NODE	null
            Exceptions on setting

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
            Exceptions on retrieval

            DOMException
            	

            DOMSTRING_SIZE_ERR: Raised when it would return more characters
            than fit in a DOMString variable on the implementation platform.

******************************************************************************/
test('Node.prototype.textContent', function(){

});
/******************************************************************************

    Methods

        appendChild modified in DOM Level 3
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
            node to append is one of this node's ancestors or this node
            itself, or if this node is of type Document and the DOM
            application attempts to append a second DocumentType or Element
            node.
            
             WRONG_DOCUMENT_ERR: Raised if newChild was created from a
            different document than the one that created this node.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly or
            if the previous parent of the node being inserted is readonly.
            
             NOT_SUPPORTED_ERR: if the newChild node is a child of the
            Document node, this exception might be raised if the DOM
            implementation doesn't support the removal of the DocumentType
            child or Element child.
******************************************************************************/
test('Node.prototype.textContent', function(){

});
/******************************************************************************
        cloneNode
            Returns a duplicate of this node, i.e., serves as a generic copy
            constructor for nodes. The duplicate node has no parent
            (parentNode is null) and no user data. User data associated to the
            imported node is not carried over. However, if any
            UserDataHandlers has been specified along with the associated data
            these handlers will be called with the appropriate parameters
            before this method returns.
            
             Cloning an Element copies all attributes and their values,
            including those generated by the XML processor to represent
            defaulted attributes, but this method does not copy any children
            it contains unless it is a deep clone. This includes text
            contained in an the Element since the text is contained in a child
            Text node. Cloning an Attr directly, as opposed to be cloned as
            part of an Element cloning operation, returns a specified
            attribute (specified is true). Cloning an Attr always clones its
            children, since they represent its value, no matter whether this
            is a deep clone or not. Cloning an EntityReference automatically
            constructs its subtree if a corresponding Entity is available, no
            matter whether this is a deep clone or not. Cloning any other type
            of node simply returns a copy of this node.
            
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
test('Node.prototype.cloneNode', function(){

});
/******************************************************************************
        compareDocumentPosition introduced in DOM Level 3
            Compares the reference node, i.e. the node on which this method is being called, with a node, i.e. the one passed as a parameter, with regard to their position in the document and according to the document order.
            Parameters

            other of type Node
                The node to compare against the reference node.

            Return Value

            unsigned short
            	

            Returns how the node is positioned relatively to the reference node.
            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: when the compared nodes are from different DOM implementations that do not coordinate to return consistent implementation-specific results.
******************************************************************************/

test('Node.prototype.compareDocumentPosition', function(){

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

/******************************************************************************
        getFeature introduced in DOM Level 3
            This method returns a specialized object which implements the specialized APIs of the specified feature and version, as specified in DOM Features. The specialized object may also be obtained by using binding-specific casting methods but is not necessarily expected to, as discussed in Mixed DOM Implementations. This method also allow the implementation to provide specialized objects which do not support the Node interface.
            Parameters

            feature of type DOMString
                The name of the feature requested. Note that any plus sign "+" prepended to the name of the feature will be ignored since it is not significant in the context of this method.
            version of type DOMString
                This is the version number of the feature to test.

            Return Value

            DOMObject
            	

            Returns an object which implements the specialized APIs of the specified feature and version, if any, or null if there is no object which implements interfaces associated with that feature. If the DOMObject returned by this method implements the Node interface, it must delegate to the primary core Node and not return results inconsistent with the primary core Node such as attributes, childNodes, etc.
            No Exceptions
******************************************************************************/
test('Node.prototype.getFeature', function(){

});
/******************************************************************************
        getUserData introduced in DOM Level 3
            Retrieves the object associated to a key on a this node. The object must first have been set to this node by calling setUserData with the same key.
            Parameters

            key of type DOMString
                The key the object is associated to.

            Return Value

            DOMUserData
            	

            Returns the DOMUserData associated to the given key on this node, or null if there was none.
            No Exceptions
******************************************************************************/
test('Node.prototype.getUserData', function(){

});
/******************************************************************************
        hasAttributes introduced in DOM Level 2
            Returns whether this node (if it is an element) has any attributes.
            Return Value

            boolean
            	

            Returns true if this node has any attributes, false otherwise.
            No Parameters
            No Exceptions
******************************************************************************/
test('Node.prototype.hasAttributes', function(){

});
/******************************************************************************
        hasChildNodes
            Returns whether this node has any children.
            Return Value

            boolean
            	

            Returns true if this node has any children, false otherwise.
            No Parameters
            No Exceptions
******************************************************************************/
test('Node.prototype.hasChildNodes', function(){

});
/******************************************************************************
        insertBefore modified in DOM Level 3
            Inserts the node newChild before the existing child node refChild.
            If refChild is null, insert newChild at the end of the list of
            children.

            If newChild is a DocumentFragment object, all of its children are
            inserted, in the same order, before refChild. If the newChild is
            already in the tree, it is first removed.

            Note: Inserting a node before itself is implementation dependent.

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
            node to insert is one of this node's ancestors or this node
            itself, or if this node is of type Document and the DOM
            application attempts to insert a second DocumentType or Element
            node.
            
             WRONG_DOCUMENT_ERR: Raised if newChild was created from a
            different document than the one that created this node.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly or
            if the parent of the node being inserted is readonly.
            
             NOT_FOUND_ERR: Raised if refChild is not a child of this node.
            
             NOT_SUPPORTED_ERR: if this node is of type Document, this
            exception might be raised if the DOM implementation doesn't
            support the insertion of a DocumentType or Element node.
******************************************************************************/
test('Node.prototype.insertBefore', function(){

});
/******************************************************************************
        isDefaultNamespace introduced in DOM Level 3
            This method checks if the specified namespaceURI is the default
            namespace or not.

            Parameters

            namespaceURI of type DOMString
                The namespace URI to look for.

            Return Value

            boolean
            	
            Returns true if the specified namespaceURI is the default
            namespace, false otherwise.

            No Exceptions
******************************************************************************/
test('Node.prototype.isDefaultNamespace', function(){

});
/******************************************************************************
        isEqualNode introduced in DOM Level 3
            Tests whether two nodes are equal.

            This method tests for equality of nodes, not sameness (i.e.,
            whether the two nodes are references to the same object) which can
            be tested with Node.isSameNode(). All nodes that are the same will
            also be equal, though the reverse may not be true.

            Two nodes are equal if and only if the following conditions are
            satisfied:

                * The two nodes are of the same type.
                * The following string attributes are equal: nodeName,
                  localName, namespaceURI, prefix, nodeValue. This is: they
                  are both null, or they have the same length and are
                  character for character identical.
                * The attributes NamedNodeMaps are equal. This is: they are
                  both null, or they have the same length and for each node
                  that exists in one map there is a node that exists in the
                  other map and is equal, although not necessarily at the same
                  index.
                * The childNodes NodeLists are equal. This is: they are both
                  null, or they have the same length and contain equal nodes
                  at the same index. Note that normalization can affect
                  equality; to avoid this, nodes should be normalized before
                  being compared.


            For two DocumentType nodes to be equal, the following conditions
            must also be satisfied:

                * The following string attributes are equal: publicId,
                  systemId, internalSubset.
                * The entities NamedNodeMaps are equal.
                * The notations NamedNodeMaps are equal.


            On the other hand, the following do not affect equality: the
            ownerDocument, baseURI, and parentNode attributes, the specified
            attribute for Attr nodes, the schemaTypeInfo attribute for Attr
            and Element nodes, the Text.isElementContentWhitespace attribute
            for Text nodes, as well as any user data or event listeners
            registered on the nodes.

            Note: As a general rule, anything not mentioned in the description
            above is not significant in consideration of equality checking.
            Note that future versions of this specification may take into
            account more attributes and implementations conform to this
            specification are expected to be updated accordingly.

            Parameters

            arg of type Node
                The node to compare equality with.

            Return Value

            boolean
            	

            Returns true if the nodes are equal, false otherwise.
            No Exceptions
******************************************************************************/
test('Node.prototype.isEqualNode', function(){

});
/******************************************************************************
        isSameNode introduced in DOM Level 3
            Returns whether this node is the same node as the given one.

            This method provides a way to determine whether two Node
            references returned by the implementation reference the same
            object. When two Node references are references to the same
            object, even if through a proxy, the references may be used
            completely interchangeably, such that all attributes have the same
            values and calling the same DOM method on either reference always
            has exactly the same effect.

            Parameters

            other of type Node
                The node to test against.

            Return Value

            boolean
            	

            Returns true if the nodes are the same, false otherwise.
            No Exceptions
******************************************************************************/
test('Node.prototype.isSameNode', function(){

});
/******************************************************************************
        isSupported introduced in DOM Level 2
            Tests whether the DOM implementation implements a specific feature
            and that feature is supported by this node, as specified in DOM
            Features.

            Parameters

            feature of type DOMString
                The name of the feature to test.
            version of type DOMString
                This is the version number of the feature to test.

            Return Value

            boolean
            	
            Returns true if the specified feature is supported on this node,
            false otherwise.

            No Exceptions
******************************************************************************/
test('Node.prototype.isSupported', function(){

});
/******************************************************************************
        lookupNamespaceURI introduced in DOM Level 3
            Look up the namespace URI associated to the given prefix, starting
            from this node.
            
            See Namespace URI Lookup for details on the algorithm used by
            this method.

            Parameters

            prefix of type DOMString
                The prefix to look for. If this parameter is null, the method
                will return the default namespace URI if any.

            Return Value

            DOMString
            	

            Returns the associated namespace URI or null if none is found.
            No Exceptions
******************************************************************************/
test('Node.prototype.lookupNamespaceURI', function(){

});
/******************************************************************************
        lookupPrefix introduced in DOM Level 3
            Look up the prefix associated to the given namespace URI, starting
            from this node. The default namespace declarations are ignored by
            this method.
            
             See Namespace Prefix Lookup for details on the algorithm used by
            this method.

            Parameters

            namespaceURI of type DOMString
                The namespace URI to look for.

            Return Value

            DOMString
            	

            Returns an associated namespace prefix if found or null if none is
            found. If more than one prefix are associated to the namespace
            prefix, the returned namespace prefix is implementation dependent.

            No Exceptions
******************************************************************************/
test('Node.prototype.lookupPrefix', function(){

});
/******************************************************************************
        normalize modified in DOM Level 3
            Puts all Text nodes in the full depth of the sub-tree underneath
            this Node, including attribute nodes, into a "normal" form where
            only structure (e.g., elements, comments, processing instructions,
            CDATA sections, and entity references) separates Text nodes, i.e.,
            there are neither adjacent Text nodes nor empty Text nodes. This
            can be used to ensure that the DOM view of a document is the same
            as if it were saved and re-loaded, and is useful when operations
            (such as XPointer [XPointer] lookups) that depend on a particular
            document tree structure are to be used. If the parameter
            "normalize-characters" of the DOMConfiguration object attached to
            the Node.ownerDocument is true, this method will also fully
            normalize the characters of the Text nodes.
            
             Note: In cases where the document contains CDATASections, the
            normalize operation alone may not be sufficient, since XPointers
            do not differentiate between Text nodes and CDATASection nodes.

            No Parameters
            No Return Value
            No Exceptions
******************************************************************************/
test('Node.prototype.normalize', function(){

});
/******************************************************************************
        removeChild modified in DOM Level 3
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

            NOT_SUPPORTED_ERR: if this node is of type Document, this
            exception might be raised if the DOM implementation doesn't
            support the removal of the DocumentType child or the Element
            child.
******************************************************************************/
test('Node.prototype.removeChild', function(){

});
/******************************************************************************
        replaceChild modified in DOM Level 3
            Replaces the child node oldChild with newChild in the list of
            children, and returns the oldChild node.

            If newChild is a DocumentFragment object, oldChild is replaced by
            all of the DocumentFragment children, which are inserted in the
            same order. If the newChild is already in the tree, it is first
            removed.

            Note: Replacing a node with itself is implementation dependent.
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
            not allow children of the type of the newChild node, or if the
            node to put in is one of this node's ancestors or this node
            itself, or if this node is of type Document and the result of the
            replacement operation would add a second DocumentType or Element
            on the Document node.
            
             WRONG_DOCUMENT_ERR: Raised if newChild was created from a
            different document than the one that created this node.
            
             NO_MODIFICATION_ALLOWED_ERR: Raised if this node or the parent of
            the new node is readonly.
            
             NOT_FOUND_ERR: Raised if oldChild is not a child of this node.
            
             NOT_SUPPORTED_ERR: if this node is of type Document, this
            exception might be raised if the DOM implementation doesn't
            support the replacement of the DocumentType child or Element
            child.
******************************************************************************/
test('Node.prototype.replaceChild', function(){

});
/******************************************************************************
        setUserData introduced in DOM Level 3
            Associate an object to a key on this node. The object can later be
            retrieved from this node by calling getUserData with the same key.

            Parameters

            key of type DOMString
                The key to associate the object to.
            data of type DOMUserData
                The object to associate to the given key, or null to remove
                any existing association to that key.
            handler of type UserDataHandler
                The handler to associate to that key, or null.

            Return Value

            DOMUserData
            	
            Returns the DOMUserData previously associated to the given key on
            this node, or null if there was none.

            No Exceptions
******************************************************************************/
test('Node.prototype.setUserData', function(){

});
/******************************************************************************

Interface NodeList

    The NodeList interface provides the abstraction of an ordered collection
    of nodes, without defining or constraining how this collection is
    implemented. NodeList objects in the DOM are live.
    
     The items in the NodeList are accessible via an integral index, starting
    from 0.


    IDL Definition

        interface NodeList {
          Node               item(in unsigned long index);
          readonly attribute unsigned long   length;
        };
        
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Attributes

        length of type unsigned long, readonly
            The number of nodes in the list. The range of valid child node
            indices is 0 to length-1 inclusive.
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

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
          readonly attribute unsigned long   length;
          // Introduced in DOM Level 2:
          Node               getNamedItemNS(in DOMString namespaceURI, 
                                            in DOMString localName)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Node               setNamedItemNS(in Node arg)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Node               removeNamedItemNS(in DOMString namespaceURI, 
                                               in DOMString localName)
                                                raises(DOMException);
        };
        
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Attributes

        length of type unsigned long, readonly
            The number of nodes in this map. The range of valid child node
            indices is 0 to length-1 inclusive.
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

});
/******************************************************************************
        getNamedItemNS introduced in DOM Level 2
            Retrieves a node specified by local name and namespace URI.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the node to retrieve.
            localName of type DOMString
                The local name of the node to retrieve.

            Return Value

            Node
            	

            A Node (of any type) with the specified local name and namespace
            URI, or null if they do not identify any node in this map.

            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        item
            Returns the indexth item in the map. If index is greater than or
            equal to the number of nodes in this map, this returns null.

            Parameters

            index of type unsigned long
                Index into this map.

            Return Value

            Node
            	
            The node at the indexth position in the map, or null if that is
            not a valid index.
            No Exceptions
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

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

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

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
            
             NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setNamedItem
            Adds a node using its nodeName attribute. If a node with that name
            is already present in this map, it is replaced by the new one.
            Replacing a node by itself has no effect.

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
            
             HIERARCHY_REQUEST_ERR: Raised if an attempt is made to add a node
            doesn't belong in this NamedNodeMap. Examples would include trying
            to insert something other than an Attr node into an Element's map
            of attributes, or a non-Entity node into the DocumentType's map of
            Entities.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setNamedItemNS introduced in DOM Level 2
            Adds a node using its namespaceURI and localName. If a node with
            that namespace URI and that local name is already present in this
            map, it is replaced by the new one. Replacing a node by itself has
            no effect.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

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
            
            HIERARCHY_REQUEST_ERR: Raised if an attempt is made to add a node
            doesn't belong in this NamedNodeMap. Examples would include trying
            to insert something other than an Attr node into an Element's map
            of attributes, or a non-Entity node into the DocumentType's map of
            Entities.
            
            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

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
                   attribute DOMString       data;
                                        // raises(DOMException) on setting
                                        // raises(DOMException) on retrieval

          readonly attribute unsigned long   length;
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
test('TODO:', function(){

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
            	

            DOMSTRING_SIZE_ERR: Raised when it would return more characters than fit in a DOMString variable on the implementation platform.

        length of type unsigned long, readonly
            The number of 16-bit units that are available through data and the
            substringData method below. This may have the value zero, i.e.,
            CharacterData nodes may be empty.
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

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
test('TODO:', function(){

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
test('TODO:', function(){

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
test('TODO:', function(){

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
            
             DOMSTRING_SIZE_ERR: Raised if the specified range of text does
            not fit into a DOMString.
 ******************************************************************************/
 test('TODO:', function(){

 });
 /******************************************************************************

Interface Attr

    The Attr interface represents an attribute in an Element object. Typically
    the allowable values for the attribute are defined in a schema associated
    with the document.
    
     Attr objects inherit the Node interface, but since they are not actually
    child nodes of the element they describe, the DOM does not consider them
    part of the document tree. Thus, the Node attributes parentNode,
    previousSibling, and nextSibling have a null value for Attr objects. The
    DOM takes the view that attributes are properties of elements rather than
    having a separate identity from the elements they are associated with;
    this should make it more efficient to implement such features as default
    attributes associated with all elements of a given type. Furthermore, Attr
    nodes may not be immediate children of a DocumentFragment. However, they
    can be associated with Element nodes contained within a DocumentFragment.
    In short, users and implementors of the DOM need to be aware that Attr
    nodes have some things in common with other objects inheriting the Node
    interface, but they also are quite distinct.
    
     The attribute's effective value is determined as follows: if this
    attribute has been explicitly assigned any value, that value is the
    attribute's effective value; otherwise, if there is a declaration for this
    attribute, and that declaration includes a default value, then that
    default value is the attribute's effective value; otherwise, the attribute
    does not exist on this element in the structure model until it has been
    explicitly added. Note that the Node.nodeValue attribute on the Attr
    instance can also be used to retrieve the string version of the
    attribute's value(s).
    
     If the attribute was not explicitly given a value in the instance
    document but has a default value provided by the schema associated with
    the document, an attribute node will be created with specified set to
    false. Removing attribute nodes for which a default value is defined in
    the schema generates a new attribute node with the default value and
    specified set to false. If validation occurred while invoking
    Document.normalizeDocument(), attribute nodes with specified equals to
    false are recomputed according to the default attribute values provided by
    the schema. If no default value is associate with this attribute in the
    schema, the attribute node is discarded.
    
     In XML, where the value of an attribute can contain entity references,
    the child nodes of the Attr node may be either Text or EntityReference
    nodes (when these are in use; see the description of EntityReference for
    discussion).
    
     The DOM Core represents all attribute values as simple strings, even if
    the DTD or schema associated with the document declares them of some
    specific type such as tokenized.
    
     The way attribute value normalization is performed by the DOM
    implementation depends on how much the implementation knows about the
    schema in use. Typically, the value and nodeValue attributes of an Attr
    node initially returns the normalized value given by the parser. It is
    also the case after Document.normalizeDocument() is called (assuming the
    right options have been set). But this may not be the case after mutation,
    independently of whether the mutation is performed by setting the string
    value directly or by changing the Attr child nodes. In particular, this is
    true when character references are involved, given that they are not
    represented in the DOM and they impact attribute value normalization. On
    the other hand, if the implementation knows about the schema in use when
    the attribute value is changed, and it is of a different type than CDATA,
    it may normalize it again at that time. This is especially true of
    specialized DOM implementations, such as SVG DOM implementations, which
    store attribute values in an internal form different from a string.
    
     The following table gives some examples of the relations between the
    attribute value in the original document (parsed attribute), the value as
    exposed in the DOM, and the serialization of the value:

    Examples	Parsed attribute value	Initial Attr.value	Serialized attribute value
    Character reference	

    "x&#178;=5"

    	

    "x²=5"

    	

    "x&#178;=5"

    Built-in character entity	

    "y&lt;6"

    	

    "y<6"

    	

    "y&lt;6"

    Literal newline between	

    "x=5&#10;y=6"

    	

    "x=5
    y=6"

    	

    "x=5&#10;y=6"

    Normalized newline between	

    "x=5
    y=6"

    	

    "x=5 y=6"

    	

    "x=5 y=6"

    Entity e with literal newline	

    <!ENTITY e
    '...&#10;...'>
    [...]>
    "x=5&e;y=6"

    	Dependent on Implementation and Load Options Dependent on
        Implementation and Load/Save Options


    IDL Definition

        interface Attr : Node {
          readonly attribute DOMString       name;
          readonly attribute boolean         specified;
                   attribute DOMString       value;
                                        // raises(DOMException) on setting

          // Introduced in DOM Level 2:
          readonly attribute Element         ownerElement;
          // Introduced in DOM Level 3:
          readonly attribute TypeInfo        schemaTypeInfo;
          // Introduced in DOM Level 3:
          readonly attribute boolean         isId;
        };
        
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Attributes

        isId of type boolean, readonly, introduced in DOM Level 3
            Returns whether this attribute is known to be of type ID (i.e. to
            contain an identifier for its owner element) or not. When it is
            and its value is unique, the ownerElement of this attribute can be
            retrieved using the method Document.getElementById. The
            implementation could use several ways to determine if an attribute
            node is known to contain an identifier:

                * If validation occurred using an XML Schema [XML Schema Part
                  1] while loading the document or while invoking
                  Document.normalizeDocument(), the post-schema-validation
                  infoset contributions (PSVI contributions) values are used
                  to determine if this attribute is a schema-determined ID
                  attribute using the schema-determined ID definition in
                  [XPointer].
                * If validation occurred using a DTD while loading the
                  document or while invoking Document.normalizeDocument(), the
                  infoset [type definition] value is used to determine if this
                  attribute is a DTD-determined ID attribute using the
                  DTD-determined ID definition in [XPointer].
                * from the use of the methods Element.setIdAttribute(),
                  Element.setIdAttributeNS(), or Element.setIdAttributeNode(),
                  i.e. it is an user-determined ID attribute;

                  Note: XPointer framework (see section 3.2 in [XPointer])
                  consider the DOM user-determined ID attribute as being part
                  of the XPointer externally-determined ID definition.
                * using mechanisms that are outside the scope of this
                  specification, it is then an externally-determined ID
                  attribute. This includes using schema languages different
                  from XML schema and DTD.


            If validation occurred while invoking
            Document.normalizeDocument(), all user-determined ID attributes
            are reset and all attribute nodes ID information are then
            reevaluated in accordance to the schema used. As a consequence, if
            the Attr.schemaTypeInfo attribute contains an ID type, isId will
            always return true.
        name of type DOMString, readonly
            Returns the name of this attribute. If Node.localName is different
            from null, this attribute is a qualified name.
        ownerElement of type Element, readonly, introduced in DOM Level 2
            The Element node this attribute is attached to or null if this
            attribute is not in use.
        schemaTypeInfo of type TypeInfo, readonly, introduced in DOM Level 3
            The type information associated with this attribute. While the
            type information contained in this attribute is guarantee to be
            correct after loading the document or invoking
            Document.normalizeDocument(), schemaTypeInfo may not be reliable
            if the node was moved.
        specified of type boolean, readonly
            True if this attribute was explicitly given a value in the
            instance document, false otherwise. If the application changed the
            value of this attribute node (even if it ends up having the same
            value as the default value) then it is set to true. The
            implementation may handle attributes with default values from
            other schemas similarly but applications should use
            Document.normalizeDocument() to guarantee this information is
            up-to-date.
        value of type DOMString
            On retrieval, the value of the attribute is returned as a string.
            Character and general entity references are replaced with their
            values. See also the method getAttribute on the Element interface.
            
             On setting, this creates a Text node with the unparsed contents
            of the string, i.e. any characters that an XML processor would
            recognize as markup are instead treated as literal text. See also
            the method Element.setAttribute().
            
             Some specialized implementations, such as some [SVG 1.1]
            implementations, may do normalization automatically, even after
            mutation; in such case, the value on retrieval may differ from the
            value on setting.

            Exceptions on setting

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
******************************************************************************/
test('TODO:', function(){

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
          readonly attribute DOMString       tagName;
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
                                            in DOMString localName)
                                                raises(DOMException);
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
                                                in DOMString localName)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          Attr               setAttributeNodeNS(in Attr newAttr)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          NodeList           getElementsByTagNameNS(in DOMString namespaceURI, 
                                                    in DOMString localName)
                                                raises(DOMException);
          // Introduced in DOM Level 2:
          boolean            hasAttribute(in DOMString name);
          // Introduced in DOM Level 2:
          boolean            hasAttributeNS(in DOMString namespaceURI, 
                                            in DOMString localName)
                                                raises(DOMException);
          // Introduced in DOM Level 3:
          readonly attribute TypeInfo        schemaTypeInfo;
          // Introduced in DOM Level 3:
          void               setIdAttribute(in DOMString name, 
                                            in boolean isId)
                                                raises(DOMException);
          // Introduced in DOM Level 3:
          void               setIdAttributeNS(in DOMString namespaceURI, 
                                              in DOMString localName, 
                                              in boolean isId)
                                                raises(DOMException);
          // Introduced in DOM Level 3:
          void               setIdAttributeNode(in Attr idAttr, 
                                                in boolean isId)
                                                raises(DOMException);
        };
        
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Attributes

        schemaTypeInfo of type TypeInfo, readonly, introduced in DOM Level 3
            The type information associated with this element.
        tagName of type DOMString, readonly
            The name of the element. If Node.localName is different from null,
            this attribute is a qualified name. For example, in:

                      <elementExample id="demo"> 
                      ... 
                      </elementExample> ,
                    

            tagName has the value "elementExample". Note that this is
            case-preserving in XML, as are all of the operations of the DOM.
            The HTML DOM returns the tagName of an HTML element in the
            canonical uppercase form, regardless of the case in the source
            HTML document.
            
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

});
/******************************************************************************
        getAttributeNS introduced in DOM Level 2
            Retrieves an attribute value by local name and namespace URI.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to retrieve.
            localName of type DOMString
                The local name of the attribute to retrieve.

            Return Value

            DOMString
            	

            The Attr value as a string, or the empty string if that attribute
            does not have a specified or default value.

            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

});
/******************************************************************************
        getAttributeNodeNS introduced in DOM Level 2
            Retrieves an Attr node by local name and namespace URI.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to retrieve.
            localName of type DOMString
                The local name of the attribute to retrieve.

            Return Value

            Attr
            	

            The Attr node with the specified attribute local name and
            namespace URI or null if there is no such attribute.

            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        getElementsByTagName
            Returns a NodeList of all descendant Elements with a given tag
            name, in document order.

            Parameters

            name of type DOMString
                The name of the tag to match on. The special value "*" matches
                all tags.

            Return Value

            NodeList
            	

            A list of matching Element nodes.
            No Exceptions
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        getElementsByTagNameNS introduced in DOM Level 2
            Returns a NodeList of all the descendant Elements with a given
            local name and namespace URI in document order.
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
            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

});
/******************************************************************************
        hasAttributeNS introduced in DOM Level 2
            Returns true when an attribute with a given local name and
            namespace URI is specified on this element or has a default value,
            false otherwise.
            
             Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

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

            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        removeAttribute
            Removes an attribute by name. If a default value for the removed
            attribute is defined in the DTD, a new attribute immediately
            appears with the default value as well as the corresponding
            namespace URI, local name, and prefix when applicable. The
            implementation may handle default values from other schemas
            similarly but applications should use Document.normalizeDocument()
            to guarantee this information is up-to-date.
            
             If no attribute with this name is found, this method has no
            effect.
            
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
test('TODO:', function(){

});
/******************************************************************************
        removeAttributeNS introduced in DOM Level 2
            Removes an attribute by local name and namespace URI. If a default
            value for the removed attribute is defined in the DTD, a new
            attribute immediately appears with the default value as well as
            the corresponding namespace URI, local name, and prefix when
            applicable. The implementation may handle default values from
            other schemas similarly but applications should use
            Document.normalizeDocument() to guarantee this information is
            up-to-date.
            
            If no attribute with this local name and namespace URI is found,
            this method has no effect.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to remove.
            localName of type DOMString
                The local name of the attribute to remove.

            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).

            No Return Value
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        removeAttributeNode
            Removes the specified attribute node. If a default value for the
            removed Attr node is defined in the DTD, a new node immediately
            appears with the default value as well as the corresponding
            namespace URI, local name, and prefix when applicable. The
            implementation may handle default values from other schemas
            similarly but applications should use Document.normalizeDocument()
            to guarantee this information is up-to-date.

            Parameters

            oldAttr of type Attr
                The Attr node to remove from the attribute list.

            Return Value

            Attr
            	

            The Attr node that was removed.
            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if oldAttr is not an attribute of the element.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setAttribute
            Adds a new attribute. If an attribute with that name is already
            present in the element, its value is changed to be that of the
            value parameter. This value is a simple string; it is not parsed
            as it is being set. So any markup (such as syntax to be recognized
            as an entity reference) is treated as literal text, and needs to
            be appropriately escaped by the implementation when it is written
            out. In order to assign an attribute value that contains entity
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
            	

            INVALID_CHARACTER_ERR: Raised if the specified name is not an XML
            name according to the XML version in use specified in the
            Document.xmlVersion attribute.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setAttributeNS introduced in DOM Level 2
            Adds a new attribute. If an attribute with the same local name and
            namespace URI is already present on the element, its prefix is
            changed to be the prefix part of the qualifiedName, and its value
            is changed to be the value parameter. This value is a simple
            string; it is not parsed as it is being set. So any markup (such
            as syntax to be recognized as an entity reference) is treated as
            literal text, and needs to be appropriately escaped by the
            implementation when it is written out. In order to assign an
            attribute value that contains entity references, the user must
            create an Attr node plus any Text and EntityReference nodes, build
            the appropriate subtree, and use setAttributeNodeNS or
            setAttributeNode to assign it as the value of an attribute.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute to create or alter.
            qualifiedName of type DOMString
                The qualified name of the attribute to create or alter.
            value of type DOMString
                The value to set in string form.

            Exceptions

            DOMException
            	

            INVALID_CHARACTER_ERR: Raised if the specified qualified name is
            not an XML name according to the XML version in use specified in
            the Document.xmlVersion attribute.
            
            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            
            NAMESPACE_ERR: Raised if the qualifiedName is malformed per the
            Namespaces in XML specification, if the qualifiedName has a prefix
            and the namespaceURI is null, if the qualifiedName has a prefix
            that is "xml" and the namespaceURI is different from
            "http://www.w3.org/XML/1998/namespace", if the qualifiedName or
            its prefix is "xmlns" and the namespaceURI is different from
            "http://www.w3.org/2000/xmlns/", or if the namespaceURI is
            "http://www.w3.org/2000/xmlns/" and neither the qualifiedName nor
            its prefix is "xmlns".
            
            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).

            No Return Value
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setAttributeNode
            Adds a new attribute node. If an attribute with that name
            (nodeName) is already present in the element, it is replaced by
            the new one. Replacing an attribute node by itself has no effect.

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
test('TODO:', function(){

});
/******************************************************************************
        setAttributeNodeNS introduced in DOM Level 2
            Adds a new attribute. If an attribute with that local name and
            that namespace URI is already present in the element, it is
            replaced by the new one. Replacing an attribute node by itself has
            no effect.

            Per [XML Namespaces], applications must use the value null as the
            namespaceURI parameter for methods if they wish to have no
            namespace.

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
            
            NOT_SUPPORTED_ERR: May be raised if the implementation does not
            support the feature "XML" and the language exposed through the
            Document does not support XML Namespaces (such as [HTML 4.01]).
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setIdAttribute introduced in DOM Level 3
            If the parameter isId is true, this method declares the specified
            attribute to be a user-determined ID attribute. This affects the
            value of Attr.isId and the behavior of Document.getElementById,
            but does not change any schema that may be in use, in particular
            this does not affect the Attr.schemaTypeInfo of the specified Attr
            node. Use the value false for the parameter isId to undeclare an
            attribute for being a user-determined ID attribute.

            To specify an attribute by local name and namespace URI, use the
            setIdAttributeNS method.

            Parameters

            name of type DOMString
                The name of the attribute.
            isId of type boolean
                Whether the attribute is a of type ID.

            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if the specified node is not an attribute of
            this element.

            No Return Value
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setIdAttributeNS introduced in DOM Level 3
            If the parameter isId is true, this method declares the specified
            attribute to be a user-determined ID attribute. This affects the
            value of Attr.isId and the behavior of Document.getElementById,
            but does not change any schema that may be in use, in particular
            this does not affect the Attr.schemaTypeInfo of the specified Attr
            node. Use the value false for the parameter isId to undeclare an
            attribute for being a user-determined ID attribute.

            Parameters

            namespaceURI of type DOMString
                The namespace URI of the attribute.
            localName of type DOMString
                The local name of the attribute.
            isId of type boolean
                Whether the attribute is a of type ID.

            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if the specified node is not an attribute of
            this element.

            No Return Value
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setIdAttributeNode introduced in DOM Level 3
            If the parameter isId is true, this method declares the specified
            attribute to be a user-determined ID attribute. This affects the
            value of Attr.isId and the behavior of Document.getElementById,
            but does not change any schema that may be in use, in particular
            this does not affect the Attr.schemaTypeInfo of the specified Attr
            node. Use the value false for the parameter isId to undeclare an
            attribute for being a user-determined ID attribute.

            Parameters

            idAttr of type Attr
                The attribute node.
            isId of type boolean
                Whether the attribute is a of type ID.

            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if the specified node is not an attribute of
            this element.
            No Return Value
******************************************************************************/
test('TODO:', function(){

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
    general) persist between DOM editing sessions. The Node.normalize() method
    merges any such adjacent Text objects into a single node for each block of
    text.
    
     No lexical check is done on the content of a Text node and, depending on
    its position in the document, some characters must be escaped during
    serialization using character references; e.g. the characters "<&" if the
    textual content is part of an element or of an attribute, the character
    sequence "]]>" when part of an element, the quotation mark character " or
    the apostrophe character ' when part of an attribute.


    IDL Definition

        interface Text : CharacterData {
          Text               splitText(in unsigned long offset)
                                                raises(DOMException);
          // Introduced in DOM Level 3:
          readonly attribute boolean         isElementContentWhitespace;
          // Introduced in DOM Level 3:
          readonly attribute DOMString       wholeText;
          // Introduced in DOM Level 3:
          Text               replaceWholeText(in DOMString content)
                                                raises(DOMException);
        };
        
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Attributes

        isElementContentWhitespace of type boolean, readonly, introduced in DOM Level 3
            Returns whether this text node contains element content whitespace, often abusively called "ignorable whitespace". The text node is determined to contain whitespace in element content during the load of the document or if validation occurs while using Document.normalizeDocument().
        wholeText of type DOMString, readonly, introduced in DOM Level 3
            Returns all text of Text nodes logically-adjacent text nodes to
            this node, concatenated in document order.

            For instance, in the example below wholeText on the Text node that
            contains "bar" returns "barfoo", while on the Text node that
            contains "foo" it returns "barfoo".

            barTextNode.wholeText value is "barfoo"

            Figure: barTextNode.wholeText value is "barfoo" [SVG 1.0 version]            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Methods

        replaceWholeText introduced in DOM Level 3
            Replaces the text of the current node and all logically-adjacent
            text nodes with the specified text. All logically-adjacent text
            nodes are removed including the current node unless it was the
            recipient of the replacement text.

            This method returns the node which received the replacement text.
            The returned node is:

                * null, when the replacement text is the empty string;
                * the current node, except when the current node is read-only;
                * a new Text node of the same type (Text or CDATASection) as
                  the current node inserted at the location of the
                  replacement.


            For instance, in the above example calling replaceWholeText on the
            Text node that contains "bar" with "yo" in argument results in the
            following:

            barTextNode.replaceWholeText("yo") modifies the textual content of
            barTextNode with "yo"

            Figure: barTextNode.replaceWholeText("yo") modifies the textual
            content of barTextNode with "yo" [SVG 1.0 version]

            Where the nodes to be removed are read-only descendants of an
            EntityReference, the EntityReference must be removed instead of
            the read-only nodes. If any EntityReference to be removed has
            descendants that are not EntityReference, Text, or CDATASection
            nodes, the replaceWholeText method must fail before performing any
            modification of the document, raising a DOMException with the code
            NO_MODIFICATION_ALLOWED_ERR.

            For instance, in the example below calling replaceWholeText on the
            Text node that contains "bar" fails, because the EntityReference
            node "ent" contains an Element node which cannot be removed.

            barTextNode.replaceWholeText("yo") raises a
            NO_MODIFICATION_ALLOWED_ERR DOMException

            Figure: barTextNode.replaceWholeText("yo") raises a
            NO_MODIFICATION_ALLOWED_ERR DOMException [SVG 1.0 version]

            Parameters

            content of type DOMString
                The content of the replacing Text node.

            Return Value

            Text
            	

            The Text node created with the specified content.
            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if one of the Text nodes being
            replaced is readonly.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
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
test('TODO:', function(){

});
/******************************************************************************

Interface Comment

    This interface inherits from CharacterData and represents the content of a
    comment, i.e., all the characters between the starting '<!--' and ending
    '-->'. Note that this is the definition of a comment in XML, and, in
    practice, HTML, although some HTML tools may implement the full SGML
    comment structure.
    
    No lexical check is done on the content of a comment and it is therefore
    possible to have the character sequence "--" (double-hyphen) in the
    content, which is illegal in a comment per section 2.5 of [XML 1.0]. The
    presence of this character sequence must generate a fatal error during
    serialization.


    IDL Definition

        interface Comment : CharacterData {
        };
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


Interface TypeInfo (introduced in DOM Level 3)

    The TypeInfo interface represents a type referenced from Element or Attr
    nodes, specified in the schemas associated with the document. The type is
    a pair of a namespace URI and name properties, and depends on the
    document's schema.
    
    If the document's schema is an XML DTD [XML 1.0], the values are computed
    as follows:

        * If this type is referenced from an Attr node, typeNamespace is
          "http://www.w3.org/TR/REC-xml" and typeName represents the
          [attribute type] property in the [XML Information Set]. If there is
          no declaration for the attribute, typeNamespace and typeName are
          null.
        * If this type is referenced from an Element node, typeNamespace and
          typeName are null.

    If the document's schema is an XML Schema [XML Schema Part 1], the values
    are computed as follows using the post-schema-validation infoset
    contributions (also called PSVI contributions):

        * If the [validity] property exists AND is "invalid" or "notKnown":
          the {target namespace} and {name} properties of the declared type if
          available, otherwise null.

          Note: At the time of writing, the XML Schema specification does not
          require exposing the declared type. Thus, DOM implementations might
          choose not to provide type information if validity is not valid.
        * If the [validity] property exists and is "valid":
             1. If [member type definition] exists:
                   1. If {name} is not absent, then expose {name} and {target
                      namespace} properties of the [member type definition]
                      property;
                   2. Otherwise, expose the namespace and local name of the
                      corresponding anonymous type name.
             2. If the [type definition] property exists:
                   1. If {name} is not absent, then expose {name} and {target
                      namespace} properties of the [type definition] property;
                   2. Otherwise, expose the namespace and local name of the
                      corresponding anonymous type name.
             3. If the [member type definition anonymous] exists:
                   1. If it is false, then expose [member type definition
                      name] and [member type definition namespace] properties;
                   2. Otherwise, expose the namespace and local name of the
                      corresponding anonymous type name.
             4. If the [type definition anonymous] exists:
                   1. If it is false, then expose [type definition name] and
                      [type definition namespace] properties;
                   2. Otherwise, expose the namespace and local name of the
                      corresponding anonymous type name.

    Note: Other schema languages are outside the scope of the W3C and
    therefore should define how to represent their type systems using
    TypeInfo.


    IDL Definition

        // Introduced in DOM Level 3:
        interface TypeInfo {
          readonly attribute DOMString       typeName;
          readonly attribute DOMString       typeNamespace;

          // DerivationMethods
          const unsigned long       DERIVATION_RESTRICTION         = 0x00000001;
          const unsigned long       DERIVATION_EXTENSION           = 0x00000002;
          const unsigned long       DERIVATION_UNION               = 0x00000004;
          const unsigned long       DERIVATION_LIST                = 0x00000008;

          boolean            isDerivedFrom(in DOMString typeNamespaceArg, 
                                           in DOMString typeNameArg, 
                                           in unsigned long derivationMethod);
        };
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


    Definition group DerivationMethods

        These are the available values for the derivationMethod parameter used
        by the method TypeInfo.isDerivedFrom(). It is a set of possible types
        of derivation, and the values represent bit positions. If a bit in the
        derivationMethod parameter is set to 1, the corresponding type of
        derivation will be taken into account when evaluating the derivation
        between the reference type definition and the other type definition.
        When using the isDerivedFrom method, combining all of them in the
        derivationMethod parameter is equivalent to invoking the method for
        each of them separately and combining the results with the OR boolean
        function. This specification only defines the type of derivation for
        XML Schema.
        
         In addition to the types of derivation listed below, please note
        that:

            * any type derives from xsd:anyType.
            * any simple type derives from xsd:anySimpleType by restriction.
            * any complex type does not derive from xsd:anySimpleType by
              restriction.

        Defined Constants

            DERIVATION_EXTENSION
                If the document's schema is an XML Schema [XML Schema Part 1],
                this constant represents the derivation by extension.
                
                 The reference type definition is derived by extension from
                the other type definition if the other type definition can be
                reached recursively following the {base type definition}
                property from the reference type definition, and at least one
                of the derivation methods involved is an extension.
            DERIVATION_LIST
                If the document's schema is an XML Schema [XML Schema Part 1],
                this constant represents the list.
                
                 The reference type definition is derived by list from the
                other type definition if there exists two type definitions T1
                and T2 such as the reference type definition is derived from
                T1 by DERIVATION_RESTRICTION or DERIVATION_EXTENSION, T2 is
                derived from the other type definition by
                DERIVATION_RESTRICTION, T1 has {variety} list, and T2 is the
                {item type definition}. Note that T1 could be the same as the
                reference type definition, and T2 could be the same as the
                other type definition.
            DERIVATION_RESTRICTION
                If the document's schema is an XML Schema [XML Schema Part 1],
                this constant represents the derivation by restriction if
                complex types are involved, or a restriction if simple types
                are involved.
                
                 The reference type definition is derived by restriction from
                the other type definition if the other type definition is the
                same as the reference type definition, or if the other type
                definition can be reached recursively following the {base type
                definition} property from the reference type definition, and
                all the derivation methods involved are restriction.           DERIVATION_UNION
                If the document's schema is an XML Schema [XML Schema Part 1],
                this constant represents the union if simple types are
                involved.
                
                 The reference type definition is derived by union from the
                other type definition if there exists two type definitions T1
                and T2 such as the reference type definition is derived from
                T1 by DERIVATION_RESTRICTION or DERIVATION_EXTENSION, T2 is
                derived from the other type definition by
                DERIVATION_RESTRICTION, T1 has {variety} union, and one of the
                {member type definitions} is T2. Note that T1 could be the
                same as the reference type definition, and T2 could be the
                same as the other type definition.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Attributes

        typeName of type DOMString, readonly
            The name of a type declared for the associated element or
            attribute, or null if unknown.
        typeNamespace of type DOMString, readonly
            The namespace of the type declared for the associated element or
            attribute or null if the element does not have declaration or if
            no namespace information is available.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Methods

        isDerivedFrom
            This method returns if there is a derivation between the reference
            type definition, i.e. the TypeInfo on which the method is being
            called, and the other type definition, i.e. the one passed as
            parameters.
            Parameters

            typeNamespaceArg of type DOMString
                the namespace of the other type definition.
            typeNameArg of type DOMString
                the name of the other type definition.
            derivationMethod of type unsigned long
                the type of derivation and conditions applied between two
                types, as described in the list of constants provided in this
                interface.

            Return Value

            boolean
            	
            If the document's schema is a DTD or no schema is associated with
            the document, this method will always return false.
            
             If the document's schema is an XML Schema, the method will true
            if the reference type definition is derived from the other type
            definition according to the derivation parameter. If the value of
            the parameter is 0 (no bit is set to 1 for the derivationMethod
            parameter), the method will return true if the other type
            definition can be reached by recursing any combination of {base
            type definition}, {item type definition}, or {member type
            definitions} from the reference type definition.

            No Exceptions
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface UserDataHandler (introduced in DOM Level 3)

    When associating an object to a key on a node using Node.setUserData() the
    application can provide a handler that gets called when the node the
    object is associated to is being cloned, imported, or renamed. This can be
    used by the application to implement various behaviors regarding the data
    it associates to the DOM nodes. This interface defines that handler.


    IDL Definition

        // Introduced in DOM Level 3:
        interface UserDataHandler {

          // OperationType
          const unsigned short      NODE_CLONED                    = 1;
          const unsigned short      NODE_IMPORTED                  = 2;
          const unsigned short      NODE_DELETED                   = 3;
          const unsigned short      NODE_RENAMED                   = 4;
          const unsigned short      NODE_ADOPTED                   = 5;

          void               handle(in unsigned short operation, 
                                    in DOMString key, 
                                    in DOMUserData data, 
                                    in Node src, 
                                    in Node dst);
        };
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************



    Definition group OperationType

        An integer indicating the type of operation being performed on a node.

        Defined Constants

            NODE_ADOPTED
                The node is adopted, using Document.adoptNode().
            NODE_CLONED
                The node is cloned, using Node.cloneNode().
            NODE_DELETED
                The node is deleted.

                Note: This may not be supported or may not be reliable in
                certain environments, such as Java, where the implementation
                has no real control over when objects are actually deleted.
            NODE_IMPORTED
                The node is imported, using Document.importNode().
            NODE_RENAMED
                The node is renamed, using Document.renameNode().
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Methods

        handle
            This method is called whenever the node for which this handler is
            registered is imported or cloned.
            
             DOM applications must not raise exceptions in a UserDataHandler.
            The effect of throwing exceptions from the handler is DOM
            implementation dependent.

            Parameters

            operation of type unsigned short
                Specifies the type of operation that is being performed on the
                node.
            key of type DOMString
                Specifies the key for which this handler is being called.
            data of type DOMUserData
                Specifies the data for which this handler is being called.
            src of type Node
                Specifies the node being cloned, adopted, imported, or
                renamed. This is null when the node is being deleted.
            dst of type Node
                Specifies the node newly created if any, or null.

            No Return Value
            No Exceptions
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface DOMError (introduced in DOM Level 3)

    DOMError is an interface that describes an error.


    IDL Definition

        // Introduced in DOM Level 3:
        interface DOMError {

          // ErrorSeverity
          const unsigned short      SEVERITY_WARNING               = 1;
          const unsigned short      SEVERITY_ERROR                 = 2;
          const unsigned short      SEVERITY_FATAL_ERROR           = 3;

          readonly attribute unsigned short  severity;
          readonly attribute DOMString       message;
          readonly attribute DOMString       type;
          readonly attribute DOMObject       relatedException;
          readonly attribute DOMObject       relatedData;
          readonly attribute DOMLocator      location;
        };  
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


    Definition group ErrorSeverity

        An integer indicating the severity of the error.

        Defined Constants

            SEVERITY_ERROR
                The severity of the error described by the DOMError is error.
                A SEVERITY_ERROR may not cause the processing to stop if the
                error can be recovered, unless DOMErrorHandler.handleError()
                returns false.
            SEVERITY_FATAL_ERROR
                The severity of the error described by the DOMError is fatal
                error. A SEVERITY_FATAL_ERROR will cause the normal processing
                to stop. The return value of DOMErrorHandler.handleError() is
                ignored unless the implementation chooses to continue, in
                which case the behavior becomes undefined.
            SEVERITY_WARNING
                The severity of the error described by the DOMError is
                warning. A SEVERITY_WARNING will not cause the processing to
                stop, unless DOMErrorHandler.handleError() returns false.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Attributes

        location of type DOMLocator, readonly
            The location of the error.
        message of type DOMString, readonly
            An implementation specific string describing the error that
            occurred.
        relatedData of type DOMObject, readonly
            The related DOMError.type dependent data if any.
        relatedException of type DOMObject, readonly
            The related platform dependent exception if any.
        severity of type unsigned short, readonly
            The severity of the error, either SEVERITY_WARNING,
            SEVERITY_ERROR, or SEVERITY_FATAL_ERROR.
        type of type DOMString, readonly
            A DOMString indicating which related data is expected in
            relatedData. Users should refer to the specification of the error
            in order to find its DOMString type and relatedData definitions if
            any.
            
            Note: As an example, Document.normalizeDocument() does generate
            warnings when the "split-cdata-sections" parameter is in use.
            Therefore, the method generates a SEVERITY_WARNING with type
            "cdata-sections-splitted" and the first CDATASection node in
            document order resulting from the split is returned by the
            relatedData attribute.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface DOMErrorHandler (introduced in DOM Level 3)

    DOMErrorHandler is a callback interface that the DOM implementation can
    call when reporting errors that happens while processing XML data, or when
    doing some other processing (e.g. validating a document). A
    DOMErrorHandler object can be attached to a Document using the
    "error-handler" on the DOMConfiguration interface. If more than one error
    needs to be reported during an operation, the sequence and numbers of the
    errors passed to the error handler are implementation dependent.
    
    The application that is using the DOM implementation is expected to
    implement this interface.


    IDL Definition

        // Introduced in DOM Level 3:
        interface DOMErrorHandler {
          boolean            handleError(in DOMError error);
        };  
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


    Methods

        handleError
            This method is called on the error handler when an error occurs.

            If an exception is thrown from this method, it is considered to be
            equivalent of returning true.

            Parameters

            error of type DOMError
                The error object that describes the error. This object may be
                reused by the DOM implementation across multiple calls to the
                handleError method.

            Return Value

            boolean
            	
            If the handleError method returns false, the DOM implementation
            should stop the current processing when possible. If the method
            returns true, the processing may continue depending on
            DOMError.severity.

            No Exceptions
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface DOMLocator (introduced in DOM Level 3)

    DOMLocator is an interface that describes a location (e.g. where an error
    occurred).


    IDL Definition

        // Introduced in DOM Level 3:
        interface DOMLocator {
          readonly attribute long            lineNumber;
          readonly attribute long            columnNumber;
          readonly attribute long            byteOffset;
          readonly attribute long            utf16Offset;
          readonly attribute Node            relatedNode;
          readonly attribute DOMString       uri;
        };  
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


    Attributes

        byteOffset of type long, readonly
            The byte offset into the input source this locator is pointing to
            or -1 if there is no byte offset available.
        columnNumber of type long, readonly
            The column number this locator is pointing to, or -1 if there is
            no column number available.
        lineNumber of type long, readonly
            The line number this locator is pointing to, or -1 if there is no
            column number available.
        relatedNode of type Node, readonly
            The node this locator is pointing to, or null if no node is
            available.
        uri of type DOMString, readonly
            The URI this locator is pointing to, or null if no URI is
            available.
        utf16Offset of type long, readonly
            The UTF-16, as defined in [Unicode] and Amendment 1 of [ISO/IEC
            10646], offset into the input source this locator is pointing to
            or -1 if there is no UTF-16 offset available.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface DOMConfiguration (introduced in DOM Level 3)

    The DOMConfiguration interface represents the configuration of a document
    and maintains a table of recognized parameters. Using the configuration,
    it is possible to change Document.normalizeDocument() behavior, such as
    replacing the CDATASection nodes with Text nodes or specifying the type of
    the schema that must be used when the validation of the Document is
    requested. DOMConfiguration objects are also used in [DOM Level 3 Load and
    Save] in the DOMParser and DOMSerializer interfaces.
    
     The parameter names used by the DOMConfiguration object are defined
    throughout the DOM Level 3 specifications. Names are case-insensitive. To
    avoid possible conflicts, as a convention, names referring to parameters
    defined outside the DOM specification should be made unique. Because
    parameters are exposed as properties in the ECMAScript Language Binding,
    names are recommended to follow the section "5.16 Identifiers" of
    [Unicode] with the addition of the character '-' (HYPHEN-MINUS) but it is
    not enforced by the DOM implementation. DOM Level 3 Core Implementations
    are required to recognize all parameters defined in this specification.
    Some parameter values may also be required to be supported by the
    implementation. Refer to the definition of the parameter to know if a
    value must be supported or not.
    
     Note: Parameters are similar to features and properties used in SAX2
    [SAX].
    
     The following list of parameters defined in the DOM:

    "canonical-form"

        true
            [optional]
            Canonicalize the document according to the rules specified in
            [Canonical XML], such as removing the DocumentType node (if any)
            from the tree, or removing superfluous namespace declarations from
            each element. Note that this is limited to what can be represented
            in the DOM; in particular, there is no way to specify the order of
            the attributes in the DOM. In addition,
            
             Setting this parameter to true will also set the state of the
            parameters listed below. Later changes to the state of one of
            those parameters will revert "canonical-form" back to false.
            
             Parameters set to false: "entities", "normalize-characters",
            "cdata-sections".
            
             Parameters set to true: "namespaces", "namespace-declarations",
            "well-formed", "element-content-whitespace".
            
             Other parameters are not changed unless explicitly specified in
            the description of the parameters.       
        false    
            [required] (default)
            Do not canonicalize the document.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "cdata-sections"

        true
            [required] (default)
            Keep CDATASection nodes in the document.
        false
            [required]
            Transform CDATASection nodes in the document into Text nodes. The
            new Text node is then combined with any adjacent Text node.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "check-character-normalization"

        true
            [optional]
            Check if the characters in the document are fully normalized, as
            defined in appendix B of [XML 1.1]. When a sequence of characters
            is encountered that fails normalization checking, an error with
            the DOMError.type equals to
            "check-character-normalization-failure" is issued.
        false
            [required] (default)
            Do not check if characters are normalized.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "comments"

        true
            [required] (default)
            Keep Comment nodes in the document.
        false
            [required]
            Discard Comment nodes in the document.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "datatype-normalization"

        true
            [optional]
            Expose schema normalized values in the tree, such as XML Schema
            normalized values in the case of XML Schema. Since this parameter
            requires to have schema information, the "validate" parameter will
            also be set to true. Having this parameter activated when
            "validate" is false has no effect and no schema-normalization will
            happen.
            
             Note: Since the document contains the result of the XML 1.0
            processing, this parameter does not apply to attribute value
            normalization as defined in section 3.3.3 of [XML 1.0] and is only
            meant for schema languages other than Document Type Definition
            (DTD).
        false
            [required] (default)
            Do not perform schema normalization on the tree. 
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "element-content-whitespace"

        true
            [required] (default)
            Keep all whitespaces in the document.
        false
            [optional]
            Discard all Text nodes that contain whitespaces in element
            content, as described in [element content whitespace]. The
            implementation is expected to use the attribute
            Text.isElementContentWhitespace to determine if a Text node should
            be discarded or not.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "entities"

        true
            [required] (default)
            Keep EntityReference nodes in the document.
        false
            [required]
            Remove all EntityReference nodes from the document, putting the
            entity expansions directly in their place. Text nodes are
            normalized, as defined in Node.normalize. Only unexpanded entity
            references are kept in the document.

        Note: This parameter does not affect Entity nodes.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "error-handler"
        [required]
        Contains a DOMErrorHandler object. If an error is encountered in the
        document, the implementation will call back the DOMErrorHandler
        registered using this parameter. The implementation may provide a
        default DOMErrorHandler object.
        
         When called, DOMError.relatedData will contain the closest node to
        where the error occurred. If the implementation is unable to determine
        the node where the error occurs, DOMError.relatedData will contain the
        Document node. Mutations to the document from within an error handler
        will result in implementation dependent behavior.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "infoset"

        true
            [required]
            Keep in the document the information defined in the XML
            Information Set [XML Information Set].
            
             This forces the following parameters to false:
            "validate-if-schema", "entities", "datatype-normalization",
            "cdata-sections".
            
             This forces the following parameters to true:
            "namespace-declarations", "well-formed",
            "element-content-whitespace", "comments", "namespaces".
            
             Other parameters are not changed unless explicitly specified in
            the description of the parameters.
            
             Note that querying this parameter with getParameter returns true
            only if the individual parameters specified above are
            appropriately set.
        false
            Setting infoset to false has no effect.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "namespaces"

        true
            [required] (default)
            Perform the namespace processing as defined in Namespace
            Normalization.
        false
            [optional]
            Do not perform the namespace processing. 
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "namespace-declarations"
        This parameter has no effect if the parameter "namespaces" is set to
        false.

        true
            [required] (default)
            Include namespace declaration attributes, specified or defaulted
            from the schema, in the document. See also the sections "Declaring
            Namespaces" in [XML Namespaces] and [XML Namespaces 1.1].
        false
            [required]
            Discard all namespace declaration attributes. The namespace
            prefixes (Node.prefix) are retained even if this parameter is set
            to false.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "normalize-characters"

        true
            [optional]
            Fully normalized the characters in the document as defined in
            appendix B of [XML 1.1].
        false
            [required] (default)
            Do not perform character normalization.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "schema-location"
        [optional]
        Represent a DOMString object containing a list of URIs, separated by
        whitespaces (characters matching the nonterminal production S defined
        in section 2.3 [XML 1.0]), that represents the schemas against which
        validation should occur, i.e. the current schema. The types of schemas
        referenced in this list must match the type specified with
        schema-type, otherwise the behavior of an implementation is undefined.
        
         The schemas specified using this property take precedence to the
        schema information specified in the document itself. For namespace
        aware schema, if a schema specified using this property and a schema
        specified in the document instance (i.e. using the schemaLocation
        attribute) in a schema document (i.e. using schema import mechanisms)
        share the same targetNamespace, the schema specified by the user using
        this property will be used. If two schemas specified using this
        property share the same targetNamespace or have no namespace, the
        behavior is implementation dependent.
        
         If no location has been provided, this parameter is null.
        
         Note: The "schema-location" parameter is ignored unless the
        "schema-type" parameter value is set. It is strongly recommended that
        Document.documentURI will be set so that an implementation can
        successfully resolve any external entities referenced.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "schema-type"
        [optional]
        Represent a DOMString object containing an absolute URI and
        representing the type of the schema language used to validate a
        document against. Note that no lexical checking is done on the
        absolute URI.
        
         If this parameter is not set, a default value may be provided by the
        implementation, based on the schema languages supported and on the
        schema language used at load time. If no value is provided, this
        parameter is null.
        
         Note: For XML Schema [XML Schema Part 1], applications must use the
        value "http://www.w3.org/2001/XMLSchema". For XML DTD [XML 1.0],
        applications must use the value "http://www.w3.org/TR/REC-xml". Other
        schema languages are outside the scope of the W3C and therefore should
        recommend an absolute URI in order to use this method.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "split-cdata-sections"

        true
            [required] (default)
            Split CDATA sections containing the CDATA section termination
            marker ']]>'. When a CDATA section is split a warning is issued
            with a DOMError.type equals to "cdata-sections-splitted" and
            DOMError.relatedData equals to the first CDATASection node in
            document order resulting from the split.
        false
            [required]
            Signal an error if a CDATASection contains an unrepresentable
            character.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "validate"

        true
            [optional]
            Require the validation against a schema (i.e. XML schema, DTD, any
            other type or representation of schema) of the document as it is
            being normalized as defined by [XML 1.0]. If validation errors are
            found, or no schema was found, the error handler is notified.
            Schema-normalized values will not be exposed according to the
            schema in used unless the parameter "datatype-normalization" is
            true.
            This parameter will reevaluate:

                * Attribute nodes with Attr.specified equals to false, as
                  specified in the description of the Attr interface;
                * The value of the attribute Text.isElementContentWhitespace
                  for all Text nodes;
                * The value of the attribute Attr.isId for all Attr nodes;
                * The attributes Element.schemaTypeInfo and
                  Attr.schemaTypeInfo.

            Note: "validate-if-schema" and "validate" are mutually exclusive,
            setting one of them to true will set the other one to false.
            Applications should also consider setting the parameter
            "well-formed" to true, which is the default for that option, when
            validating the document.
        false
            [required] (default)
            Do not accomplish schema processing, including the internal subset
            processing. Default attribute values information are kept. Note
            that validation might still happen if "validate-if-schema" is
            true.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "validate-if-schema"

        true
            [optional]
            Enable validation only if a declaration for the document element
            can be found in a schema (independently of where it is found, i.e.
            XML schema, DTD, or any other type or representation of schema).
            If validation is enabled, this parameter has the same behavior as
            the parameter "validate" set to true.
            
             Note: "validate-if-schema" and "validate" are mutually exclusive,
            setting one of them to true will set the other one to false.
        false
            [required] (default)
            No schema processing should be performed if the document has a
            schema, including internal subset processing. Default attribute
            values information are kept. Note that validation must still
            happen if "validate" is true.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    "well-formed"

        true
            [required] (default)
            Check if all nodes are XML well formed according to the XML
            version in use in Document.xmlVersion:

                * check if the attribute Node.nodeName contains invalid
                  characters according to its node type and generate a
                  DOMError of type "wf-invalid-character-in-node-name", with a
                  DOMError.SEVERITY_ERROR severity, if necessary;
                * check if the text content inside Attr, Element, Comment,
                  Text, CDATASection nodes for invalid characters and generate
                  a DOMError of type "wf-invalid-character", with a
                  DOMError.SEVERITY_ERROR severity, if necessary;
                * check if the data inside ProcessingInstruction nodes for
                  invalid characters and generate a DOMError of type
                  "wf-invalid-character", with a DOMError.SEVERITY_ERROR
                  severity, if necessary;

        false
            [optional]
            Do not check for XML well-formedness. 
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    The resolution of the system identifiers associated with entities is done
    using Document.documentURI. However, when the feature "LS" defined in [DOM
    Level 3 Load and Save] is supported by the DOM implementation, the
    parameter "resource-resolver" can also be used on DOMConfiguration objects
    attached to Document nodes. If this parameter is set,
    Document.normalizeDocument() will invoke the resource resolver instead of
    using Document.documentURI.


    IDL Definition

        // Introduced in DOM Level 3:
        interface DOMConfiguration {
          void               setParameter(in DOMString name, 
                                          in DOMUserData value)
                                                raises(DOMException);
          DOMUserData        getParameter(in DOMString name)
                                                raises(DOMException);
          boolean            canSetParameter(in DOMString name, 
                                             in DOMUserData value);
          readonly attribute DOMStringList   parameterNames;
        };  
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


    Attributes

        parameterNames of type DOMStringList, readonly
            The list of the parameters supported by this DOMConfiguration
            object and for which at least one value can be set by the
            application. Note that this list can also contain parameter names
            defined outside this specification.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Methods

        canSetParameter
            Check if setting a parameter to a specific value is supported.
            Parameters

            name of type DOMString
                The name of the parameter to check.
            value of type DOMUserData
                An object. if null, the returned value is true.

            Return Value

            boolean
            	
            true if the parameter could be successfully set to the specified
            value, or false if the parameter is not recognized or the
            requested value is not supported. This does not change the current
            value of the parameter itself.

            No Exceptions
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        getParameter
            Return the value of a parameter if known.
            Parameters

            name of type DOMString
                The name of the parameter.

            Return Value

            DOMUserData
            	
            The current object associated with the specified parameter or null
            if no object has been associated or if the parameter is not
            supported.

            Exceptions

            DOMException
            	
            NOT_FOUND_ERR: Raised when the parameter name is not recognized.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
        setParameter
            Set the value of a parameter.
            Parameters

            name of type DOMString
                The name of the parameter to set.
            value of type DOMUserData
                The new value or null if the user wishes to unset the
                parameter. While the type of the value parameter is defined as
                DOMUserData, the object type must match the type defined by
                the definition of the parameter. For example, if the parameter
                is "error-handler", the value must be of type DOMErrorHandler.

            Exceptions

            DOMException
            	

            NOT_FOUND_ERR: Raised when the parameter name is not recognized.
            
            NOT_SUPPORTED_ERR: Raised when the parameter name is recognized
            but the requested value cannot be set.
            
            TYPE_MISMATCH_ERR: Raised if the value type for this parameter
            name is incompatible with the expected value type.

            No Return Value
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

1.5 Extended Interfaces: XML Module

The interfaces defined here form part of the DOM Core specification, but
objects that expose these interfaces will never be encountered in a DOM
implementation that deals only with HTML.

The interfaces found within this section are not mandatory. A DOM application
may use the DOMImplementation.hasFeature(feature, version) method with
parameter values "XML" and "3.0" (respectively) to determine whether or not
this module is supported by the implementation. In order to fully support this
module, an implementation must also support the "Core" feature defined in
Fundamental Interfaces: Core Module and the feature "XMLVersion" with version
"1.0" defined in Document.xmlVersion. Please refer to additional information
about Conformance in this specification. The DOM Level 3 XML module is
backward compatible with the DOM Level 2 XML [DOM Level 2 Core] and DOM Level
1 XML [DOM Level 1] modules, i.e. a DOM Level 3 XML implementation who returns
true for "XML" with the version number "3.0" must also return true for this
feature when the version number is "2.0", "1.0", "" or, null.

Interface CDATASection

    CDATA sections are used to escape blocks of text containing characters
    that would otherwise be regarded as markup. The only delimiter that is
    recognized in a CDATA section is the "]]>" string that ends the CDATA
    section. CDATA sections cannot be nested. Their primary purpose is for
    including material such as XML fragments, without needing to escape all
    the delimiters.
    
     The CharacterData.data attribute holds the text that is contained by the
    CDATA section. Note that this may contain characters that need to be
    escaped outside of CDATA sections and that, depending on the character
    encoding ("charset") chosen for serialization, it may be impossible to
    write out some characters as part of a CDATA section.
    
     The CDATASection interface inherits from the CharacterData interface
    through the Text interface. Adjacent CDATASection nodes are not merged by
    use of the normalize method of the Node interface.
    
     No lexical check is done on the content of a CDATA section and it is
    therefore possible to have the character sequence "]]>" in the content,
    which is illegal in a CDATA section per section 2.7 of [XML 1.0]. The
    presence of this character sequence must generate a fatal error during
    serialization or the cdata section must be splitted before the
    serialization (see also the parameter "split-cdata-sections" in the
    DOMConfiguration interface).
    
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
test('TODO:', function(){

});
/******************************************************************************


Interface DocumentType

    Each Document has a doctype attribute whose value is either null or a
    DocumentType object. The DocumentType interface in the DOM Core provides
    an interface to the list of entities that are defined for the document,
    and little else because the effect of namespaces and the various XML
    schema efforts on DTD representation are not clearly understood as of this
    writing.
    
     DOM Level 3 doesn't support editing DocumentType nodes. DocumentType
    nodes are read-only.


    IDL Definition

        interface DocumentType : Node {
          readonly attribute DOMString       name;
          readonly attribute NamedNodeMap    entities;
          readonly attribute NamedNodeMap    notations;
          // Introduced in DOM Level 2:
          readonly attribute DOMString       publicId;
          // Introduced in DOM Level 2:
          readonly attribute DOMString       systemId;
          // Introduced in DOM Level 2:
          readonly attribute DOMString       internalSubset;
        };


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
            The internal subset as a string, or null if there is none. This is
            does not contain the delimiting square brackets.

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
            The system identifier of the external subset. This may be an
            absolute URI or not.
            
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface Notation

    This interface represents a notation declared in the DTD. A notation
    either declares, by name, the format of an unparsed entity (see section
    4.7 of the XML 1.0 specification [XML 1.0]), or is used for formal
    declaration of processing instruction targets (see section 2.6 of the XML
    1.0 specification [XML 1.0]). The nodeName attribute inherited from Node
    is set to the declared name of the notation.
    
     The DOM Core does not support editing Notation nodes; they are therefore
    readonly.

    A Notation node does not have any parent.


    IDL Definition

        interface Notation : Node {
          readonly attribute DOMString       publicId;
          readonly attribute DOMString       systemId;
        };  
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


    Attributes

        publicId of type DOMString, readonly
            The public identifier of this notation. If the public identifier
            was not specified, this is null.
        systemId of type DOMString, readonly
            The system identifier of this notation. If the system identifier
            was not specified, this is null. This may be an absolute URI or
            not.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface Entity

    This interface represents a known entity, either parsed or unparsed, in an
    XML document. Note that this models the entity itself not the entity
    declaration.
    
     The nodeName attribute that is inherited from Node contains the name of
    the entity.
    
     An XML processor may choose to completely expand entities before the
    structure model is passed to the DOM; in this case there will be no
    EntityReference nodes in the document tree.
    
     XML does not mandate that a non-validating XML processor read and process
    entity declarations made in the external subset or declared in parameter
    entities. This means that parsed entities declared in the external subset
    need not be expanded by some classes of applications, and that the
    replacement text of the entity may not be available. When the replacement
    text is available, the corresponding Entity node's child list represents
    the structure of that replacement value. Otherwise, the child list is
    empty.
    
     DOM Level 3 does not support editing Entity nodes; if a user wants to
    make changes to the contents of an Entity, every related EntityReference
    node has to be replaced in the structure model by a clone of the Entity's
    contents, and then the desired changes must be made to each of those
    clones instead. Entity nodes and all their descendants are readonly.
    
     An Entity node does not have any parent.
    
     Note: If the entity contains an unbound namespace prefix, the
    namespaceURI of the corresponding node in the Entity node subtree is null.
    The same is true for EntityReference nodes that refer to this entity, when
    they are created using the createEntityReference method of the Document
    interface.


    IDL Definition

        interface Entity : Node {
          readonly attribute DOMString       publicId;
          readonly attribute DOMString       systemId;
          readonly attribute DOMString       notationName;
          // Introduced in DOM Level 3:
          readonly attribute DOMString       inputEncoding;
          // Introduced in DOM Level 3:
          readonly attribute DOMString       xmlEncoding;
          // Introduced in DOM Level 3:
          readonly attribute DOMString       xmlVersion;
        };  
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


    Attributes

        inputEncoding of type DOMString, readonly, introduced in DOM Level 3
            An attribute specifying the encoding used for this entity at the
            time of parsing, when it is an external parsed entity. This is
            null if it an entity from the internal subset or if it is not
            known.
        notationName of type DOMString, readonly
            For unparsed entities, the name of the notation for the entity.
            For parsed entities, this is null.
        publicId of type DOMString, readonly
            The public identifier associated with the entity if specified, and
            null otherwise.
        systemId of type DOMString, readonly
            The system identifier associated with the entity if specified, and
            null otherwise. This may be an absolute URI or not.
        xmlEncoding of type DOMString, readonly, introduced in DOM Level 3
            An attribute specifying, as part of the text declaration, the
            encoding of this entity, when it is an external parsed entity.
            This is null otherwise.
        xmlVersion of type DOMString, readonly, introduced in DOM Level 3
            An attribute specifying, as part of the text declaration, the
            version number of this entity, when it is an external parsed
            entity. This is null otherwise.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

Interface EntityReference

    EntityReference nodes may be used to represent an entity reference in the
    tree. Note that character references and references to predefined entities
    are considered to be expanded by the HTML or XML processor so that
    characters are represented by their Unicode equivalent rather than by an
    entity reference. Moreover, the XML processor may completely expand
    references to entities while building the Document, instead of providing
    EntityReference nodes. If it does provide such nodes, then for an
    EntityReference node that represents a reference to a known entity an
    Entity exists, and the subtree of the EntityReference node is a copy of
    the Entity node subtree. However, the latter may not be true when an
    entity contains an unbound namespace prefix. In such a case, because the
    namespace prefix resolution depends on where the entity reference is, the
    descendants of the EntityReference node may be bound to different
    namespace URIs. When an EntityReference node represents a reference to an
    unknown entity, the node has no children and its replacement value, when
    used by Attr.value for example, is empty.
    
     As for Entity nodes, EntityReference nodes and all their descendants are
    readonly.
    
     Note: EntityReference nodes may cause element content and attribute value
    normalization problems when, such as in XML 1.0 and XML Schema, the
    normalization is performed after entity reference are expanded.


    IDL Definition

        interface EntityReference : Node {
        };
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************


Interface ProcessingInstruction

    The ProcessingInstruction interface represents a "processing instruction",
    used in XML as a way to keep processor-specific information in the text of
    the document.
    
     No lexical check is done on the content of a processing instruction and
    it is therefore possible to have the character sequence "?>" in the
    content, which is illegal a processing instruction per section 2.6 of [XML
    1.0]. The presence of this character sequence must generate a fatal error
    during serialization.


    IDL Definition

        interface ProcessingInstruction : Node {
          readonly attribute DOMString       target;
                   attribute DOMString       data;
                                            // raises(DOMException) on setting

        };
******************************************************************************/
test('TODO:', function(){

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
test('TODO:', function(){

});
/******************************************************************************


******************************************************************************/
