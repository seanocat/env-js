QUnit.module('DOM StyleSheet Level 2')
/******************************************************************************

13 November, 2000
1. Document Object Model Style Sheets

Editors
    Chris Wilson, Microsoft Corp.
    Philippe Le Hégaret, W3C
    Vidur Apparao, Netscape Communications Corp.

Table of contents

    * 1.1. Introduction
    * 1.2. Style Sheet Interfaces
          o StyleSheet, StyleSheetList, MediaList
    * 1.3. Document Extensions
          o LinkStyle, DocumentStyle
    * 1.4. Association between a style sheet and a document.

1.1. Introduction

The DOM Level 2 Style Sheet interfaces are base interfaces used to represent
any type of style sheet. The expectation is that DOM modules that represent a
specific style sheet language may contain interfaces that derive from these
interfaces.

The interfaces found within this section are not mandatory. A DOM application
may use the hasFeature(feature, version) method of the DOMImplementation
interface with parameter values "StyleSheets" and "2.0" (respectively) to
determine whether or not this module is supported by the implementation. In
order to fully support this module, an implementation must also support the
"Core" feature defined defined in the DOM 2 Core specification [DOM Level 2
Core]. Please refer to additional information about conformance in the DOM
Level 2 Core specification [DOM Level 2 Core].
******************************************************************************/
/******************************************************************************

1.2. Style Sheet Interfaces

This set of interfaces represents the generic notion of style sheets.

Interface StyleSheet (introduced in DOM Level 2)

    The StyleSheet interface is the abstract base interface for any type of
    style sheet. It represents a single style sheet associated with a
    structured document. In HTML, the StyleSheet interface represents either an
    external style sheet, included via the HTML LINK element, or an inline
    STYLE element. In XML, this interface represents an external style sheet,
    included via a style sheet processing instruction.


    IDL Definition

        // Introduced in DOM Level 2:
        interface StyleSheet {
          readonly attribute DOMString        type;
                   attribute boolean          disabled;
          readonly attribute Node             ownerNode;
          readonly attribute StyleSheet       parentStyleSheet;
          readonly attribute DOMString        href;
          readonly attribute DOMString        title;
          readonly attribute MediaList        media;
        };
******************************************************************************/
/******************************************************************************


    Attributes

        disabled of type boolean
            false if the style sheet is applied to the document. true if it is
            not. Modifying this attribute may cause a new resolution of style
            for the document. A stylesheet only applies if both an appropriate
            medium definition is present and the disabled attribute is false.
            So, if the media doesn't apply to the current user agent, the
            disabled attribute is ignored.
******************************************************************************/
/******************************************************************************
        href of type DOMString, readonly
            If the style sheet is a linked style sheet, the value of its
            attribute is its location. For inline style sheets, the value of
            this attribute is null. See the href attribute definition for the
            LINK element in HTML 4.0, and the href pseudo-attribute for the XML
            style sheet processing instruction.
******************************************************************************/
/******************************************************************************
        media of type MediaList, readonly
            The intended destination media for style information. The media is
            often specified in the ownerNode. If no media has been specified,
            the MediaList will be empty. See the media attribute definition for
            the LINK element in HTML 4.0, and the media pseudo-attribute for
            the XML style sheet processing instruction . Modifying the media
            list may cause a change to the attribute disabled.
******************************************************************************/
/******************************************************************************
        ownerNode of type Node, readonly
            The node that associates this style sheet with the document. For
            HTML, this may be the corresponding LINK or STYLE element. For XML,
            it may be the linking processing instruction. For style sheets that
            are included by other style sheets, the value of this attribute is
            null.
******************************************************************************/
/******************************************************************************
        parentStyleSheet of type StyleSheet, readonly
            For style sheet languages that support the concept of style sheet
            inclusion, this attribute represents the including style sheet, if
            one exists. If the style sheet is a top-level style sheet, or the
            style sheet language does not support inclusion, the value of this
            attribute is null.       
******************************************************************************/
/******************************************************************************
        title of type DOMString, readonly
            The advisory title. The title is often specified in the ownerNode.
            See the title attribute definition for the LINK element in HTML
            4.0, and the title pseudo-attribute for the XML style sheet
            processing instruction.
******************************************************************************/
/******************************************************************************
        type of type DOMString, readonly
            This specifies the style sheet language for this style sheet. The
            style sheet language is specified as a content type (e.g.
            "text/css"). The content type is often specified in the ownerNode.
            Also see the type attribute definition for the LINK element in HTML
            4.0, and the type pseudo-attribute for the XML style sheet
            processing instruction.
******************************************************************************/
/******************************************************************************

Interface StyleSheetList (introduced in DOM Level 2)

    The StyleSheetList interface provides the abstraction of an ordered
    collection of style sheets.
    
    The items in the StyleSheetList are accessible via an integral index,
    starting from 0.


    IDL Definition

        // Introduced in DOM Level 2:
        interface StyleSheetList {
          readonly attribute unsigned long    length;
          StyleSheet         item(in unsigned long index);
        };
******************************************************************************/
/******************************************************************************


    Attributes

        length of type unsigned long, readonly
            The number of StyleSheets in the list. The range of valid child
            stylesheet indices is 0 to length-1 inclusive.
******************************************************************************/
/******************************************************************************

    Methods

        item
            Used to retrieve a style sheet by ordinal index. If index is
            greater than or equal to the number of style sheets in the list,
            this returns null.
            
            Parameters

            index of type unsigned long
                Index into the collection

            Return Value

            StyleSheet

            The style sheet at the index position in the StyleSheetList, or
            null if that is not a valid index.
            
            No Exceptions
******************************************************************************/
/******************************************************************************

Interface MediaList (introduced in DOM Level 2)

    The MediaList interface provides the abstraction of an ordered collection
    of media, without defining or constraining how this collection is
    implemented. An empty list is the same as a list that contains the medium
    "all".
    
    The items in the MediaList are accessible via an integral index, starting
    from 0.


    IDL Definition

        // Introduced in DOM Level 2:
        interface MediaList {
                   attribute DOMString        mediaText;
                                        // raises(DOMException) on setting

          readonly attribute unsigned long    length;
          DOMString          item(in unsigned long index);
          void               deleteMedium(in DOMString oldMedium)
                                                raises(DOMException);
          void               appendMedium(in DOMString newMedium)
                                                raises(DOMException);
        };
******************************************************************************/
/******************************************************************************


    Attributes

        length of type unsigned long, readonly
            The number of media in the list. The range of valid media is 0 to
            length-1 inclusive.
******************************************************************************/
/******************************************************************************
        mediaText of type DOMString
            The parsable textual representation of the media list. This is a
            comma-separated list of media.
            
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the specified string value has a syntax error
            and is unparsable.
            
            NO_MODIFICATION_ALLOWED_ERR: Raised if this media list is
            readonly.
******************************************************************************/
/******************************************************************************

    Methods

        appendMedium
            Adds the medium newMedium to the end of the list. If the newMedium
            is already used, it is first removed.
            
            Parameters

            newMedium of type DOMString
                The new medium to add.

            Exceptions

            DOMException

            INVALID_CHARACTER_ERR: If the medium contains characters that are
            invalid in the underlying style language.
            
            NO_MODIFICATION_ALLOWED_ERR: Raised if this list is readonly.
            
            No Return Value
******************************************************************************/
/******************************************************************************
            
        deleteMedium
            Deletes the medium indicated by oldMedium from the list.
            Parameters

            oldMedium of type DOMString
                The medium to delete in the media list.

            Exceptions

            DOMException

            NO_MODIFICATION_ALLOWED_ERR: Raised if this list is readonly.

            NOT_FOUND_ERR: Raised if oldMedium is not in the list.

            No Return Value
******************************************************************************/
/******************************************************************************

        item
            Returns the indexth in the list. If index is greater than or equal
            to the number of media in the list, this returns null.
            
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            DOMString

            The medium at the indexth position in the MediaList, or null if
            that is not a valid index.

            No Exceptions
******************************************************************************/
/******************************************************************************

1.3. Document Extensions

Interface LinkStyle (introduced in DOM Level 2)

    The LinkStyle interface provides a mechanism by which a style sheet can be
    retrieved from the node responsible for linking it into a document. An
    instance of the LinkStyle interface can be obtained using binding-specific
    casting methods on an instance of a linking node (HTMLLinkElement,
    HTMLStyleElement or ProcessingInstruction in DOM Level 2).

    IDL Definition

        // Introduced in DOM Level 2:
        interface LinkStyle {
          readonly attribute StyleSheet       sheet;
        };
******************************************************************************/
/******************************************************************************

    Attributes

        sheet of type StyleSheet, readonly
            The style sheet.
******************************************************************************/
/******************************************************************************

Interface DocumentStyle (introduced in DOM Level 2)

    The DocumentStyle interface provides a mechanism by which the style sheets
    embedded in a document can be retrieved. The expectation is that an
    instance of the DocumentStyle interface can be obtained by using
    binding-specific casting methods on an instance of the Document interface.


    IDL Definition

        // Introduced in DOM Level 2:
        interface DocumentStyle {
          readonly attribute StyleSheetList   styleSheets;
        };
******************************************************************************/
/******************************************************************************

    Attributes

        styleSheets of type StyleSheetList, readonly
            A list containing all the style sheets explicitly linked into or
            embedded in a document. For HTML documents, this includes external
            style sheets, included via the HTML LINK element, and inline STYLE
            elements. In XML, this includes external style sheets, included via
            style sheet processing instructions (see [XML-StyleSheet]).
******************************************************************************/
/******************************************************************************

1.4. Association between a style sheet and a document.

HTML and Style Sheet Creation
    A style sheet can be associated with an HTMLDocument in one of two ways:

        * By creating a new LINK HTML element (see the HTMLLinkElement
          interface in the [DOM Level 2 HTML] and [HTML4.0]). The underlying
          style sheet will be created after the element is inserted into the
          document and both the href and the type attribute have been set in a
          way indicating that the linked object is a style sheet. 
******************************************************************************/
/******************************************************************************
        * By creating
          a new STYLE HTML element (see the HTMLStyleElement interface in the
          [DOM Level 2 HTML] and [HTML4.0]). The underlying style sheet will be
          created after the element is inserted into the document and the type
          attribute is set in a way indicating that the element corresponds to
          a style sheet language interpreted by the user agent.
******************************************************************************/
/******************************************************************************

HTML and Style Sheet Removal
    Removing a LINK HTML element or a STYLE HTML element removes the underlying
    style sheet from the style sheet collection associated with a document.
    Specifically, the removed style sheet is no longer applied to the
    presentation of the document.
******************************************************************************/
/******************************************************************************
XML and Style Sheet Creation
    A new style sheet can be created and associated with an XML document by
    creating a processing instruction with the target 'xml-stylesheet'
    [XML-StyleSheet] and inserting it into the document.
******************************************************************************/
/******************************************************************************
XML and Style Sheet Removal
    Removing a processing instruction with a target of 'xml-stylesheet'
    [XML-StyleSheet] removes the underlying style sheet from the style sheet
    collection associated with a document. Specifically, the removed style
    sheet is no longer applied to the presentation of the document.

******************************************************************************/
/******************************************************************************

******************************************************************************/