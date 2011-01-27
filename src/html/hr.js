
/*
 * HTMLHRElement
 * HTML5: 4.5.2 The hr Element
 * http://dev.w3.org/html5/spec/Overview.html#the-hr-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHRElement').
		debug('HTMLHRElement available');    
});

exports.HTMLHRElement = HTMLHRElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLHRElement.prototype = new HTMLElement();
__extend__(HTMLHRElement.prototype, {
    // no additional properties or elements
    toString: function() {
        return '[object HTMLHRElement]';
    }
});

}(/*HTMLHRElement*/));
