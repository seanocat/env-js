var __findItemIndex__,
	__insertBefore__,
	__replaceChild__,
	__removeChild__,
	__appendChild__,
	__addToIndexes__,
	__removeFromIndexes__,
	__cloneNodes__;
	
//see namednodemap for these implementations
var __addToNamedIndexes__, 
	__removeFromNamedIndexes__;
	
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.NodeList').debug('available'); 
});
/**
 * @class  NodeList -
 *      provides the abstraction of an ordered collection of nodes
 *
 * @param  ownerDocument : Document - the ownerDocument
 * @param  parentNode    : Node - the node that the NodeList is attached to (or null)
 */
exports.NodeList = NodeList = function(ownerDocument, parentNode) {
    this.parentNode = parentNode;
    this.ownerDocument = ownerDocument;
    this._readonly = false;
};
NodeList.prototype = [];
__extend__(NodeList.prototype, {
    item : function(index) {
        var ret = null;
        if ((index >= 0) && (index < this.length)) {
            // bounds check
            ret = this[index];
        }
        // if the index is out of bounds, default value null is returned
        return ret;
    },
    get xml() {
        var ret = "",
            j;

        // create string containing the concatenation of the string values of each child
        for (j=0; j < this.length; j++) {
            if(this[j] !== null){
                if(this[j].nodeType == Node.TEXT_NODE && j>0 &&
                   this[j-1].nodeType == Node.TEXT_NODE){
                    //add a single space between adjacent text nodes
                    ret += " "+this[j].xml;
                }else{
                    ret += this[j].xml;
                }
            }
        }
        return ret;
    },
    toArray: function () {
		return this;
    },
    toString: function(){
        return "[object NodeList]";
    }
});


/**
 * @method __findItemIndex__
 *      find the item index of the node
 * @author Jon van Noort (jon@webarcana.com.au)
 * @param  node : Node
 * @return : int
 */
__findItemIndex__ = function (nodelist, node) {
    // if node is not found, default value -1 is returned
    // return ret;
	return nodelist.indexOf(node);
};

/**
 * @method __insertBefore__
 *      insert the specified Node into the NodeList before the specified index
 *      Used by Node.insertBefore(). Note: Node.insertBefore() is responsible
 *      for Node Pointer surgery __insertBefore__ simply modifies the internal
 *      data structure (Array).
 * @param  newChild      : Node - the Node to be inserted
 * @param  refChildIndex : int     - the array index to insert the Node before
 */
__insertBefore__ = function(nodelist, newChild, refChildIndex) {
    if ((refChildIndex >= 0) && (refChildIndex <= nodelist.length)) {
        // bounds check
        if (newChild.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
            // node is a DocumentFragment
            // append the children of DocumentFragment
            Array.prototype.splice.apply(nodelist,
                [refChildIndex, 0].concat(newChild.childNodes.toArray()));
        }
        else {
            // append the newChild
            Array.prototype.splice.apply(nodelist,[refChildIndex, 0, newChild]);
        }
    }
};

/**
 * @method __replaceChild__
 *      replace the specified Node in the NodeList at the specified index
 *      Used by Node.replaceChild(). Note: Node.replaceChild() is responsible
 *      for Node Pointer surgery __replaceChild__ simply modifies the internal
 *      data structure (Array).
 *
 * @param  newChild      : Node - the Node to be inserted
 * @param  refChildIndex : int     - the array index to hold the Node
 */
__replaceChild__ = function(nodelist, newChild, refChildIndex) {
    var ret = null;

    // bounds check
    if ((refChildIndex >= 0) && (refChildIndex < nodelist.length)) {
        // preserve old child for return
        ret = nodelist[refChildIndex];

        if (newChild.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
            // node is a DocumentFragment
            // get array containing children prior to refChild
            Array.prototype.splice.apply(nodelist,
                [refChildIndex, 1].concat(newChild.childNodes.toArray()));
        }
        else {
            // simply replace node in array (links between Nodes are
            // made at higher level)
            nodelist[refChildIndex] = newChild;
        }
    }
    // return replaced node
    return ret;
};

/**
 * @method __removeChild__
 *      remove the specified Node in the NodeList at the specified index
 *      Used by Node.removeChild(). Note: Node.removeChild() is responsible
 *      for Node Pointer surgery __removeChild__ simply modifies the internal
 *      data structure (Array).
 * @param  refChildIndex : int - the array index holding the Node to be removed
 */
__removeChild__ = function(nodelist, refChildIndex) {
    var ret = null;

    if (refChildIndex > -1) {
        // found it!
        // return removed node
        ret = nodelist[refChildIndex];
        // rebuild array without removed child
        Array.prototype.splice.apply(nodelist,[refChildIndex, 1]);
		__removeFromIndexes__(ret, nodelist.parentNode);
    }
    // return removed node
    return ret;
};

