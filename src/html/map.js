
/**
 * HTMLMapElement
 *
 * 4.8.12 The map element
 * http://dev.w3.org/html5/spec/Overview.html#the-map-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLMapElement').
		debug('HTMLMapElement available');    
});

exports.HTMLMapElement = HTMLMapElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLMapElement.prototype = new HTMLElement();
__extend__(HTMLMapElement.prototype, {
    get areas(){
        return this.getElementsByTagName('area');
    },
    get name(){
        return this.getAttribute('name') || '';
    },
    set name(value){
        this.setAttribute('name',value);
    },
    toString: function() {
        return '[object HTMLMapElement]';
    }
});

}(/*HTMLMapElement*/));
