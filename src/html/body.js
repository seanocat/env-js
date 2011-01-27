
/*
 * HTMLBodyElement - DOM Level 2
 * HTML5: http://dev.w3.org/html5/spec/Overview.html#the-body-element-0
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLBodyElement').
		debug('HTMLBodyElement available');    
});

exports.HTMLBodyElement = HTMLBodyElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLBodyElement.prototype = new HTMLElement();
__extend__(HTMLBodyElement.prototype, {
    onload: function(event){
        __eval__(this.getAttribute('onload')||'', this);
    },
    onunload: function(event){
        __eval__(this.getAttribute('onunload')||'', this);
    },
    toString: function() {
        return '[object HTMLBodyElement]';
    }
});

}(/*Envjs.HTML.HTMLBodyElement*/));
