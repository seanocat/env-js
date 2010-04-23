/**
 * HTMLInputElement - DOM Level 2
 *
 * HTML5: 4.10.5 The input element
 * http://dev.w3.org/html5/spec/Overview.html#the-input-element
 */
HTMLInputElement = function(ownerDocument) {
    HTMLInputAreaCommon.apply(this, arguments);
};
HTMLInputElement.prototype = new HTMLInputAreaCommon();
__extend__(HTMLInputElement.prototype, {
    get alt(){
        return this.getAttribute('alt');
    },
    set alt(value){
        this.setAttribute('alt', value);
    },
    get checked(){
        return (this.getAttribute('checked') === 'checked');
    },
    set checked(value){
        this.setAttribute('checked', (value ? 'checked' :''));
    },
    get defaultChecked(){
        return this.getAttribute('defaultChecked');
    },
    get height(){
        return this.getAttribute('height');
    },
    set height(value){
        this.setAttribute('height',value);
    },
    get maxLength(){
        return Number(this.getAttribute('maxlength')||'0');
    },
    set maxLength(value){
        this.setAttribute('maxlength', value);
    },
    get src(){
        return this.getAttribute('src');
    },
    set src(value){
        this.setAttribute('src', value);
    },
    get useMap(){
        return this.getAttribute('map');
    },
    get width(){
        return this.getAttribute('width');
    },
    set width(value){
        this.setAttribute('width',value);
    },
    click:function(){
        __click__(this);
    },
    toString: function() {
        return '[object HTMLInputElement]';
    }
});


//http://dev.w3.org/html5/spec/Overview.html#dom-input-value
// TODO: needs work, not even clear this is needed and can be moved
// up into the object
HTMLElement.registerSetAttribute('INPUT', 'value', function(node, value) {
    //console.log('setting defaultValue (NS)');
    if(!node.defaultValue){
        node.defaultValue = value;
    }
});
