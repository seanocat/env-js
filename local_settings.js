/**
 *  This file provides local settings you'll need to modify to make sure
 *  envjs platform tests can function properly.  Dont modify this
 *  file directly, copy it to local_settings.js and then modify it so
 *  as not to commit your local settings back to the repo.
 */

/*
var SETTINGS = { 
    BASE_URI : 'file:///mnt/repos/thatcher/env-js/',
    AJAX_BASE: 'http://github.com/thatcher/env-js/raw/master/',
    LOCAL_PORT: '8080',
    APP_CONTEXT: '/env-js/'
}; 
*/

Envjs.config('logging',[
    {category:'Envjs.Core',                  level:'INFO'},
    {category:'Envjs.Core.REPL',            level:'WARN'},
    {category:'Envjs.DOM',                  level:'INFO'},
    {category:'Envjs.DOM.Element',          level:'DEBUG'},
    {category:'Envjs.DOM.Document',          level:'INFO'},
    {category:'Envjs.Timer',                level:'WARN'},
    {category:'Envjs.Location',              level:'INFO'},
    {category:'Envjs.XMLHttpRequest',          level:'INFO'},
    {category:'Envjs.Parser',                  level:'WARN'},
    {category:'Envjs.Parser.HTMLParser',    level:'INFO'},
    {category:'Envjs.Parser.XMLParser',     level:'WARN'},
    {category:'Envjs.HTML.Frame',            level:'WARN'},
    {category:'Envjs.Window',                  level:'INFO'},
    {category:'Envjs.Platform',              level:'INFO'},
    {category:'Envjs.Platform.Johnson',       level:'WARN'},
    {category:'root',                          level:'WARN'}
]);
