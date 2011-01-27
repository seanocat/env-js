
/*
 * HTMLDivElement - DOM Level 2
 * HTML5: 4.5.12 The Div Element
 * http://dev.w3.org/html5/spec/Overview.html#the-div-element
 */
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLDivElement').
		debug('HTMLDivElement available');    
});

exports.HTMLDivElement = HTMLDivElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};

HTMLDivElement.prototype = new HTMLElement();
__extend__(HTMLDivElement.prototype, {
    get align(){
        return this.getAttribute('align') || 'left';
    },
    set align(value){
        this.setAttribute('align', value);
    },
    toString: function() {
        return '[object HTMLDivElement]';
    }
});

}(/*HTMLDivElement*/));
