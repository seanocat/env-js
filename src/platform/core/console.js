
/**
 * Writes message to system out
 * @param {String} message
 */
Envjs.log = function(message){};

/**
 * Constants providing enumerated levels for logging in modules
 */
Envjs.DEBUG = 1;
Envjs.INFO = 2;
Envjs.WARN = 3;
Envjs.ERROR = 3;
Envjs.NONE = 3;

/**
 * Writes error info out to console
 * @param {Error} e
 */
Envjs.lineSource = function(e){};

/**
 * @param {Object} js 
 * @param {Object} filter
 * @param {Object} indentValue
 */ 
Envjs.js2json = function(js, filter, indentValue){
    return JSON.stringify(js, filter, indentValue||'');
};


/**
 * @param {Object} json
 * @param {Object} filter
 */
Envjs.json2js = function(json, filter){
    return JSON.parse(json, filter);
};
    