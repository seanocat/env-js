
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.EventException').debug('available'); 
});

/**
 * @name EventException
 */
exports.EventException = EventException = function(code) {
  this.code = code;
};
EventException.UNSPECIFIED_EVENT_TYPE_ERR = 0;

}(/*Envjs.DOM2.EventException*/));