/**
 * @method __appendChild__
 *      append the specified Node to the NodeList. Used by Node.appendChild().
 *      Note: Node.appendChild() is responsible for Node Pointer surgery
 *      __appendChild__ simply modifies the internal data structure (Array).
 * @param  newChild      : Node - the Node to be inserted
 */
__appendChild__ = function(nodelist, newChild) {
	log.debug('Appending child %s to nodelist %s', newChild.nodeName, nodelist.length);
	var i;
    if (newChild.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
        // newChild is a DocumentFragment
        // append the children of DocumentFragment
        Array.prototype.push.apply(nodelist, newChild.childNodes.toArray() );
		for(i=0;i< newChild.childNodes.length;i++){
			__addToIndexes__(newChild.childNodes[i], nodelist.parentNode);
		}
    } else {
        // simply add node to array (links between Nodes are made at higher level)
        Array.prototype.push.apply(nodelist, [newChild]);
		__addToIndexes__(newChild, nodelist.parentNode);
    }

};

__addToIndexes__ = function(node, ancestor){
	var indexes, index, normalizedName, i, j, descendingIndex, offset, sibling, children, id, name;
	if(node.nodeType == Node.ELEMENT_NODE){
		log.debug('updating node indexes for node %s ancestor %s', node.tagName, ancestor.nodeName);
		//now we need to walk up all ancestors updating nodelist indexes
		normalizedName = (node.tagName+'').toLowerCase();
		
		//if the node doesnt have a parentNode yet then it has been imported
		//into the document, but it is just now being appended.  This means we
		//need to merge the nodes indexes into the ancestors (which will become
		//the parentNode just after this operation completes)
		if(!node.parentNode){
			indexes = node._indexes_;
			for(name in indexes){
				//this is the index of all descendants of the ancestor with the given tagname
				if(!ancestor._indexes_.hasOwnProperty(name) && name != normalizedName ){
					
					ancestor._indexes_[name] = [];
					for(j=0;j<indexes[name].length;j++){
						ancestor._indexes_[name].push(indexes[name][j]);
					}
					
				}else if(name != '*' && name != normalizedName){
					
					offset = 0;
					//this is the index of all descendants with the given tagname
					index = ancestor._indexes_[name];
					children = ancestor.childNodes;
					for(i=0;i<children.length;i++){
						sibling = children[i];
						if(sibling !== node && sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === node.tagName){
							//find the first child, if any, that exist in this index so we can determine
							//the document offset at which to update this index
							offset += (sibling._indexes_[name]?sibling._indexes_[name].length:0)+1;
						}else if(sibling === node){
							break;
						}
					}
					//the descending index is additively a part of the new index
					descendingIndex = node._indexes_[name]?node._indexes_[name]:[];
					Array.prototype.splice.apply(	
						index, 
						Array.prototype.concat.apply(
							[offset, 0],
							descendingIndex.slice(0,descendingIndex.length)
						)
					);
					log.debug('added %s to index %s -> %s', node.tagName, ancestor.tagName||'document', offset);
					
				}
			}
		}
		//now we basically need to crawl up the ancestor chain, merging indexes
		//using some smarts
		while(ancestor){
			//these are all the indexes already built on the ancestor
			indexes = ancestor._indexes_;
			if(!(normalizedName in indexes)){
				//make sure we have an index for this particular tagname
				indexes[normalizedName] = 
					new NodeList(node.ownerDocument, ancestor);
			}
			
			offset = 1;
			//this is the index of all descendants with the given tagname
			index = indexes[normalizedName];
			children = ancestor.childNodes;
			for(i=0;i<children.length;i++){
				sibling = children[i];
				if(sibling !== node && sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === node.tagName){
					//find the first child, if any, that exist in this index so we can determine
					//the document offset at which to update this index
					offset += (sibling._indexes_[normalizedName]?sibling._indexes_[normalizedName].length:0)+1;
				}else if(sibling === node){
					break;
				}
			}
			//the descending index is additively a part of the new index
			descendingIndex = node._indexes_[normalizedName]?node._indexes_[normalizedName]:[];
			Array.prototype.splice.apply(	
				index, 
				[offset, 0, node].concat(
					descendingIndex.slice(0,descendingIndex.length)
				)
			);
			log.debug('added %s to index %s -> %s', node.tagName, ancestor.tagName||'document', offset);
			
			
			offset = 0;
			//this is the index of all descendants with the given tagname, so simply follow
			//the same procedure as above but use the '*' index
			index = indexes['*'];
			children = ancestor.childNodes;
			for(i=0;i<children.length;i++){
				sibling = children[i];
				if(sibling !== node && sibling.nodeType === Node.ELEMENT_NODE ){
					offset += (sibling._indexes_['*']?sibling._indexes_['*'].length:0)+1;
				}else if(sibling === node){
					break;
				}
			}
			descendingIndex = node._indexes_['*']?node._indexes_['*']:[];
			Array.prototype.splice.apply(
				index, 
				[offset, 0, node].concat(
					descendingIndex.slice(0,descendingIndex.length)
				)
			);
			//console.log('added %s to index * -> %s', node.tagName,  offset);
			
			//handle input type elements and their ancestor form elements
			//So far we dont bother with maintaining document order for this index
			if('FORM' == ancestor.nodeName){
				switch (node.nodeName) {
	            case 'BUTTON':
	            case 'FIELDSET':
	            case 'INPUT':
	            case 'KEYGEN':
	            case 'OBJECT':
	            case 'OUTPUT':
	            case 'SELECT':
	            case 'TEXTAREA':
					if(!indexes.hasOwnProperty('$elements')){
						//make sure we have an index for the form.elements
						indexes.$elements = 
							new NodeList(node.ownerDocument, ancestor);
					}
					Array.prototype.push.apply(indexes.$elements, [node]);
					name = node.getAttribute('name');
					if( name && !ancestor[name] ){
						//<form name='foo'><input name='bar' is available via document.foo.bar
						ancestor[name] = node;
					}
	            }
			}
			//walk straight up the dom updating other indexes
			log.debug('walking up node chain, node %s has parentNode %s', ancestor.nodeName, ancestor.parentNode);
			ancestor = ancestor.parentNode;
			
		}
	}
};

