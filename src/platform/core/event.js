/**
 * TODO: used in ./event/eventtarget.js
 * @param {Object} event
 */
Envjs.defaultEventBehaviors = {
	'submit': function(event) {
        var target = event.target,
			serialized,
		    method,
		    action;
        while (target && target.nodeName !== 'FORM') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'FORM') {
            serialized = Envjs.serializeForm(target);
		    method = target.method !== ""?target.method:"GET";
		    action = Envjs.uri(
		        target.action !== ""?target.action:target.ownerDocument.baseURI,
		        target.ownerDocument.baseURI
		    );
			target.ownerDocument.location.replace(
				action, method, serialized
			);
        }
    },
    
    'click': function(event) {
		//console.log("handling default behavior for click %s", event.target);
        var target = event.target,
			url,
			form;
        while (target && target.nodeName !== 'A' && target.nodeName !== 'INPUT') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'A') {
			//console.log('target is a link');
            if(target.href && !target.href.match(/^#/)){
			    url = Envjs.uri(target.href, target.ownerDocument.baseURI);
				target.ownerDocument.location.replace(url);
            }
        }else if (target && target.nodeName === 'INPUT') {
            if(target.type.toLowerCase() === 'submit'){
			    while (target && target.nodeName !== 'FORM' ) {
		            target = target.parentNode;
		        }
				if(target && target.nodeName === 'FORM'){
					target.submit();
				}
            }
        }
    }
};

Envjs.exchangeHTMLDocument = function(doc, text, url, frame) {
    var html, head, title, body, 
		event, 
		frame = doc.__ownerFrame__, 
		i;
    try {
        doc.baseURI = url;
        //console.log('parsing document for window exchange %s', url); 
        HTMLParser.parseDocument(text, doc);
        //console.log('finsihed parsing document for window exchange %s', url); 
        Envjs.wait();
        /*console.log('finished wait after parse/exchange %s...( frame ? %s )', 
            doc.baseURI, 
            top.document.baseURI
        );*/
		//if this document is inside a frame make sure to trigger
		//a new load event on the frame
        if(frame){
            event = doc.createEvent('HTMLEvents');
            event.initEvent('load', false, false);
            frame.dispatchEvent( event, false );
        }
    } catch (e) {
        console.log('parsererror %s', e);
        try {
            console.log('document \n %s', doc.documentElement.outerHTML);
        } catch (e) {
            // swallow
        }
        doc = new HTMLDocument(new DOMImplementation(), doc.ownerWindow);
        html =    doc.createElement('html');
        head =    doc.createElement('head');
        title =   doc.createElement('title');
        body =    doc.createElement('body');
        title.appendChild(doc.createTextNode('Error'));
        body.appendChild(doc.createTextNode('' + e));
        head.appendChild(title);
        html.appendChild(head);
        html.appendChild(body);
        doc.appendChild(html);
        //console.log('default error document \n %s', doc.documentElement.outerHTML);

        //DOMContentLoaded event
        if (doc.createEvent) {
            event = doc.createEvent('Event');
            event.initEvent('DOMContentLoaded', false, false);
            doc.dispatchEvent( event, false );

            event = doc.createEvent('HTMLEvents');
            event.initEvent('load', false, false);
            doc.dispatchEvent( event, false );
        }

        //finally fire the window.onload event
        //TODO: this belongs in window.js which is a event
        //      event handler for DOMContentLoaded on document

        try {
            if (doc === window.document) {
                console.log('triggering window.load');
                event = doc.createEvent('HTMLEvents');
                event.initEvent('load', false, false);
                window.dispatchEvent( event, false );
            }
        } catch (e) {
            //console.log('window load event failed %s', e);
            //swallow
        }
    };  /* closes return {... */
};