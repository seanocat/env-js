
/*
 * HTMLUListElement
 * HTML5: 4.5.7 The ul Element
 * http://dev.w3.org/html5/spec/Overview.html#htmlhtmlelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLUListElement').
		debug('HTMLUListElement available');    
});

exports.HTMLUListElement = HTMLUListElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLUListElement.prototype = new HTMLElement();
__extend__(HTMLUListElement.prototype, {
    // no additional properties or elements
    toString: function() {
        return '[object HTMLUListElement]';
    }
});

}(/*HTMLUListElement*/));
