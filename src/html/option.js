
/**
 * HTMLOptionElement, Option
 * HTML5: 4.10.10 The option element
 * http://dev.w3.org/html5/spec/Overview.html#the-option-element
 */
HTMLOptionElement = function(ownerDocument) {
    HTMLInputCommon.apply(this, arguments);
    this._selected = false;
};
HTMLOptionElement.prototype = new HTMLInputCommon();
__extend__(HTMLOptionElement.prototype, {

    /**
     * defaultSelected actually reflects the 'selected' attribute
     * leaving for now as is.
     */
    get defaultSelected() {
        return this.getAttribute('defaultSelected');
    },
    set defaultSelected(value) {
        this.setAttribute('defaultSelected',value);
    },

    /*
     * HTML5: The form IDL attribute's behavior depends on whether the
     * option element is in a select element or not. If the option has
     * a select element as its parent, or has a colgroup element as
     * its parent and that colgroup element has a select element as
     * its parent, then the form IDL attribute must return the same
     * value as the form IDL attribute on that select
     * element. Otherwise, it must return null.
     */
    get form() {
        var parent = this.parentNode;
        if (!parent) {
            return null;
        }
        if (parent.tagName === 'SELECT') {
            return parent.form;
        }
        if (parent.tagName === 'COLGROUP') {
            parent = parent.parentNode;
            if (parent && parent.tagName === 'SELECT') {
                return parent.form;
            }
        }
        return null;
    },
    get index() {
        var options = this.parentNode.childNodes,
            index = 0,
            i, opt;

        for (i=0; i < options.length; i++) {
            opt = options[i];
            if (opt.nodeType === Node.ELEMENT_NODE && opt.tagName === "OPTION") {
                index++;
            }
            if (this == opt) {
                return index;
            }
        }
        return -1;
    },
    get label() {
        return this.getAttribute('label');
    },
    set label(value) {
        this.setAttribute('label', value);
    },

    /**
     * TODO: the getters/setters for 'selected' aren't quite right.
     *  lots of special cases.
     *
     * selected returns an internal state, partially based on the 'selected' attribute
     *  but not entirely.
     */
    get selected() {
        // if disabled, return false

        return (this.getAttribute('selected') === 'selected');
    },
    set selected(value) {
        // if disabled, ignore? or error?

        //console.log('option set selected %s', value);
        if(this.defaultSelected===null && this.selected!==null) {
            this.defaultSelected = this.selected+'';
        }
        var selectedValue = (value ? 'selected' : '');
        if (this.getAttribute('selected') == selectedValue) {
            // prevent inifinite loops (option's selected modifies
            // select's value which modifies option's selected)
            return;
        }
        //console.log('option setAttribute selected %s', selectedValue);
        this.setAttribute('selected', selectedValue);
    },

    get text() {
        return ((this.nodeValue === null) ||  (this.nodeValue ===undefined)) ?
            this.innerHTML :
            this.nodeValue;
    },
    get value() {
        //console.log('getting value on option %s %s', this.text, this.getAttribute('value'));
        return ((this.getAttribute('value') === undefined) || (this.getAttribute('value') === null)) ?
            this.text :
            this.getAttribute('value');
    },
    set value(value) {
        //console.log('setting value on option');
        this.setAttribute('value', value);
    },
    toString: function() {
        return '[object HTMLOptionElement]';
    }
});

Option = function(text, value, defaultSelected, selected) {

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
        this._selected = (selected) ? true : false;
    }
};

Option.prototype = new HTMLOptionElement();
