/*
 * HTMLCollection
 *
 * HTML5 -- 2.7.2.1 HTMLCollection
 * http://dev.w3.org/html5/spec/Overview.html#htmlcollection
 * http://dev.w3.org/html5/spec/Overview.html#collections
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLCollection').
		debug('HTMLCollection available');    
});

exports.HTMLCollection = HTMLCollection = function(nodelist, type) {
	__extend__(nodelist,{
		namedItem: function (name) {
	        return this[name] || null;
	    },

	    toString: function() {
	        return '[object HTMLCollection]';
	    }
	});
    var n;
    for (var i=0; i<nodelist.length; i++) {
        n = nodelist[i].id;
        if (n && !nodelist[n]) {
            nodelist[n] = nodelist[i];
        }
        n = nodelist[i].name;
        if (n && !nodelist[n]) {
            nodelist[n] = nodelist[i];
        }
    }
	return nodelist;
};

HTMLCollection.prototype = new NodeList();
__extend__(HTMLCollection.prototype, {

    namedItem: function (name) {
        return this[name] || null;
    },

    toString: function() {
        return '[object HTMLCollection]';
    }
});

}(/*Envjs.HTML.HTMLCollection*/));

