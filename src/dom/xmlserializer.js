
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.XMLSerializer').debug('available'); 
});

/**
 * @author envjs team
 * @class XMLSerializer
 */

exports.XMLSerializer = XMLSerializer = function() {};

__extend__(XMLSerializer.prototype, {
    serializeToString: function(node){
        return node.xml;
    },
    toString : function(){
        return "[object XMLSerializer]";
    }
});

}(/*Envjs.DOM.XMLSerilaizer*/));

