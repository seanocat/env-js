
/*
 * HTMLHeadingElement
 * HTML5: 4.4.6 The h1, h2, h3, h4, h5, and h6 elements
 * http://dev.w3.org/html5/spec/Overview.html#the-h1-h2-h3-h4-h5-and-h6-elements
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHeadingElement').
		debug('HTMLHeadingElement available');    
});

exports.HTMLHeadingElement = HTMLHeadingElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLHeadingElement.prototype = new HTMLElement();
__extend__(HTMLHeadingElement.prototype, {
    toString: function() {
        return '[object HTMLHeadingElement]';
    }
});

}(/*HTMLHeadingElement*/));
