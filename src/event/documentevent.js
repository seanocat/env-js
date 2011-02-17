/**
 *
 * DOM Level 2: http://www.w3.org/TR/DOM-Level-2-Events/events.html
 * DOM Level 3: http://www.w3.org/TR/DOM-Level-3-Events/
 *
 * interface DocumentEvent {
 *   Event createEvent (in DOMString eventType)
 *      raises (DOMException);
 * };
 *
 * Firefox (3.6) exposes DocumentEvent
 * Safari (4) does NOT.
 */

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.DocumentEvent').debug('available'); 
});

/**
 * TODO: Not sure we need a full prototype.  We not just an regular object?
 */
exports.DocumentEvent = DocumentEvent = function(){};
DocumentEvent.prototype.__EventMap__ = {
    // Safari4: singular and plural forms accepted
    // Firefox3.6: singular and plural forms accepted
    'Event'          : Event,
    'Events'         : Event,
    'UIEvent'        : UIEvent,
    'UIEvents'       : UIEvent,
    'MouseEvent'     : MouseEvent,
    'MouseEvents'    : MouseEvent,
    'MutationEvent'  : MutationEvent,
    'MutationEvents' : MutationEvent,

    // Safari4: accepts HTMLEvents, but not HTMLEvent
    // Firefox3.6: accepts HTMLEvents, but not HTMLEvent
    'HTMLEvent'      : Event,
    'HTMLEvents'     : Event,

    // Safari4: both not accepted
    // Firefox3.6, only KeyEvents is accepted
    'KeyEvent'       : KeyboardEvent,
    'KeyEvents'      : KeyboardEvent,

    // Safari4: both accepted
    // Firefox3.6: none accepted
    'KeyboardEvent'  : KeyboardEvent,
    'KeyboardEvents' : KeyboardEvent
};

DocumentEvent.prototype.createEvent = function(eventType) {
    var Clazz = this.__EventMap__[eventType];
    if (Clazz) {
        return new Clazz();
    }
    throw(new DOMException(DOMException.NOT_SUPPORTED_ERR));
};

__extend__(Document.prototype, DocumentEvent.prototype);


}(/*Envjs.DOM.DocumentEvent*/));
