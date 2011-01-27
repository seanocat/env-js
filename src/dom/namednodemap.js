var __findNamedItemIndex__,
    __findNamedItemNSIndex__,
    __hasAttribute__,
    __hasAttributeNS__,
    __cloneNamedNodes__;
//see nodelist for these declarations
/*var __addToNamedIndexes__, 
    __removeFromNamedIndexes__;*/

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.NamedNodeMap').debug('available'); 
});
/**
 * @class  NamedNodeMap -
 *      used to represent collections of nodes that can be accessed by name
 *      typically a set of Element attributes
 *
 * @extends NodeList -
 *      note W3C spec says that this is not the case, but we need an item()
 *      method identical to NodeList's, so why not?
 * @param  ownerDocument : Document - the ownerDocument
 * @param  parentNode    : Node - the node that the NamedNodeMap is attached to (or null)
 */
exports.NamedNodeMap = NamedNodeMap = function(ownerDocument, parentNode) {
    NodeList.apply(this, arguments);
};
NamedNodeMap.prototype = new NodeList();
__extend__(NamedNodeMap.prototype, {
    add: function(name) {
        this[this.length] = name;
    },
    getNamedItem: function(name) {
        var ret = null;
        log.debug('getNamedItem %s', name);
        // test that Named Node exists
        var itemIndex = __findNamedItemIndex__(this, name);

        if (itemIndex > -1) {
            //console.log('found it!');
            ret = this[itemIndex];
        }
        // if node is not found, default value null is returned
        return ret;
    },
    setNamedItem: function(arg) {
        var doc = __ownerDocument__(this);
        log.debug('setNamedItem %s', arg.name);
        // test for exceptions
        if (doc.implementation.errorChecking) {
            // throw Exception if arg was not created by this Document
            if (this.ownerDocument != arg.ownerDocument) {
                throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
            }

            // throw Exception if DOMNamedNodeMap is readonly
            if (this._readonly || (this.parentNode && this.parentNode._readonly)) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if arg is already an attribute of another Element object
            if (arg.ownerElement && (arg.ownerElement != this.parentNode)) {
                throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
            }
        }

        // console.log('setNamedItem __findNamedItemIndex__ ');
        // get item index
        var itemIndex = __findNamedItemIndex__(this, arg.name);
        var ret = null;

        //console.log('setNamedItem __findNamedItemIndex__ %s', itemIndex);
        if (itemIndex > -1) {
            // found it!
            ret = this[itemIndex];
            // use existing Attribute
            // throw Exception if DOMAttr is readonly
            if (doc.implementation.errorChecking && ret._readonly) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            } else {
                this[itemIndex] = arg;
                // over-write existing NamedNode
                this[arg.name.toLowerCase()] = arg;
            }
        } else {
            // add new NamedNode
            //console.log('setNamedItem add new named node map (by index)');
            Array.prototype.push.apply(this, [arg]);
            this[arg.name] = arg;

        }

        arg.ownerElement = this.parentNode;
        // update ownerElement
        // return old node or new node
        
        //add to named node indexes on the document
        __addToNamedIndexes__(arg.name, arg.value, arg.ownerElement);
        
        return ret;
    },
    removeNamedItem: function(name) {
        var ret = null, doc = __ownerDocument__(this);
        // test for exceptions
        // throw Exception if NamedNodeMap is readonly
        if (doc.implementation.errorChecking &&
            (this._readonly || (this.parentNode && this.parentNode._readonly))) {
            throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }

        // get item index
        var itemIndex = __findNamedItemIndex__(this, name);

        // throw Exception if there is no node named name in this map
        if (doc.implementation.errorChecking && (itemIndex < 0)) {
            throw (new DOMException(DOMException.NOT_FOUND_ERR));
        }

        // get Node
        var oldNode = this[itemIndex];
        //this[oldNode.name] = undefined;
        // throw Exception if Node is readonly
        if (doc.implementation.errorChecking && oldNode._readonly) {
            throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }
        
        //remove from named node indexes on the document
        __removeFromNamedIndexes__(name, oldNode.value, oldNode.ownerElement);
        
        // return removed node
        return __removeChild__(this, itemIndex);
    },
    getNamedItemNS: function(namespaceURI, localName) {
        var ret = null;

        // test that Named Node exists
        var itemIndex = __findNamedItemNSIndex__(this, namespaceURI, localName);

        if (itemIndex > -1) {
            // found it! return NamedNode
            ret = this[itemIndex];
        }
        // if node is not found, default value null is returned
        return ret;
    },
    setNamedItemNS: function(arg) {
        log.debug('setNamedItemNS %s %s', arg.namespaceURI, arg.localName);
        // test for exceptions
        if (__ownerDocument__(this).implementation.errorChecking) {
            // throw Exception if NamedNodeMap is readonly
            if (this._readonly || (this.parentNode && this.parentNode._readonly)) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            }

            // throw Exception if arg was not created by this Document
            if (__ownerDocument__(this) != __ownerDocument__(arg)) {
                throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
            }

            // throw Exception if arg is already an attribute of another Element object
            if (arg.ownerElement && (arg.ownerElement != this.parentNode)) {
                throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
            }
        }

        // get item index
        var itemIndex = __findNamedItemNSIndex__(this, arg.namespaceURI, arg.localName);
        var ret = null;

        if (itemIndex > -1) {
            // found it!
            // use existing Attribute
            ret = this[itemIndex];
            // throw Exception if Attr is readonly
            if (__ownerDocument__(this).implementation.errorChecking && ret._readonly) {
                throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
            } else {
                // over-write existing NamedNode
                this[itemIndex] = arg;
            }
        } else {
            // add new NamedNode
            Array.prototype.push.apply(this, [arg]);
        }
        arg.ownerElement = this.parentNode;
        
        //add to named node indexes on the document
        __addToNamedIndexes__(
            arg.namespaceURI?arg.namespaceURI+':'+arg.localName:arg.localName, 
            arg.value, 
            arg.ownerElement
        );
        
        // return old node or null
        return ret;
    },
    removeNamedItemNS: function(namespaceURI, localName) {
        var ret = null;

        // test for exceptions
        // throw Exception if NamedNodeMap is readonly
        if (__ownerDocument__(this).implementation.errorChecking && (this._readonly || (this.parentNode && this.parentNode._readonly))) {
            throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
        }

        // get item index
        var itemIndex = __findNamedItemNSIndex__(this, namespaceURI, localName);

        // throw Exception if there is no matching node in this map
        if (__ownerDocument__(this).implementation.errorChecking && (itemIndex < 0)) {
            throw (new DOMException(DOMException.NOT_FOUND_ERR));
        }

        // get Node
        var oldNode = this[itemIndex];

        //remove from named node indexes on the document
        __removeFromNamedIndexes__(
            namespaceURI?namespaceURI+'::'+localName:localName, 
            oldNode.value, 
            oldNode.ownerElement
        );
        
        // return removed node
        return __removeChild__(this, itemIndex);
    },
    get xml() {
        var ret = "";

        // create string containing concatenation of all (but last) 
        // Attribute string values (separated by spaces)
        for (var i = 0; i < this.length - 1; i++) {
            ret += this[i].xml + " ";
        }

        // add last Attribute to string (without trailing space)
        if (this.length > 0) {
            ret += this[this.length - 1].xml;
        }

        return ret;
    },
    toString: function() {
        return "[object NamedNodeMap]";
    }

});

