QUnit.module('DOM CSS Level 2');
/******************************************************************************
http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/css.html

13 November, 2000
2. Document Object Model CSS

Editors
    Chris Wilson, Microsoft Corp.
    Philippe Le Hégaret, W3C
    Vidur Apparao, Netscape Communications Corp.

Table of contents

    * 2.1. Overview of the DOM Level 2 CSS Interfaces
    * 2.2. CSS Fundamental Interfaces
          o CSSStyleSheet, CSSRuleList, CSSRule, CSSStyleRule, CSSMediaRule, 
            CSSFontFaceRule, CSSPageRule, CSSImportRule, CSSCharsetRule, 
            CSSUnknownRule, CSSStyleDeclaration, CSSValue, CSSPrimitiveValue, 
            CSSValueList, RGBColor, Rect, Counter
          o 2.2.1. Override and computed style sheet
                + ViewCSS, DocumentCSS
          o 2.2.2. Style sheet creation
                + DOMImplementationCSS
          o 2.2.3. Element with CSS inline style
                + ElementCSSInlineStyle
    * 2.3. CSS2 Extended Interface
          o CSS2Properties

2.1. Overview of the DOM Level 2 CSS Interfaces

The DOM Level 2 Cascading Style Sheets (CSS) interfaces are designed with the goal of exposing CSS constructs to object model consumers. Cascading Style Sheets is a declarative syntax for defining presentation rules, properties and ancillary constructs used to format and render Web documents. This document specifies a mechanism to programmatically access and modify the rich style and presentation control provided by CSS (specifically CSS level 2 [CSS2]). This augments CSS by providing a mechanism to dynamically control the inclusion and exclusion of individual style sheets, as well as manipulate CSS rules and properties.

The CSS interfaces are organized in a logical, rather than physical structure. A collection of all style sheets referenced by or embedded in the document is accessible on the document interface. Each item in this collection exposes the properties common to all style sheets referenced or embedded in HTML and XML documents; this interface is described in the Document Object Model Style Sheets. User style sheets are not accessible through this collection, in part due to potential privacy concerns (and certainly read-write issues).

For each CSS style sheet, an additional interface is exposed - the CSSStyleSheet interface. This interface allows access to the collection of rules within a CSS style sheet and methods to modify that collection. Interfaces are provided for each specific type of rule in CSS2 (e.g. style declarations, @import rules, or @font-face rules), as well as a shared generic CSSRule interface.

The most common type of rule is a style declaration. The CSSStyleRule interface that represents this type of rule provides string access to the CSS selector of the rule, and access to the property declarations through the CSSStyleDeclaration interface.

Finally, an optional CSS2Properties interface is described; this interface (if implemented) provides shortcuts to the string values of all the properties in CSS level 2.

All CSS objects in the DOM are "live", that is, a change in the style sheet is reflected in the computed and actual style.
2.2. CSS Fundamental Interfaces

The interfaces within this section are considered fundamental CSS interfaces, and must be supported by all conforming implementations of the CSS module. These interfaces represent CSS style sheets specifically.

A DOM application may use the hasFeature(feature, version) method of the DOMImplementation interface with parameter values "CSS" and "2.0" (respectively) to determine whether or not this module is supported by the implementation. In order to fully support this module, an implementation must also support the "Core" feature defined defined in the DOM Level 2 Core specification [DOM Level 2 Core] and the "Views" feature defined in the DOM Level 2 Views specification [DOM Level 2 Views]. Please refer to additional information about conformance in the DOM Level 2 Core specification [DOM Level 2 Core].

Interface CSSStyleSheet (introduced in DOM Level 2)

    The CSSStyleSheet interface is a concrete interface used to represent a CSS style sheet i.e., a style sheet whose content type is "text/css".


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSStyleSheet : stylesheets::StyleSheet {
          readonly attribute CSSRule          ownerRule;
          readonly attribute CSSRuleList      cssRules;
          unsigned long      insertRule(in DOMString rule, 
                                        in unsigned long index)
                                                raises(DOMException);
          void               deleteRule(in unsigned long index)
                                                raises(DOMException);
        };


    Attributes

        cssRules of type CSSRuleList, readonly
            The list of all CSS rules contained within the style sheet. This includes both rule sets and at-rules.
        ownerRule of type CSSRule, readonly
            If this style sheet comes from an @import rule, the ownerRule attribute will contain the CSSImportRule. In that case, the ownerNode attribute in the StyleSheet interface will be null. If the style sheet comes from an element or a processing instruction, the ownerRule attribute will be null and the ownerNode attribute will contain the Node.

    Methods

        deleteRule
            Used to delete a rule from the style sheet.
            Parameters

            index of type unsigned long
                The index within the style sheet's rule list of the rule to remove.

            Exceptions

            DOMException
            	

            INDEX_SIZE_ERR: Raised if the specified index does not correspond to a rule in the style sheet's rule list.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this style sheet is readonly.
            No Return Value
        insertRule
            Used to insert a new rule into the style sheet. The new rule now becomes part of the cascade.
            Parameters

            rule of type DOMString
                The parsable text representing the rule. For rule sets this contains both the selector and the style declaration. For at-rules, this specifies both the at-identifier and the rule content.
            index of type unsigned long
                The index within the style sheet's rule list of the rule before which to insert the specified rule. If the specified index is equal to the length of the style sheet's rule collection, the rule will be added to the end of the style sheet.

            Return Value

            unsigned long
            	

            The index within the style sheet's rule collection of the newly inserted rule.
            Exceptions

            DOMException
            	

            HIERARCHY_REQUEST_ERR: Raised if the rule cannot be inserted at the specified index e.g. if an @import rule is inserted after a standard rule set or other at-rule.

            INDEX_SIZE_ERR: Raised if the specified index is not a valid insertion point.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this style sheet is readonly.

            SYNTAX_ERR: Raised if the specified rule has a syntax error and is unparsable.

Interface CSSRuleList (introduced in DOM Level 2)

    The CSSRuleList interface provides the abstraction of an ordered collection of CSS rules.

    The items in the CSSRuleList are accessible via an integral index, starting from 0.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSRuleList {
          readonly attribute unsigned long    length;
          CSSRule            item(in unsigned long index);
        };


    Attributes

        length of type unsigned long, readonly
            The number of CSSRules in the list. The range of valid child rule indices is 0 to length-1 inclusive.

    Methods

        item
            Used to retrieve a CSS rule by ordinal index. The order in this collection represents the order of the rules in the CSS style sheet. If index is greater than or equal to the number of rules in the list, this returns null.
            Parameters

            index of type unsigned long
                Index into the collection

            Return Value

            CSSRule
            	

            The style rule at the index position in the CSSRuleList, or null if that is not a valid index.
            No Exceptions

Interface CSSRule (introduced in DOM Level 2)

    The CSSRule interface is the abstract base interface for any type of CSS statement. This includes both rule sets and at-rules. An implementation is expected to preserve all rules specified in a CSS style sheet, even if the rule is not recognized by the parser. Unrecognized rules are represented using the CSSUnknownRule interface.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSRule {

          // RuleType
          const unsigned short      UNKNOWN_RULE                   = 0;
          const unsigned short      STYLE_RULE                     = 1;
          const unsigned short      CHARSET_RULE                   = 2;
          const unsigned short      IMPORT_RULE                    = 3;
          const unsigned short      MEDIA_RULE                     = 4;
          const unsigned short      FONT_FACE_RULE                 = 5;
          const unsigned short      PAGE_RULE                      = 6;

          readonly attribute unsigned short   type;
                   attribute DOMString        cssText;
                                                // raises(DOMException) on setting

          readonly attribute CSSStyleSheet    parentStyleSheet;
          readonly attribute CSSRule          parentRule;
        };


    Definition group RuleType

        An integer indicating which type of rule this is.

        Defined Constants

            CHARSET_RULE
                The rule is a CSSCharsetRule.
            FONT_FACE_RULE
                The rule is a CSSFontFaceRule.
            IMPORT_RULE
                The rule is a CSSImportRule.
            MEDIA_RULE
                The rule is a CSSMediaRule.
            PAGE_RULE
                The rule is a CSSPageRule.
            STYLE_RULE
                The rule is a CSSStyleRule.
            UNKNOWN_RULE
                The rule is a CSSUnknownRule.

    Attributes

        cssText of type DOMString
            The parsable textual representation of the rule. This reflects the current state of the rule and not its initial value.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the specified CSS string value has a syntax error and is unparsable.

            INVALID_MODIFICATION_ERR: Raised if the specified CSS string value represents a different type of rule than the current one.

            HIERARCHY_REQUEST_ERR: Raised if the rule cannot be inserted at this point in the style sheet.

            NO_MODIFICATION_ALLOWED_ERR: Raised if the rule is readonly.
        parentRule of type CSSRule, readonly
            If this rule is contained inside another rule (e.g. a style rule inside an @media block), this is the containing rule. If this rule is not nested inside any other rules, this returns null.
        parentStyleSheet of type CSSStyleSheet, readonly
            The style sheet that contains this rule.
        type of type unsigned short, readonly
            The type of the rule, as defined above. The expectation is that binding-specific casting methods can be used to cast down from an instance of the CSSRule interface to the specific derived interface implied by the type.

Interface CSSStyleRule (introduced in DOM Level 2)

    The CSSStyleRule interface represents a single rule set in a CSS style sheet.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSStyleRule : CSSRule {
                   attribute DOMString        selectorText;
                                                // raises(DOMException) on setting

          readonly attribute CSSStyleDeclaration  style;
        };


    Attributes

        selectorText of type DOMString
            The textual representation of the selector for the rule set. The implementation may have stripped out insignificant whitespace while parsing the selector.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the specified CSS string value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this rule is readonly.
        style of type CSSStyleDeclaration, readonly
            The declaration-block of this rule set.

Interface CSSMediaRule (introduced in DOM Level 2)

    The CSSMediaRule interface represents a @media rule in a CSS style sheet. A @media rule can be used to delimit style rules for specific media types.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSMediaRule : CSSRule {
          readonly attribute stylesheets::MediaList  media;
          readonly attribute CSSRuleList      cssRules;
          unsigned long      insertRule(in DOMString rule, 
                                        in unsigned long index)
                                                raises(DOMException);
          void               deleteRule(in unsigned long index)
                                                raises(DOMException);
        };


    Attributes

        cssRules of type CSSRuleList, readonly
            A list of all CSS rules contained within the media block.
        media of type stylesheets::MediaList, readonly
            A list of media types for this rule.

    Methods

        deleteRule
            Used to delete a rule from the media block.
            Parameters

            index of type unsigned long
                The index within the media block's rule collection of the rule to remove.

            Exceptions

            DOMException
            	

            INDEX_SIZE_ERR: Raised if the specified index does not correspond to a rule in the media rule list.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this media rule is readonly.
            No Return Value
        insertRule
            Used to insert a new rule into the media block.
            Parameters

            rule of type DOMString
                The parsable text representing the rule. For rule sets this contains both the selector and the style declaration. For at-rules, this specifies both the at-identifier and the rule content.
            index of type unsigned long
                The index within the media block's rule collection of the rule before which to insert the specified rule. If the specified index is equal to the length of the media blocks's rule collection, the rule will be added to the end of the media block.

            Return Value

            unsigned long
            	

            The index within the media block's rule collection of the newly inserted rule.
            Exceptions

            DOMException
            	

            HIERARCHY_REQUEST_ERR: Raised if the rule cannot be inserted at the specified index, e.g., if an @import rule is inserted after a standard rule set or other at-rule.

            INDEX_SIZE_ERR: Raised if the specified index is not a valid insertion point.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this media rule is readonly.

            SYNTAX_ERR: Raised if the specified rule has a syntax error and is unparsable.

Interface CSSFontFaceRule (introduced in DOM Level 2)

    The CSSFontFaceRule interface represents a @font-face rule in a CSS style sheet. The @font-face rule is used to hold a set of font descriptions.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSFontFaceRule : CSSRule {
          readonly attribute CSSStyleDeclaration  style;
        };


    Attributes

        style of type CSSStyleDeclaration, readonly
            The declaration-block of this rule.

Interface CSSPageRule (introduced in DOM Level 2)

    The CSSPageRule interface represents a @page rule within a CSS style sheet. The @page rule is used to specify the dimensions, orientation, margins, etc. of a page box for paged media.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSPageRule : CSSRule {
                   attribute DOMString        selectorText;
                                                // raises(DOMException) on setting

          readonly attribute CSSStyleDeclaration  style;
        };


    Attributes

        selectorText of type DOMString
            The parsable textual representation of the page selector for the rule.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the specified CSS string value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this rule is readonly.
        style of type CSSStyleDeclaration, readonly
            The declaration-block of this rule.

Interface CSSImportRule (introduced in DOM Level 2)

    The CSSImportRule interface represents a @import rule within a CSS style sheet. The @import rule is used to import style rules from other style sheets.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSImportRule : CSSRule {
          readonly attribute DOMString        href;
          readonly attribute stylesheets::MediaList  media;
          readonly attribute CSSStyleSheet    styleSheet;
        };


    Attributes

        href of type DOMString, readonly
            The location of the style sheet to be imported. The attribute will not contain the "url(...)" specifier around the URI.
        media of type stylesheets::MediaList, readonly
            A list of media types for which this style sheet may be used.
        styleSheet of type CSSStyleSheet, readonly
            The style sheet referred to by this rule, if it has been loaded. The value of this attribute is null if the style sheet has not yet been loaded or if it will not be loaded (e.g. if the style sheet is for a media type not supported by the user agent).

Interface CSSCharsetRule (introduced in DOM Level 2)

    The CSSCharsetRule interface represents a @charset rule in a CSS style sheet. The value of the encoding attribute does not affect the encoding of text data in the DOM objects; this encoding is always UTF-16. After a stylesheet is loaded, the value of the encoding attribute is the value found in the @charset rule. If there was no @charset in the original document, then no CSSCharsetRule is created. The value of the encoding attribute may also be used as a hint for the encoding used on serialization of the style sheet.

    The value of the @charset rule (and therefore of the CSSCharsetRule) may not correspond to the encoding the document actually came in; character encoding information e.g. in an HTTP header, has priority (see CSS document representation) but this is not reflected in the CSSCharsetRule.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSCharsetRule : CSSRule {
                   attribute DOMString        encoding;
                                                // raises(DOMException) on setting

        };


    Attributes

        encoding of type DOMString
            The encoding information used in this @charset rule.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the specified encoding value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this encoding rule is readonly.

Interface CSSUnknownRule (introduced in DOM Level 2)

    The CSSUnknownRule interface represents an at-rule not supported by this user agent.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSUnknownRule : CSSRule {
        };


Interface CSSStyleDeclaration (introduced in DOM Level 2)

    The CSSStyleDeclaration interface represents a single CSS declaration block. This interface may be used to determine the style properties currently set in a block or to set style properties explicitly within the block.

    While an implementation may not recognize all CSS properties within a CSS declaration block, it is expected to provide access to all specified properties in the style sheet through the CSSStyleDeclaration interface. Furthermore, implementations that support a specific level of CSS should correctly handle CSS shorthand properties for that level. For a further discussion of shorthand properties, see the CSS2Properties interface.

    This interface is also used to provide a read-only access to the computed values of an element. See also the ViewCSS interface.

    Note: The CSS Object Model doesn't provide an access to the specified or actual values of the CSS cascade.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSStyleDeclaration {
                   attribute DOMString        cssText;
                                                // raises(DOMException) on setting

          DOMString          getPropertyValue(in DOMString propertyName);
          CSSValue           getPropertyCSSValue(in DOMString propertyName);
          DOMString          removeProperty(in DOMString propertyName)
                                                raises(DOMException);
          DOMString          getPropertyPriority(in DOMString propertyName);
          void               setProperty(in DOMString propertyName, 
                                         in DOMString value, 
                                         in DOMString priority)
                                                raises(DOMException);
          readonly attribute unsigned long    length;
          DOMString          item(in unsigned long index);
          readonly attribute CSSRule          parentRule;
        };


    Attributes

        cssText of type DOMString
            The parsable textual representation of the declaration block (excluding the surrounding curly braces). Setting this attribute will result in the parsing of the new value and resetting of all the properties in the declaration block including the removal or addition of properties.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the specified CSS string value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this declaration is readonly or a property is readonly.
        length of type unsigned long, readonly
            The number of properties that have been explicitly set in this declaration block. The range of valid indices is 0 to length-1 inclusive.
        parentRule of type CSSRule, readonly
            The CSS rule that contains this declaration block or null if this CSSStyleDeclaration is not attached to a CSSRule.

    Methods

        getPropertyCSSValue
            Used to retrieve the object representation of the value of a CSS property if it has been explicitly set within this declaration block. This method returns null if the property is a shorthand property. Shorthand property values can only be accessed and modified as strings, using the getPropertyValue and setProperty methods.
            Parameters

            propertyName of type DOMString
                The name of the CSS property. See the CSS property index.

            Return Value

            CSSValue
            	

            Returns the value of the property if it has been explicitly set for this declaration block. Returns null if the property has not been set.
            No Exceptions
        getPropertyPriority
            Used to retrieve the priority of a CSS property (e.g. the "important" qualifier) if the property has been explicitly set in this declaration block.
            Parameters

            propertyName of type DOMString
                The name of the CSS property. See the CSS property index.

            Return Value

            DOMString
            	

            A string representing the priority (e.g. "important") if one exists. The empty string if none exists.
            No Exceptions
        getPropertyValue
            Used to retrieve the value of a CSS property if it has been explicitly set within this declaration block.
            Parameters

            propertyName of type DOMString
                The name of the CSS property. See the CSS property index.

            Return Value

            DOMString
            	

            Returns the value of the property if it has been explicitly set for this declaration block. Returns the empty string if the property has not been set.
            No Exceptions
        item
            Used to retrieve the properties that have been explicitly set in this declaration block. The order of the properties retrieved using this method does not have to be the order in which they were set. This method can be used to iterate over all properties in this declaration block.
            Parameters

            index of type unsigned long
                Index of the property name to retrieve.

            Return Value

            DOMString
            	

            The name of the property at this ordinal position. The empty string if no property exists at this position.
            No Exceptions
        removeProperty
            Used to remove a CSS property if it has been explicitly set within this declaration block.
            Parameters

            propertyName of type DOMString
                The name of the CSS property. See the CSS property index.

            Return Value

            DOMString
            	

            Returns the value of the property if it has been explicitly set for this declaration block. Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
            Exceptions

            DOMException
            	

            NO_MODIFICATION_ALLOWED_ERR: Raised if this declaration is readonly or the property is readonly.
        setProperty
            Used to set a property value and priority within this declaration block.
            Parameters

            propertyName of type DOMString
                The name of the CSS property. See the CSS property index.
            value of type DOMString
                The new value of the property.
            priority of type DOMString
                The new priority of the property (e.g. "important").

            Exceptions

            DOMException
            	

            SYNTAX_ERR: Raised if the specified value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this declaration is readonly or the property is readonly.
            No Return Value

Interface CSSValue (introduced in DOM Level 2)

    The CSSValue interface represents a simple or a complex value. A CSSValue object only occurs in a context of a CSS property.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSValue {

          // UnitTypes
          const unsigned short      CSS_INHERIT                    = 0;
          const unsigned short      CSS_PRIMITIVE_VALUE            = 1;
          const unsigned short      CSS_VALUE_LIST                 = 2;
          const unsigned short      CSS_CUSTOM                     = 3;

                   attribute DOMString        cssText;
                                                // raises(DOMException) on setting

          readonly attribute unsigned short   cssValueType;
        };


    Definition group UnitTypes

        An integer indicating which type of unit applies to the value.

        Defined Constants

            CSS_CUSTOM
                The value is a custom value.
            CSS_INHERIT
                The value is inherited and the cssText contains "inherit".
            CSS_PRIMITIVE_VALUE
                The value is a primitive value and an instance of the CSSPrimitiveValue interface can be obtained by using binding-specific casting methods on this instance of the CSSValue interface.
            CSS_VALUE_LIST
                The value is a CSSValue list and an instance of the CSSValueList interface can be obtained by using binding-specific casting methods on this instance of the CSSValue interface.

    Attributes

        cssText of type DOMString
            A string representation of the current value.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the specified CSS string value has a syntax error (according to the attached property) or is unparsable.

            INVALID_MODIFICATION_ERR: Raised if the specified CSS string value represents a different type of values than the values allowed by the CSS property.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this value is readonly.
        cssValueType of type unsigned short, readonly
            A code defining the type of the value as defined above.

Interface CSSPrimitiveValue (introduced in DOM Level 2)

    The CSSPrimitiveValue interface represents a single CSS value. This interface may be used to determine the value of a specific style property currently set in a block or to set a specific style property explicitly within the block. An instance of this interface might be obtained from the getPropertyCSSValue method of the CSSStyleDeclaration interface. A CSSPrimitiveValue object only occurs in a context of a CSS property.

    Conversions are allowed between absolute values (from millimeters to centimeters, from degrees to radians, and so on) but not between relative values. (For example, a pixel value cannot be converted to a centimeter value.) Percentage values can't be converted since they are relative to the parent value (or another property value). There is one exception for color percentage values: since a color percentage value is relative to the range 0-255, a color percentage value can be converted to a number; (see also the RGBColor interface).


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSPrimitiveValue : CSSValue {

          // UnitTypes
          const unsigned short      CSS_UNKNOWN                    = 0;
          const unsigned short      CSS_NUMBER                     = 1;
          const unsigned short      CSS_PERCENTAGE                 = 2;
          const unsigned short      CSS_EMS                        = 3;
          const unsigned short      CSS_EXS                        = 4;
          const unsigned short      CSS_PX                         = 5;
          const unsigned short      CSS_CM                         = 6;
          const unsigned short      CSS_MM                         = 7;
          const unsigned short      CSS_IN                         = 8;
          const unsigned short      CSS_PT                         = 9;
          const unsigned short      CSS_PC                         = 10;
          const unsigned short      CSS_DEG                        = 11;
          const unsigned short      CSS_RAD                        = 12;
          const unsigned short      CSS_GRAD                       = 13;
          const unsigned short      CSS_MS                         = 14;
          const unsigned short      CSS_S                          = 15;
          const unsigned short      CSS_HZ                         = 16;
          const unsigned short      CSS_KHZ                        = 17;
          const unsigned short      CSS_DIMENSION                  = 18;
          const unsigned short      CSS_STRING                     = 19;
          const unsigned short      CSS_URI                        = 20;
          const unsigned short      CSS_IDENT                      = 21;
          const unsigned short      CSS_ATTR                       = 22;
          const unsigned short      CSS_COUNTER                    = 23;
          const unsigned short      CSS_RECT                       = 24;
          const unsigned short      CSS_RGBCOLOR                   = 25;

          readonly attribute unsigned short   primitiveType;
          void               setFloatValue(in unsigned short unitType, 
                                           in float floatValue)
                                                raises(DOMException);
          float              getFloatValue(in unsigned short unitType)
                                                raises(DOMException);
          void               setStringValue(in unsigned short stringType, 
                                            in DOMString stringValue)
                                                raises(DOMException);
          DOMString          getStringValue()
                                                raises(DOMException);
          Counter            getCounterValue()
                                                raises(DOMException);
          Rect               getRectValue()
                                                raises(DOMException);
          RGBColor           getRGBColorValue()
                                                raises(DOMException);
        };


    Definition group UnitTypes

        An integer indicating which type of unit applies to the value.

        Defined Constants

            CSS_ATTR
                The value is a attribute function. The value can be obtained by using the getStringValue method.
            CSS_CM
                The value is a length (cm). The value can be obtained by using the getFloatValue method.
            CSS_COUNTER
                The value is a counter or counters function. The value can be obtained by using the getCounterValue method.
            CSS_DEG
                The value is an angle (deg). The value can be obtained by using the getFloatValue method.
            CSS_DIMENSION
                The value is a number with an unknown dimension. The value can be obtained by using the getFloatValue method.
            CSS_EMS
                The value is a length (ems). The value can be obtained by using the getFloatValue method.
            CSS_EXS
                The value is a length (exs). The value can be obtained by using the getFloatValue method.
            CSS_GRAD
                The value is an angle (grad). The value can be obtained by using the getFloatValue method.
            CSS_HZ
                The value is a frequency (Hz). The value can be obtained by using the getFloatValue method.
            CSS_IDENT
                The value is an identifier. The value can be obtained by using the getStringValue method.
            CSS_IN
                The value is a length (in). The value can be obtained by using the getFloatValue method.
            CSS_KHZ
                The value is a frequency (kHz). The value can be obtained by using the getFloatValue method.
            CSS_MM
                The value is a length (mm). The value can be obtained by using the getFloatValue method.
            CSS_MS
                The value is a time (ms). The value can be obtained by using the getFloatValue method.
            CSS_NUMBER
                The value is a simple number. The value can be obtained by using the getFloatValue method.
            CSS_PC
                The value is a length (pc). The value can be obtained by using the getFloatValue method.
            CSS_PERCENTAGE
                The value is a percentage. The value can be obtained by using the getFloatValue method.
            CSS_PT
                The value is a length (pt). The value can be obtained by using the getFloatValue method.
            CSS_PX
                The value is a length (px). The value can be obtained by using the getFloatValue method.
            CSS_RAD
                The value is an angle (rad). The value can be obtained by using the getFloatValue method.
            CSS_RECT
                The value is a rect function. The value can be obtained by using the getRectValue method.
            CSS_RGBCOLOR
                The value is a RGB color. The value can be obtained by using the getRGBColorValue method.
            CSS_S
                The value is a time (s). The value can be obtained by using the getFloatValue method.
            CSS_STRING
                The value is a STRING. The value can be obtained by using the getStringValue method.
            CSS_UNKNOWN
                The value is not a recognized CSS2 value. The value can only be obtained by using the cssText attribute.
            CSS_URI
                The value is a URI. The value can be obtained by using the getStringValue method.

    Attributes

        primitiveType of type unsigned short, readonly
            The type of the value as defined by the constants specified above.

    Methods

        getCounterValue
            This method is used to get the Counter value. If this CSS value doesn't contain a counter value, a DOMException is raised. Modification to the corresponding style property can be achieved using the Counter interface.
            Return Value

            Counter
            	

            The Counter value.
            Exceptions

            DOMException
            	

            INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a Counter value (e.g. this is not CSS_COUNTER).
            No Parameters
        getFloatValue
            This method is used to get a float value in a specified unit. If this CSS value doesn't contain a float value or can't be converted into the specified unit, a DOMException is raised.
            Parameters

            unitType of type unsigned short
                A unit code to get the float value. The unit code can only be a float unit type (i.e. CSS_NUMBER, CSS_PERCENTAGE, CSS_EMS, CSS_EXS, CSS_PX, CSS_CM, CSS_MM, CSS_IN, CSS_PT, CSS_PC, CSS_DEG, CSS_RAD, CSS_GRAD, CSS_MS, CSS_S, CSS_HZ, CSS_KHZ, CSS_DIMENSION).

            Return Value

            float
            	

            The float value in the specified unit.
            Exceptions

            DOMException
            	

            INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a float value or if the float value can't be converted into the specified unit.
        getRGBColorValue
            This method is used to get the RGB color. If this CSS value doesn't contain a RGB color value, a DOMException is raised. Modification to the corresponding style property can be achieved using the RGBColor interface.
            Return Value

            RGBColor
            	

            the RGB color value.
            Exceptions

            DOMException
            	

            INVALID_ACCESS_ERR: Raised if the attached property can't return a RGB color value (e.g. this is not CSS_RGBCOLOR).
            No Parameters
        getRectValue
            This method is used to get the Rect value. If this CSS value doesn't contain a rect value, a DOMException is raised. Modification to the corresponding style property can be achieved using the Rect interface.
            Return Value

            Rect
            	

            The Rect value.
            Exceptions

            DOMException
            	

            INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a Rect value. (e.g. this is not CSS_RECT).
            No Parameters
        getStringValue
            This method is used to get the string value. If the CSS value doesn't contain a string value, a DOMException is raised.

            Note: Some properties (like 'font-family' or 'voice-family') convert a whitespace separated list of idents to a string.
            Return Value

            DOMString
            	

            The string value in the current unit. The current primitiveType can only be a string unit type (i.e. CSS_STRING, CSS_URI, CSS_IDENT and CSS_ATTR).
            Exceptions

            DOMException
            	

            INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a string value.
            No Parameters
        setFloatValue
            A method to set the float value with a specified unit. If the property attached with this value can not accept the specified unit or the float value, the value will be unchanged and a DOMException will be raised.
            Parameters

            unitType of type unsigned short
                A unit code as defined above. The unit code can only be a float unit type (i.e. CSS_NUMBER, CSS_PERCENTAGE, CSS_EMS, CSS_EXS, CSS_PX, CSS_CM, CSS_MM, CSS_IN, CSS_PT, CSS_PC, CSS_DEG, CSS_RAD, CSS_GRAD, CSS_MS, CSS_S, CSS_HZ, CSS_KHZ, CSS_DIMENSION).
            floatValue of type float
                The new float value.

            Exceptions

            DOMException
            	

            INVALID_ACCESS_ERR: Raised if the attached property doesn't support the float value or the unit type.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
            No Return Value
        setStringValue
            A method to set the string value with the specified unit. If the property attached to this value can't accept the specified unit or the string value, the value will be unchanged and a DOMException will be raised.
            Parameters

            stringType of type unsigned short
                A string code as defined above. The string code can only be a string unit type (i.e. CSS_STRING, CSS_URI, CSS_IDENT, and CSS_ATTR).
            stringValue of type DOMString
                The new string value.

            Exceptions

            DOMException
            	

            INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a string value or if the string value can't be converted into the specified unit.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
            No Return Value

Interface CSSValueList (introduced in DOM Level 2)

    The CSSValueList interface provides the abstraction of an ordered collection of CSS values.

    Some properties allow an empty list into their syntax. In that case, these properties take the none identifier. So, an empty list means that the property has the value none.

    The items in the CSSValueList are accessible via an integral index, starting from 0.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSSValueList : CSSValue {
          readonly attribute unsigned long    length;
          CSSValue           item(in unsigned long index);
        };


    Attributes

        length of type unsigned long, readonly
            The number of CSSValues in the list. The range of valid values of the indices is 0 to length-1 inclusive.

    Methods

        item
            Used to retrieve a CSSValue by ordinal index. The order in this collection represents the order of the values in the CSS style property. If index is greater than or equal to the number of values in the list, this returns null.
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            CSSValue
            	

            The CSSValue at the index position in the CSSValueList, or null if that is not a valid index.
            No Exceptions

Interface RGBColor (introduced in DOM Level 2)

    The RGBColor interface is used to represent any RGB color value. This interface reflects the values in the underlying style property. Hence, modifications made to the CSSPrimitiveValue objects modify the style property.

    A specified RGB color is not clipped (even if the number is outside the range 0-255 or 0%-100%). A computed RGB color is clipped depending on the device.

    Even if a style sheet can only contain an integer for a color value, the internal storage of this integer is a float, and this can be used as a float in the specified or the computed style.

    A color percentage value can always be converted to a number and vice versa.


    IDL Definition

        // Introduced in DOM Level 2:
        interface RGBColor {
          readonly attribute CSSPrimitiveValue  red;
          readonly attribute CSSPrimitiveValue  green;
          readonly attribute CSSPrimitiveValue  blue;
        };


    Attributes

        blue of type CSSPrimitiveValue, readonly
            This attribute is used for the blue value of the RGB color.
        green of type CSSPrimitiveValue, readonly
            This attribute is used for the green value of the RGB color.
        red of type CSSPrimitiveValue, readonly
            This attribute is used for the red value of the RGB color.

Interface Rect (introduced in DOM Level 2)

    The Rect interface is used to represent any rect value. This interface reflects the values in the underlying style property. Hence, modifications made to the CSSPrimitiveValue objects modify the style property.


    IDL Definition

        // Introduced in DOM Level 2:
        interface Rect {
          readonly attribute CSSPrimitiveValue  top;
          readonly attribute CSSPrimitiveValue  right;
          readonly attribute CSSPrimitiveValue  bottom;
          readonly attribute CSSPrimitiveValue  left;
        };


    Attributes

        bottom of type CSSPrimitiveValue, readonly
            This attribute is used for the bottom of the rect.
        left of type CSSPrimitiveValue, readonly
            This attribute is used for the left of the rect.
        right of type CSSPrimitiveValue, readonly
            This attribute is used for the right of the rect.
        top of type CSSPrimitiveValue, readonly
            This attribute is used for the top of the rect.

Interface Counter (introduced in DOM Level 2)

    The Counter interface is used to represent any counter or counters function value. This interface reflects the values in the underlying style property.


    IDL Definition

        // Introduced in DOM Level 2:
        interface Counter {
          readonly attribute DOMString        identifier;
          readonly attribute DOMString        listStyle;
          readonly attribute DOMString        separator;
        };


    Attributes

        identifier of type DOMString, readonly
            This attribute is used for the identifier of the counter.
        listStyle of type DOMString, readonly
            This attribute is used for the style of the list.
        separator of type DOMString, readonly
            This attribute is used for the separator of the nested counters.

2.2.1. Override and computed style sheet

Interface ViewCSS (introduced in DOM Level 2)

    This interface represents a CSS view. The getComputedStyle method provides a read only access to the computed values of an element.

    The expectation is that an instance of the ViewCSS interface can be obtained by using binding-specific casting methods on an instance of the AbstractView interface.

    Since a computed style is related to an Element node, if this element is removed from the document, the associated CSSStyleDeclaration and CSSValue related to this declaration are no longer valid.


    IDL Definition

        // Introduced in DOM Level 2:
        interface ViewCSS : views::AbstractView {
          CSSStyleDeclaration getComputedStyle(in Element elt, 
                                               in DOMString pseudoElt);
        };


    Methods

        getComputedStyle
            This method is used to get the computed style as it is defined in [CSS2].
            Parameters

            elt of type Element
                The element whose style is to be computed. This parameter cannot be null.
            pseudoElt of type DOMString
                The pseudo-element or null if none.

            Return Value

            CSSStyleDeclaration
            	

            The computed style. The CSSStyleDeclaration is read-only and contains only absolute values.
            No Exceptions

Interface DocumentCSS (introduced in DOM Level 2)

    This interface represents a document with a CSS view.

    The getOverrideStyle method provides a mechanism through which a DOM author could effect immediate change to the style of an element without modifying the explicitly linked style sheets of a document or the inline style of elements in the style sheets. This style sheet comes after the author style sheet in the cascade algorithm and is called override style sheet. The override style sheet takes precedence over author style sheets. An "!important" declaration still takes precedence over a normal declaration. Override, author, and user style sheets all may contain "!important" declarations. User "!important" rules take precedence over both override and author "!important" rules, and override "!important" rules take precedence over author "!important" rules.

    The expectation is that an instance of the DocumentCSS interface can be obtained by using binding-specific casting methods on an instance of the Document interface.


    IDL Definition

        // Introduced in DOM Level 2:
        interface DocumentCSS : stylesheets::DocumentStyle {
          CSSStyleDeclaration getOverrideStyle(in Element elt, 
                                               in DOMString pseudoElt);
        };


    Methods

        getOverrideStyle
            This method is used to retrieve the override style declaration for a specified element and a specified pseudo-element.
            Parameters

            elt of type Element
                The element whose style is to be modified. This parameter cannot be null.
            pseudoElt of type DOMString
                The pseudo-element or null if none.

            Return Value

            CSSStyleDeclaration
            	

            The override style declaration.
            No Exceptions

2.2.2. Style sheet creation

Interface DOMImplementationCSS (introduced in DOM Level 2)

    This interface allows the DOM user to create a CSSStyleSheet outside the context of a document. There is no way to associate the new CSSStyleSheet with a document in DOM Level 2.


    IDL Definition

        // Introduced in DOM   Level 2:
        interface DOMImplementationCSS : DOMImplementation {
          CSSStyleSheet      createCSSStyleSheet(in DOMString title, 
                                                 in DOMString media)
                                                raises(DOMException);
        };


    Methods

        createCSSStyleSheet
            Creates a new CSSStyleSheet.
            Parameters

            title of type DOMString
                The advisory title. See also the Style Sheet Interfaces section.
            media of type DOMString
                The comma-separated list of media associated with the new style sheet. See also the Style Sheet Interfaces section.

            Return Value

            CSSStyleSheet
            	

            A new CSS style sheet.
            Exceptions

            DOMException
            	

            SYNTAX_ERR: Raised if the specified media string value has a syntax error and is unparsable.

2.2.3. Element with CSS inline style

Interface ElementCSSInlineStyle (introduced in DOM Level 2)

    Inline style information attached to elements is exposed through the style attribute. This represents the contents of the STYLE attribute for HTML elements (or elements in other schemas or DTDs which use the STYLE attribute in the same way). The expectation is that an instance of the ElementCSSInlineStyle interface can be obtained by using binding-specific casting methods on an instance of the Element interface when the element supports inline CSS style informations.


    IDL Definition

        // Introduced in DOM Level 2:
        interface ElementCSSInlineStyle {
          readonly attribute CSSStyleDeclaration  style;
        };


    Attributes

        style of type CSSStyleDeclaration, readonly
            The style attribute.

2.3. CSS2 Extended Interface

The interface found within this section are not mandatory. A DOM application may use the hasFeature(feature, version) method of the DOMImplementation interface with parameter values "CSS2" and "2.0" (respectively) to determine whether or not this module is supported by the implementation. In order to fully support this module, an implementation must also support the "CSS" feature defined defined in CSS Fundamental Interfaces. Please refer to additional information about conformance in the DOM Level 2 Core specification [DOM Level 2 Core].

Interface CSS2Properties (introduced in DOM Level 2)

    The CSS2Properties interface represents a convenience mechanism for retrieving and setting properties within a CSSStyleDeclaration. The attributes of this interface correspond to all the properties specified in CSS2. Getting an attribute of this interface is equivalent to calling the getPropertyValue method of the CSSStyleDeclaration interface. Setting an attribute of this interface is equivalent to calling the setProperty method of the CSSStyleDeclaration interface.

    A conformant implementation of the CSS module is not required to implement the CSS2Properties interface. If an implementation does implement this interface, the expectation is that language-specific methods can be used to cast from an instance of the CSSStyleDeclaration interface to the CSS2Properties interface.

    If an implementation does implement this interface, it is expected to understand the specific syntax of the shorthand properties, and apply their semantics; when the margin property is set, for example, the marginTop, marginRight, marginBottom and marginLeft properties are actually being set by the underlying implementation.

    When dealing with CSS "shorthand" properties, the shorthand properties should be decomposed into their component longhand properties as appropriate, and when querying for their value, the form returned should be the shortest form exactly equivalent to the declarations made in the ruleset. However, if there is no shorthand declaration that could be added to the ruleset without changing in any way the rules already declared in the ruleset (i.e., by adding longhand rules that were previously not declared in the ruleset), then the empty string should be returned for the shorthand property.

    For example, querying for the font property should not return "normal normal normal 14pt/normal Arial, sans-serif", when "14pt Arial, sans-serif" suffices. (The normals are initial values, and are implied by use of the longhand property.)

    If the values for all the longhand properties that compose a particular string are the initial values, then a string consisting of all the initial values should be returned (e.g. a border-width value of "medium" should be returned as such, not as "").

    For some shorthand properties that take missing values from other sides, such as the margin, padding, and border-[width|style|color] properties, the minimum number of sides possible should be used; i.e., "0px 10px" will be returned instead of "0px 10px 0px 10px".

    If the value of a shorthand property can not be decomposed into its component longhand properties, as is the case for the font property with a value of "menu", querying for the values of the component longhand properties should return the empty string.


    IDL Definition

        // Introduced in DOM Level 2:
        interface CSS2Properties {
                   attribute DOMString        azimuth;
                                                // raises(DOMException) on setting

                   attribute DOMString        background;
                                                // raises(DOMException) on setting

                   attribute DOMString        backgroundAttachment;
                                                // raises(DOMException) on setting

                   attribute DOMString        backgroundColor;
                                                // raises(DOMException) on setting

                   attribute DOMString        backgroundImage;
                                                // raises(DOMException) on setting

                   attribute DOMString        backgroundPosition;
                                                // raises(DOMException) on setting

                   attribute DOMString        backgroundRepeat;
                                                // raises(DOMException) on setting

                   attribute DOMString        border;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderCollapse;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderColor;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderSpacing;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderTop;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderRight;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderBottom;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderLeft;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderTopColor;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderRightColor;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderBottomColor;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderLeftColor;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderTopStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderRightStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderBottomStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderLeftStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderTopWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderRightWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderBottomWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderLeftWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        borderWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        bottom;
                                                // raises(DOMException) on setting

                   attribute DOMString        captionSide;
                                                // raises(DOMException) on setting

                   attribute DOMString        clear;
                                                // raises(DOMException) on setting

                   attribute DOMString        clip;
                                                // raises(DOMException) on setting

                   attribute DOMString        color;
                                                // raises(DOMException) on setting

                   attribute DOMString        content;
                                                // raises(DOMException) on setting

                   attribute DOMString        counterIncrement;
                                                // raises(DOMException) on setting

                   attribute DOMString        counterReset;
                                                // raises(DOMException) on setting

                   attribute DOMString        cue;
                                                // raises(DOMException) on setting

                   attribute DOMString        cueAfter;
                                                // raises(DOMException) on setting

                   attribute DOMString        cueBefore;
                                                // raises(DOMException) on setting

                   attribute DOMString        cursor;
                                                // raises(DOMException) on setting

                   attribute DOMString        direction;
                                                // raises(DOMException) on setting

                   attribute DOMString        display;
                                                // raises(DOMException) on setting

                   attribute DOMString        elevation;
                                                // raises(DOMException) on setting

                   attribute DOMString        emptyCells;
                                                // raises(DOMException) on setting

                   attribute DOMString        cssFloat;
                                                // raises(DOMException) on setting

                   attribute DOMString        font;
                                                // raises(DOMException) on setting

                   attribute DOMString        fontFamily;
                                                // raises(DOMException) on setting

                   attribute DOMString        fontSize;
                                                // raises(DOMException) on setting

                   attribute DOMString        fontSizeAdjust;
                                                // raises(DOMException) on setting

                   attribute DOMString        fontStretch;
                                                // raises(DOMException) on setting

                   attribute DOMString        fontStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        fontVariant;
                                                // raises(DOMException) on setting

                   attribute DOMString        fontWeight;
                                                // raises(DOMException) on setting

                   attribute DOMString        height;
                                                // raises(DOMException) on setting

                   attribute DOMString        left;
                                                // raises(DOMException) on setting

                   attribute DOMString        letterSpacing;
                                                // raises(DOMException) on setting

                   attribute DOMString        lineHeight;
                                                // raises(DOMException) on setting

                   attribute DOMString        listStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        listStyleImage;
                                                // raises(DOMException) on setting

                   attribute DOMString        listStylePosition;
                                                // raises(DOMException) on setting

                   attribute DOMString        listStyleType;
                                                // raises(DOMException) on setting

                   attribute DOMString        margin;
                                                // raises(DOMException) on setting

                   attribute DOMString        marginTop;
                                                // raises(DOMException) on setting

                   attribute DOMString        marginRight;
                                                // raises(DOMException) on setting

                   attribute DOMString        marginBottom;
                                                // raises(DOMException) on setting

                   attribute DOMString        marginLeft;
                                                // raises(DOMException) on setting

                   attribute DOMString        markerOffset;
                                                // raises(DOMException) on setting

                   attribute DOMString        marks;
                                                // raises(DOMException) on setting

                   attribute DOMString        maxHeight;
                                                // raises(DOMException) on setting

                   attribute DOMString        maxWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        minHeight;
                                                // raises(DOMException) on setting

                   attribute DOMString        minWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        orphans;
                                                // raises(DOMException) on setting

                   attribute DOMString        outline;
                                                // raises(DOMException) on setting

                   attribute DOMString        outlineColor;
                                                // raises(DOMException) on setting

                   attribute DOMString        outlineStyle;
                                                // raises(DOMException) on setting

                   attribute DOMString        outlineWidth;
                                                // raises(DOMException) on setting

                   attribute DOMString        overflow;
                                                // raises(DOMException) on setting

                   attribute DOMString        padding;
                                                // raises(DOMException) on setting

                   attribute DOMString        paddingTop;
                                                // raises(DOMException) on setting

                   attribute DOMString        paddingRight;
                                                // raises(DOMException) on setting

                   attribute DOMString        paddingBottom;
                                                // raises(DOMException) on setting

                   attribute DOMString        paddingLeft;
                                                // raises(DOMException) on setting

                   attribute DOMString        page;
                                                // raises(DOMException) on setting

                   attribute DOMString        pageBreakAfter;
                                                // raises(DOMException) on setting

                   attribute DOMString        pageBreakBefore;
                                                // raises(DOMException) on setting

                   attribute DOMString        pageBreakInside;
                                                // raises(DOMException) on setting

                   attribute DOMString        pause;
                                                // raises(DOMException) on setting

                   attribute DOMString        pauseAfter;
                                                // raises(DOMException) on setting

                   attribute DOMString        pauseBefore;
                                                // raises(DOMException) on setting

                   attribute DOMString        pitch;
                                                // raises(DOMException) on setting

                   attribute DOMString        pitchRange;
                                                // raises(DOMException) on setting

                   attribute DOMString        playDuring;
                                                // raises(DOMException) on setting

                   attribute DOMString        position;
                                                // raises(DOMException) on setting

                   attribute DOMString        quotes;
                                                // raises(DOMException) on setting

                   attribute DOMString        richness;
                                                // raises(DOMException) on setting

                   attribute DOMString        right;
                                                // raises(DOMException) on setting

                   attribute DOMString        size;
                                                // raises(DOMException) on setting

                   attribute DOMString        speak;
                                                // raises(DOMException) on setting

                   attribute DOMString        speakHeader;
                                                // raises(DOMException) on setting

                   attribute DOMString        speakNumeral;
                                                // raises(DOMException) on setting

                   attribute DOMString        speakPunctuation;
                                                // raises(DOMException) on setting

                   attribute DOMString        speechRate;
                                                // raises(DOMException) on setting

                   attribute DOMString        stress;
                                                // raises(DOMException) on setting

                   attribute DOMString        tableLayout;
                                                // raises(DOMException) on setting

                   attribute DOMString        textAlign;
                                                // raises(DOMException) on setting

                   attribute DOMString        textDecoration;
                                                // raises(DOMException) on setting

                   attribute DOMString        textIndent;
                                                // raises(DOMException) on setting

                   attribute DOMString        textShadow;
                                                // raises(DOMException) on setting

                   attribute DOMString        textTransform;
                                                // raises(DOMException) on setting

                   attribute DOMString        top;
                                                // raises(DOMException) on setting

                   attribute DOMString        unicodeBidi;
                                                // raises(DOMException) on setting

                   attribute DOMString        verticalAlign;
                                                // raises(DOMException) on setting

                   attribute DOMString        visibility;
                                                // raises(DOMException) on setting

                   attribute DOMString        voiceFamily;
                                                // raises(DOMException) on setting

                   attribute DOMString        volume;
                                                // raises(DOMException) on setting

                   attribute DOMString        whiteSpace;
                                                // raises(DOMException) on setting

                   attribute DOMString        widows;
                                                // raises(DOMException) on setting

                   attribute DOMString        width;
                                                // raises(DOMException) on setting

                   attribute DOMString        wordSpacing;
                                                // raises(DOMException) on setting

                   attribute DOMString        zIndex;
                                                // raises(DOMException) on setting

        };


    Attributes

        azimuth of type DOMString
            See the azimuth property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        background of type DOMString
            See the background property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        backgroundAttachment of type DOMString
            See the background-attachment property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        backgroundColor of type DOMString
            See the background-color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        backgroundImage of type DOMString
            See the background-image property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        backgroundPosition of type DOMString
            See the background-position property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        backgroundRepeat of type DOMString
            See the background-repeat property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        border of type DOMString
            See the border property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderBottom of type DOMString
            See the border-bottom property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderBottomColor of type DOMString
            See the border-bottom-color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderBottomStyle of type DOMString
            See the border-bottom-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderBottomWidth of type DOMString
            See the border-bottom-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderCollapse of type DOMString
            See the border-collapse property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderColor of type DOMString
            See the border-color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderLeft of type DOMString
            See the border-left property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderLeftColor of type DOMString
            See the border-left-color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderLeftStyle of type DOMString
            See the border-left-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderLeftWidth of type DOMString
            See the border-left-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderRight of type DOMString
            See the border-right property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderRightColor of type DOMString
            See the border-right-color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderRightStyle of type DOMString
            See the border-right-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderRightWidth of type DOMString
            See the border-right-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderSpacing of type DOMString
            See the border-spacing property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderStyle of type DOMString
            See the border-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderTop of type DOMString
            See the border-top property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderTopColor of type DOMString
            See the border-top-color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderTopStyle of type DOMString
            See the border-top-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderTopWidth of type DOMString
            See the border-top-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        borderWidth of type DOMString
            See the border-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        bottom of type DOMString
            See the bottom property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        captionSide of type DOMString
            See the caption-side property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        clear of type DOMString
            See the clear property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        clip of type DOMString
            See the clip property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        color of type DOMString
            See the color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        content of type DOMString
            See the content property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        counterIncrement of type DOMString
            See the counter-increment property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        counterReset of type DOMString
            See the counter-reset property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        cssFloat of type DOMString
            See the float property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        cue of type DOMString
            See the cue property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        cueAfter of type DOMString
            See the cue-after property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        cueBefore of type DOMString
            See the cue-before property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        cursor of type DOMString
            See the cursor property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        direction of type DOMString
            See the direction property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        display of type DOMString
            See the display property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        elevation of type DOMString
            See the elevation property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        emptyCells of type DOMString
            See the empty-cells property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        font of type DOMString
            See the font property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        fontFamily of type DOMString
            See the font-family property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        fontSize of type DOMString
            See the font-size property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        fontSizeAdjust of type DOMString
            See the font-size-adjust property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        fontStretch of type DOMString
            See the font-stretch property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        fontStyle of type DOMString
            See the font-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        fontVariant of type DOMString
            See the font-variant property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        fontWeight of type DOMString
            See the font-weight property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        height of type DOMString
            See the height property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        left of type DOMString
            See the left property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        letterSpacing of type DOMString
            See the letter-spacing property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        lineHeight of type DOMString
            See the line-height property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        listStyle of type DOMString
            See the list-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        listStyleImage of type DOMString
            See the list-style-image property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        listStylePosition of type DOMString
            See the list-style-position property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        listStyleType of type DOMString
            See the list-style-type property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        margin of type DOMString
            See the margin property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        marginBottom of type DOMString
            See the margin-bottom property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        marginLeft of type DOMString
            See the margin-left property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        marginRight of type DOMString
            See the margin-right property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        marginTop of type DOMString
            See the margin-top property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        markerOffset of type DOMString
            See the marker-offset property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        marks of type DOMString
            See the marks property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        maxHeight of type DOMString
            See the max-height property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        maxWidth of type DOMString
            See the max-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        minHeight of type DOMString
            See the min-height property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        minWidth of type DOMString
            See the min-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        orphans of type DOMString
            See the orphans property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        outline of type DOMString
            See the outline property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        outlineColor of type DOMString
            See the outline-color property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        outlineStyle of type DOMString
            See the outline-style property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        outlineWidth of type DOMString
            See the outline-width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        overflow of type DOMString
            See the overflow property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        padding of type DOMString
            See the padding property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        paddingBottom of type DOMString
            See the padding-bottom property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        paddingLeft of type DOMString
            See the padding-left property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        paddingRight of type DOMString
            See the padding-right property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        paddingTop of type DOMString
            See the padding-top property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        page of type DOMString
            See the page property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pageBreakAfter of type DOMString
            See the page-break-after property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pageBreakBefore of type DOMString
            See the page-break-before property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pageBreakInside of type DOMString
            See the page-break-inside property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pause of type DOMString
            See the pause property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pauseAfter of type DOMString
            See the pause-after property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pauseBefore of type DOMString
            See the pause-before property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pitch of type DOMString
            See the pitch property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        pitchRange of type DOMString
            See the pitch-range property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        playDuring of type DOMString
            See the play-during property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        position of type DOMString
            See the position property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        quotes of type DOMString
            See the quotes property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        richness of type DOMString
            See the richness property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        right of type DOMString
            See the right property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        size of type DOMString
            See the size property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        speak of type DOMString
            See the speak property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        speakHeader of type DOMString
            See the speak-header property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        speakNumeral of type DOMString
            See the speak-numeral property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        speakPunctuation of type DOMString
            See the speak-punctuation property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        speechRate of type DOMString
            See the speech-rate property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        stress of type DOMString
            See the stress property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        tableLayout of type DOMString
            See the table-layout property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        textAlign of type DOMString
            See the text-align property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        textDecoration of type DOMString
            See the text-decoration property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        textIndent of type DOMString
            See the text-indent property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        textShadow of type DOMString
            See the text-shadow property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        textTransform of type DOMString
            See the text-transform property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        top of type DOMString
            See the top property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        unicodeBidi of type DOMString
            See the unicode-bidi property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        verticalAlign of type DOMString
            See the vertical-align property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        visibility of type DOMString
            See the visibility property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        voiceFamily of type DOMString
            See the voice-family property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        volume of type DOMString
            See the volume property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        whiteSpace of type DOMString
            See the white-space property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        widows of type DOMString
            See the widows property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        width of type DOMString
            See the width property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        wordSpacing of type DOMString
            See the word-spacing property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.
        zIndex of type DOMString
            See the z-index property definition in CSS2.
            Exceptions on setting

            DOMException
            	

            SYNTAX_ERR: Raised if the new value has a syntax error and is unparsable.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this property is readonly.

previous   next   contents   index

******************************************************************************/