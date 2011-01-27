
/**
 * HTMLUnknownElement DOM Level 2
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLUnknownElement').
		debug('HTMLUnknownElement available');    
});

exports.HTMLUnknownElement = HTMLUnknownElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLUnknownElement.prototype = new HTMLElement();
__extend__(HTMLUnknownElement.prototype,{
    toString: function(){
        return '[object HTMLUnknownElement]';
    }
});

}(/*HTMLUnknownElement*/));