__removeFromIndexes__ = function(node, ancestor){
	var indexes, index, normalizedName, i, length, offset, id, name, doc;
	
	if(node.nodeType == Node.ELEMENT_NODE){
		normalizedName = (node.tagName+'').toLowerCase();
		//console.log('removing node from live indexes for node %s', node.tagName);
		id = node.getAttribute('id');
		if(id){
			node.ownerDocument._indexes_["#"+id] = null;
		}	
		name = node.getAttribute('name');
		if(name){
			__removeFromNamedIndexes__('name', name, node);
		}
		while(ancestor){
			indexes = ancestor._indexes_;
			if(!(normalizedName in indexes)){
				indexes[normalizedName] = 
					new NodeList(node.ownerDocument, ancestor);
				//the index did not exist on the ancestor until now so
				//dont bother cleaning it, just move up the ancestor chain
				ancestor = ancestor.parentNode;
				continue;
			}
			index = indexes[normalizedName];
			i = Array.prototype.indexOf.apply(index, [node]);
			if(i>-1){
				offset = node._indexes_[normalizedName];
				offset = offset?offset.length:0;
				length = 1+offset;
				//console.log('removing %s[%s] from index %s -> %s', node.tagName, i, ancestor.tagName, index.toArray());
				Array.prototype.splice.apply(index, [i,length]); 
			}
			
			index = indexes['*'];
			i = Array.prototype.indexOf.apply(index, [node]);
			if(i>-1){
				offset = node._indexes_['*'];
				offset = offset?offset.length:0;
				length = 1+offset;
				//console.log('removing %s from index * -> %s', node.tagName,  index.toArray());
				Array.prototype.splice.apply(index, [i,length]); 
			}
			
			//handle input type elements and their ancestor form elements
			//So far we dont bother with maintaining document order for this index
			if('FORM' == ancestor.nodeName){
				switch (node.nodeName) {
	            case 'BUTTON':
	            case 'FIELDSET':
	            case 'INPUT':
	            case 'KEYGEN':
	            case 'OBJECT':
	            case 'OUTPUT':
	            case 'SELECT':
	            case 'TEXTAREA':
	                doc = node.ownerDocument;
					if(!indexes.hasOwnProperty('$elements')){
						//make sure we have an index for the form.elements
						indexes.$elements = 
							new NodeList(node.ownerDocument, ancestor);
					}
					offset = Array.prototype.indexOf.apply(doc._indexes_.$elements, [node]);
					if(index > -1){
						Array.prototype.splice.apply(doc._indexes_.$elements,[offset,1]);
					}
					name = node.getAttribute('name');
					if( name && ancestor[name] == node ){
						//<form name='foo'><input name='bar' is no longer available via document.foo.bar
						delete ancestor[name];
					}
	            }
			}
			ancestor = ancestor.parentNode;
		}
	}
};

/**
 * @method __cloneNodes__ -
 *      Returns a NodeList containing clones of the Nodes in this NodeList
 * @param  deep : boolean -
 *      If true, recursively clone the subtree under each of the nodes;
 *      if false, clone only the nodes themselves (and their attributes,
 *      if it is an Element).
 * @param  parentNode : Node - the new parent of the cloned NodeList
 * @return : NodeList - NodeList containing clones of the Nodes in this NodeList
 */
__cloneNodes__ = function(nodelist, deep, parentNode) {
    var cloneNodeList = new NodeList(nodelist.ownerDocument, parentNode);

    // create list containing clones of each child
    for (var i=0; i < nodelist.length; i++) {
        __appendChild__(cloneNodeList, nodelist[i].cloneNode(deep));
    }

    return cloneNodeList;
};

}(/*Envjs.DOM.Nodelist*/));




