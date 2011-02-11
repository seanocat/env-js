/*
*   - timer.js
*/
(function(){
	
var log = Envjs.logger();
Envjs.once('tick', function(){
	log = Envjs.logger('Envjs.Timer').
		debug('timer logger available');
});

/**
 * @function setTimeout
 * @param {Object} fn
 * @param {Object} time
 */
exports.setTimeout = setTimeout = function(fn, time){
	log.debug('setTimeout %s', time);
	return Envjs.timers.addTimerOrInterval(fn, time, 'timeout');
};

/**
 * clearTimeout
 * @param {Object} id
 */
exports.clearTimeout = clearTimeout = function(id){	
	log.debug('clearTimeout %s', id);
	return Envjs.timers.removeTimerOrInterval(id, 'timeout');
};

/**
 * @function setInterval
 * @param {Object} fn
 * @param {Object} time
 */
exports.setInterval = setInterval = function(fn, time){
	log.debug('setInterval %s', time);
	return Envjs.timers.addTimerOrInterval(fn, time, 'interval');
};

/**
 * clearInterval
 * @param {Object} id
 */
exports.clearInterval = clearInterval = function(id){
	log.debug('clearInterval %s', id);	
	return Envjs.timers.removeTimerOrInterval(id, 'interval');
};

}(/*Timer*/));