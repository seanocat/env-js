var __addEventListener__,
    __removeEventListener__,
    __dispatchEvent__,
    __captureEvent__,
    __bubbleEvent__;

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
   log = Envjs.logger('Envjs.DOM.EventTarget').debug('available'); 
});

/**
 * @name EventTarget
 * @w3c:domlevel 2
 * @uri -//TODO: paste dom event level 2 w3c spc uri here
 */
exports.EventTarget = EventTarget = function(){};
EventTarget.prototype.addEventListener = function(type, fn, phase){
    __addEventListener__(this, type, fn, phase);
};
EventTarget.prototype.removeEventListener = function(type, fn, phase){
    __removeEventListener__(this, type, fn, phase);
};
EventTarget.prototype.dispatchEvent = function(event, bubbles){
    __dispatchEvent__(this, event, bubbles);
};

__extend__(Node.prototype, EventTarget.prototype);

var $events = [{}];

__addEventListener__ = function(target, type, fn, phase){
    phase = !!phase?"CAPTURING":"BUBBLING";
    if ( !target.uuid ) {
        target.uuid = $events.length+'';
        log.debug('add event uuid for %s %s', target, target.uuid);
    }
    if ( !$events[target.uuid] ) {
        log.debug('creating listener for target: %s %s', target, target.uuid);
        $events[target.uuid] = {};
    }
    if ( !$events[target.uuid][type] ){
        log.debug('creating listener for type: %s %s %s', target, target.uuid, type);
        $events[target.uuid][type] = {
            CAPTURING:[],
            BUBBLING:[]
        };
    }
    if ( $events[target.uuid][type][phase].indexOf( fn ) < 0 ){
        log.debug( 'adding event listener %s %s %s %s', target, target.uuid, type, phase);
        $events[target.uuid][type][phase].push( fn );
    }
    log.debug('registered event listeners %s', $events.length);
};

__removeEventListener__ = function(target, type, fn, phase){
    phase = !!phase?"CAPTURING":"BUBBLING";
    if ( !target.uuid ) {
        log.debug('target has never had registered events %s', target);
        return;
    }
    if ( !$events[target.uuid] ) {
        log.debug('target has no registered events to remove %s %s', target, target.uuid);
        return;
    }
    if(type == '*'){
        //used to clean all event listeners for a given node
        log.debug('cleaning all event listeners for node %s %s',target, target.uuid);
        delete $events[target.uuid];
        return;
    }else if ( !$events[target.uuid][type] ){
        log.debug('target has no registered events of type %s to remove %s %s', type, target, target.uuid);
        return;
    }
    $events[target.uuid][type][phase] =
        $events[target.uuid][type][phase].filter(function(f){
            log.debug('removing event listener %s %s %s %s',  target, type, phase );
            return f != fn;
        });
};

var __eventuuid__ = 0;

__dispatchEvent__ = function(target, event, bubbles){
    
    if (!event.uuid) {
        event.uuid = __eventuuid__++;
    }
    //the window scope defines the $event object, for IE(^^^) compatibility;
    //$event = event;

    if (bubbles === undefined || bubbles === null) {
        bubbles = true;
    }

    if (!event.target) {
        event.target = target;
    }

    log.debug('dispatching %s %s %s %s', event.uuid, target, event.type, bubbles);
    if ( event.type && (target.nodeType || target === window )) {

        __captureEvent__(target, event);

        event.eventPhase = Event.AT_TARGET;
        if ( target.uuid && $events[target.uuid] && $events[target.uuid][event.type] ) {
            event.currentTarget = target;

            log.debug('begin dispatching capturing phase %s %s', target, event.type);
            $events[target.uuid][event.type].CAPTURING.forEach(function(fn){
                log.debug('capturing event %s', target);
                var returnValue = fn.apply(target, [event]);
                if(returnValue === false){
                    event.stopPropagation();
                }
            });

            log.debug('begin dispatching bubbling phase %s %s', target, event.type);
            $events[target.uuid][event.type].BUBBLING.forEach(function(fn){
                log.debug('bubbling event %s', target);
                var returnValue = fn.apply(target, [event] );
                if(returnValue === false){
                    event.stopPropagation();
                }
            });
        }
        if (target["on" + event.type]) {
            target["on" + event.type](event);
        }
        if (bubbles && !event.cancelled){
            __bubbleEvent__(target, event);
        }
        if(!event._preventDefault){
            //At this point I'm guessing that just HTMLEvents are concerned
            //with default behavior being executed in a browser but I could be
            //wrong as usual.  The goal is much more to filter at this point
            //what events have no need to be handled
            //console.log('triggering default behavior for %s', event.type);
            if(event.type in Envjs.defaultEventBehaviors){
                Envjs.defaultEventBehaviors[event.type](event);
            }
        }
        log.debug('deleting event %s', event.uuid);
        event.target = null;
        event = null;
    }else{
        throw new EventException(EventException.UNSPECIFIED_EVENT_TYPE_ERR);
    }
};

__captureEvent__ = function(target, event){
    var ancestorStack = [],
        parent = target.parentNode,
        stopevent = function(fn){
            var returnValue = fn( event );
            if(returnValue === false){
                event.stopPropagation();
            }
        };

    event.eventPhase = Event.CAPTURING_PHASE;
    while(parent){
        if(parent.uuid && $events[parent.uuid] && $events[parent.uuid][event.type]){
            ancestorStack.push(parent);
        }
        parent = parent.parentNode;
    }
    while(ancestorStack.length && !event.cancelled){
        event.currentTarget = ancestorStack.pop();
        if($events[event.currentTarget.uuid] && $events[event.currentTarget.uuid][event.type]){
            $events[event.currentTarget.uuid][event.type].CAPTURING.forEach(stopevent);
        }
    }
};

__bubbleEvent__ = function(target, event){
    var parent = target.parentNode,
        stopevent = function(fn){
            var returnValue = fn( event );
            if(returnValue === false){
                event.stopPropagation();
            }
        };
    event.eventPhase = Event.BUBBLING_PHASE;
    while(parent){
        if(parent.uuid && $events[parent.uuid] && $events[parent.uuid][event.type] ){
            event.currentTarget = parent;
            $events[event.currentTarget.uuid][event.type].BUBBLING.forEach(stopevent);
        }
        parent = parent.parentNode;
    }
};

}(/*Envjs.DOM2.EventTarget*/));