__addToNamedIndexes__ = function(name, value, element){
    log.debug('addToNamedIndexes %s %s', name, value);
    var doc = __ownerDocument__(element);
    switch(name.toLowerCase()){
        case "id": 
            log.debug('addToNamedIndexes #id %s', value);
            doc._indexes_["#"+value] = element; break;
        case "name":
            log.debug('addToNamedIndexes @name %s', value);
            if(!(doc._indexes_['@'+value])){
                doc._indexes_["@"+value] = new NodeList(doc, null);
            }
            if(element.tagName.toLowerCase() === 'form'){
                if( !doc[value] ){
                    //<form name='foo' is available via document.foo
                    doc[value] = element;
                }
            }
            //also add to general name index for getElementsByName
            Array.prototype.push.apply(doc._indexes_["@"+value],[element]);
            break;
    }
};

__removeFromNamedIndexes__ = function(name, value, element){
    var index, doc = __ownerDocument__(element);
    //console.log('checking named index for removing %s=%s', name, value);
    switch(name.toLowerCase()){
        case "id": 
            //console.log('(%s) replacing id index value #%s = %s', doc, value, element?element.tagName:'no parent');
            doc._indexes_["#"+value] = null; break;
        case "name":
            if(!(doc._indexes_['@'+value])){
                doc._indexes_["@"+value] = new NodeList(doc, null);
            }
            if(element.tagName.toLowerCase() === 'form'){
                if(doc[value]){
                    //<form name='foo' is no longer available via document.foo
                    delete doc[value];
                }
            }
            //also remove from general name index for getElementsByName
            index = Array.prototype.indexOf.apply(doc._indexes_["@"+value], [element]);
            if(index > -1){
                Array.prototype.splice.apply(doc._indexes_["@"+value],[index,1]);
            }
            break;
    }
};

}(/*Envjs.DOM.NamedNodeMap*/));



/**
 * @method __findNamedItemIndex__
 *      find the item index of the node with the specified name
 *
 * @param  name : string - the name of the required node
 * @param  isnsmap : if its a NamespaceNodeMap
 * @return : int
 */
