/**
 *
 * @param {Object} event
 */
__extend__(Envjs.defaultEventBehaviors,{

    'submit': function(event) {
        var target = event.target;
        while (target && target.nodeName !== 'FORM') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'FORM') {
            target.submit();
        }
    },
    
    'click': function(event) {
        var target = event.target;
        while (target && target.nodeName !== 'A') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'A') {
            if(target.href && !target.href.match(/^#/)){
                target.click();
            }
        }
    }

});