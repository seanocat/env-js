
/*
 * HTMLHtmlElement
 * HTML5: 4.1.1 The Html Element
 * http://dev.w3.org/html5/spec/Overview.html#htmlhtmlelement
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHtmlElement').
		debug('HTMLHtmlElement available');    
});

exports.HTMLHtmlElement = HTMLHtmlElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLHtmlElement.prototype = new HTMLElement();
__extend__(HTMLHtmlElement.prototype, {

    // no additional properties or elements
    toString: function() {
        return '[object HTMLHtmlElement]';
    }
});

}(/*HTMLHtmlElement*/));