__findNamedItemIndex__ = function(namednodemap, name, isnsmap) {
    var ret = -1;
    // loop through all nodes
    for (var i = 0; i < namednodemap.length; i++) {
        //console.log("namednodemap (local %s, name %s), name %s, isnsmap %s",
        //      namednodemap.localName, namednodemap.name, name, isnsmap)
        // compare name to each node's nodeName
        if (namednodemap[i].localName && name && isnsmap) {
            if (namednodemap[i].localName.toLowerCase() == name.toLowerCase()) {
                // found it!
                ret = i;
                break;
            }
        } else {
            if (namednodemap[i].name && name) {
                if (namednodemap[i].name.toLowerCase() == name.toLowerCase()) {
                    // found it!
                    ret = i;
                    break;
                }
            }
        }
    }
    // if node is not found, default value -1 is returned
    return ret;
};


/**
 * @method __findNamedItemNSIndex__
 *      find the item index of the node with the specified
 *      namespaceURI and localName
 *
 * @param  namespaceURI : string - the namespace URI of the required node
 * @param  localName    : string - the local name of the required node
 * @return : int
 */
__findNamedItemNSIndex__ = function(namednodemap, namespaceURI, localName) {
    var ret = -1;
    // test that localName is not null
    if (localName) {
        // loop through all nodes
        for (var i = 0; i < namednodemap.length; i++) {
            if (namednodemap[i].namespaceURI && namednodemap[i].localName) {
                // compare name to each node's namespaceURI and localName
                if ((namednodemap[i].namespaceURI.toLowerCase() == namespaceURI.toLowerCase()) &&
                (namednodemap[i].localName.toLowerCase() == localName.toLowerCase())) {
                    // found it!
                    ret = i;
                    break;
                }
            }
        }
    }
    // if node is not found, default value -1 is returned
    return ret;
};


/**
 * @method __hasAttribute__
 *      Returns true if specified node exists
 *
 * @param  name : string - the name of the required node
 * @return : boolean
 */
__hasAttribute__ = function(namednodemap, name) {
    var ret = false;
    // test that Named Node exists
    var itemIndex = __findNamedItemIndex__(namednodemap, name);
    if (itemIndex > -1) {
        // found it!
        ret = true;
    }
    // if node is not found, default value false is returned
    return ret;
};

/**
 * @method __hasAttributeNS__
 *      Returns true if specified node exists
 *
 * @param  namespaceURI : string - the namespace URI of the required node
 * @param  localName    : string - the local name of the required node
 * @return : boolean
 */
__hasAttributeNS__ = function(namednodemap, namespaceURI, localName) {
    var ret = false,
        // test that Named Node exists
        itemIndex = __findNamedItemNSIndex__(namednodemap, namespaceURI, localName);
    if (itemIndex > -1) {
        // found it!
        ret = true;
    }
    // if node is not found, default value false is returned
    return ret;
};

/**
 * @method __cloneNamedNodes__
 *      Returns a NamedNodeMap containing clones of the Nodes in this NamedNodeMap
 *
 * @param  parentNode : Node - the new parent of the cloned NodeList
 * @param  isnsmap : bool - is this a NamespaceNodeMap
 * @return NamedNodeMap containing clones of the Nodes in this NamedNodeMap
 */
__cloneNamedNodes__ = function(namednodemap, parentNode, isnsmap) {
    var cloneNamedNodeMap = isnsmap ?
    new NamespaceNodeMap(namednodemap.ownerDocument, parentNode) :
    new NamedNodeMap(namednodemap.ownerDocument, parentNode);

    // create list containing clones of all children
    for (var i = 0; i < namednodemap.length; i++) {
        __appendChild__(cloneNamedNodeMap, namednodemap[i].cloneNode(false));
    }

    return cloneNamedNodeMap;
};


/**
 * @class  NamespaceNodeMap -
 *      used to represent collections of namespace nodes that can be
 *      accessed by name typically a set of Element attributes
 *
 * @extends NamedNodeMap
 *
 * @param  ownerDocument : Document - the ownerDocument
 * @param  parentNode    : Node - the node that the NamespaceNodeMap is attached to (or null)
 */
NamespaceNodeMap = function(ownerDocument, parentNode) {
    NamedNodeMap.apply(this, arguments);
};
NamespaceNodeMap.prototype = new NamedNodeMap();
__extend__(NamespaceNodeMap.prototype, {
    get xml() {
        var ret = "",
            ns,
            ind,
            namespaces,
            i;
        // identify namespaces declared local to this Element (ie, not inherited)
        for (ind = 0; ind < this.length; ind++) {
            // if namespace declaration does not exist in the containing node's, parentNode's namespaces
            ns = this[ind];
            namespaces = this.parentNode.parentNode._namespaces;
            for(i=0;i<namespaces.length;i++){
                if(namespaces[i].nodeName === this[ind].nodeName &&
                    namespaces[i].nodeValue === this[ind].nodeValue){
                    ns = null;
                    break;
                }
            }
            if(ns){
                // display the namespace declaration
                ret += " "+this[ind].xml;
            }
        }
        return ret;
    },
    toString: function() {
        return "[object NamespacedNodeMap]";
    }
});
