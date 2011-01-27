
/*
* HTMLParagraphElement - DOM Level 2
*/

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLParagraphElement').
		debug('HTMLParagraphElement available');    
});

exports.HTMLParagraphElement = HTMLParagraphElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLParagraphElement.prototype = new HTMLElement();
__extend__(HTMLParagraphElement.prototype, {
    toString: function(){
        return '[object HTMLParagraphElement]';
    }
});

}(/*HTMLParagraphElement*/));

