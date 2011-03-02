QUnit.module('DOM Views Level 2');
/******************************************************************************
http://www.w3.org/TR/2000/REC-DOM-Level-2-Views-20001113/views.html

13 November, 2000
1. Document Object Model Views

Editors
    Arnaud Le Hors, IBM
    Laurence Cable, Sun Microsystems

Table of contents

    * 1.1. Introduction
    * 1.2. Interfaces
          o AbstractView, DocumentView

1.1. Introduction

A document may have one or more "views" associated with it, e.g., a computed 
view on a document after applying a CSS stylesheet, or multiple presentations 
(e.g., HTML Frame) of the same document in a client. That is, a view is some 
alternate representation of, or a presentation of, and associated with, a 
source document.

A view may be static, reflecting the state of the document when the view was
created, or dynamic, reflecting changes in the target document as they occur,
subsequent to the view being created. This Level of the DOM specification makes
no statement about these behaviors.

This section defines an AbstractView interface which provides a base interface
from which all such views shall derive. It defines an attribute which references
the target document of the AbstractView. The only semantics of the AbstractView
defined here create an association between a view and its target document.

There are no subinterfaces of AbstractView defined in the DOM Level 2.

However, AbstractView is defined in and used in this Level in two places:

    * A Document may implement a DocumentView that has a default view attribute 
      associated with it. This default view is typically dependent on the 
      implementation (e.g., the browser frame rendering the document). The 
      default view can be used in order to identify and/or associate a view 
      with its target document (by testing object equality on the AbstractView 
      or obtaining the DocumentView attribute).
    * A UIEvent typically occurs upon a view of a Document (e.g., a mouse click
      on a browser frame rendering a particular Document instance). A UIEvent 
      has an AbstractView associated with it which identifies both the 
      particular (implementation-dependent) view in which the event occurs, 
      and the target document the UIEvent is related to.

The interfaces found within this section are not mandatory. A DOM application
may use the hasFeature(feature, version) method of the DOMImplementation
interface with parameter values "Views" and "2.0" (respectively) to determine
whether or not this module is supported by the implementation. In order to fully
support this module, an implementation must also support the "Core" feature
defined defined in the Document Object Model Level 2 Core specification [DOM
Level 2 Core]. Please refer to additional information about conformance in the
DOM Level 2 Core specification.
******************************************************************************/
test('DOMImplementation.prototype.hasFeature("views", "2.0")', 
    function(){
        equals(
            document.implementation.hasFeature('views', '2.0'), 
            true,
            'DOM Level 2 Views Supported'
        );
    }
);
/*****************************************************************************

1.2. Interfaces

Interface AbstractView (introduced in DOM Level 2)

    A base interface that all views shall derive from.


    IDL Definition

        // Introduced in DOM Level 2:
        interface AbstractView {
          readonly attribute DocumentView     document;
        };
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************



    Attributes

        document of type DocumentView, readonly
            The source DocumentView of which this is an AbstractView.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************


Interface DocumentView (introduced in DOM Level 2)

    The DocumentView interface is implemented by Document objects in DOM
    implementations supporting DOM Views. It provides an attribute to retrieve
    the default view of a document.


    IDL Definition

        // Introduced in DOM Level 2:
        interface DocumentView {
          readonly attribute AbstractView     defaultView;
        };
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************



    Attributes

        defaultView of type AbstractView, readonly
            The default AbstractView for this Document, or null if none
            available.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************


******************************************************************************/

