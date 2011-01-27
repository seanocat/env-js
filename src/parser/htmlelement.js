

(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLElement').
        debug('HTMLElement set innerHTML mixin available');    
});

__extend__(HTMLElement.prototype,{
    set innerHTML(html){
        HTMLParser.parseFragment(html, this);
    }
});

})(/*Envjs.HTML.HTMLElement*/);
