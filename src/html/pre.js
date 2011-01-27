
/*
 * HTMLPreElement
 * HTML5: 4.5.4 The pre Element
 * http://dev.w3.org/html5/spec/Overview.html#the-pre-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLPreElement').
		debug('HTMLPreElement available');    
});

exports.HTMLPreElement = HTMLPreElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLPreElement.prototype = new HTMLElement();
__extend__(HTMLPreElement.prototype, {
    // no additional properties or elements
    toString: function() {
        return '[object HTMLPreElement]';
    }
});

}(/*HTMLPreElement*/));
