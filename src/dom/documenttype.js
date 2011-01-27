
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DocumentType').debug('available'); 
});

/**
 * @author envjs team
 * @param {Document} onwnerDocument
 */
exports.DocumentType = DocumentType = function(ownerDocument) {
    Node.apply(this, arguments);
    this.systemId = null;
    this.publicId = null;
};
DocumentType.prototype = new Node();
__extend__({
    get name(){
        return this.nodeName;
    },
    get entities(){
        return null;
    },
    get internalSubsets(){
        return null;
    },
    get notations(){
        return null;
    },
    toString : function(){
        return "[object DocumentType]";
    }
});

}(/*Envjs.DOM.DocumentType*/));
