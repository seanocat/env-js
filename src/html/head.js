
/**
 * HTMLHeadElement - DOM Level 2
 *
 * HTML5: 4.2.1 The head element
 * http://dev.w3.org/html5/spec/Overview.html#the-head-element-0
 */
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLHeadElement').
		debug('HTMLHeadElement available');    
});

exports.HTMLHeadElement = HTMLHeadElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLHeadElement.prototype = new HTMLElement();
__extend__(HTMLHeadElement.prototype, {
    get profile(){
        return this.getAttribute('profile');
    },
    set profile(value){
        this.setAttribute('profile', value);
    },
    toString: function(){
        return '[object HTMLHeadElement]';
    }
});

}(/*HTMLHeadElement*/));
