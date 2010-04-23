
/**
 * HTMLTextAreaElement - DOM Level 2
 * HTML5: 4.10.11 The textarea element
 * http://dev.w3.org/html5/spec/Overview.html#the-textarea-element
 */
HTMLTextAreaElement = function(ownerDocument) {
    HTMLInputAreaCommon.apply(this, arguments);
};
HTMLTextAreaElement.prototype = new HTMLInputAreaCommon();
__extend__(HTMLTextAreaElement.prototype, {
    get cols(){
        return Number(this.getAttribute('cols')||'-1');
    },
    set cols(value){
        this.setAttribute('cols', value);
    },
    get rows(){
        return Number(this.getAttribute('rows')||'-1');
    },
    set rows(value){
        this.setAttribute('rows', value);
    },
    get value() {
        this.getAttribute('value') || '';
    },
    set value(value) {
        this.setAttribute('value', value);
    },
    toString: function() {
        return '[object HTMLTextAreaElement]';
    }
});

/*
// http://dev.w3.org/html5/spec/Overview.html#dom-textarea-value
HTMLElement.registerSetAttribute('TEXTAREA', 'value', function(node, value) {
    // complicated.  For now, do nothing
});
*/

// Named Element Support
HTMLElement.registerSetAttribute('TEXTAREA', 'name',
                                 __updateFormForNamedElement__);
