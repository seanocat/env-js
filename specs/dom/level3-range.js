QUnit.module("DOM Level 3 Range");
/*****************************************************************************
http://www.w3.org/TR/2000/REC-DOM-Level-2-Traversal-Range-20001113/range.html

13 November, 2000
2. Document Object Model Range

Editors
    Peter Sharpe, SoftQuad Software Inc.
    Vidur Apparao, Netscape Communications Corp.
    Lauren Wood, SoftQuad Software Inc.

Table of contents

    * 2.1. Introduction
    * 2.2. Definitions and Notation
          o 2.2.1. Position
          o 2.2.2. Selection and Partial Selection
          o 2.2.3. Notation
    * 2.3. Creating a Range
    * 2.4. Changing a Range's Position
    * 2.5. Comparing Range Boundary-Points
    * 2.6. Deleting Content with a Range
    * 2.7. Extracting Content
    * 2.8. Cloning Content
    * 2.9. Inserting Content
    * 2.10. Surrounding Content
    * 2.11. Miscellaneous Members
    * 2.12. Range modification under document mutation
          o 2.12.1. Insertions
          o 2.12.2. Deletions
    * 2.13. Formal Description of the Range Interface
          o Range, DocumentRange, RangeException, RangeExceptionCode

2.1. Introduction

A Range identifies a range of content in a Document, DocumentFragment or Attr.
It is contiguous in the sense that it can be characterized as selecting all of
the content between a pair of boundary-points.

Note: In a text editor or a word processor, a user can make a selection by
pressing down the mouse at one point in a document, moving the mouse to another
point, and releasing the mouse. The resulting selection is contiguous and
consists of the content between the two points.

The term 'selecting' does not mean that every Range corresponds to a selection
made by a GUI user; however, such a selection can be returned to a DOM user as
a Range.

Note: In bidirectional writing (Arabic, Hebrew), a range may correspond to a
logical selection that is not necessarily contiguous when displayed. A visually
contiguous selection, also used in some cases, may not correspond to a single
logical selection, and may therefore have to be represented by more than one
range.

The Range interface provides methods for accessing and manipulating the
document tree at a higher level than similar methods in the Node interface. The
expectation is that each of the methods provided by the Range interface for the
insertion, deletion and copying of content can be directly mapped to a series
of Node editing operations enabled by DOM Core. In this sense, the Range
operations can be viewed as convenience methods that also enable the
implementation to optimize common editing patterns.

This chapter describes the Range interface, including methods for creating and
moving a Range and methods for manipulating content with Ranges.

The interfaces found within this section are not mandatory. A DOM application
may use the hasFeature(feature, version) method of the DOMImplementation
interface with parameter values "Range" and "2.0" (respectively) to determine
whether or not this module is supported by the implementation. In order to
fully support this module, an implementation must also support the "Core"
feature defined defined in the DOM Level 2 Core specification [DOM Level 2
Core]. Please refer to additional information about conformance in the DOM
Level 2 Core specification [DOM Level 2 Core].

2.2. Definitions and Notation

2.2.1. Position

This chapter refers to two different representations of a document: the text or
source form that includes the document markup and the tree representation
similar to the one described in the introduction section of the DOM Level 2
Core [DOM Level 2 Core].

A Range consists of two boundary-points corresponding to the start and the end
of the Range. A boundary-point's position in a Document or DocumentFragment
tree can be characterized by a node and an offset. The node is called the
container of the boundary-point and of its position. The container and its
ancestors are the ancestor containers of the boundary-point and of its
position. The offset within the node is called the offset of the boundary-point
and its position. If the container is an Attr, Document, DocumentFragment,
Element or EntityReference node, the offset is between its child nodes. If the
container is a CharacterData, Comment or ProcessingInstruction node, the offset
is between the 16-bit units of the UTF-16 encoded string contained by it.

The boundary-points of a Range must have a common ancestor container which is
either a Document, DocumentFragment or Attr node. That is, the content of a
Range must be entirely within the subtree rooted by a single Document,
DocumentFragment or Attr Node. This common ancestor container is known as the
root container of the Range. The tree rooted by the root container is known as
the Range's context tree.

The container of a boundary-point of a Range must be an Element, Comment,
ProcessingInstruction, EntityReference, CDATASection, Document,
DocumentFragment, Attr, or Text node. None of the ancestor containers of the
boundary-point of a Range can be a DocumentType, Entity or Notation node.

In terms of the text representation of a document, the boundary-points of a
Range can only be on token boundaries. That is, the boundary-point of the text
range cannot be in the middle of a start- or end-tag of an element or within
the name of an entity or character reference. A Range locates a contiguous
portion of the content of the structure model.

The relationship between locations in a text representation of the document and
in the Node tree interface of the DOM is illustrated in the following diagram:
Range Example Range Example

In this diagram, four different Ranges are illustrated. The boundary-points of
each Range are labelled with s# (the start of the Range) and e# (the end of the
Range), where # is the number of the Range. For Range 2, the start is in the
BODY element and is immediately after the H1 element and immediately before the
P element, so its position is between the H1 and P children of BODY. The offset
of a boundary-point whose container is not a CharacterData node is 0 if it is
before the first child, 1 if between the first and second child, and so on. So,
for the start of the Range 2, the container is BODY and the offset is 1. The
offset of a boundary-point whose container is a CharacterData node is obtained
similarly but using 16-bit unit positions instead. For example, the
boundary-point labelled s1 of the Range 1 has a Text node (the one containing
"Title") as its container and an offset of 2 since it is between the second and
third 16-bit unit.

Notice that the boundary-points of Ranges 3 and 4 correspond to the same
location in the text representation. An important feature of the Range is that
a boundary-point of a Range can unambiguously represent every position within
the document tree.

The containers and offsets of the boundary-points can be obtained through the
following read-only Range attributes:

  readonly attribute Node startContainer; 
  readonly attribute long startOffset;
  readonly attribute Node endContainer; 
  readonly attribute long endOffset;

If the boundary-points of a Range have the same containers and offsets, the
Range is said to be a collapsed Range. (This is often referred to as an
insertion point in a user agent.)

2.2.2. Selection and Partial Selection

A node or 16-bit unit unit is said to be selected by a Range if it is between
the two boundary-points of the Range, that is, if the position immediately
before the node or 16-bit unit is before the end of the Range and the position
immediately after the node or 16-bit unit is after the start of the range. For
example, in terms of a text representation of the document, an element would
be selected by a Range if its corresponding start-tag was located after the
start of the Range and its end-tag was located before the end of the Range. In
the examples in the above diagram, the Range 2 selects the P node and the
Range 3 selects the text node containing the text "Blah xyz."

A node is said to be partially selected by a Range if it is an ancestor
container of exactly one boundary-point of the Range. For example, consider
Range 1 in the above diagram. The element H1 is partially selected by that
Range since the start of the Range is within one of its children.

2.2.3. Notation

Many of the examples in this chapter are illustrated using a text
representation of a document. The boundary-points of a Range are indicated by
displaying the characters (be they markup or data characters) between the two
boundary-points in bold, as in

    <FOO>ABC<BAR>DEF</BAR></FOO>
                 

When both boundary-points are at the same position, they are indicated with a
bold caret ('^'), as in

    <FOO>A^BC<BAR>DEF</BAR></FOO>

2.3. Creating a Range

A Range is created by calling the createRange() method on the DocumentRange
interface. This interface can be obtained from the object implementing the
Document interface using binding-specific casting methods.

  interface DocumentRange {
    Range createRange();
  }

The initial state of the Range returned from this method is such that both of
its boundary-points are positioned at the beginning of the corresponding
Document, before any content. In other words, the container of each
boundary-point is the Document node and the offset within that node is 0.

Like some objects created using methods in the Document interface (such as
Nodes and DocumentFragments), Ranges created via a particular document
instance can select only content associated with that Document, or with
DocumentFragments and Attrs for which that Document is the ownerDocument. Such
Ranges, then, can not be used with other Document instances.

2.4. Changing a Range's Position

A Range's position can be specified by setting the container and offset of
each boundary-point with the setStart and setEnd methods.

  void setStart(in Node parent, in long offset)
                        raises(RangeException);
  void setEnd(in Node parent, in long offset)
                raises(RangeException);

If one boundary-point of a Range is set to have a root container other than
the current one for the Range, the Range is collapsed to the new position.
This enforces the restriction that both boundary-points of a Range must have
the same root container.

The start position of a Range is guaranteed to never be after the end
position. To enforce this restriction, if the start is set to be at a position
after the end, the Range is collapsed to that position. Similarly, if the end
is set to be at a position before the start, the Range is collapsed to that
position.

It is also possible to set a Range's position relative to nodes in the tree:

  void setStartBefore(in Node node);
                              raises(RangeException);
  void setStartAfter(in Node node);
                       raises(RangeException);
  void setEndBefore(in Node node);
                      raises(RangeException);
  void setEndAfter(in Node node);
                     raises(RangeException);

The parent of the node becomes the container of the boundary-point and the
Range is subject to the same restrictions as given above in the description of
setStart()and setEnd().

A Range can be collapsed to either boundary-point:

  void collapse(in boolean toStart);

Passing TRUE as the parameter toStart will collapse the Range to its start,
FALSE to its end.

Testing whether a Range is collapsed can be done by examining the collapsed
attribute:

  readonly attribute boolean collapsed;

The following methods can be used to make a Range select the contents of a
node or the node itself.

  void selectNode(in Node n);
  void selectNodeContents(in Node n);

The following examples demonstrate the operation of the methods selectNode and
selectNodeContents:

Before:
  ^<BAR><FOO>A<MOO>B</MOO>C</FOO></BAR>
After Range.selectNodeContents(FOO):
  <BAR><FOO>A<MOO>B</MOO>C</FOO></BAR>
(In this case, FOO is the parent of both boundary-points)
After Range.selectNode(FOO):

<BAR><FOO>A<MOO>B</MOO>C</FOO></BAR>

2.5. Comparing Range Boundary-Points

It is possible to compare two Ranges by comparing their boundary-points:

  short compareBoundaryPoints(in CompareHow how, in Range sourceRange)
  raises(RangeException);

where CompareHow is one of four values: START_TO_START, START_TO_END,
END_TO_END and END_TO_START. The return value is -1, 0 or 1 depending on
whether the corresponding boundary-point of the Range is before, equal to, or
after the corresponding boundary-point of sourceRange. An exception is thrown
if the two Ranges have different root containers.

The result of comparing two boundary-points (or positions) is specified below.
An informal but not always correct specification is that an boundary-point is
before, equal to, or after another if it corresponds to a location in a text
representation before, equal to, or after the other's corresponding location.

Let A and B be two boundary-points or positions. Then one of the following
holds: A is before B, A is equal to B, or A is after B. Which one holds is
specified in the following by examining four cases:

In the first case the boundary-points have the same container. A is before B
if its offset is less than the offset of B, A is equal to B if its offset is
equal to the offset of B, and A is after B if its offset is greater than the
offset of B.

In the second case a child node C of the container of A is an ancestor
container of B. In this case, A is before B if the offset of A is less than or
equal to the index of the child node C and A is after B otherwise.

In the third case a child node C of the container of B is an ancestor
container of A. In this case, A is before B if the index of the child node C
is less than the offset of B and A is after B otherwise.

In the fourth case, none of three other cases hold: the containers of A and B
are siblings or descendants of sibling nodes. In this case, A is before B if
the container of A is before the container of B in a pre-order traversal of
the Ranges' context tree and A is after B otherwise.

Note that because the same location in a text representation of the document
can correspond to two different positions in the DOM tree, it is possible for
two boundary-points to not compare equal even though they would be equal in
the text representation. For this reason, the informal definition above can
sometimes be incorrect.

2.6. Deleting Content with a Range

One can delete the contents selected by a Range with:

  void deleteContents();

deleteContents() deletes all nodes and characters selected by the Range. All
other nodes and characters remain in the context tree of the Range. Some
examples of this deletion operation are:

(1) <FOO>AB<MOO>CD</MOO>CD</FOO>  -->
<FOO>A^CD</FOO>

(2) <FOO>A<MOO>BC</MOO>DE</FOO>  -->
<FOO>A<MOO>B</MOO>^E</FOO>

(3) <FOO>XY<BAR>ZW</BAR>Q</FOO>  -->
<FOO>X^<BAR>W</BAR>Q</FOO>

(4) <FOO><BAR1>AB</BAR1><BAR2/><BAR3>CD</BAR3></FOO>
-->  <FOO><BAR1>A</BAR1>^<BAR3>D</BAR3>

After deleteContents() is invoked on a Range, the Range is collapsed. If no
node was partially selected by the Range, then it is collapsed to its original
start point, as in example (1). If a node was partially selected by the Range
and was an ancestor container of the start of the Range and no ancestor of the
node satisfies these two conditions, then the Range is collapsed to the
position immediately after the node, as in examples (2) and (4). If a node was
partially selected by the Range and was an ancestor container of the end of
the Range and no ancestor of the node satisfies these two conditions, then the
Range is collapsed to the position immediately before the node, as in examples
(3) and (4).

Note that if deletion of a Range leaves adjacent Text nodes, they are not
automatically merged, and empty Text nodes are not automatically removed. Two
Text nodes should be joined only if each is the container of one of the
boundary-points of a Range whose contents are deleted. To merge adjacent Text
nodes, or remove empty text nodes, the normalize() method on the Node
interface should be used.

2.7. Extracting Content

If the contents of a Range need to be extracted rather than deleted, the
following method may be used:

  DocumentFragment extractContents();

The extractContents() method removes nodes from the Range's context tree
similarly to the deleteContents() method. In addition, it places the deleted
contents in a new DocumentFragment. The following examples illustrate the
contents of the returned DocumentFragment:

(1) <FOO>AB<MOO>CD</MOO>CD</FOO>  -->
B<MOO>CD</MOO>

(2) <FOO>A<MOO>BC</MOO>DE</FOO>  -->
<MOO>C<MOO>D

(3) <FOO>XY<BAR>ZW</BAR>Q</FOO>  -->
Y<BAR>Z</BAR>

(4)
<FOO><BAR1>AB</BAR1><BAR2/><BAR3>CD</BAR3></FOO> -->
<BAR1>B</BAR1><BAR2/><BAR3>C</BAR3>

It is important to note that nodes that are partially selected by the Range
are cloned. Since part of such a node's contents must remain in the Range's
context tree and part of the contents must be moved to the new
DocumentFragment, a clone of the partially selected node is included in the
new DocumentFragment. Note that cloning does not take place for selected
elements; these nodes are moved to the new DocumentFragment.

2.8. Cloning Content

The contents of a Range may be duplicated using the following method:

  DocumentFragment cloneContents();

This method returns a DocumentFragment that is similar to the one returned by
the method extractContents(). However, in this case, the original nodes and
character data in the Range are not removed from the Range's context tree.
Instead, all of the nodes and text content within the returned
DocumentFragment are cloned.

2.9. Inserting Content

A node may be inserted into a Range using the following method:

  void insertNode(in Node n) raises(RangeException);

The insertNode() method inserts the specified node into the Range's context
tree. The node is inserted at the start boundary-point of the Range, without
modifying it.

If the start boundary point of the Range is in a Text node, the insertNode
operation splits the Text node at the boundary point. If the node to be
inserted is also a Text node, the resulting adjacent Text nodes are not
normalized automatically; this operation is left to the application.

The Node passed into this method can be a DocumentFragment. In that case, the
contents of the DocumentFragment are inserted at the start boundary-point of
the Range, but the DocumentFragment itself is not. Note that if the Node
represents the root of a sub-tree, the entire sub-tree is inserted.

The same rules that apply to the insertBefore() method on the Node interface
apply here. Specifically, the Node passed in, if it already has a parent, will
be removed from its existing position.

2.10. Surrounding Content

The insertion of a single node to subsume the content selected by a Range can
be performed with:

  void surroundContents(in Node newParent);

The surroundContents() method causes all of the content selected by the Range
to be rooted by the specified node. The nodes may not be Attr, Entity,
DocumentType, Notation, Document, or DocumentFragment nodes. Calling
surroundContents() with the Element node FOO in the following examples yields:

     Before:
       <BAR>AB<MOO>C</MOO>DE</BAR>

     After surroundContents(FOO):

<BAR>A<FOO>B<MOO>C</MOO>D</FOO>E</BAR>

Another way of describing the effect of this method on the Range's context
tree is to decompose it in terms of other operations:

   1. Remove the contents selected by the Range with a call to
      extractContents().
   2. Insert the node newParent where the Range is collapsed (after the
      extraction) with insertNode().
   3. Insert the entire contents of the extracted DocumentFragment into
      newParent. Specifically, invoke the appendChild() on newParent passing in
      the DocumentFragment returned as a result of the call to extractContents()
   4. Select newParent and all of its contents with selectNode().

The surroundContents() method raises an exception if the Range partially
selects a non-Text node. An example of a Range for which
surroundContents()raises an exception is:

     <FOO>AB<BAR>CD</BAR>E</FOO>

If the node newParent has any children, those children are removed before its
insertion. Also, if the node newParent already has a parent, it is removed
from the original parent's childNodes list.

2.11. Miscellaneous Members

One can clone a Range:

  Range cloneRange();

This creates a new Range which selects exactly the same content as that
selected by the Range on which the method cloneRange was invoked. No content
is affected by this operation.
******************************************************************************/
/******************************************************************************

Because the boundary-points of a Range do not necessarily have the same
containers, use:

  readonly attribute Node commonAncestorContainer;

to get the ancestor container of both boundary-points that is furthest down
from the Range's root container
******************************************************************************/
/******************************************************************************

One can get a copy of all the character data selected or partially selected by
a Range with:

  DOMString toString();

This does nothing more than simply concatenate all the character data selected
by the Range. This includes character data in both Text and CDATASection
nodes.
******************************************************************************/
/******************************************************************************

2.12. Range modification under document mutation

As a document is modified, the Ranges within the document need to be updated.
For example, if one boundary-point of a Range is within a node and that node
is removed from the document, then the Range would be invalid unless it is
fixed up in some way. This section describes how Ranges are modified under
document mutations so that they remain valid.

There are two general principles which apply to Ranges under document
mutation: The first is that all Ranges in a document will remain valid after
any mutation operation and the second is that, as much as possible, all Ranges
will select the same portion of the document after any mutation operation.

Any mutation of the document tree which affect Ranges can be considered to be
a combination of basic deletion and insertion operations. In fact, it can be
convenient to think of those operations as being accomplished using the
deleteContents() and insertNode() Range methods and, in the case of Text
mutations, the splitText() and normalize() methods.

2.12.1. Insertions

An insertion occurs at a single point, the insertion point, in the document.
For any Range in the document tree, consider each boundary-point. The only
case in which the boundary-point will be changed after the insertion is when
the boundary-point and the insertion point have the same container and the
offset of the insertion point is strictly less than the offset of the Range's
boundary-point. In that case the offset of the Range's boundary-point will be
increased so that it is between the same nodes or characters as it was before
the insertion.

Note that when content is inserted at a boundary-point, it is ambiguous as to
where the boundary-point should be repositioned if its relative position is to
be maintained. There are two possibilities: at the start or at the end of the
newly inserted content. We have chosen that in this case neither the container
nor offset of the boundary-point is changed. As a result, the boundary-point
will be positioned at the start of the newly inserted content.

Examples:

Suppose the Range selects the following:

<P>Abcd efgh XY blah ijkl</P>

Consider the insertion of the text "inserted text" at the following positions:

1. Before the 'X':

<P>Abcd efgh inserted textXY blah ijkl</P>
******************************************************************************/
test('Range Insertions Example 1', function(){
    
});
/******************************************************************************

2. After the 'X':

<P>Abcd efgh Xinserted textY blah ijkl</P>
******************************************************************************/
test('Range Insertions Example 2', function(){
    
});
/******************************************************************************

3. After the 'Y':

<P>Abcd efgh XYinserted text blah ijkl</P>
******************************************************************************/
test('Range Insertions Example 3', function(){
    
});
/******************************************************************************

4. After the 'h' in "Y blah":

<P>Abcd efgh XY blahinserted text ijkl</P>
******************************************************************************/
test('Range Insertions Example 4', function(){
    
});
/******************************************************************************
2.12.2. Deletions

Any deletion from the document tree can be considered as a sequence of
deleteContents() operations applied to a minimal set of disjoint Ranges. To
specify how a Range is modified under deletions we need only consider what
happens to a Range under a single deleteContents()operation of another Range.
And, in fact, we need only consider what happens to a single boundary-point of
the Range since both boundary-points are modified using the same algorithm.

If a boundary-point of the original Range is within the content being deleted,
then after the deletion it will be at the same position as the resulting
boundary-point of the (now collapsed) Range used to delete the contents.

If a boundary-point is after the content being deleted then it is not affected
by the deletion unless its container is also the container of one of the
boundary-points of the Range being deleted. If there is such a common
container, then the index of the boundary-point is modified so that the
boundary-point maintains its position relative to the content of the
container.

If a boundary-point is before the content being deleted then it is not
affected by the deletion at all.

Examples:

In these examples, the Range on which deleteContents()is invoked is indicated
by the underline.

Example 1.

Before:

<P>Abcd efgh The Range ijkl</P>

After:

<P>Abcd Range ijkl</P>
******************************************************************************/
test('Range Deletions Example 1', function(){
    
});
/******************************************************************************
Example 2.

Before:

<p>Abcd efgh The Range ijkl</p>

After:

<p>Abcd ^kl</p>
******************************************************************************/
test('Range Deletions Example 2', function(){
    
});
/******************************************************************************
Example 3.

Before:

<P>ABCD efgh The <EM>Range</EM> ijkl</P>

After:

<P>ABCD <EM>ange</EM> ijkl</P>

In this example, the container of the start boundary-point after the deletion
is the Text node holding the string "ange".
******************************************************************************/
test('Range Deletions Example 3', function(){
    
});
/******************************************************************************
Example 4.

Before:

<P>Abcd efgh The Range ijkl</P>

After:

<P>Abcd he Range ijkl</P>
******************************************************************************/
test('Range Deletions Example 4', function(){
    
});
/******************************************************************************
Example 5.

Before:

<P>Abcd <EM>efgh The Range ij</EM>kl</P>

After:

<P>Abcd ^kl</P>
******************************************************************************/
test('Range Deletions Example 5', function(){
    
});
/******************************************************************************

2.13. Formal Description of the Range Interface

To summarize, the complete, formal description of the Range interface is given
below:

Interface Range (introduced in DOM Level 2)


    IDL Definition

        // Introduced in DOM Level 2:
        interface Range {
          readonly attribute Node             startContainer;
                                        // raises(DOMException) on retrieval

          readonly attribute long             startOffset;
                                        // raises(DOMException) on retrieval

          readonly attribute Node             endContainer;
                                        // raises(DOMException) on retrieval

          readonly attribute long             endOffset;
                                        // raises(DOMException) on retrieval

          readonly attribute boolean          collapsed;
                                        // raises(DOMException) on retrieval

          readonly attribute Node             commonAncestorContainer;
                                        // raises(DOMException) on retrieval

          void               setStart(in Node refNode, 
                                      in long offset)
                                                raises(RangeException, 
                                                       DOMException);
          void               setEnd(in Node refNode, 
                                    in long offset)
                                                raises(RangeException, 
                                                       DOMException);
          void               setStartBefore(in Node refNode)
                                                raises(RangeException, 
                                                       DOMException);
          void               setStartAfter(in Node refNode)
                                                raises(RangeException, 
                                                       DOMException);
          void               setEndBefore(in Node refNode)
                                                raises(RangeException, 
                                                       DOMException);
          void               setEndAfter(in Node refNode)
                                                raises(RangeException, 
                                                       DOMException);
          void               collapse(in boolean toStart)
                                                raises(DOMException);
          void               selectNode(in Node refNode)
                                                raises(RangeException, 
                                                       DOMException);
          void               selectNodeContents(in Node refNode)
                                                raises(RangeException, 
                                                       DOMException);

          // CompareHow
          const unsigned short      START_TO_START                 = 0;
          const unsigned short      START_TO_END                   = 1;
          const unsigned short      END_TO_END                     = 2;
          const unsigned short      END_TO_START                   = 3;

          short              compareBoundaryPoints(in unsigned short how, 
                                                   in Range sourceRange)
                                                raises(DOMException);
          void               deleteContents()
                                                raises(DOMException);
          DocumentFragment   extractContents()
                                                raises(DOMException);
          DocumentFragment   cloneContents()
                                                raises(DOMException);
          void               insertNode(in Node newNode)
                                                raises(DOMException, 
                                                       RangeException);
          void               surroundContents(in Node newParent)
                                                raises(DOMException, 
                                                       RangeException);
          Range              cloneRange()
                                                raises(DOMException);
          DOMString          toString()
                                                raises(DOMException);
          void               detach()
                                                raises(DOMException);
        };

******************************************************************************/
test('Range.prototype', function(){
    
});
/******************************************************************************

    Definition group CompareHow

        Passed as a parameter to the compareBoundaryPoints method.

        Defined Constants

            END_TO_END
                Compare end boundary-point of sourceRange to end
                boundary-point of Range on which compareBoundaryPoints is
                invoked.
            END_TO_START
                Compare end boundary-point of sourceRange to start
                boundary-point of Range on which compareBoundaryPoints is
                invoked.
            START_TO_END
                Compare start boundary-point of sourceRange to end
                boundary-point of Range on which compareBoundaryPoints is
                invoked.
            START_TO_START
                Compare start boundary-point of sourceRange to start
                boundary-point of Range on which compareBoundaryPoints is
                invoked.
******************************************************************************/
test('Range.CONSTANTS', function(){
    
});
/******************************************************************************

    Attributes

        collapsed of type boolean, readonly
            TRUE if the Range is collapsed
            
            Exceptions on retrieval

            DOMException

            INVALID_STATE_ERR: Raised if detach() has already been invoked on
            this object.
******************************************************************************/
test('Range.prototype.collapsed', function(){
    
});
/******************************************************************************

        commonAncestorContainer of type Node, readonly
            The deepest common ancestor container of the Range's two
            boundary-points.

            Exceptions on retrieval

            DOMException
            	

            INVALID_STATE_ERR: Raised if detach() has already been invoked on
            this object.
******************************************************************************/
test('Range.prototype.commonAncestorContainer', function(){
    
});
/******************************************************************************

        endContainer of type Node, readonly
            Node within which the Range ends
            Exceptions on retrieval

            DOMException
            	

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
******************************************************************************/
test('Range.prototype.endContainer', function(){
    
});
/******************************************************************************
            
        endOffset of type long, readonly
            Offset within the ending node of the Range.
            Exceptions on retrieval

            DOMException
            	

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
******************************************************************************/
test('Range.prototype.endOffset', function(){
    
});
/******************************************************************************
            
        startContainer of type Node, readonly
            Node within which the Range begins
            Exceptions on retrieval

            DOMException
            	

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
******************************************************************************/
test('Range.prototype.startContainer', function(){
    
});
/******************************************************************************

        startOffset of type long, readonly
            Offset within the starting node of the Range.
            Exceptions on retrieval

            DOMException
            	

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
******************************************************************************/
test('Range.prototype.startOffset', function(){
    
});
/******************************************************************************

    Methods

        cloneContents
            Duplicates the contents of a Range
            Return Value

            DocumentFragment
            	

            A DocumentFragment that contains content equivalent to this Range.
            Exceptions

            DOMException

            HIERARCHY_REQUEST_ERR: Raised if a DocumentType node would be 
            extracted into the new DocumentFragment.

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Parameters
******************************************************************************/
test('Range.prototype.cloneContents', function(){
    
});
/******************************************************************************

        cloneRange
            Produces a new Range whose boundary-points are equal to the 
            boundary-points of the Range.
            
            Return Value

            Range	

            The duplicated Range.
            Exceptions

            DOMException

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Parameters
******************************************************************************/
test('Range.prototype.cloneRange', function(){
    
});
/******************************************************************************

        collapse
            Collapse a Range onto one of its boundary-points
            Parameters

            toStart of type boolean
                If TRUE, collapses the Range onto its start; if FALSE, 
                collapses it onto its end.

            Exceptions

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked 
            on this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.collapse', function(){
    
});
/******************************************************************************

        compareBoundaryPoints
            Compare the boundary-points of two Ranges in a document.
            
            Parameters

            how of type unsigned short
                A code representing the type of comparison, as defined above.
            sourceRange of type Range
                The Range on which this current Range is compared to.

            Return Value

            short
            	

            -1, 0 or 1 depending on whether the corresponding boundary-point 
            of the Range is respectively before, equal to, or after the 
            corresponding boundary-point of sourceRange.
            
            Exceptions

            DOMException
            	
            WRONG_DOCUMENT_ERR: Raised if the two Ranges are not in the same 
            Document or DocumentFragment.

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
******************************************************************************/
test('Range.prototype.compareBoundaryPoints', function(){
    
});
/******************************************************************************
        deleteContents
            Removes the contents of a Range from the containing document or 
            document fragment without returning a reference to the removed 
            content.
            
            Exceptions

            DOMException

            NO_MODIFICATION_ALLOWED_ERR: Raised if any portion of the content 
            of the Range is read-only or any of the nodes that contain any of 
            the content of the Range are read-only.

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Parameters
            No Return Value
******************************************************************************/
test('Range.prototype.deleteContents', function(){
    
});
/******************************************************************************

        detach
            Called to indicate that the Range is no longer in use and that the implementation may relinquish any resources associated with this Range. Subsequent calls to any methods or attribute getters on this Range will result in a DOMException being thrown with an error code of INVALID_STATE_ERR.
            Exceptions

            DOMException
            	

            INVALID_STATE_ERR: Raised if detach() has already been invoked on this object.
            No Parameters
            No Return Value
******************************************************************************/
test('Range.prototype.detach', function(){
    
});
/******************************************************************************
        extractContents
            Moves the contents of a Range from the containing document or 
            document fragment to a new DocumentFragment.
            
            Return Value

            DocumentFragment

            A DocumentFragment containing the extracted contents.
            Exceptions

            DOMException
            	
            NO_MODIFICATION_ALLOWED_ERR: Raised if any portion of the content of 
            the Range is read-only or any of the nodes which contain any of the 
            content of the Range are read-only.

            HIERARCHY_REQUEST_ERR: Raised if a DocumentType node would be 
            extracted into the new DocumentFragment.

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Parameters
******************************************************************************/
test('Range.prototype.extractContents', function(){
    
});
/******************************************************************************
        insertNode
            Inserts a node into the Document or DocumentFragment at the start 
            of the Range. If the container is a Text node, this will be split 
            at the start of the Range (as if the Text node's splitText method 
            was performed at the insertion point) and the insertion will occur 
            between the two resulting Text nodes. Adjacent Text nodes will not 
            be automatically merged. If the node to be inserted is a 
            DocumentFragment node, the children will be inserted rather than 
            the DocumentFragment node itself.
            
            Parameters

            newNode of type Node
                The node to insert at the start of the Range

            Exceptions

            DOMException
            	
            NO_MODIFICATION_ALLOWED_ERR: Raised if an ancestor container of
            the start of the Range is read-only.
            
            WRONG_DOCUMENT_ERR: Raised if newNode and the container of the
            start of the Range were not created from the same document.
            
            HIERARCHY_REQUEST_ERR: Raised if the container of the start of
            the Range is of a type that does not allow children of the type of
            newNode or if newNode is an ancestor of the container.
            
            INVALID_STATE_ERR: Raised if detach() has already been invoked on
            this object.

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if newNode is an Attr, Entity, 
            Notation, or Document node.
            
            No Return Value
******************************************************************************/
test('Range.prototype.insertNode', function(){
    
});
/******************************************************************************
        selectNode
            Select a node and its contents
            Parameters

            refNode of type Node
                The node to select.

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if an ancestor of refNode is an 
            Entity, Notation or DocumentType node or if refNode is a Document, 
            DocumentFragment, Attr, Entity, or Notation node.

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.selectNode', function(){
    
});
/******************************************************************************
        selectNodeContents
            Select the contents within a node
            Parameters

            refNode of type Node
                Node to select from

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if refNode or an ancestor of refNode 
            is an Entity, Notation or DocumentType node.

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.selectNodeContents', function(){
    
});
/******************************************************************************
        setEnd
            Sets the attributes describing the end of a Range.
            Parameters

            refNode of type Node
                The refNode value. This parameter must be different from null.
            offset of type long
                The endOffset value.

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if refNode or an ancestor of refNode 
            is an Entity, Notation, or DocumentType node.

            DOMException
            	
            INDEX_SIZE_ERR: Raised if offset is negative or greater than the 
            number of child units in refNode. Child units are 16-bit units if 
            refNode is a type of CharacterData node (e.g., a Text or Comment 
            node) or a ProcessingInstruction node. Child units are Nodes in all 
            other cases.

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.setEnd', function(){
    
});
/******************************************************************************
        setEndAfter
            Sets the end of a Range to be after a node
            Parameters

            refNode of type Node
                Range ends after refNode.

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if the root container of refNode is 
            not an Attr, Document or DocumentFragment node or if refNode is a 
            Document, DocumentFragment, Attr, Entity, or Notation node.

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.setEndAfter', function(){
    
});
/******************************************************************************
        setEndBefore
            Sets the end position to be before a node.
            Parameters

            refNode of type Node
                Range ends before refNode

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if the root container of refNode is 
            not an Attr, Document, or DocumentFragment node or if refNode is a 
            Document, DocumentFragment, Attr, Entity, or Notation node.

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.setEndBefore', function(){
    
});
/******************************************************************************
        setStart
            Sets the attributes describing the start of the Range.
            Parameters

            refNode of type Node
                The refNode value. This parameter must be different from null.
            offset of type long
                The startOffset value.

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if refNode or an ancestor of refNode 
            is an Entity, Notation, or DocumentType node.

            DOMException
            	
            INDEX_SIZE_ERR: Raised if offset is negative or greater than the 
            number of child units in refNode. Child units are 16-bit units if 
            refNode is a type of CharacterData node (e.g., a Text or Comment 
            node) or a ProcessingInstruction node. Child units are Nodes in 
            all other cases.

            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.setStart', function(){
    
});
/******************************************************************************
        setStartAfter
            Sets the start position to be after a node
            Parameters

            refNode of type Node
                Range starts after refNode

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if the root container of refNode is 
            not an Attr, Document, or DocumentFragment node or if refNode is a
            Document, DocumentFragment, Attr, Entity, or Notation node.

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.setStartAfter', function(){
    
});
/******************************************************************************
        setStartBefore
            Sets the start position to be before a node
            Parameters

            refNode of type Node
                Range starts before refNode

            Exceptions

            RangeException
            	
            INVALID_NODE_TYPE_ERR: Raised if the root container of refNode is 
            not an Attr, Document, or DocumentFragment node or if refNode is a 
            Document, DocumentFragment, Attr, Entity, or Notation node.

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Return Value
******************************************************************************/
test('Range.prototype.setStartBefore', function(){
    
});
/******************************************************************************
        surroundContents
            Reparents the contents of the Range to the given node and inserts 
            the node at the position of the start of the Range.
            
            Parameters

            newParent of type Node
                The node to surround the contents with.

            Exceptions

            DOMException
            
            NO_MODIFICATION_ALLOWED_ERR: Raised if an ancestor container of
            either boundary-point of the Range is read-only.
            
            WRONG_DOCUMENT_ERR: Raised if newParent and the container of the
            start of the Range were not created from the same document.
            
            HIERARCHY_REQUEST_ERR: Raised if the container of the start of
            the Range is of a type that does not allow children of the type of
            newParent or if newParent is an ancestor of the container or if
            node would end up with a child node of a type not allowed by the
            type of node.
            
            INVALID_STATE_ERR: Raised if detach() has already been invoked on
            this object.

            RangeException

            BAD_BOUNDARYPOINTS_ERR: Raised if the Range partially selects a 
            non-text node.

            INVALID_NODE_TYPE_ERR: Raised if node is an Attr, Entity, 
            DocumentType, Notation, Document, or DocumentFragment node.
            
            No Return Value
******************************************************************************/
test('Range.prototype.surroundContents', function(){
    
});
/******************************************************************************
        toString
            Returns the contents of a Range as a string. This string contains 
            only the data characters, not any markup.
            
            Return Value

            DOMString
            	
            The contents of the Range.
            Exceptions

            DOMException
            	
            INVALID_STATE_ERR: Raised if detach() has already been invoked on 
            this object.
            
            No Parameters
******************************************************************************/
test('Range.prototype.toString', function(){
    
});
/******************************************************************************

Interface DocumentRange (introduced in DOM Level 2)


    IDL Definition

        // Introduced in DOM Level 2:
        interface DocumentRange {
          Range              createRange();
        };
******************************************************************************/
test('DocumentRange.prototype', function(){
    
});
/******************************************************************************

    Methods

        createRange
            This interface can be obtained from the object implementing the 
            Document interface using binding-specific casting methods.
            
            Return Value

            Range
            	
            The initial state of the Range returned from this method is such 
            that both of its boundary-points are positioned at the beginning 
            of the corresponding Document, before any content. The Range 
            returned can only be used to select content associated with this 
            Document, or with DocumentFragments and Attrs for which this 
            Document is the ownerDocument.
            
            No Parameters
            No Exceptions
******************************************************************************/
test('DocumentRange.prototype.createRange', function(){
    
});
/******************************************************************************

Exception RangeException introduced in DOM Level 2

    Range operations may throw a RangeException as specified in their method 
    descriptions.


    IDL Definition

        // Introduced in DOM Level 2:
        exception RangeException {
          unsigned short   code;
        };
        // RangeExceptionCode
        const unsigned short      BAD_BOUNDARYPOINTS_ERR         = 1;
        const unsigned short      INVALID_NODE_TYPE_ERR          = 2;
******************************************************************************/
test('RangeException.prototype', function(){
    
});
/******************************************************************************


    Definition group RangeExceptionCode

        An integer indicating the type of error generated.

        Defined Constants

            BAD_BOUNDARYPOINTS_ERR
                If the boundary-points of a Range do not meet specific 
                requirements.
            INVALID_NODE_TYPE_ERR
                If the container of an boundary-point of a Range is being set 
                to either a node of an invalid type or a node with an ancestor 
                of an invalid type.

******************************************************************************/
test('RangeExceptionCode.prototype', function(){
    
});
/******************************************************************************

******************************************************************************/