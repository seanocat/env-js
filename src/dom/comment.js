
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.Comment').debug('available'); 
});
/**
 * @class  Comment
 *      This represents the content of a comment, i.e., all the
 *      characters between the starting '<!--' and ending '-->'
 * @extends CharacterData
 * @param  ownerDocument :  The Document object associated with this node.
 */
exports.Comment = Comment = function(ownerDocument) {
    CharacterData.apply(this, arguments);
    this.nodeName  = "#comment";
};
Comment.prototype = new CharacterData();
__extend__(Comment.prototype, {
    get localName(){
        return null;
    },
    get nodeType(){
        return Node.COMMENT_NODE;
    },
    get xml(){
        return "<!--" + this.nodeValue + "-->";
    },
    toString : function(){
        return "[object Comment]";
    }
});

}(/*Envjs.DOM.Comment*/));
