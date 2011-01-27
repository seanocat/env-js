
/**
 * HTMLOptionElement, Option
 * HTML5: 4.10.10 The option element
 * http://dev.w3.org/html5/spec/Overview.html#the-option-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLOptionElement').
		debug('HTMLOptionElement available');    
});

exports.HTMLOptionElement = HTMLOptionElement = function(ownerDocument) {
    HTMLInputCommon.apply(this, arguments);
    this._selected = null;
};
HTMLOptionElement.prototype = new HTMLInputCommon();
__extend__(HTMLOptionElement.prototype, {

    /**
     * defaultSelected actually reflects the presence of the
     * 'selected' attribute.
     */
    get defaultSelected() {
        return this.hasAttribute('selected');
    },
    set defaultSelected(value) {
        if (value) {
            this.setAttribute('selected','');
        } else {
            if (this.hasAttribute('selected')) {
                this.removeAttribute('selected');
            }
        }
    },
    get form() {
        var parent = __selectparent__(this);
        return parent ? parent.form : null;
    },
    get index() {
        var options, i;

        if (! this.parentNode) {
            return -1;
        }
        options = this.parentNode.options;
        for (i=0; i < options.length; ++i) {
            if (this === options[i]) {
                return i;
            }
        }
        return 0;
    },
    get label() {
        return this.getAttribute('label');
    },
    set label(value) {
        this.setAttribute('label', value);
    },

    /*
     * This is not in the spec, but safari and firefox both
     * use this
     */
    get name() {
        return this.getAttribute('name');
    },
    set name(value) {
        this.setAttribute('name', value);
    },

    /**
     *
     */
    get selected() {
        // if disabled, return false, no matter what
        if (this.disabled) {
            return false;
        }
        if (this._selected === null) {
            return this.defaultSelected;
        }

        return this._selected;
    },
    set selected(value) {
        this._selected = (value) ? true : false;
    },

    get text() {
        var val = this.nodeValue;
        return (val === null || this.value === undefined) ?
            this.innerHTML :
            val;
    },
    get value() {
        var val = this.getAttribute('value');
        return (val === null || val === undefined) ?
            this.textContent :
            val;
    },
    set value(value) {
        this.setAttribute('value', value);
    },
    toString: function() {
        return '[object HTMLOptionElement]';
    }
});

exports.Option = Option = function(text, value, defaultSelected, selected) {

    // Not sure if this is correct:
    //
    // The element's document must be the active document of the
    // browsing context of the Window object on which the interface
    // object of the invoked constructor is found.
    HTMLOptionElement.apply(this, [document]);
    this.nodeName = 'OPTION';

    if (arguments.length >= 1) {
        this.appendChild(document.createTextNode('' + text));
    }
    if (arguments.length >= 2) {
        this.value = value;
    }
    if (arguments.length >= 3) {
        if (defaultSelected) {
            this.defaultSelected = '';
        }
    }
    if (arguments.length >= 4) {
        this.selected = (selected) ? true : false;
    }
};

Option.prototype = new HTMLOptionElement();

// Named Element Support

function updater(node, value) {
    __updateoptions__(node);
}
HTMLElement.registerSetAttribute('OPTION', 'name', updater);
HTMLElement.registerSetAttribute('OPTION', 'id', updater);



}(/*HTMLOptionElement*/));


/*
 * HTML5: The form IDL attribute's behavior depends on whether the
 * option element is in a select element or not. If the option has
 * a select element as its parent, or has a colgroup element as
 * its parent and that colgroup element has a select element as
 * its parent, then the form IDL attribute must return the same
 * value as the form IDL attribute on that select
 * element. Otherwise, it must return null.
 */
__selectparent__ = function(node) {
    var parent = node.parentNode;
    if (!parent) {
        return null;
    }

    if (parent.tagName === 'SELECT') {
        return parent;
    }
    if (parent.tagName === 'COLGROUP') {
        parent = parent.parentNode;
        if (parent && parent.tagName === 'SELECT') {
            return parent;
        }
    }
};
//Blah this is used in parser/htmldocument, so we have to create
//some way to access it outside the module so Envjs.updateOptions
//is a temp place holder for that
__updateoptions__ = Envjs.updateOptions = function(node) {
    var parent = __selectparent__(node),
        s;
    if (parent) {
        // has side effects and updates owner select's options
        s = parent.options;
    }
};
