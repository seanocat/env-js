QUnit.module("DOM Level 3 Range");
/******************************************************************************
http://www.w3.org/TR/2000/REC-DOM-Level-2-Traversal-Range-20001113/traversal.html

13 November, 2000
1. Document Object Model Traversal

Editors
    Joe Kesselman, IBM
    Jonathan Robie, Software AG
    Mike Champion, Software AG

Table of contents

    * 1.1. Overview
          o 1.1.1. NodeIterators
          o 1.1.2. NodeFilters
          o 1.1.3. TreeWalker
    * 1.2. Formal Interface Definition
          o NodeIterator, NodeFilter, TreeWalker, DocumentTraversal

1.1. Overview

This chapter describes the optional DOM Level 2 Traversal feature. Its
TreeWalker, NodeIterator, and NodeFilter interfaces provide easy-to-use,
robust, selective traversal of a document's contents.

The interfaces found within this section are not mandatory. A DOM application
may use the hasFeature(feature, version) method of the DOMImplementation
interface with parameter values "Traversal" and "2.0" (respectively) to
determine whether or not this module is supported by the implementation. In
order to fully support this module, an implementation must also support the
"Core" feature defined defined in the DOM Level 2 Core specification [DOM Level
2 Core]. Please refer to additional information about conformance in the DOM
Level 2 Core specification [DOM Level 2 Core].

NodeIterators and TreeWalkers are two different ways of representing the nodes
of a document subtree and a position within the nodes they present. A
NodeIterator presents a flattened view of the subtree as an ordered sequence of
nodes, presented in document order. Because this view is presented without
respect to hierarchy, iterators have methods to move forward and backward, but
not to move up and down. Conversely, a TreeWalker maintains the hierarchical
relationships of the subtree, allowing navigation of this hierarchy. In
general, TreeWalkers are better for tasks in which the structure of the
document around selected nodes will be manipulated, while NodeIterators are
better for tasks that focus on the content of each selected node.

NodeIterators and TreeWalkers each present a view of a document subtree that
may not contain all nodes found in the subtree. In this specification, we refer
to this as the logical view to distinguish it from the physical view, which
corresponds to the document subtree per se. When an iterator or TreeWalker is
created, it may be associated with a NodeFilter, which examines each node and
determines whether it should appear in the logical view. In addition, flags may
be used to specify which node types should occur in the logical view.

NodeIterators and TreeWalkers are dynamic - the logical view changes to reflect
changes made to the underlying document. However, they differ in how they
respond to those changes. NodeIterators, which present the nodes sequentially,
attempt to maintain their location relative to a position in that sequence when
the sequence's contents change. TreeWalkers, which present the nodes as a
filtered tree, maintain their location relative to their current node and
remain attached to that node if it is moved to a new context. We will discuss
these behaviors in greater detail below.

1.1.1. NodeIterators

A NodeIterator allows the members of a list of nodes to be returned
sequentially. In the current DOM interfaces, this list will always consist of
the nodes of a subtree, presented in document order. When an iterator is first
created, calling its nextNode() method returns the first node in the logical
view of the subtree; in most cases, this is the root of the subtree. Each
successive call advances the NodeIterator through the list, returning the next
node available in the logical view. When no more nodes are visible, nextNode()
returns null.

NodeIterators are created using the createNodeIterator method found in the
DocumentTraversal interface. When a NodeIterator is created, flags can be used
to determine which node types will be "visible" and which nodes will be
"invisible" while traversing the tree; these flags can be combined using the OR
operator. Nodes that are "invisible" are skipped over by the iterator as though
they did not exist.

The following code creates an iterator, then calls a function to print the name
of each element:

    NodeIterator iter=
     ((DocumentTraversal)document).createNodeIterator(
          root, NodeFilter.SHOW_ELEMENT, null);

    while (Node n = iter.nextNode())
        printMe(n);

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************     

1.1.1.1. Moving Forward and Backward

NodeIterators present nodes as an ordered list, and move forward and backward
within this list. The iterator's position is always either between two nodes,
before the first node, or after the last node. When an iterator is first
created, the position is set before the first item. The following diagram shows
the list view that an iterator might provide for a particular subtree, with the
position indicated by an asterisk '*' :

 * A B C D E F G H I

Each call to nextNode() returns the next node and advances the position. For
instance, if we start with the above position, the first call to nextNode()
returns "A" and advances the iterator:

 [A] * B C D E F G H I

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

The position of a NodeIterator can best be described with respect to the last
node returned, which we will call the reference node. When an iterator is
created, the first node is the reference node, and the iterator is positioned
before the reference node. In these diagrams, we use square brackets to
indicate the reference node.

A call to previousNode() returns the previous node and moves the position
backward. For instance, if we start with the NodeIterator between "A" and "B",
it would return "A" and move to the position shown below:

 * [A] B C D E F G H I
 
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

If nextNode() is called at the end of a list, or previousNode() is called at
the beginning of a list, it returns null and does not change the position of
the iterator. When a NodeIterator is first created, the reference node is the
first node:

 * [A] B C D E F G H I
 
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

1.1.1.2. Robustness

A NodeIterator may be active while the data structure it navigates is being
edited, so an iterator must behave gracefully in the face of change. Additions
and removals in the underlying data structure do not invalidate a NodeIterator;
in fact, a NodeIterator is never invalidated unless its detach() method is
invoked. To make this possible, the iterator uses the reference node to
maintain its position. The state of an iterator also depends on whether the
iterator is positioned before or after the reference node.

If changes to the iterated list do not remove the reference node, they do not
affect the state of the NodeIterator. For instance, the iterator's state is not
affected by inserting new nodes in the vicinity of the iterator or removing
nodes other than the reference node. Suppose we start from the following
position:

A B C [D] * E F G H I

Now let's remove "E". The resulting state is:

A B C [D] * F G H I

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

If a new node is inserted, the NodeIterator stays close to the reference node,
so if a node is inserted between "D" and "F", it will occur between the
iterator and "F":

A B C [D] * X F G H I

Moving a node is equivalent to a removal followed by an insertion. If we move
"I" to the position before "X" the result is:

A B C [D] * I X F G H
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

If the reference node is removed from the list being iterated over, a different
node is selected as the reference node. If the reference node's position is
before that of the NodeIterator, which is usually the case after nextNode() has
been called, the nearest node before the iterator is chosen as the new
reference node. Suppose we remove the "D" node, starting from the following
state:

A B C [D] * F G H I

The "C" node becomes the new reference node, since it is the nearest node to
the NodeIterator that is before the iterator:

A B [C] * F G H I
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

If the reference node is after the NodeIterator, which is usually the case
after previousNode() has been called, the nearest node after the iterator is
chosen as the new reference node. Suppose we remove "E", starting from the
following state:

A B C D * [E] F G H I

The "F" node becomes the new reference node, since it is the nearest node to
the NodeIterator that is after the iterator:

A B C D * [F] G H I
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

As noted above, moving a node is equivalent to a removal followed by an
insertion. Suppose we wish to move the "D" node to the end of the list,
starting from the following state:

A B C [D] * F G H I C

The resulting state is as follows:

A B [C] * F G H I D
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

One special case arises when the reference node is the last node in the list
and the reference node is removed. Suppose we remove node "C", starting from
the following state:

A B * [C]

According to the rules we have given, the new reference node should be the
nearest node after the NodeIterator, but there are no further nodes after "C".
The same situation can arise when previousNode() has just returned the first
node in the list, which is then removed. Hence: If there is no node in the
original direction of the reference node, the nearest node in the opposite
direction is selected as the reference node:

A [B] *
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

If the NodeIterator is positioned within a block of nodes that is removed, the
above rules clearly indicate what is to be done. For instance, suppose "C" is
the parent node of "D", "E", and "F", and we remove "C", starting with the
following state:

A B C [D] * E F G H I D

The resulting state is as follows:

A [B] * G H I D
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Finally, note that removing a NodeIterator's root node from its parent does not
alter the list being iterated over, and thus does not change the iterator's
state. 1.1.1.3. Visibility of Nodes

The underlying data structure that is being iterated may contain nodes that are
not part of the logical view, and therefore will not be returned by the
NodeIterator. If nodes that are to be excluded because of the value of the
whatToShow flag, nextNode() returns the next visible node, skipping over the
excluded "invisible" nodes. If a NodeFilter is present, it is applied before
returning a node; if the filter does not accept the node, the process is
repeated until a node is accepted by the filter and is returned. If no visible
nodes are encountered, a null is returned and the iterator is positioned at the
end of the list. In this case, the reference node is the last node in the list,
whether or not it is visible. The same approach is taken, in the opposite
direction, for previousNode().

In the following examples, we will use lowercase letters to represent nodes
that are in the data structure, but which are not in the logical view. For
instance, consider the following list:

A [B] * c d E F G

A call to nextNode() returns E and advances to the following position:

A B c d [E] * F G

Nodes that are not visible may nevertheless be used as reference nodes if a
reference node is removed. Suppose node "E" is removed, started from the state
given above. The resulting state is:

A B c [d] * F G
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Suppose a new node "X", which is visible, is inserted before "d". The resulting
state is:

A B c X [d] * F G
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Note that a call to previousNode() now returns node X. It is important not to
skip over invisible nodes when the reference node is removed, because there are
cases, like the one just given above, where the wrong results will be returned.
When "E" was removed, if the new reference node had been "B" rather than "d",
calling previousNode() would not return "X". 1.1.2. NodeFilters

NodeFilters allow the user to create objects that "filter out" nodes. Each
filter contains a user-written function that looks at a node and determines
whether or not it should be presented as part of the traversal's logical view
of the document. To use a NodeFilter, you create a NodeIterator or a TreeWalker
that uses the filter. The traversal engine applies the filter to each node, and
if the filter does not accept the node, traversal skips over the node as though
it were not present in the document. NodeFilters need not know how to navigate
the structure that contains the nodes on which they operate.

Filters will be consulted when a traversal operation is performed, or when a
NodeIterator's reference node is removed from the subtree being iterated over
and it must select a new one. However, the exact timing of these filter calls
may vary from one DOM implementation to another. For that reason, NodeFilters
should not attempt to maintain state based on the history of past invocations;
the resulting behavior may not be portable.

Similarly, TreeWalkers and NodeIterators should behave as if they have no
memory of past filter results, and no anticipation of future results. If the
conditions a NodeFilter is examining have changed (e.g., an attribute which it
tests has been added or removed) since the last time the traversal logic
examined this node, this change in visibility will be discovered only when the
next traversal operation is performed. For example: if the filtering for the
current node changes from FILTER_SHOW to FILTER_SKIP, a TreeWalker will be able
to navigate off that node in any direction, but not back to it unless the
filtering conditions change again. NodeFilters which change during a traversal
can be written, but their behavior may be confusing and they should be avoided
when possible. 1.1.2.1. Using NodeFilters

A NodeFilter contains one method named acceptNode(), which allows a
NodeIterator or TreeWalker to pass a Node to a filter and ask whether it should
be present in the logical view. The acceptNode() function returns one of three
values to state how the Node should be treated. If acceptNode() returns
FILTER_ACCEPT, the Node will be present in the logical view; if it returns
FILTER_SKIP, the Node will not be present in the logical view, but the children
of the Node may; if it returns FILTER_REJECT, neither the Node nor its
descendants will be present in the logical view. Since iterators present nodes
as an ordered list, without hierarchy, FILTER_REJECT and FILTER_SKIP are
synonyms for NodeIterators, skipping only the single current node.

Consider a filter that accepts the named anchors in an HTML document. In HTML,
an HREF can refer to any A element that has a NAME attribute. Here is a
NodeFilter in Java that looks at a node and determines whether it is a named
anchor:

    class NamedAnchorFilter implements NodeFilter
    {
     short acceptNode(Node n) {
      if (n.getNodeType()==Node.ELEMENT_NODE) {
       Element e = (Element)n;
       if (! e.getNodeName().equals("A"))
        return FILTER_SKIP;
      if (e.getAttributeNode("NAME") != null)
        return FILTER_ACCEPT;
       }
        return FILTER_SKIP;
      }
    }

If the above NodeFilter were to be used only with NodeIterators, it could have
used FILTER_REJECT wherever FILTER_SKIP is used, and the behavior would not
change. For TreeWalker, though, FILTER_REJECT would reject the children of any
element that is not a named anchor, and since named anchors are always
contained within other elements, this would have meant that no named anchors
would be found. FILTER_SKIP rejects the given node, but continues to examine
the children; therefore, the above filter will work with either a NodeIterator
or a TreeWalker.

To use this filter, the user would create an instance of the NodeFilter and
create a NodeIterator using it:

NamedAnchorFilter myFilter = new NamedAnchorFilter(); 
NodeIterator iter=
     ((DocumentTraversal)document).createNodeIterator(
          node, NodeFilter.SHOW_ELEMENT, myFilter);
   

Note that the use of the SHOW_ELEMENT flag is not strictly necessary in this
example, since our sample NodeFilter tests the nodeType. However, some
implementations of the Traversal interfaces may be able to improve whatToShow
performance by taking advantage of knowledge of the document's structure, which
makes the use of SHOW_ELEMENT worthwhile. Conversely, while we could remove the
nodeType test from our filter, that would make it dependent upon whatToShow to
distinguish between Elements, Attr's, and ProcessingInstructions. 

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

1.1.2.2. NodeFilters and Exceptions

When writing a NodeFilter, users should avoid writing code that can throw an
exception. However, because a DOM implementation can not prevent exceptions
from being thrown, it is important that the behavior of filters that throw an
exception be well-defined. A TreeWalker or NodeIterator does not catch or alter
an exception thrown by a filter, but lets it propagate up to the user's code.
The following functions may invoke a NodeFilter, and may therefore propagate an
exception if one is thrown by a filter:

   1. NodeIterator .nextNode()
   2. NodeIterator .previousNode()
   3. TreeWalker .firstChild()
   4. TreeWalker .lastChild()
   5. TreeWalker .nextSibling()
   6. TreeWalker .previousSibling()
   7. TreeWalker .nextNode()
   8. TreeWalker .previousNode()
   9. TreeWalker .parentNode()
   
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

1.1.2.3. NodeFilters and Document Mutation

Well-designed NodeFilters should not have to modify the underlying structure of
the document. But a DOM implementation can not prevent a user from writing
filter code that does alter the document structure. Traversal does not provide
any special processing to handle this case. For instance, if a NodeFilter
removes a node from a document, it can still accept the node, which means that
the node may be returned by the NodeIterator or TreeWalker even though it is no
longer in the subtree being traversed. In general, this may lead to
inconsistent, confusing results, so we encourage users to write NodeFilters
that make no changes to document structures. Instead, do your editing in the
loop controlled by the traversal object. 

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

1.1.2.4. NodeFilters and whatToShow flags

NodeIterator and TreeWalker apply their whatToShow flags before applying
filters. If a node is skipped by the active whatToShow flags, a NodeFilter will
not be called to evaluate that node. Please note that this behavior is similar
to that of FILTER_SKIP; children of that node will be considered, and filters
may be called to evaluate them. Also note that it will in fact be a "skip" even
if the NodeFilter would have preferred to reject the entire subtree; if this
would cause a problem in your application, consider setting whatToShow to
SHOW_ALL and performing the nodeType test inside your filter. 

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

1.1.3. TreeWalker

The TreeWalker interface provides many of the same benefits as the NodeIterator
interface. The main difference between these two interfaces is that the
TreeWalker presents a tree-oriented view of the nodes in a subtree, rather than
the iterator's list-oriented view. In other words, an iterator allows you to
move forward or back, but a TreeWalker allows you to also move to the parent of
a node, to one of its children, or to a sibling.

Using a TreeWalker is quite similar to navigation using the Node directly, and
the navigation methods for the two interfaces are analogous. For instance, here
is a function that recursively walks over a tree of nodes in document order,
taking separate actions when first entering a node and after processing any
children:

processMe(Node n) {
   nodeStartActions(n);
   for (Node child=n.firstChild(); 
        child != null;
        child=child.nextSibling()) {
      processMe(child);
   }
   nodeEndActions(n);
}
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Doing the same thing using a TreeWalker is quite similar. There is one
difference: since navigation on the TreeWalker changes the current position,
the position at the end of the function has changed. A read/write attribute
named currentNode allows the current node for a TreeWalker to be both queried
and set. We will use this to ensure that the position of the TreeWalker is
restored when this function is completed:

processMe(TreeWalker tw) {
   Node n = tw.getCurrentNode();
   nodeStartActions(tw);
   for (Node child=tw.firstChild(); 
        child!=null;
        child=tw.nextSibling()) {
      processMe(tw);
   }

   tw.setCurrentNode(n);
   nodeEndActions(tw);
}
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

The advantage of using a TreeWalker instead of direct Node navigation is that
the TreeWalker allows the user to choose an appropriate view of the tree. Flags
may be used to show or hide Comments or ProcessingInstructions; entities may be
expanded or shown as EntityReference nodes. In addition, NodeFilters may be
used to present a custom view of the tree. Suppose a program needs a view of a
document that shows which tables occur in each chapter, listed by chapter. In
this view, only the chapter elements and the tables that they contain are seen.
The first step is to write an appropriate filter:

class TablesInChapters implements NodeFilter {

   short acceptNode(Node n) {
      if (n.getNodeType()==Node.ELEMENT_NODE) {
    
          if (n.getNodeName().equals("CHAPTER"))
             return FILTER_ACCEPT;

          if (n.getNodeName().equals("TABLE"))
             return FILTER_ACCEPT;

          if (n.getNodeName().equals("SECT1")
              || n.getNodeName().equals("SECT2")
              || n.getNodeName().equals("SECT3")
              || n.getNodeName().equals("SECT4")
              || n.getNodeName().equals("SECT5")
              || n.getNodeName().equals("SECT6")
              || n.getNodeName().equals("SECT7"))
             return FILTER_SKIP;

      }

      return FILTER_REJECT;
    }
}
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

This filter assumes that TABLE elements are contained directly in CHAPTER or
SECTn elements. If another kind of element is encountered, it and its children
are rejected. If a SECTn element is encountered, it is skipped, but its
children are explored to see if they contain any TABLE elements.

Now the program can create an instance of this NodeFilter, create a TreeWalker
that uses it, and pass this TreeWalker to our ProcessMe() function:

TablesInChapters tablesInChapters  = new TablesInChapters();
TreeWalker tw  = 
     ((DocumentTraversal)document).createTreeWalker(
          root, NodeFilter.SHOW_ELEMENT, tablesInChapters);
processMe(tw);
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

(Again, we've chosen to both test the nodeType in the filter's logic and use
SHOW_ELEMENT, for the reasons discussed in the earlier NodeIterator example.)

Without making any changes to the above ProcessMe() function, it now processes
only the CHAPTER and TABLE elements. The programmer can write other filters or
set other flags to choose different sets of nodes; if functions use TreeWalker
to navigate, they will support any view of the document defined with a
TreeWalker.

Note that the structure of a TreeWalker's filtered view of a document may
differ significantly from that of the document itself. For example, a
TreeWalker with only SHOW_TEXT specified in its whatToShow parameter would
present all the Text nodes as if they were siblings of each other yet had no
parent.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

1.1.3.1. Robustness

As with NodeIterators, a TreeWalker may be active while the data structure it
navigates is being edited, and must behave gracefully in the face of change.
Additions and removals in the underlying data structure do not invalidate a
TreeWalker; in fact, a TreeWalker is never invalidated.

But a TreeWalker's response to these changes is quite different from that of a
NodeIterator. While NodeIterators respond to editing by maintaining their
position within the list that they are iterating over, TreeWalkers will instead
remain attached to their currentNode. All the TreeWalker's navigation methods
operate in terms of the context of the currentNode at the time they are
invoked, no matter what has happened to, or around, that node since the last
time the TreeWalker was accessed. This remains true even if the currentNode is
moved out of its original subtree.

As an example, consider the following document fragment:

    ...
    <subtree>
        <twRoot>
            <currentNode/>
            <anotherNode/>
        </twRoot>
    </subtree>
    ...
 
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Let's say we have created a TreeWalker whose root node is the <twRoot/> element
and whose currentNode is the <currentNode/> element. For this illustration, we
will assume that all the nodes shown above are accepted by the TreeWalker's
whatToShow and filter settings.

If we use removeChild() to remove the <currentNode/> element from its parent,
that element remains the TreeWalker's currentNode, even though it is no longer
within the root node's subtree. We can still use the TreeWalker to navigate
through any children that the orphaned currentNode may have, but are no longer
able to navigate outward from the currentNode since there is no parent
available.

If we use insertBefore() or appendChild() to give the <currentNode/> a new
parent, then TreeWalker navigation will operate from the currentNode's new
location. For example, if we inserted the <currentNode/> immediately after the
<anotherNode/> element, the TreeWalker's previousSibling() operation would move
it back to the <anotherNode/>, and calling parentNode() would move it up to the
<twRoot/>.

If we instead insert the currentNode into the <subtree/> element, like so:

    ...
    <subtree>
        <currentNode/>
        <twRoot>
            <anotherNode/>
        </twRoot>
    </subtree>
    ...

we have moved the currentNode out from under the TreeWalker's root node. This
does not invalidate the TreeWalker; it may still be used to navigate relative
to the currentNode. Calling its parentNode() operation, for example, would move
it to the <subtree/> element, even though that too is outside the original root
node. However, if the TreeWalker's navigation should take it back into the
original root node's subtree -- for example, if rather than calling
parentNode() we called nextNode(), moving the TreeWalker to the <twRoot/>
element -- the root node will "recapture" the TreeWalker, and prevent it from
traversing back out.

This becomes a bit more complicated when filters are in use. Relocation of the
currentNode -- or explicit selection of a new currentNode, or changes in the
conditions that the NodeFilter is basing its decisions on -- can result in a
TreeWalker having a currentNode which would not otherwise be visible in the
filtered (logical) view of the document. This node can be thought of as a
"transient member" of that view. When you ask the TreeWalker to navigate off
this node the result will be just as if it had been visible, but you may be
unable to navigate back to it unless conditions change to make it visible
again.

In particular: If the currentNode becomes part of a subtree that would
otherwise have been Rejected by the filter, that entire subtree may be added as
transient members of the logical view. You will be able to navigate within that
subtree (subject to all the usual filtering) until you move upward past the
Rejected ancestor. The behavior is as if the Rejected node had only been
Skipped (since we somehow wound up inside its subtree) until we leave it;
thereafter, standard filtering applies.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

1.2. Formal Interface Definition

Interface NodeIterator (introduced in DOM Level 2)

    Iterators are used to step through a set of nodes, e.g. the set of nodes in
    a NodeList, the document subtree governed by a particular Node, the results
    of a query, or any other set of nodes. The set of nodes to be iterated is
    determined by the implementation of the NodeIterator. DOM Level 2 specifies
    a single NodeIterator implementation for document-order traversal of a
    document subtree. Instances of these iterators are created by calling
    DocumentTraversal .createNodeIterator().

    IDL Definition

        // Introduced in DOM Level 2:
        interface NodeIterator {
          readonly attribute Node             root;
          readonly attribute unsigned long    whatToShow;
          readonly attribute NodeFilter       filter;
          readonly attribute boolean          expandEntityReferences;
          Node               nextNode()
                                                raises(DOMException);
          Node               previousNode()
                                                raises(DOMException);
          void               detach();
        };

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Attributes

        expandEntityReferences of type boolean, readonly
            The value of this flag determines whether the children of entity
            reference nodes are visible to the iterator. If false, they and
            their descendants will be rejected. Note that this rejection takes
            precedence over whatToShow and the filter. Also note that this is
            currently the only situation where NodeIterators may reject a
            complete subtree rather than skipping individual nodes.
            
             To produce a view of the document that has entity references
            expanded and does not expose the entity reference node itself, use
            the whatToShow flags to hide the entity reference node and set
            expandEntityReferences to true when creating the iterator. To
            produce a view of the document that has entity reference nodes but
            no entity expansion, use the whatToShow flags to show the entity
            reference node and set expandEntityReferences to false.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        filter of type NodeFilter, readonly
            The NodeFilter used to screen nodes.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        root of type Node, readonly
            The root node of the NodeIterator, as specified when it was 
            created.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        whatToShow of type unsigned long, readonly
            This attribute determines which node types are presented via the 
            iterator. The available set of constants is defined in the 
            NodeFilter interface. Nodes not accepted by whatToShow will be 
            skipped, but their children may still be considered. Note that 
            this skip takes precedence over the filter, if any.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Methods

        detach
            Detaches the NodeIterator from the set which it iterated over,
            releasing any computational resources and placing the iterator in
            the INVALID state. After detach has been invoked, calls to
            nextNode or previousNode will raise the exception
            INVALID_STATE_ERR.
            No Parameters
            No Return Value
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        nextNode
            Returns the next node in the set and advances the position of the
            iterator in the set. After a NodeIterator is created, the first
            call to nextNode() returns the first node in the set.
            Return Value

            Node
            	

            The next Node in the set being iterated over, or null if there are
            no more members in that set.
            Exceptions

            DOMException
            	

            INVALID_STATE_ERR: Raised if this method is called after the
            detach method was invoked.
            No Parameters
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        previousNode
            Returns the previous node in the set and moves the position of the
            NodeIterator backwards in the set.
            Return Value

            Node
            	

            The previous Node in the set being iterated over, or null if there
            are no more members in that set.

            Exceptions

            DOMException
            	
            INVALID_STATE_ERR: Raised if this method is called after the
            detach method was invoked.
            No Parameters
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Interface NodeFilter (introduced in DOM Level 2)

    Filters are objects that know how to "filter out" nodes. If a NodeIterator
    or TreeWalker is given a NodeFilter, it applies the filter before it
    returns the next node. If the filter says to accept the node, the
    traversal logic returns it; otherwise, traversal looks for the next node
    and pretends that the node that was rejected was not there.
    
     The DOM does not provide any filters. NodeFilter is just an interface
    that users can implement to provide their own filters.
    
     NodeFilters do not need to know how to traverse from node to node, nor do
    they need to know anything about the data structure that is being
    traversed. This makes it very easy to write filters, since the only thing
    they have to know how to do is evaluate a single node. One filter may be
    used with a number of different kinds of traversals, encouraging code
    reuse.


    IDL Definition

        // Introduced in DOM Level 2:
        interface NodeFilter {

          // Constants returned by acceptNode
          const short               FILTER_ACCEPT                  = 1;
          const short               FILTER_REJECT                  = 2;
          const short               FILTER_SKIP                    = 3;


          // Constants for whatToShow
          const unsigned long       SHOW_ALL                       = 0xFFFFFFFF;
          const unsigned long       SHOW_ELEMENT                   = 0x00000001;
          const unsigned long       SHOW_ATTRIBUTE                 = 0x00000002;
          const unsigned long       SHOW_TEXT                      = 0x00000004;
          const unsigned long       SHOW_CDATA_SECTION             = 0x00000008;
          const unsigned long       SHOW_ENTITY_REFERENCE          = 0x00000010;
          const unsigned long       SHOW_ENTITY                    = 0x00000020;
          const unsigned long       SHOW_PROCESSING_INSTRUCTION    = 0x00000040;
          const unsigned long       SHOW_COMMENT                   = 0x00000080;
          const unsigned long       SHOW_DOCUMENT                  = 0x00000100;
          const unsigned long       SHOW_DOCUMENT_TYPE             = 0x00000200;
          const unsigned long       SHOW_DOCUMENT_FRAGMENT         = 0x00000400;
          const unsigned long       SHOW_NOTATION                  = 0x00000800;

          short              acceptNode(in Node n);
        };
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************


    Definition group Constants returned by acceptNode

        The following constants are returned by the acceptNode() method:

        Defined Constants

            FILTER_ACCEPT
                Accept the node. Navigation methods defined for NodeIterator
                or TreeWalker will return this node.
            FILTER_REJECT
                Reject the node. Navigation methods defined for NodeIterator
                or TreeWalker will not return this node. For TreeWalker, the
                children of this node will also be rejected. NodeIterators
                treat this as a synonym for FILTER_SKIP.
            FILTER_SKIP
                Skip this single node. Navigation methods defined for
                NodeIterator or TreeWalker will not return this node. For both
                NodeIterator and TreeWalker, the children of this node will
                still be considered.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Definition group Constants for whatToShow

        These are the available values for the whatToShow parameter used in
        TreeWalkers and NodeIterators. They are the same as the set of
        possible types for Node, and their values are derived by using a bit
        position corresponding to the value of nodeType for the equivalent
        node type. If a bit in whatToShow is set false, that will be taken as
        a request to skip over this type of node; the behavior in that case is
        similar to that of FILTER_SKIP.

        Note that if node types greater than 32 are ever introduced, they may
        not be individually testable via whatToShow. If that need should
        arise, it can be handled by selecting SHOW_ALL together with an
        appropriate NodeFilter.

        Defined Constants

            SHOW_ALL
                Show all Nodes.
            SHOW_ATTRIBUTE
                Show Attr nodes. This is meaningful only when creating an
                iterator or tree-walker with an attribute node as its root; in
                this case, it means that the attribute node will appear in the
                first position of the iteration or traversal. Since attributes
                are never children of other nodes, they do not appear when
                traversing over the document tree.
            SHOW_CDATA_SECTION
                Show CDATASection nodes.
            SHOW_COMMENT
                Show Comment nodes.
            SHOW_DOCUMENT
                Show Document nodes.
            SHOW_DOCUMENT_FRAGMENT
                Show DocumentFragment nodes.
            SHOW_DOCUMENT_TYPE
                Show DocumentType nodes.
            SHOW_ELEMENT
                Show Element nodes.
            SHOW_ENTITY
                Show Entity nodes. This is meaningful only when creating an
                iterator or tree-walker with an Entity node as its root; in
                this case, it means that the Entity node will appear in the
                first position of the traversal. Since entities are not part
                of the document tree, they do not appear when traversing over
                the document tree.
            SHOW_ENTITY_REFERENCE
                Show EntityReference nodes.
            SHOW_NOTATION
                Show Notation nodes. This is meaningful only when creating an
                iterator or tree-walker with a Notation node as its root; in
                this case, it means that the Notation node will appear in the
                first position of the traversal. Since notations are not part
                of the document tree, they do not appear when traversing over
                the document tree.
            SHOW_PROCESSING_INSTRUCTION
                Show ProcessingInstruction nodes.
            SHOW_TEXT
                Show Text nodes.

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
    Methods

        acceptNode
            Test whether a specified node is visible in the logical view of a
            TreeWalker or NodeIterator. This function will be called by the
            implementation of TreeWalker and NodeIterator; it is not normally
            called directly from user code. (Though you could do so if you
            wanted to use the same filter to guide your own application
            logic.)

            Parameters

            n of type Node
                The node to check to see if it passes the filter or not.

            Return Value

            short
            	

            a constant to determine whether the node is accepted, rejected, or
            skipped, as defined above.
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Interface TreeWalker (introduced in DOM Level 2)

    TreeWalker objects are used to navigate a document tree or subtree using
    the view of the document defined by their whatToShow flags and filter (if
    any). Any function which performs navigation using a TreeWalker will
    automatically support any view defined by a TreeWalker.

    Omitting nodes from the logical view of a subtree can result in a
    structure that is substantially different from the same subtree in the
    complete, unfiltered document. Nodes that are siblings in the TreeWalker
    view may be children of different, widely separated nodes in the original
    view. For instance, consider a NodeFilter that skips all nodes except for
    Text nodes and the root node of a document. In the logical view that
    results, all text nodes will be siblings and appear as direct children of
    the root node, no matter how deeply nested the structure of the original
    document.


    IDL Definition

        // Introduced in DOM Level 2:
        interface TreeWalker {
          readonly attribute Node             root;
          readonly attribute unsigned long    whatToShow;
          readonly attribute NodeFilter       filter;
          readonly attribute boolean          expandEntityReferences;
                   attribute Node             currentNode;
                                            // raises(DOMException) on setting

          Node               parentNode();
          Node               firstChild();
          Node               lastChild();
          Node               previousSibling();
          Node               nextSibling();
          Node               previousNode();
          Node               nextNode();
        };
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************


    Attributes

        currentNode of type Node
            The node at which the TreeWalker is currently positioned.

            Alterations to the DOM tree may cause the current node to no
            longer be accepted by the TreeWalker's associated filter.
            currentNode may also be explicitly set to any node, whether or not
            it is within the subtree specified by the root node or would be
            accepted by the filter and whatToShow flags. Further traversal
            occurs relative to currentNode even if it is not part of the
            current view, by applying the filters in the requested direction;
            if no traversal is possible, currentNode is not changed.

            Exceptions on setting

            DOMException
            	

            NOT_SUPPORTED_ERR: Raised if an attempt is made to set currentNode 
            to null.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        expandEntityReferences of type boolean, readonly
            The value of this flag determines whether the children of entity
            reference nodes are visible to the TreeWalker. If false, they and
            their descendants will be rejected. Note that this rejection takes
            precedence over whatToShow and the filter, if any.

            To produce a view of the document that has entity references
            expanded and does not expose the entity reference node itself, use
            the whatToShow flags to hide the entity reference node and set
            expandEntityReferences to true when creating the TreeWalker. To
            produce a view of the document that has entity reference nodes but
            no entity expansion, use the whatToShow flags to show the entity
            reference node and set expandEntityReferences to false.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        filter of type NodeFilter, readonly
            The filter used to screen nodes.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        root of type Node, readonly
            The root node of the TreeWalker, as specified when it was created.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        whatToShow of type unsigned long, readonly
            This attribute determines which node types are presented via the
            TreeWalker. The available set of constants is defined in the
            NodeFilter interface. Nodes not accepted by whatToShow will be
            skipped, but their children may still be considered. Note that
            this skip takes precedence over the filter, if any.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Methods

        firstChild
            Moves the TreeWalker to the first visible child of the current
            node, and returns the new node. If the current node has no visible
            children, returns null, and retains the current node.           
            
            Return Value

            Node
            	
            The new node, or null if the current node has no visible children
            in the TreeWalker's logical view.
            
            No Parameters
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        lastChild
            Moves the TreeWalker to the last visible child of the current
            node, and returns the new node. If the current node has no visible
            children, returns null, and retains the current node.
            Return Value

            Node
            	

            The new node, or null if the current node has no children in the
            TreeWalker's logical view.
            No Parameters
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        nextNode
            Moves the TreeWalker to the next visible node in document order
            relative to the current node, and returns the new node. If the
            current node has no next node, or if the search for nextNode
            attempts to step upward from the TreeWalker's root node, returns
            null, and retains the current node.

            Return Value

            Node            	

            The new node, or null if the current node has no next node in the
            TreeWalker's logical view.
            No Parameters
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        nextSibling
            Moves the TreeWalker to the next sibling of the current node, and
            returns the new node. If the current node has no visible next
            sibling, returns null, and retains the current node.

            Return Value

            Node
            	

            The new node, or null if the current node has no next sibling. in
            the TreeWalker's logical view.

            No Parameters
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        parentNode
            Moves to and returns the closest visible ancestor node of the
            current node. If the search for parentNode attempts to step upward
            from the TreeWalker's root node, or if it fails to find a visible
            ancestor node, this method retains the current position and
            returns null.

            Return Value

            Node
            	
            The new parent node, or null if the current node has no parent in
            the TreeWalker's logical view.

            No Parameters
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        previousNode
            Moves the TreeWalker to the previous visible node in document
            order relative to the current node, and returns the new node. If
            the current node has no previous node, or if the search for
            previousNode attempts to step upward from the TreeWalker's root
            node, returns null, and retains the current node.

            Return Value

            Node
            	

            The new node, or null if the current node has no previous node in
            the TreeWalker's logical view.

            No Parameters
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        previousSibling
            Moves the TreeWalker to the previous sibling of the current node,
            and returns the new node. If the current node has no visible
            previous sibling, returns null, and retains the current node.

            Return Value

            Node
            	

            The new node, or null if the current node has no previous sibling.
            in the TreeWalker's logical view.

            No Parameters
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Interface DocumentTraversal (introduced in DOM Level 2)

    DocumentTraversal contains methods that create iterators and tree-walkers
    to traverse a node and its children in document order (depth first,
    pre-order traversal, which is equivalent to the order in which the start
    tags occur in the text representation of the document). In DOMs which
    support the Traversal feature, DocumentTraversal will be implemented by
    the same objects that implement the Document interface.


    IDL Definition

        // Introduced in DOM Level 2:
        interface DocumentTraversal {
          NodeIterator  createNodeIterator( in Node root, 
                                            in unsigned long whatToShow, 
                                            in NodeFilter filter, 
                                            in boolean entityReferenceExpansion)
                                            raises(DOMException);
          TreeWalker    createTreeWalker( in Node root, 
                                          in unsigned long whatToShow, 
                                          in NodeFilter filter, 
                                          in boolean entityReferenceExpansion)
                                          raises(DOMException);
        };
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************


    Methods

        createNodeIterator
            Create a new NodeIterator over the subtree rooted at the specified node.
            Parameters

            root of type Node
                The node which will be iterated together with its children.
                The iterator is initially positioned just before this node.
                The whatToShow flags and the filter, if any, are not
                considered when setting this position. The root must not be
                null.
            whatToShow of type unsigned long
                This flag specifies which node types may appear in the logical
                view of the tree presented by the iterator. See the
                description of NodeFilter for the set of possible SHOW_
                values.
                
                These flags can be combined using OR.
            filter of type NodeFilter
                The NodeFilter to be used with this TreeWalker, or null to
                indicate no filter.
            entityReferenceExpansion of type boolean
                The value of this flag determines whether entity reference
                nodes are expanded.

            Return Value

            NodeIterator
            	

            The newly created NodeIterator.
            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: Raised if the specified root is null.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        createTreeWalker
            Create a new TreeWalker over the subtree rooted at the specified
            node.
            
            Parameters

            root of type Node
                The node which will serve as the root for the TreeWalker. The 
                whatToShow flags and the NodeFilter are not considered when 
                setting this value; any node type will be accepted as the root. 
                The currentNode of the TreeWalker is initialized to this node, 
                whether or not it is visible. The root functions as a stopping 
                point for traversal methods that look upward in the document 
                structure, such as parentNode and nextNode. The root must not 
                be null.
            whatToShow of type unsigned long
                This flag specifies which node types may appear in the logical
                view of the tree presented by the tree-walker. See the
                description of NodeFilter for the set of possible SHOW_
                values.

                These flags can be combined using OR.
            filter of type NodeFilter
                The NodeFilter to be used with this TreeWalker, or null to
                indicate no filter.
            entityReferenceExpansion of type boolean
                If this flag is false, the contents of EntityReference nodes
                are not presented in the logical view.

            Return Value

            TreeWalker
            	

            The newly created TreeWalker.
            Exceptions

            DOMException
            	

            NOT_SUPPORTED_ERR: Raised if the specified root is null.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
http://www.w3.org/TR/2000/REC-DOM-Level-2-Traversal-Range-20001113/traversal.html
******************************************************************************/