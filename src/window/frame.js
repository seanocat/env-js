
/**
 * Frame/Window Mixin
 */
(function(){

var log = Envjs.logger();
Envjs.once('tick', function(){
	log = Envjs.logger('Envjs.HTML.Frame').
		debug('html frame logger available');
});

__extend__(HTMLFrameElement.prototype,{

    set src(value){
        var event;
        this.setAttribute('src', value);
		//only load if we are already appended to the dom
        if (this.parentNode && value && value.length > 0){
            log.debug('loading frame via set src %s', value);
            Envjs.loadFrame(this, Envjs.uri(value, this.ownerDocument?this.ownerDocument.location+'':null));
        }
    }

});

__extend__(HTMLIFrameElement.prototype, HTMLFrameElement.prototype);

}(/*Frame/Window Mixin*/));
