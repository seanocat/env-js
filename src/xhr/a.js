
HTMLAnchorElement.prototype.click = function(){
    
    var xhr,
        method,
        url;
    //console.log('serialized form %s', serialized);
    //console.log('this.ownerDocument %s', this.ownerDocument.baseURI);
    xhr = new XMLHttpRequest();
    method = this.method !== ""?this.method:"GET";
    url = Envjs.uri(this.href, this.ownerDocument.baseURI);
    xhr.open(method, url, false);
    xhr.send(url, false);
    if(xhr.readyState === 4){
        /*console.log('%s new document text ready for parse and exchange %s \n %s',
            this.ownerDocument.baseURI, 
            url, 
            xhr.responseText
        );*/
        __exchangeHTMLDocument__(this.ownerDocument, xhr.responseText, url, this.ownerDocument.__ownerFrame__);
        //DOMContentLoaded event
        //console.log('finished document exchange %s', this.ownerDocument.baseURI);
    }
};

