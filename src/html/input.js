/**
 * HTMLInputElement
 *
 * HTML5: 4.10.5 The input element
 * http://dev.w3.org/html5/spec/Overview.html#the-input-element
 */
HTMLInputElement = function(ownerDocument) {
    HTMLInputAreaCommon.apply(this, arguments);
    this._checked = null;
};
HTMLInputElement.prototype = new HTMLInputAreaCommon();
__extend__(HTMLInputElement.prototype, {
    get alt(){
        return this.getAttribute('alt') || '';
    },
    set alt(value){
        this.setAttribute('alt', value);
    },

    /**
     * 'checked' returns state, NOT the value of the attribute
     */
    get checked(){
        if (this._checked === null) {
            this._checked = this.defaultChecked;
        }
        return this._checked;
    },
    set checked(value){
        // force to boolean value
        this._checked = (value) ? true : false;
    },

    /**
     * 'defaultChecked' actually reflects if the 'checked' attribute
     * is present or not
     */
    get defaultChecked(){
        return this.hasAttribute('checked');
    },
    set defaultChecked(val){
        if (val) {
            this.setAttribute('checked', '');
        } else {
            if (this.defaultChecked) {
                this.removeAttribute('checked');
            }
        }
    },

    /**
     * Height is a string
     */
    get height(){
        // spec says it is a string
        return this.getAttribute('height') || '';
    },
    set height(value){
        this.setAttribute('height',value);
    },

    /**
     * MaxLength is a number
     */
    get maxLength(){
        return Number(this.getAttribute('maxlength')||'-1');
    },
    set maxLength(value){
        this.setAttribute('maxlength', value);
    },

    /**
     * Src is a URL string
     */
    get src(){
        return this.getAttribute('src') || '';
    },
    set src(value){
        // TODO: make absolute any relative URLS
        this.setAttribute('src', value);
    },

    get useMap(){
        return this.getAttribute('map') || '';
    },

    /**
     * Width: spec says it is a string
     */
    get width(){
        return this.getAttribute('width') || '';
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

// Named Element Support
HTMLElement.registerSetAttribute('INPUT', 'name',
                                 __updateFormForNamedElement__);
