
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.UIEvent').debug('available'); 
});

/**
 * @name UIEvent
 * @param {Object} options
 */
exports.UIEvent = UIEvent = function(options) {
    this._view = null;
    this._detail = 0;
};

UIEvent.prototype = new Event();
__extend__(UIEvent.prototype,{
    get view(){
        return this._view;
    },
    get detail(){
        return this._detail;
    },
    initUIEvent: function(type, bubbles, cancelable, windowObject, detail){
        this.initEvent(type, bubbles, cancelable);
        this._detail = 0;
        this._view = windowObject;
    }
});

}(/*Envjs.DOM.UIEvent*/));
